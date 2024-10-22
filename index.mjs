import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';

export const typescriptRules = {
    '@stylistic/arrow-parens': ['error', 'as-needed'],
    '@stylistic/comma-dangle': 'off',
    '@stylistic/indent': ['error', 4, { ignoredNodes: ['PropertyDefinition[decorators]', 'TSUnionType', 'TSIntersectionType', 'TSConditionalType', 'TSTypeReference', 'Decorator'], SwitchCase: 1, FunctionExpression: { parameters: 'off' } }],
    '@stylistic/no-floating-decimal': 'off',
    '@stylistic/operator-linebreak': ['error', 'after'],
    '@stylistic/padded-blocks': ['error', { blocks: 'never', classes: 'always', switches: 'never' }],
    '@stylistic/yield-star-spacing': ['error', 'after'],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/class-literal-property-style': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_err$', destructuredArrayIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'curly': ['error', 'all'],
    'eol-last': 'error',
    'eqeqeq': ['error', 'always', { null: 'never' }],
    'indent': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'vue/prefer-import-from-vue': 'off',
};

export const javascriptRules = {
    '@typescript-eslint/no-require-imports': 'off',
};

export const vueRules = {
    'vue/attribute-hyphenation': ['error', 'never'],
    'vue/attributes-order': 'error',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/first-attribute-linebreak': 'error',
    'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-end-tags': 'error',
    'vue/html-indent': ['error', 4, { alignAttributesVertically: false }],
    'vue/html-self-closing': ['error', { html: { void: 'always' } }],
    'vue/multi-word-component-names': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-multi-spaces': 'error',
    'vue/no-mutating-props': 'off',
    'vue/no-template-shadow': 'off',
    'vue/no-v-html': 'off',
    'vue/order-in-components': 'error',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/padding-lines-in-component-definition': ['error', { betweenOptions: 'always', withinOption: 'ignore', groupSingleLineProperties: false }],
    'vue/prefer-import-from-vue': 'off',
    'vue/prop-name-casing': 'error',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-on-event-hyphenation': ['error', 'never'],
};

export const sharedConfigs = [
    // Global ignores
    {
        ignores: [
            '**/out',
            '**/dist',
            '**/.*',
        ],
    },

    // Recommended
    eslint.configs.recommended,
    ...typescriptEslint.configs.recommended,
    ...typescriptEslint.configs.stylistic,
    ...pluginVue.configs['flat/recommended'],

    // Stylistic
    stylistic.configs.customize({
        braceStyle: '1tbs',
        indent: 4,
        quoteProps: 'consistent',
        quotes: 'single',
        semi: true,
    }),

    // Sorted imports
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },

    // TypeScript Overrides
    {
        rules: typescriptRules,
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    // Vue Overrides
    {
        files: ['**/*.vue'],
        rules: vueRules,
    },

    // Plain JS Overrides
    {
        files: ['**/*.js', '**/*.cjs'],
        rules: javascriptRules,
    },

    // Test overrides
    {
        files: ['**/*.test.ts'],
        rules: {
            // To allow Mocha paddings that improve test readability
            '@stylistic/padded-blocks': 'off',
        },
    },

];
