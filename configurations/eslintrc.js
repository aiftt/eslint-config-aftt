module.exports = {
  // 指定环境变量，方便可以使用类似 window/global 等全局变量
  // 这个设置会直接影响 parserOptions.ecmaVersion
  // 如：es6: true -> 会自动设置 ecmaVersion: 6 (即 es2015)
  env: {
    // es6: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: true,
      jsx: true,
    },
    // https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options
    // 允許使用的 javascript 語法範圍，要结合 env 使用，如果 env 中没有指定 es6 的话
    // 就算这里是最新的版本，使用了 Promise 的话都会飘红
    // ecmaVersion: 2_021,
    requireConfigFile: false,
    sourceType: 'module',
  },

  plugins: ['@babel'],

  rules: {
    // 使用 new Ctor() 时候构造函数名字首字母必须大写
    '@babel/new-cap': 'error',
    // 不允许在 this 可能是 undefined 的地方使用它
    '@babel/no-invalid-this': 'error',
    '@babel/no-unused-expressions': 'error',
    // 括号和属性之间需要空格, ok: { a: 1 }, nok: {a:1}
    '@babel/object-curly-spacing': ['error', 'always'],
    // 不需要分号
    '@babel/semi': ['error', 'never'],
    // 强制在对象中使用访问器函数时当有 setter 时必须要有 getter
    // ok: { get val()..., set val()... }, nok: { set val()... }
    'accessor-pairs': 'error',
    // 中括号和元素之间要加空格, ok: [ 1, 2 ], nok: [1,2]
    'array-bracket-spacing': ['error', 'always'],
    // 强制在数组方法的回调函数中使用 return，如：reduce 如果忘记返回值就会导致异常
    // 只针对需要有返回值的方法，如：forEach 是不需要的
    'array-callback-return': 'error',
    // WARNING: 下面两个有待考量，可能数组元素值很简单总是换行太不友好了，如：[1,2,3]
    // 换行之后看着挺不舒服
    // 控制中括号[和]是不是要换行展示, multline: true 当元素之间有换行则括号换行
    // minItems 指定触发换行的元素个数最小值，这里设置成 2，当只有一个元素的时候没必要换行
    'array-bracket-newline': [
      'error',
      {
        minItems: 1,
        multiline: true,
      },
    ],
    // 结合 array-bracket-newline 使用，任何情况下都换行处理
    'array-element-newline': [
      'error',
      {
        minItems: 1,
        multiline: true,
      },
    ],
    // 按照需求就行，不然太繁琐，如： () => i++ 就不需要加上大括号简单明了
    'arrow-body-style': ['error', 'as-needed'],
    // 箭头函数参数必须加上括号，后续删减参数更方便
    'arrow-parens': ['error', 'always'],
    // 箭头函数的箭头前后强制加上空格，ok: () => true, nok: ()=>true
    'arrow-spacing': [
      'error',
      {
        after: true,
        before: true,
      },
    ],
    // 强制变量只能在其声明的作用域内使用
    'block-scoped-var': 'error',
    // 强制在块作用域括号前后加上空格，
    // ok: function foo() { return true; }
    // nok: function foo() {return true;}
    'block-spacing': ['error', 'always'],
    // 强制使用 1tbs 括号风格({ 括号跟在语句后面，如：if (true) {...)，且语句必须换行
    'brace-style': [
      'error',
      '1tbs',
      {
        allowSingleLine: false,
      },
    ],
    // 强制变量使用驼峰命名(常量除外，一般大写视为常量)，如果是解构出来的需要重命名
    'camelcase': [
      'error',
      {
        properties: 'always',
        // 强制解构出来的也是驼峰，不是就需要重命名
        ignoreDestructuring: false,
        // 强制 import 导入的也是驼峰，不是就需要重命名
        ignoreImports: false,
        // 强制全局变量也必须是驼峰
        ignoreGlobals: false,
        // 法外之地
        allow: ['^UNSAFE_'],
      },
    ],
    'no-unused-vars': 'error',
  },
}
