module.exports = {
  // 指定环境变量，方便可以使用类似 window/global 等全局变量
  // 这个设置会直接影响 parserOptions.ecmaVersion
  // 如：es6: true -> 会自动设置 ecmaVersion: 6 (即 es2015)
  env: {
    es6: true,
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

  plugins: ['@babel', 'unicorn'],

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
    // 在声明之前不能使用，只对变量和class生效。
    'no-use-before-define': [
      'error',
      {
        classes: true,
        functions: false,
        variables: true,
      },
    ],
    // 不需要多余的反斜杠转义语法
    'no-useless-backreference': 'error',
    // 不需要多余的 call 和 apply
    // 如：obj.foo.call(obj, ...) => obj.foo(...)
    // 如：foo.call(undefined, ...) => foo(...)
    'no-useless-call': 'error',
    // 强制使用 catch 的时候必须给出错误处理机制(代码)
    // no: try {...} catch(e) { throw e }
    'no-useless-catch': 'error',
    // 避免非必要的计算属性： no: { ['a']: 'xx' } => {a:'xx'}
    'no-useless-computed-key': 'error',
    // 字符串拼接时避免一些无意义的拼接, no: 'a' + 'b', ok: 'ab'
    'no-useless-concat': 'error',
    // 不允许无意义的构造函数，比如里面无任何处理代码(空构造函数)
    'no-useless-constructor': 'error',
    // 字符串中多余的转义符，no: '\"', ok: '"'
    'no-useless-escape': 'error',
    // 导入导出解构时无意义的重命名，no: import {foo as foo}, ok: import {foo}
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreExport: false,
        ignoreImport: false,
      },
    ],
    // 无意义的 return 语句
    'no-useless-return': 'error',
    // 必须使用 let, const
    'no-var': 'error',
    // void 0 实际就是 undefined
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    // 注释中允许添加的一些关键词，如： TODO, DONE, ...
    'no-warning-comments': [
      'warn',
      {
        location: 'start',
        terms: ['todo', '@toto', 'fixme', 'important', 'warning'],
      },
    ],
    // 属性访问或函数调用时候不允许有空格，no: foo ['name'], foo .bar()
    'no-whitespace-before-property': 'error',
    // 不允许使用 with 关键词
    'no-with': 'error',
    // 强制单条语句不能放在同一行显示，no：if (true) foo()
    // ok: if (true) \n foo()
    'nonblock-statement-body-position': ['error', 'below'],
    // 对象括号必须换行
    'object-curly-newline': [
      'error',
      {
        ExportDeclaration: 'always',
        ImportDeclaration: 'always',
        ObjectExpression: {
          minProperties: 1,
          multiline: true,
        },
        ObjectPattern: {
          minProperties: 1,
          multiline: true,
        },
      },
    ],
    // 对象括号与属性之间必须要有空格
    'object-curly-spacing': ['error', 'always'],
    // 对象属性必须换行，在修改时 git diff 中保持最小变更
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: false,
      },
    ],
    // 对象中对于函数，必须使用 es6 简写
    // no: { foo: function() {} }, ok: { foo() {} }
    // no: { foo: function *() {}}, ok: { *foo() {} }
    'object-shorthand': ['error', 'always'],
    // 强制单行单个声明变量，不能在一个 let/var/const 中声明多个变量
    'one-var': ['error', 'never'],
    // 声明多个的时候必须换行
    'one-var-declaration-per-line': 'error',
    // 强制能简写的时候要简写运算表达式，no: x = x + y, ok: x += y
    'operator-assignment': ['error', 'always'],
    // 运算表达式太长需要换行时，在符号后面开始换行
    // no: var foo = a \n+ b, ok: foo = a + \n b
    'operator-linebreak': ['error', 'after'],
    // 代码快的开始和结尾不允许多出空行
    'padded-blocks': ['error', 'never'],
    // 指定空行分隔规则
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        next: '*',
        prev: 'multiline-block-like',
      },
    ],
    // 能用箭头函数的尽量使用箭头函数
    'prefer-arrow-callback': 'error',
    // 在值不会变更的情况下，必须使用 const，否则用 let
    'prefer-const': 'error',
    // 关闭强制解构，如： var [foo] = arr，也要允许 var foo = arr[0] 这样使用
    'prefer-destructuring': 'off',
    // 强制使用 ** 求幂运算符替代 Math.pow
    'prefer-exponentiation-operator': 'error',
    // 关闭正则中强制使用命名捕获组功能
    'prefer-named-capture-group': 'off',
    //  关闭强制使用数字字面量进行比较，也可以使用 parseInt, Number.parseInt
    'prefer-numeric-literals': 'off',
    // 如果 Object.assign({}, ...) 第一个参数是个空对象时强制使用对象展开符
    // no: Object.assign({}, foo), ok: {...foo, bar: 1}
    'prefer-object-spread': 'error',
    // 强制在 Promise.reject 的理由时使用 Error 家族对象
    // no: Promise.reject('something'), ok: Promise.reject(new Error('something'))
    'prefer-promise-reject-errors': 'error',
    // 能用正则字面量的尽量使用字面量而不是 RegExp 构造函数
    'prefer-regex-literals': [
      'error',
      {
        disallowRedundantWrapping: true,
      },
    ],
    // 强制使用参数...符号而不是 arguments
    'prefer-rest-params': 'error',
    // 强制使用展开符替代 apply, no: Math.max.apply(Math, [1,2,3]), ok: Math.max(...[1,2,3])
    'prefer-spread': 'error',
    // 强制使用字符串模板
    'prefer-template': 'error',
    // 按需对对象属性添加引号，数字必须加上引号
    'quote-props': [
      'error',
      'as-needed',
      {
        numbers: true,
      },
    ],
    // 强制使用单引号
    'quotes': ['error', 'single'],
    // 针对 parseInt() 的使用，按需决定是否需要添加第二个精度参数
    'radix': ['error', 'as-needed'],
    // 强制在 async...await 使用时等待结果返回之后在对返回的值进行操作
    // no: async () => val += await foo()
    // ok: async () => { res = await foo(); val += res }
    'require-atomic-updates': 'error',
    // 允许 async 异步函数中可以没有 await
    'require-await': 'off',
    // 强制正则加上 `u` 标识，能识别 unicode 字符
    // /^[👍]$/.test("👍") //→ false
    // /^[👍]$/u.test("👍") //→ true
    'require-unicode-regexp': 'error',
    // 强制 generator 函数中必须包含 yield
    'require-yield': 'error',
    // 强制展开符与变量之间不能有空格
    'rest-spread-spacing': ['error', 'never'],
    // 不使用结尾分号
    'semi': ['error', 'never'],
    // 分号前面不加空格，后面加空格
    'semi-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    // 分号放在语句结尾
    'semi-style': ['error', 'last'],
    // 关闭模块导入排序
    'sort-imports': 'off',
    // 关闭模块导入时的变量排序
    'sort-keys': 'off',
    // 强制变量声明时排序
    'sort-vars': 'error',
    // 块级代码括号之间必须加空格
    // no: if (a){}, ok: if (a) {}
    'space-before-blocks': ['error', 'always'],
    // 函数名与参数括号之间不加空格
    'space-before-function-paren': ['error', 'never'],
    // 强制括号左右不加空格，no: foo( 'bar' ), ok: foo('bar')
    'space-in-parens': ['error', 'never'],
    // 三目运算符和位运算符加上空格
    'space-infix-ops': 'error',
    // 一元运算符与变量之间是否加空格
    'space-unary-ops': [
      'error',
      {
        // 与关键字之间加空格, 如：new Ctor()
        nonwords: false,
        // 与运算符号之间不加，如：num++, --num
        words: true,
      },
    ],
    // 强制注释后面加加上空格，如： // comment, /* comment */
    'spaced-comment': ['error', 'always'],
    // 不允许代码中出现 'use strict'; ，打包之后自动会加上
    'strict': ['error', 'never'],
    // 强制 switch case value: foo(); 冒号在变量后面
    // no: case value :foo()
    // ok: case value: foo()
    'switch-colon-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    // 强制 Symbol() 中必须添加描述
    'symbol-description': 'error',
    // 强制字符串模板的插值 {} 中增加空格
    'template-curly-spacing': ['error', 'always'],
    // 字符串标记与字符串模板之间不加空格
    // no: func `hello world`
    // ok: func`hello world`
    'template-tag-spacing': ['error', 'never'],
    'unicode-bom': ['error', 'never'],
    // 简化正则使用，no: /[0-9]/, ok: [\d]
    'unicorn/better-regex': 'error',
    // 强制统一 catch (error) 捕获的错误，参数命名为 error
    // no: catch (badName), ok: catch(error), unuse: catch(_)
    'unicorn/catch-error-name': [
      'error',
      {
        name: 'error',
      },
    ],
    // 当对象被解构之后，就应该一直采用解构方式使用
    // const { a } = foo, 那就不能再使用 foo.b 来取 b，而是进行解构使用
    'unicorn/consistent-destructuring': 'error',
    // 强制函数声明放到当前作用域最前面，提升阅读性
    'unicorn/consistent-function-scoping': 'error',
    'unicorn/custom-error-definition': 'off',
    // 空对象两个括号之间不能有空格
    // no: function() { }, ok: function() {}
    'unicorn/empty-brace-spaces': 'error',
    // 强制创建内置错误对象时必须传错误信息，如： new Error(message)
    'unicorn/error-message': 'error',
    // 强制在使用 `\xa9` 的时候其中的字母必须大写，如：`\xA9`
    'unicorn/escape-case': 'error',
    // 规范注释中 TODO 的使用，参考：
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
    'unicorn/expiring-todo-comments': [
      'error',
      {
        allowWarningComments: true,
        ignoreDatesOnPullRequests: true,
        terms: ['todo'],
      },
    ],
    // 关闭数组长度检测
    'unicorn/explicit-length-check': 'off',
    'unicorn/filename-case': 'off',
    // 'unicorn/import-index': 'error',
    // 导入模块风格
    'unicorn/import-style': 'off',
    // 有时候需要 Array(n)
    'unicorn/new-for-builtins': 'off',
    // 强制使用 eslint-disable 时候制定规则
    // no: /* eslint-disable */, ok: /* eslint-disable no-console */
    // no: /* eslint-disable-next-line */, ok: /* eslint-disable-next-line no-console */
    'unicorn/no-abusive-eslint-disable': 'error',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-array-for-each': 'warn',
    'unicorn/no-array-method-this-argument': 2,
    'unicorn/no-array-push-push': 0,
    'unicorn/no-array-reduce': [
      'error',
      {
        allowSimpleOperations: true,
      },
    ],
    'unicorn/no-await-expression-member': 0,
    'unicorn/no-console-spaces': 0,
    'unicorn/no-document-cookie': 2,
    'unicorn/no-empty-file': 2,
    'unicorn/no-for-loop': 2,
    'unicorn/no-hex-escape': 2,
    'unicorn/no-instanceof-array': 2,
    'unicorn/no-invalid-remove-event-listener': 2,
    'unicorn/no-keyword-prefix': 0,
    'unicorn/no-lonely-if': 2,
    'unicorn/no-nested-ternary': 2,
    'unicorn/no-new-array': 2,
    'unicorn/no-new-buffer': 2,
    'unicorn/no-null': 0,
    'unicorn/no-object-as-default-parameter': 2,
    'unicorn/no-process-exit': 0,
    'unicorn/no-static-only-class': 2,
    'unicorn/no-thenable': 2,
    'unicorn/no-this-assignment': 2,
    'unicorn/no-unreadable-array-destructuring': 0,
    'unicorn/no-unreadable-iife': 2,
    'unicorn/no-unsafe-regex': 2,
    'unicorn/no-unused-properties': 2,
    'unicorn/no-useless-fallback-in-spread': 2,
    'unicorn/no-useless-length-check': 2,
    'unicorn/no-useless-promise-resolve-reject': 2,
    'unicorn/no-useless-spread': 2,
    'unicorn/no-useless-switch-case': 2,
    'unicorn/no-useless-undefined': 0,
    'unicorn/no-zero-fractions': 2,
    'unicorn/number-literal-case': 2,
    'unicorn/numeric-separators-style': [
      2,
      {
        number: {
          groupLength: 3,
          minimumDigits: 0,
        },
      },
    ],
    'unicorn/prefer-add-event-listener': 0,
    'unicorn/prefer-array-find': 2,
    'unicorn/prefer-array-flat': 2,
    'unicorn/prefer-array-flat-map': 2,
    'unicorn/prefer-array-index-of': 2,
    'unicorn/prefer-array-some': 2,
    'unicorn/prefer-at': 0,
    'unicorn/prefer-code-point': 2,
    'unicorn/prefer-date-now': 2,
    'unicorn/prefer-default-parameters': 2,
    'unicorn/prefer-export-from': 2,
    'unicorn/prefer-includes': 2,
    'unicorn/prefer-json-parse-buffer': 2,
    'unicorn/prefer-math-trunc': 2,
    'unicorn/prefer-modern-math-apis': 2,
    'unicorn/prefer-native-coercion-functions': 2,
    'unicorn/prefer-negative-index': 0,
    'unicorn/prefer-number-properties': 2,
    'unicorn/prefer-object-from-entries': 2,
    'unicorn/prefer-object-has-own': 0,
    'unicorn/prefer-optional-catch-binding': 2,
    'unicorn/prefer-prototype-methods': 0,
    'unicorn/prefer-query-selector': 2,
    'unicorn/prefer-reflect-apply': 2,
    'unicorn/prefer-regexp-test': 2,
    'unicorn/prefer-set-has': 0,
    'unicorn/prefer-spread': 0,
    'unicorn/prefer-string-replace-all': 2,
    'unicorn/prefer-string-slice': 2,
    'unicorn/prefer-string-starts-ends-with': 2,
    'unicorn/prefer-string-trim-start-end': 2,
    'unicorn/prefer-switch': 0,
    'unicorn/prefer-ternary': 0,
    'unicorn/prefer-top-level-await': 0,
    'unicorn/prefer-type-error': 2,
    'unicorn/prevent-abbreviations': [
      2,
      {
        checkProperties: false,
        replacements: {
          args: false,
          pkg: false,
          props: false,
          ref: false,
          rel: false,
        },
      },
    ],
    'unicorn/relative-url-style': [2, 'never'],
    'unicorn/require-array-join-separator': 2,
    'unicorn/require-number-to-fixed-digits-argument': 2,
    'unicorn/require-post-message-target-origin': 2,
    'unicorn/string-content': 0,
    'unicorn/template-indent': 2,
    'unicorn/text-encoding-identifier-case': 2,
    'unicorn/throw-new-error': 2,
  },
}
