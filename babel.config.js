module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:babel-plugin-module-resolver',
      {
        root: ['.'],
        alias: {
          screens: './src/components/screens',
          ui: './src/components/ui',
          contexts: './src/contexts',
          hooks: './src/hooks',
          i18n: './src/i18n',
          models: './src/models',
          navigation: './src/navigation',
          services: './src/services',
          types: './src/types',
          utils: './src/utils'
        }
      }
    ]
  ]
}
