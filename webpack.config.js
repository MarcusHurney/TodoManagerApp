module.exports = {
  entry: './public/index.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      App: 'public/components/App.jsx',
      Login: 'public/components/Login.jsx',
      LoginHeader: 'public/components/LoginHeader.jsx',
      LogoutHeader: 'public/components/LogoutHeader.jsx',
      NewTodo: 'public/components/NewTodo.jsx',
      ShowTodo: 'public/components/ShowTodo.jsx',
      TodoItem: 'public/components/TodoItem.jsx',
      TodosIndex: 'public/components/TodosIndex.jsx',
      Actions: 'public/actions/index.js'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader', //Converts all ES6 files into ES5
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};