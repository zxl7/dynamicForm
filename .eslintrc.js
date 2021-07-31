module.exports = {
  root: false,
  env: {
    node: true,
  },
  // extends: ['plugin:vue/essential', 'plugin:vue/recommended', '@vue/airbnb'],
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'no-return-assign': 'off',
    // 'no-underscore-dangle': 'off',
    // semi: ['0', 'never'],
    // 'arrow-parens': ['0', 'never'],
  },
  parserOptions: {
    // parser: 'babel-eslint',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
