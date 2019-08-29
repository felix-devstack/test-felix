module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 'error',
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'curly': 'error',
    'no-var': 'error',
    'indent': ['error', 2, {
      'MemberExpression': 'off'
    }],
    'no-mixed-spaces-and-tabs': 'error',
    'no-return-assign': 'off',
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 4 }],
    'comma-dangle': ['error', 'never'],
    'camelcase': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
