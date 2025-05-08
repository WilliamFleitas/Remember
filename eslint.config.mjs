import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/', '.next/', 'build/', 'dist/'],
    rules: {
      semi: ['error', 'never'],
      'no-multiple-empty-lines': ['error', { max: 2 }],
      'linebreak-style': ['error', 'unix'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      quotes: ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'prefer-const': 'error',
    },
  },
]

export default eslintConfig
