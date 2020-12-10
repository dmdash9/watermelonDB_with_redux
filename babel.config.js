module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx'],
        alias: {
          '@app': './src',
          '@setup': './src/setup',
          '@screens': './src/screens',
          '@store': './src/store',
          '@database': './src/database',
          '@components': './src/components',
          '@services': './src/services',
          '@hooks': './src/hooks'
        }
      }
    ],
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }]
  ]
}
