import nextVitals from 'eslint-config-next/core-web-vitals';
import boundaries from 'eslint-plugin-boundaries';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },

  ...nextVitals,

  {
    rules: {
      ...jsxA11y.flatConfigs.strict.rules,
    },
  },

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // --- Main App Rules ---
  {
    name: 'project/app-rules',
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js', '*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
      },
      'boundaries/include': ['app/**', 'components/**', 'lib/**'],
      'boundaries/elements': [
        { type: 'app', pattern: 'app/**' },
        { type: 'ui', pattern: 'components/ui/**' }, // Shadcn lives here
        { type: 'layout', pattern: 'components/layout/**' },
        {
          type: 'feature',
          pattern: 'components/**',
          exclude: ['components/ui/**', 'components/layout/**'],
        },
        { type: 'lib', pattern: 'lib/**' },
      ],
    },
    rules: {
      'react/jsx-no-leaked-render': [
        'error',
        { validStrategies: ['ternary', 'coerce'] },
      ],
      'react/prop-types': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'boundaries/no-unknown': 'error',
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            { from: 'app', allow: ['app', 'feature', 'layout', 'ui', 'lib'] },
            { from: 'layout', allow: ['layout', 'feature', 'ui', 'lib'] },
            { from: 'feature', allow: ['feature', 'ui', 'lib'] },
            { from: 'ui', allow: ['ui', 'lib'] },
            { from: 'lib', allow: ['lib'] },
          ],
        },
      ],
    },
  },

  // --- Config Files Overrides ---
  {
    name: 'project/config-files',
    files: [
      '**/*.config.{js,mjs,ts}',
      '**/.lintstagedrc.js',
      'jest.setup.ts',
      'eslint.config.mjs',
    ],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },

  // --- SHADCN / UI OVERRIDES (New) ---
  // Relax strict rules specifically for your UI library components
  {
    name: 'shadcn-overrides',
    files: ['components/ui/**/*.{ts,tsx}'],
    rules: {
      // Shadcn often uses "interface Props {}" to keep things extendable.
      // Strict TS hates empty interfaces, but here they are fine.
      '@typescript-eslint/no-empty-object-type': 'off',

      // Shadcn relies on spreading props ({...props}) heavily.
      // If you ever enable 'react/jsx-props-no-spreading', disable it here.
    },
  },

  prettierRecommended,
];

export default eslintConfig;
