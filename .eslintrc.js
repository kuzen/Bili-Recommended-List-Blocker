'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'max-len': 0,
    'require-jsdoc': 0,
    'camelcase': 0,
    'eqeqeq': [1, 'allow-null'],
    'handle-callback-err': [1, '^(err|error)$'],
    'jsx-quotes': [1, 'prefer-single'],
    'new-cap': [1, {newIsCap: true, capIsNew: false}],
    'no-extra-parens': [1, 'functions'],
    'no-inner-declarations': [1, 'functions'],
    'no-labels': [1, {allowLoop: false, allowSwitch: false}],
    'no-multi-spaces': [1, {ignoreEOLComments: true}],
    'no-return-assign': [1, 'except-parens'],
    'no-unneeded-ternary': [1, {defaultAssignment: false}],
    'no-unused-vars': [1, {vars: 'all', args: 'none'}],
    'one-var': [1, {initialized: 'never'}],
    'no-console': 0,
    'no-undef': 0,
  },
};
