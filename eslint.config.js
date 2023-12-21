import antfu, { perfectionist, sortPackageJson, sortTsconfig } from '@antfu/eslint-config'

export default antfu({
  ...sortPackageJson(),
  ...sortTsconfig(),
  ...perfectionist(),
}, {
  rules: {
    'no-console': 'off',
  },
}, {
  ignores: ['README*.md'],
})
