import autoprefixer from "autoprefixer"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import typescript from "@rollup/plugin-typescript"
import postcss from "rollup-plugin-postcss"
import analyze from "rollup-plugin-analyzer"
import { visualizer } from "rollup-plugin-visualizer"
import { terser } from "rollup-plugin-terser"
import hashbang from "rollup-plugin-hashbang"
// import { nodeResolve } from "@rollup/plugin-node-resolve"

import pkg from "./package.json" assert { type: "json" }

// Make all non @hybrd dependencies external
const externalDeps = Object.fromEntries(
  Object.entries(pkg.dependencies).filter(([f]) => !f.startsWith("@hybrd"))
)

export default [
  {
    input: ["./src/index.ts"],
    external: [
      ...Object.keys(externalDeps || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    output: [
      {
        file: pkg.exports["."].default,
        sourcemap: true
      },
      {
        file: pkg.exports["."].module,
        sourcemap: true,
        format: "module"
      }
    ],
    plugins: [
      peerDepsExternal(),
      postcss({
        extract: "style.css",
        plugins: [autoprefixer()],
        sourceMap: true,
        minimize: true
      }),
      typescript({
        declaration: true,
        declarationDir: ".",
        tsconfig: "./tsconfig.json"
      }),
      terser(),
      analyze({
        limit: 10,
        summaryOnly: true
      }),
      visualizer({
        filename: "./dist/stats.html",
        template: "treemap",
        sourcemap: true
      })
    ]
  },
  {
    input: ["./src/cli.ts"],
    external: [
      ...Object.keys(externalDeps || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ],
    output: {
      file: "./dist/cli.mjs",
      sourcemap: true
    },
    plugins: [
      // nodeResolve(),
      hashbang.default()
    ]
  }
]
