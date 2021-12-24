const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

module.exports = (env, args) => {
    return {
        entry: './src/a.js',
        output: {
            filename: `antd${args.mode === 'production' ? '.min' : ''}.js`
        },
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: 'babel-loader'
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.less$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    javascriptEnabled: true
                                }
                            }
                        }
                    ],
                },
            ]
        },
        target: ['web', 'es5'],
        devServer: {
            compress: true,
            open: true,
            port: 8080
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        externals: {
            react: 'var amisRequire(\'react\')',
            amis: 'var amisRequire(\'amis\')',
            'react-dom': 'var amisRequire(\'react-dom\')',
            'moment': 'var amisRequire(\'moment\')',
            // 'regenerator-runtime': 'var regeneratorRuntime'
        },
        // 插件
        plugins: [
            new webpack.BannerPlugin({
                banner: `Antd-amis v${pkg.version} | ${pkg.author} | build ${new Date().toISOString()}`
            }),
            args.mode !== 'production'
                ? new HtmlWebpackPlugin({
                    template: 'public/index.html',
                    inject: 'head',
                    scriptLoading: 'blocking'
                })
                : null,
            args.mode === 'production'
                ? new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: false
                })
                : null,
        ].filter(Boolean)
    }
}