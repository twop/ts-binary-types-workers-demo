import nodeResolve from "rollup-plugin-node-resolve";
import OMT from "rollup-plugin-off-main-thread";
import rollupTypescript from "rollup-plugin-typescript";

export default {
  input: "src/main.ts",
  output: {
    dir: "dist",
    format: "amd"
  },
  plugins: [nodeResolve(), rollupTypescript(), OMT()]
};
