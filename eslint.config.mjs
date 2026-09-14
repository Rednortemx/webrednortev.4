import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('plugin:jsx-a11y/recommended'),
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**'],
  },
];

export default eslintConfig;
