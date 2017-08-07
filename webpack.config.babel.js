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
import {sigVars, signature} from './signature';


/*
  Useful constants
*/

const SITE_NAME = path.basename(path.join(__dirname, '/../../'));
const THEME_NAME = path.basename(__dirname);

/*
  Plugin configuration
*/

const extractEditor = new ExtractTextPlugin({
  filename: 'css/editor.css',
});
const extractMain = new ExtractTextPlugin({
  filename: 'css/style.css',
});

//define plugins
let plugins = [];

if(process.env.NODE_ENV === 'production') {
  plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    extractEditor,
    extractMain
  ];

  // Signature Settings - disable in signature.js
  if(sigVars.useSignature) {
    plugins.push(new webpack.BannerPlugin({
      banner: signature,
      test: [/\.js$/, /\.css$/]
    }));
  }

} else {
  plugins = [
    new NotifierPlugin({alwaysNotify: true}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    extractEditor
  ];
}

plugins.push(new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
}))

/*
  Main Config Object
*/
const sources = ["../sswebpack_base/src", '../sswebpack_mysite/src'];

const sassFolders = sources.map((source) => path.resolve(source, "scss"))
  .concat(sources.map((source) => path.resolve(source, "sass")));

const styleLoaders = [{
  //basic css
  test: /\.css/i,
  use: ['style-loader', 'css-loader']
}, {
  //sass and scss
  test: /.s(a|c)ss$/i,
  include: sassFolders,
  use: extractMain.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      },
      'import-glob-loader'
    ]
  })
}];

const jsLoaders = [{
  //eslint check
  enforce: 'pre',
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader'
  }
}, {
  //js compilation
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: [require.resolve("babel-preset-es2015")]
    }
  }
}];

const imageLoaders = [{
  test: /\.(png|jpg|gif)$/i,
  include: sources.map((source) => path.resolve(source, "src/images"),
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

export default {
  //what files to start from
  //bundle should include main.js from all sources
  entry: sources.map((source) => path.resolve(source, "main.js")),

  //access from client
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: `themes/${THEME_NAME}/dist/`,
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
        extensions: [".js", ".jsx"]
    },

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: true,
    port: 3000,
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
