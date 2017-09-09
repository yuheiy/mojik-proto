import processText from './processText'

// interface ChildNode {
//   replaceWith: (...nodes: Array<Node | string>) => void;
// }

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
  while (parser.hasChildNodes()) {
    docFrag.appendChild(parser.firstChild)
  }
  return docFrag
}

export const compose = (el: HTMLElement) => {
  // const baseNode = el.cloneNode(true)

  getTextNodesRecursive(el).forEach((textNode) => {
    const rawHtml = processText(textNode.nodeValue)
    const docFrag = createDocumentFragmentFromRawHtml(rawHtml)
    textNode.replaceWith(docFrag)
  })

  // todo: detect line head
  // todo: monitor resize and update line head
  // todo: destroy mojik when element is deleted
  // todo: add destroy API for library user
}
