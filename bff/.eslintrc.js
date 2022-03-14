module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "linebreak-style": ["error", "unix"],
    "max-len": [
      "error",
      {
        "code": 100,
        "tabWidth": 2,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreUrls": true
      }
    ],
    "indent": ["error", 2],
    "object-curly-spacing": ["error", "always", { "objectsInObjects": true } ],
    "no-useless-constructor": "off",
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,

  },
  settings: {
    "node": {
      "tryExtensions": [".js", ".json", ".node", ".ts", ".d.ts"]
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  parser: 'babel-eslint',
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
}
