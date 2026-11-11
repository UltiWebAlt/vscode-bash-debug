const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
    ...tsPlugin.configs['flat/recommended'],
    {
        files: ['src/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-vars': 'off'
        }
    }
];
