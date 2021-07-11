import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";
import { uglify } from "rollup-plugin-uglify";
import pkg from "./package.json";

export default {
    input: "src/index.tsx",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true,
            strict: false
        }
    ],
    plugins: [
        sass({ insert: true }),
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript(),
        uglify()
    ],
    external: ["react", "react-dom"]
};
