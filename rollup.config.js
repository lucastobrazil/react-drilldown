import babel from 'rollup-plugin-babel';
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
            babelrc: false,
            exclude: ['node_modules/**'],
            plugins: ['transform-object-rest-spread'],
            presets: [
                'react',
                [
                    'env',
                    {
                        modules: false,
                    },
                ],
                'stage-1',
                'babel-preset-es2015-rollup',
            ],
        }),
    ],
};
