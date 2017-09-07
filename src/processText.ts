const lex = [
  {
    token: 'NUMBER',
    pattern: /[0-9]+[^0-9]/,
  }, {
    token: 'WESTERN',
    pattern: '\\u0000-\\u007F',
  }, {
    token: 'RAW',
    pattern: /./,
  },
]

// http://tatamo.81.la/blog/2017/02/11/lr-parser-generator-implementation-02/
class Lexer {
  constructor(public def: any) {
  }

  execute(str: string) {
    let result = []
    let lastIndex = 0
    while (lastIndex < str.length) {
      for (let {token, pattern} of this.def) {
        let match = ''
        if (typeof pattern === 'string') {
          let last_tmp = lastIndex + pattern.length
          if (str.slice(lastIndex, last_tmp) !== pattern) {
            continue
          }
          if (last_tmp < str.length && /\w/.test(pattern.slice(-1)) && /\w/.test(str[last_tmp])) { // ヒットした文字の末尾が\wで、そのすぐ後ろが\wの場合はスキップ
            continue
          }
          match = pattern
          lastIndex += pattern.length
        } else if (pattern instanceof RegExp) {
          pattern.lastIndex = lastIndex
          const m = pattern.exec(str)
          if (m === null) {
            continue
          }
          match = m[0]
          lastIndex = pattern.lastIndex
        }
        if (token != null) {
          result.push({token, value: match})
        }
        break
      }
    }

    result.push({token: 'EOF', value: ''})
    return result
  }
}

const parse = (rawText: string) => {
  const westernPattern = '\\u0000-\\u007F'

  return rawText.replace(new RegExp(`[${westernPattern}]+`, 'g'), (match) => {
    return `<span class="mjk-western">${match}</span>`
  })
}

const serialize = (o:any): string => {
  // return ''
  return o
}

export default (rawText: string): string => {
  return serialize(parse(rawText))
}
