module.exports = {
  env: {
    es2021: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  globals: {
    __DEV__: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'react-native',
    'simple-import-sort'
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'none',
        arrowParens: 'avoid',
        semi: false
      }
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^.*\\u0000$'],
          ['^\\u0000'],
          ['^node:'],
          ['^@?\\w'],
          [
            '^(screens|ui|contexts|hooks|i18n|models|navigation|services|types|utils)(/.*|$)'
          ],
          ['^'],
          ['^\\.']
        ]
      }
    ],
    // 'import/order': [
    //   'error',
    //   {
    //     groups: ['external', 'internal', 'parent', 'sibling']
    //   }
    // ],
    'simple-import-sort/exports': 'error',
    'no-use-before-define': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/no-single-element-style-arrays': 'error'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts']
    }
  }
}
