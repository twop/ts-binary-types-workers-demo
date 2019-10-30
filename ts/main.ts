import {
  genPacket,
  WorkerMsg,
  GenPayloadOptions,
  genPayload,
  WorkerStructuralMsg,
  WorkerJsonMsg
} from "./messages";
import dequal from "dequal";
dequal;

// import module from "../crate/Cargo.toml";
// module.run();

import { Union, of } from "ts-union";

import { html, render } from "lit-html";
import { guard } from "lit-html/directives/guard";
import { Packet, Payload } from "./generated/messages.gen";
import { readPacket } from "./generated/messages.gen.deser";
import { writePacket, writePayload } from "./generated/messages.gen.ser";

const worker = new Worker("./worker.ts", { type: "module" });

const stopGC: any[] = [];

const measureWith = <T>(
  read: (d: T) => Packet,
  send: (packet: Packet, receivedData?: T) => void
) => (packets: Packet[]): Promise<number[]> => {
  return new Promise<number[]>(resolve => {
    let i = 0;
    const received = new Array(packets.length);
    stopGC.push(received);
    let start = 0;

    const roundTrips: number[] = [];

    worker.onmessage = function msgListener({ data }) {
      const packet = read(data);
      roundTrips.push(performance.now() - start);
      received[i] = packet;
      // if (!dequal(packet, packets[i])) {
      //   console.log("not equal", packet, packets[i]);
      // }

      i++;
      if (i < packets.length) {
        start = performance.now();
        send(packets[i], data);
      } else {
        worker.removeEventListener("message", msgListener);
        resolve(roundTrips);
      }
    };
    start = performance.now();
    send(packets[0]);
  });
};

const PACKET_LENGTH = 1000;

const measureBinary = (tag: "binary" | "binary_for_wasm") =>
  measureWith<ArrayBuffer>(
    buffer => readPacket({ arr: new Uint8Array(buffer), pos: 0 }),
    (msg, receivedData = new ArrayBuffer(PACKET_LENGTH * 200)) => {
      const toSend = writePacket(
        { arr: new Uint8Array(receivedData), pos: 0 },
        msg
      ).arr.buffer;
      const workerMsg: WorkerMsg = { tag, val: toSend };
      worker.postMessage(workerMsg, [toSend]);
    }
  );

const measureStructuralCloning = measureWith<WorkerStructuralMsg>(
  m => m.val,
  msg => {
    const workerMsg: WorkerMsg = { tag: "structural", val: msg };
    worker.postMessage(workerMsg);
  }
);

const measureJson = measureWith<WorkerJsonMsg>(
  m => JSON.parse(m.val),
  msg => {
    const workerMsg: WorkerMsg = { tag: "json", val: JSON.stringify(msg) };
    worker.postMessage(workerMsg);
  }
);

const BenchmarkResult = Union({
  NotStarted: of(null),
  InProgress: of(null),
  Finished: of<[BenchType, Duration][]>()
});

const { InProgress, NotStarted, Finished } = BenchmarkResult;
type BenchmarkResult = typeof BenchmarkResult.T;

type State = {
  options: GenPayloadOptions;
  packetCount: number;
  result: BenchmarkResult;
  packets?: Packet[];
};

const enum BenchType {
  Binary = "Binary",
  WASM = "WASM",
  StructuralCloning = "StructuralCloning",
  JSON = "JSON"
}

const Effect = Union({
  RunBenchmarks: of<Packet[]>(),
  GenerateMessages: of<GenPayloadOptions, number>()
});

type Effect = typeof Effect.T;

type Duration = {
  total: number;
  fastest: number;
};

const TAKE_PERCENT_FASTEST = 0.2;

const Action = Union({
  ChangeOptions: of<GenPayloadOptions>(),
  ChangeMsgCount: of<number>(),
  Start: of(null),
  SetPackets: of<Packet[]>(),
  Finish: of<BenchType, Duration>()
});

const { ChangeOptions, ChangeMsgCount, Start, SetPackets, Finish } = Action;

type Action = typeof Action.T;

const update = (state: State, action: Action) =>
  Action.match<[State, Effect?]>(action, {
    ChangeOptions: options => [{ ...state, options, packets: undefined }],
    ChangeMsgCount: packetCount => [
      { ...state, packetCount, packets: undefined }
    ],
    Start: () => {
      const { packets: messages, options, packetCount } = state;
      return [
        { ...state, result: InProgress },
        messages
          ? Effect.RunBenchmarks(messages)
          : Effect.GenerateMessages(options, packetCount)
      ];
    },
    SetPackets: messages => [
      { ...state, packets: messages },
      Effect.RunBenchmarks(messages)
    ],
    Finish: (type, duration) => [
      {
        ...state,
        result: BenchmarkResult.match(state.result, {
          Finished: results => Finished([...results, [type, duration]]),
          default: () => Finished([[type, duration]])
        })
      }
    ]
  });

