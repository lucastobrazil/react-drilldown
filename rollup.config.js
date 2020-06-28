import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
    input: 'src/index.js',
    external: ['react', 'prop-types', 'classnames', 'lodash'],
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
    plugins: [
        babel({
            babelHelpers: 'bundled',
            babelrc: false,
            exclude: ['node_modules/**'],
            presets: [
                '@babel/preset-react',
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                    },
                ],
            ],
        }),
    ],
};
