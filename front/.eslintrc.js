module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier-vue/recommended',
  ],
  rules: {
    'no-useless-constructor': 'off',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-types': 0,
    'max-len': ["error", { "code": 120 }]
  },
}
