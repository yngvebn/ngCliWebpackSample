var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
  entryPatterns: [
    'Features/wallabyTest.js',
    'Features/**/*spec.js'
  ],

  module: {
    loaders: [
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.js$/, loader: 'angular2-template-loader', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.styl$/, loaders: ['raw-loader', 'stylus-loader'] },
      { test: /\.less$/, loaders: ['raw-loader', 'less-loader'] },
      { test: /\.scss$|\.sass$/, loaders: ['raw-loader', 'sass-loader'] },
      { test: /\.(jpg|png)$/, loader: 'url-loader?limit=128000' }
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  node: {
    fs: "empty"
  }
});

var compilerOptions = require('./Features/tsconfig.json').compilerOptions;

module.exports = function (wallaby) {

  return {
    files: [
      { pattern: 'Features/**/*.ts', load: false },
      { pattern: 'Features/**/*.d.ts', ignore: true },
      { pattern: 'Features/**/*.css', load: false },
      { pattern: 'Features/**/*.html', load: false },
      { pattern: 'Features/**/*spec.ts', ignore: true }
    ],

    tests: [
      { pattern: 'Features/**/*spec.ts', load: false }
    ],

    testFramework: 'jasmine',

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    postprocessor: webpackPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};