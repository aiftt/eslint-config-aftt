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
    // 强制在数组内置遍历回掉中不允许使用 this
    'unicorn/no-array-method-this-argument': 'error',
    'unicorn/no-array-push-push': 'off',
    'unicorn/no-array-reduce': [
      'error',
      {
        allowSimpleOperations: true,
      },
    ],
    // 不允许直接在 await 语句后面取值
    'unicorn/no-await-expression-member': 'error',
    'unicorn/no-console-spaces': 'off',
    // 不允许直接使用 document.cookie，请使用
    // https://developer.mozilla.org/en-US/docs/Web/API/Cookie_Store_API
    // 或 https://www.npmjs.com/search?q=cookie
    'unicorn/no-document-cookie': 'error',
    'unicorn/no-empty-file': 'error',
    'unicorn/no-for-loop': 'off',
    // 使用 Unicode 取代 16进制, '\x1B' -> '\u001B'
    'unicorn/no-hex-escape': 'error',
    // 使用 Array.isArray() 取代 arr instanceof Array
    'unicorn/no-instanceof-array': 'error',
    // removeEventListener 中不能使用无意义的或空函数回掉
    'unicorn/no-invalid-remove-event-listener': 'error',
    'unicorn/no-keyword-prefix': 'off',
    // 合并多余的条件判断
    'unicorn/no-lonely-if': 'error',
    // 在只有 if...else 的时候，让 true 条件总是在前面
    // no: if (!a)... else, ok: if(a) ... else
    // 'unicorn/no-nested-condition': 'error',
    // 允许 a ? b ? false : true : false, 不允许时必须加括号：a ? (b ? false : true) : false
    'unicorn/no-nested-ternary': 'off',
    // 不能直接使用 new Array() 创建数组，可以通过字面量或 Array.from({length})
    'unicorn/no-new-array': 'error',
    // new Buffer() 已经废弃了，请使用 Buffer.from() 和 Buffer.alloc()
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-null': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    // 不允许使用 process.exit() 只能在 /usr/bin/env node 脚本中使用
    'unicorn/no-process-exit': 'error',
    // 不允许使用只有静态属性 class，可以用对象字面量替代
    'unicorn/no-static-only-class': 'error',
    // 不允许在对象中使用 then() 函数
    'unicorn/no-thenable': 'error',
    // 强制直接使用 this，而不是保存引用，函数可以使用箭头函数然后在函数内部使用this
    'unicorn/no-this-assignment': 'error',
    // 直接和 undefined 比较就行了，没必要使用 typeof
    'unicorn/no-typeof-undefined': 'error',
    // 有时候挺方便的
    'unicorn/no-unreadable-array-destructuring': 'off',
    // 代码可读性差
    'unicorn/no-unreadable-iife': 'error',
    'unicorn/no-unsafe-regex': 'error',
    'unicorn/no-unused-properties': 'off',
    // 不需要无意义的展开符
    'unicorn/no-useless-fallback-in-spread': 'error',
    // 不需要无意义的数组长度检测
    // no: if (arr.length === 0 || arr.every(Boolean))
    // ok: if (arr.every(Boolean))
    'unicorn/no-useless-length-check': 'error',
    // 在 async 函数中不需要返回无意义的 Promise.reject() 或 Promise.resolve()
    // 因为 async 函数返回值默认会进行 Promise 化
    'unicorn/no-useless-promise-resolve-reject': 'error',
    // 无意义的展开符
    'unicorn/no-useless-spread': 'error',
    'unicorn/no-useless-switch-case': 'error',
    'unicorn/no-useless-undefined': 'off',
    // js 中没有浮点数的概念，因此没必要使用 1.0 之类的，直接使用 1 就行
    'unicorn/no-zero-fractions': 'error',
    // 在使用进制数字的时候，进制标识小写，no: 0XFF, ok: 0xFF
    'unicorn/number-literal-case': 'error',
    // 正确使用数字分隔符
    'unicorn/numeric-separators-style': [
      'error',
      {
        number: {
          groupLength: 3,
          minimumDigits: 0,
        },
      },
    ],
    'unicorn/prefer-add-event-listener': 'off',
    // 查找数组元素时候，强制使用 find, 而不是 filter(...)[0] 之类
    'unicorn/prefer-array-find': 'error',
    // 数组扁平化直接使用内置方法，什么 reduce, lodash 没必要了
    'unicorn/prefer-array-flat': 'error',
    // 能直接使用内置 flatMap 时候就不要用什么 arr.map().flat()
    'unicorn/prefer-array-flat-map': 'error',
    // 查找元素索引时候尽量使用 indexOf 或 lastIndexOf
    'unicorn/prefer-array-index-of': 'error',
    // 当检测数组中某些元素是否满足什么条件的时候直接使用 .some
    'unicorn/prefer-array-some': 'error',
    // 可能很多人都还不知道呢
    'unicorn/prefer-at': 'off',
    // '🦄'.charCodeAt(0).toString(16) -> '🦄'.codePointAt(0).toString(16)
    // String.fromCharCode(0x1f984)    -> String.fromCodePoint(0x1f984)
    'unicorn/prefer-code-point': 'error',
    // 直接使用 Date.now() 取当前时间
    'unicorn/prefer-date-now': 'error',
    // 强制使用默认参数，而不是怪异的 foo = foo || 'foo'
    'unicorn/prefer-default-parameters': 'error',
    // 强制使用功能更强的 append(dom, ...otherElements), 而不是 appendChild
    // append 不仅可以添加DOM元素，还可以添加字符串(当作 TextNode)
    'unicorn/prefer-dom-node-append': 'error',
    // 对于 dataset 属性，直接使用 dataset.propName 进行取值设值
    'unicorn/prefer-dom-node-dataset': 'error',
    // 强制使用 node.remove() 来删除该节点，而不是 node.parentNode.removeChild(node)
    'unicorn/prefer-dom-node-remove': 'error',
    // 强制使用 node.textContent 进行文本节点操作(而不是innerText)
    'unicorn/prefer-dom-node-text-content': 'error',
    // 强制使用 EventTarget 因为它即支持 node 也支持浏览器，而 EventEmitter 只能在 node 中使用
    'unicorn/prefer-event-target': 'error',
    // 在导出时，直接使用 export ... from 'file.js' 而不是做无意义的先导入再导出
    'unicorn/prefer-export-from': 'error',
    // 在检查数组是否包含哪个元素时使用 includes
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-json-parse-buffer': 'error',
    // 保证 key 和 keyCode 都能用
    'unicorn/prefer-keyboard-event-key': 'off',
    // 位运算实际项目中都很少人用，就不做限制了
    'unicorn/prefer-math-trunc': 'off',
    // 强制使用新 api 替代旧的，before(),insertBefore(),replaceWith() -> replaceChild()
    // before(), after(), append(), prepend() -> insertAdjacentText(), insertAdjacentElement()
    'unicorn/prefer-modern-dom-apis': 'error',
    'unicorn/prefer-modern-math-apis': 'error',
    'unicorn/prefer-module': 'off',
    // 直接使用 String, Number, BigInt, Boolean, and Symbol
    // no: toBool = (val) => Boolean(val), ok: Boolean(val)
    'unicorn/prefer-native-coercion-functions': 'error',
    // foo.slice(foo.length - 2, foo.length - 1); -> slice(-2, -1)
    'unicorn/prefer-negative-index': 'off',
    'unicorn/prefer-number-properties': 'error',
    // 使用 Node 内置包时加上 `node:`, 如：import fs from 'node:fs'
    'unicorn/prefer-node-protocol': 'error',
    // 强制使用 Number.parseInt, Number.isNaN
    'unicorn/prefer-number-properties': 'error',
    // 强制使用 Object.fromEntries(pairs) 或 new Map(pairs)
    'unicorn/prefer-object-from-entries': 'error',
    'unicorn/prefer-object-has-own': 'off',
    // 当 catch(error) 的参数 error 没有用到时候，直接使用新语法 try {} catch {}
    'unicorn/prefer-optional-catch-binding': 'error',
    'unicorn/prefer-prototype-methods': 'off',
    // 强制使用 querySelector, querySelectorAll 替换 getElementById, getElementsByClassName
    // getElementsByTagName, getElementsByClassName
    'unicorn/prefer-query-selector': 'error',
    'unicorn/prefer-reflect-apply': 'error',
    // 当检测正则是否匹配时使用 .test()，只有在需要更多返回值的时候使用 match(),exec()
    'unicorn/prefer-regexp-test': 'error',
    'unicorn/prefer-set-size': 'off',
    'unicorn/prefer-set-has': 'off',
    // 强制使用展开符，no: array.slice(), ok: [...array]
    'unicorn/prefer-spread': 'error',
    // 强制使用 replaceAll() 进行正则替换，而不是 `g` 标记
    'unicorn/prefer-string-replace-all': 'error',
    // 强制使用 .slice(startIndex, endIndex) 来过滤出子串
    'unicorn/prefer-string-slice': 'error',
    // 强制使用 .startsWith(), .endsWith() 来检查是不是以什么开头和结尾的，而不是用正则
    'unicorn/prefer-string-starts-ends-with': 'error',
    // 强制使用 .trimStart() 和 .trimEnd()，因为 .trimLeft(), .trimRight() 是它们的别名
    'unicorn/prefer-string-trim-start-end': 'error',
    // 超过5个 if...else if 强制使用 switch...case
    'unicorn/prefer-switch': ["error", { "minimumCases": 6 }],
    'unicorn/prefer-ternary': 'off',
    'unicorn/prefer-top-level-await': 'off',
    // 强制在检查类型的代码中抛出的错误必须时 TypeError
    'unicorn/prefer-type-error': 'error',
    // 强制不能使用缩写，更多的缩写检查请看
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/shared/abbreviations.js
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
    // new URL('./file.js') 的时候不需要 `./` 直接 new URL('file.js')
    'unicorn/relative-url-style': ['error', 'never'],
    // 强制 .join(splitter) 的时候制定连接符
    'unicorn/require-array-join-separator': 'error',
    // 强制使用 Number.toFixed() 的时候必须传精度值
    'unicorn/require-number-to-fixed-digits-argument': 'error',
    'unicorn/require-post-message-target-origin': 2,
    'unicorn/string-content': 0,
    'unicorn/template-indent': 2,
    'unicorn/text-encoding-identifier-case': 2,
    'unicorn/throw-new-error': 2,
  },
}
