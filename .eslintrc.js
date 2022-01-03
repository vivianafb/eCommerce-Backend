const eslintConfig = {
    env: {
      browser: true,
      es6: true,
      jest: true,
    },
    extends: 'airbnb',
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
      allowImportExportEverywhere: true,
    },
    plugins: [
      'react',
    ],
    rules: {
      'react/destructuring-assignment': 0,
      'import/no-extraneous-dependencies': 0,
      'class-methods-use-this': [0],
      'no-underscore-dangle': [0],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/forbid-prop-types': [1, { forbid: [] }],
      'react/no-array-index-key': [0],
      'jsx-a11y/click-events-have-key-events': [0],
      'jsx-a11y/anchor-is-valid': [0],
      'import/prefer-default-export': [0],
      'object-curly-newline': [0],
      'react/jsx-props-no-spreading': [0, {
        html: 'ignore' / 'enforce',
        custom: 'ignore' / 'enforce',
        exceptions: ['string'],
      }],
      'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
    },
  };
  
  const disabledConfig = {
    ignorePatterns: ['*/.ts', '*/.tsx', './.js', 'config/.js'],
  };
  
  module.exports = process.env.REACT_APP_DISABLE_ESLINT ? disabledConfig : eslintConfig;