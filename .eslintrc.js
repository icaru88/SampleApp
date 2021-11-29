module.exports = {
  env: {
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:jest/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'eslint-plugin-jsdoc',
    '@typescript-eslint',
    'react-hooks',
    'simple-import-sort',
    'jest',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    /* rules introduced by the recommened plugins that are to be addressed in future PRs */
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // this is return types but only on module boundaries vs @typescript-eslint/explicit-function-return-type
    '@typescript-eslint/unbound-method': 'off', // this rule is failing on things I don't get
    '@typescript-eslint/no-unsafe-member-access': 'off', // lodash import causing this
    '@typescript-eslint/no-unsafe-call': 'off', // lodash as well
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-empty-interface': 'off', // should be easy to fix
    '@typescript-eslint/ban-types': 'off', // this spots using Number instead of number
    '@typescript-eslint/restrict-plus-operands': 'off', // good rule
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off', // swaps how regex and string.match are used
    '@typescript-eslint/prefer-as-const': 'off', // good suggestion
    '@typescript-eslint/no-unnecessary-type-assertion': 'off', // removes redundant code
    '@typescript-eslint/await-thenable': 'off', // await functions that aren't promises
    '@typescript-eslint/no-inferrable-types': 'off', // don't added types for easy to define things
    'no-extra-boolean-cast': 'off', // redundant double negation
    'no-useless-escape': 'off', // cleans up regexs,
    'no-duplicate-case': 'off', // spots duplicate case statements
    'no-case-declarations': 'off', // prevents hoisting of variables in case statements
    'no-async-promise-executor': 'off', // good suggestion for a code smell
    'no-empty-pattern': 'off', // unexpected empty object
    'no-prototype-builtins': 'off', // this can be dangerous
    'no-constant-condition': ['error', {checkLoops: false}], // this is fine
    /* additional rules previously used */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/no-string-refs': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react-native/no-unused-styles': 'error',
    'react/no-children-prop': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-unused-state': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/no-access-state-in-setstate': 'error',
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    'default-case': 'error',
    eqeqeq: ['warn', 'smart'],
    'guard-for-in': 'error',
    'jsdoc/check-alignment': 'error',
    'jsdoc/check-indentation': 'error',
    'jsdoc/newline-after-description': 'error',
    'prefer-const': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'log', // prefer info to log
          'warn',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'error',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ],
    'no-eval': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': 'error',
    'no-var': 'error',
    radix: 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            // Packages. `react` related packages come first.
            '^react',
            '^@?\\w',
            // Internal packages.

            '^(@|@wahed|@wahed-tech|@ui|components|utils|config|vendored-lib)(/.*|$)',
            // Side effect imports.
            '^\\u0000',
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
            // Style imports.

            '^.+\\.s?css$',
          ],
          [
            // Sort types as seperate group
            '^@?\\w.*\\u0000$',
            '^[^.].*\\u0000$',
            '^\\..*\\u0000$',
          ],
        ],
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
};
