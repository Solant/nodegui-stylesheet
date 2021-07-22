import ts from "rollup-plugin-ts";

import pkg from './package.json';

export default {
    plugins: [ts({
        browserslist: false,
    })],
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
};
