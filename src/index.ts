// interface ChildNode {
//   replaceWith: (...nodes: Array<Node | string>) => void;
// }

const getTextNodesRecursive = (startNode: Node): Array<Node> => {
  const treeWalker = document.createTreeWalker(startNode, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (treeWalker.nextNode()) {
    nodes.push(treeWalker.currentNode)
  }
  return nodes
}

const createDocumentFragmentFromRawHtml = (rawHtml: string): DocumentFragment => {
  const docFrag = document.createDocumentFragment()
  const parser = document.createElement('div')
  parser.innerHTML = rawHtml
  while (parser.hasChildNodes()) {
    docFrag.appendChild(parser.firstChild)
  }
  return docFrag
}

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
        break
      }
    }

    result.push({token: 'EOF', value: ''})
    return result
  }
}

const parse = (rawText: string) => {
  const westernPattern = ''

  return rawText.replace(new RegExp(`[${westernPattern}]+`, 'g'), (match) => {
    return `<span class="mjk-western">${match}</span>`
  })
}

const serialize = (o:any): string => {
  // return ''
  return o
}

export const compose = (el: HTMLElement) => {
  // const baseNode = el.cloneNode(true)

  getTextNodesRecursive(el).forEach((textNode) => {
    const rawHtml = serialize(parse(textNode.nodeValue))
    const docFrag = createDocumentFragmentFromRawHtml(rawHtml)
    textNode.replaceWith(docFrag)
  })
}