const allOptionsKeys: (keyof GenPayloadOptions)[] = [
  "f64",
  "str",
  "tuple",
  "struct",
  "union"
];

const app = (
  { options, packetCount: msgCount, result }: State,
  dispatch: (action: Action) => void
) => {
  return html`
    <h3>Binary encoding demo (<a href=" https://github.com/twop/ts-binary-types-workers-demo">repo</a>)</h3>
    ${guard([options], () =>
      allOptionsKeys.map(opt => generationOption(options, opt, dispatch))
    )}
    <p>
      <div class="">
        <p>message count = ${msgCount}</p>
        <input type="range" min="10" max="1000" value=${msgCount} step="1" @change=${(ev: {
    target: { valueAsNumber: number };
  }) => dispatch(ChangeMsgCount(ev.target.valueAsNumber))}/>
      </div>
    </p>
    <p>
      <button
        @click=${() => dispatch(Start)}
      >
        Start benchmark
      </button>
    </p>
   
  
    <p style="margin-left: 10px">
      Result:
      <p>
        ${guard([result], () =>
          BenchmarkResult.match(result, {
            InProgress: () =>
              html`
                <div>Running...</div>
              `,
            NotStarted: () =>
              html`
                <div>Press a button to start</div>
              `,
            Finished: results => html`
              <div>
                Note: "fastest" is a sum of ${TAKE_PERCENT_FASTEST * 100}%
                fastest round trips
                ${results.map(
                  ([type, { total, fastest }]) => html`
                    <p>
                      ${type} total: ${total}ms, fastest: ${fastest}
                    </p>
                  `
                )}
              </div>
            `
          })
        )}
      </p>
    </p>
    <p>Payload example (there are ${PACKET_LENGTH} in a packet ):</p>
      ${guard([options], () => {
        const testPayload = genPayload(options);
        const binSize = estimateBinarySize(testPayload);

        const jsonSize = new TextEncoder().encode(JSON.stringify(testPayload))
          .length;

        return html`
          <pre>${JSON.stringify(testPayload, null, 2)}</pre>
          <p>payload size in: binary=${binSize}, utf8 JSON=${jsonSize}</p>
        `;
      })}
    </p>
  `;
};

const estimateBinarySize = (testPayload: Payload): number =>
  writePayload({ arr: new Uint8Array(1), pos: 0 }, testPayload).pos;

function generationOption<K extends keyof GenPayloadOptions>(
  options: GenPayloadOptions,
  name: K,
  dispatch: (action: Action) => void
) {
  const opt = options[name] || false;
  return html`
  <p>
    <input type="checkbox" ?checked=${opt} @click=${() =>
    dispatch(ChangeOptions({ ...options, [name]: !opt }))}>
      ${name}
    </input>
  </p>`;
}

const benchmarks: [BenchType, (packets: Packet[]) => Promise<number[]>][] = [
  [BenchType.Binary, measureBinary("binary")],
  [BenchType.WASM, measureBinary("binary_for_wasm")],
  [BenchType.StructuralCloning, measureStructuralCloning],
  [BenchType.JSON, measureJson]
];

const runEffect = (effect: Effect, dispatch: (action: Action) => void) => {
  Effect.match(effect, {
    RunBenchmarks: packets => {
      benchmarks.reduce(async (prevBench, [type, runBench]) => {
        await prevBench;
        performance.mark(type);
        const roundTrips = await runBench(packets);
        const sum = (s: number, trip: number) => s + trip;
        const total = roundTrips.reduce(sum);
        const fastest = roundTrips
          .sort((a, b) => a - b)
          .slice(0, roundTrips.length / 3)
          .reduce(sum);

        // console.log("~~round trips fastest", type, fastestTripsTime);

        console.info(`${type} full=${total}ms", fastest=${fastest}`);
        dispatch(Finish(type, { fastest, total }));
      }, Promise.resolve());
    },
    GenerateMessages: (options, msgCount) => {
      const packets = Array.from({ length: msgCount }, () =>
        genPacket(PACKET_LENGTH, options)
      );
      stopGC.push(packets);
      return dispatch(SetPackets(packets));
    }
  });
};

const renderApp = (state: State, dispatch: (action: Action) => void) =>
  render(app(state, dispatch), document.body);

const startApp = (initial: State) => {
  let state = initial;

  function dispatch(action: Action) {
    const [newState, effect] = update(state, action);
    state = newState;
    if (effect) runEffect(effect, dispatch);
    renderApp(newState, dispatch);
  }

  renderApp(state, dispatch);
};

worker.onmessage = function onWorkerReady({ data }) {
  if (data !== "ready") {
    return;
  }

  worker.removeEventListener("message", onWorkerReady);

  startApp({
    packetCount: 100,
    options: { f64: true, struct: true },
    result: NotStarted
  });
};
