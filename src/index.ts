import childNodeReplaceWith from './childNodeReplaceWith'
import processText from './processText'

const getTextNodesRecursive = (startNode: Node): Array<Text> => {
  const treeWalker = document.createTreeWalker(startNode, NodeFilter.SHOW_TEXT)
  const textNodes = []
  while (treeWalker.nextNode()) {
    textNodes.push(treeWalker.currentNode as Text)
  }
  return textNodes
}

const createDocumentFragmentFromRawHtml = (rawHtml: string): DocumentFragment => {
  const docFrag = document.createDocumentFragment()
  const parser = document.createElement('div')
  parser.innerHTML = rawHtml
  while (parser.firstChild) {
    docFrag.appendChild(parser.firstChild)
  }
  return docFrag
}

export const compose = (el: HTMLElement) => {
  // const baseNode = el.cloneNode(true)

  // sketch
  // const textNodes = getTextNodesRecursive(el)
  // const textValues = textNodes.map(({nodeValue}) => nodeValue)
  // const htmlSlices = new SomeParser(textValues).parse()
  // textNodes.forEach((textNode, idx) => {
  //   const rawHtml = htmlSlices[idx]
  //   const docFrag = createDocumentFragmentFromRawHtml(rawHtml)
  //   childNodeReplaceWith(textNode, docFrag)
  // })

  // it works
  getTextNodesRecursive(el).forEach((textNode) => {
    const rawHtml = processText(textNode.nodeValue)
    const docFrag = createDocumentFragmentFromRawHtml(rawHtml)
    childNodeReplaceWith(textNode, docFrag)
  })
  // todo: detect paragraph head

  // todo: detect line head and line end
  // todo: monitor resize and update line head and line end
  // todo: destroy mojik when element is deleted
  // todo: add destroy API for library user
}
