import esbuild from 'rollup-plugin-esbuild';
import ts from "rollup-plugin-ts";

export default [{
    plugins: [esbuild()],
    input: 'src/index.ts',
    output: [
        {
            file: `lib/index.js`,
            format: 'cjs',
        },
        {
            file: `lib/index.mjs`,
            format: 'es',
        },
    ],
}, {
    plugins: [ts({
        browserslist: false,
    })],
    input: 'src/index.ts',
    output: {
        file: `lib/index.d.ts`,
        format: 'es',
    },
}];
