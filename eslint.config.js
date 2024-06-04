import chaiPlugin from 'eslint-plugin-chai-friendly'
import config     from '@digitallinguistics/eslint-config'

export default [
  ...config,
  {
    plugins: { 'chai-friendly': chaiPlugin },
    rules:   {
      'chai-friendly/no-unused-expressions': `error`,
      indent:                                [`error`, 2, { MemberExpression: 0 }],
      'no-unused-expressions':               `off`,
    },
  },
]
