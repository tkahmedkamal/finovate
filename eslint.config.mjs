import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
    plugins: ['unused-imports', 'import', '@typescript-eslint', 'boundaries'],
    settings: {
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          mode: 'full',
          type: 'shared',
          pattern: [
            'src/app/api/**/*',
            'src/components/**/*',
            'src/hooks/**/*',
            'src/lib/**/*'
          ]
        },
        {
          mode: 'full',
          type: 'store',
          pattern: ['src/store/**/*']
        },
        {
          mode: 'full',
          type: 'feature',
          capture: ['featureName'],
          pattern: ['src/features/*/**/*']
        },
        {
          mode: 'full',
          type: 'app',
          capture: ['_', 'fileName'],
          pattern: ['src/app/**/*']
        },
        {
          mode: 'full',
          type: 'others',
          pattern: ['src/*']
        }
      ]
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'warn',
      'no-unused-vars': [
        'error',
        {
          args: 'after-used',
          vars: 'all',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_.*?$'
        }
      ],
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_.*?$'
        }
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'type',
            'builtin',
            'object',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          pathGroups: [
            {
              pattern: '~/**',
              group: 'external',
              position: 'after'
            }
          ],
          'newlines-between': 'always'
        }
      ],
      'boundaries/no-unknown': ['error'],
      'boundaries/no-unknown-files': ['error'],
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: ['shared'],
              allow: ['shared', 'store', 'feature']
            },
            {
              from: ['feature'],
              allow: [
                'shared',
                'store',
                ['feature', { featureName: '${from.featureName}' }]
              ]
            },
            {
              from: ['store'],
              allow: ['shared', 'feature']
            },
            {
              from: ['app', 'others'],
              allow: ['shared', 'feature']
            },
            {
              from: ['app'],
              allow: [['app', { fileName: '*.css' }]]
            }
          ]
        }
      ]
    }
  })
];

export default eslintConfig;
