/*
 Webpack Config!
 Andrew Haine // hello@andrewhaine.co.uk
*/

/*
    Imports
*/

import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NotifierPlugin from 'webpack-notifier';


/*
    Useful constants
*/

const SITE_NAME = path.basename(path.join(__dirname, '/../../'));
const THEME_NAME = path.basename(__dirname);

/*
    Plugin configuration
*/

//different css points
const extractEditor = new ExtractTextPlugin({
    filename: 'css/editor.css',
});
const extractMain = new ExtractTextPlugin({
    filename: 'css/style.css',
});

//define plugins
let plugins = [];

const IS_PROD = process.env.NODE_ENV === 'production';

if(IS_PROD) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        extractEditor,
        extractMain
    );


//development
} else {
    plugins.push(
        //error notifications on computer
        new NotifierPlugin({alwaysNotify: true}),
        //auto updating on dev server
        new webpack.HotModuleReplacementPlugin(),
        //shows relative path in HotModuleReplacement
        new webpack.NamedModulesPlugin(),
        //sexy dashboard
        new DashboardPlugin(),
        extractEditor
    );
}

plugins.push(new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
}))

const sources = [`../${THEME_NAME}_base/src`, `../${THEME_NAME}_mysite/src`];

const sassFolders = sources.map((source) => path.resolve(source, "scss"))
    .concat(sources.map((source) => path.resolve(source, "sass")));

//HMR can be fixed by using basic loaders instead of textExtract
const sassLoaderExtract =    {
    fallback: 'style-loader',
    use: [
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        },
    ]
}

const styleLoaders = [{
    //basic css
    test: /\.css/i,
    use: ['style-loader', 'css-loader']
}, {
    //main styles
    test: /[^editor].\.s(a|c)ss$/i,
    include: sassFolders,
    use: extractMain.extract(sassLoaderExtract)
}, {
    //styles for editor
    test: /editor\.s(a|c)ss/i,
    include: sassFolders,
    use: extractEditor.extract(sassLoaderExtract)
}];

const jsLoaders = [
    // {
    //     //eslint check
    //     enforce: 'pre',
    //     test: /\.js$/i,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: 'eslint-loader'
    //     }
    // },
    {
        //js compilation
        test: /\.js$/i,
        include: sources.map((source) => path.resolve(source, "src")),
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets: [require.resolve("babel-preset-es2015")]
            }
        }
    }
];

const imageLoaders = [{
    test: /\.(png|jpg|gif)$/i,
    include: sources.map((source) => path.resolve(source, "images")),
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 30000,
                name: 'images/[name].[ext]'
            }
        },
        {
            loader: 'image-webpack-loader',
            options: {
                optipng: {
                    optimizationLevel: 5
                },
                mozjpeg: {
                    interlaced: true,
                }
            }
        }
    ]
},
{
    test: /\.svg$/i,
    use: 'svg-inline-loader'
}];

/*
    Main Config Object
*/
export default {
    //what files to start from
    //bundle should include main.js from all sources
    entry: path.resolve(`../${THEME_NAME}_mysite/src`, "main.js"),
    //access from client
    output: {
        path: path.resolve(`../${THEME_NAME}_dist/`, ''),
        publicPath: `/themes/${THEME_NAME}_dist/`,
        filename: 'bundle.js'
    },
    //loaders
    module: {
        rules: styleLoaders.concat(jsLoaders).concat(imageLoaders)
    },
    //extra settings
    resolve: {
        modules: [
            path.join(__dirname, "node_modules"),
        ],
        alias: {
            base: path.resolve(`../${THEME_NAME}_base/src/`),
            'jquery': 'jquery/dist/jquery',
        },
        extensions: [".js", ".jsx"]
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        hot: true,
        port: 3000,
        publicPath: `/themes/${THEME_NAME}_dist/`,
        proxy: {
            '/': {
                'target': {
                    'host': `${SITE_NAME}.localhost`,
                    'protocol': 'http',
                    'port': 80
                },
                changeOrigin: true,
                secure: false
            }
        },
        stats: 'errors-only'
    },
    plugins: plugins,
};
