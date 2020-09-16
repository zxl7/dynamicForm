module.exports = {
  extends: [
    '@byzanteam/stylelint-config',
  ],
  plugins: [
    'stylelint-scss',
  ],
  rules: {
    'selector-max-id': null,
    'string-quotes': 'single',
    'declaration-empty-line-before': ['never'],
    'font-family-no-missing-generic-family-keyword': null,
    'no-descending-specificity': null,
    'number-leading-zero': ['never'],
  },
}
