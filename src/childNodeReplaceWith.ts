// https://github.com/seznam/JAK/blob/master/lib/polyfills/childNode.js
var buildDOM = function() {
  var nodes = Array.prototype.slice.call(arguments),
    frag = document.createDocumentFragment(),
    div, node;

  while (node = nodes.shift()) {
    if (typeof node == "string") {
      div = document.createElement("div");
      div.innerHTML = node;
      while (div.firstChild) {
        frag.appendChild(div.firstChild);
      }
    } else {
      frag.appendChild(node);
    }
  }

  return frag;
};

var replaceWith = function() {
  if (this.parentNode) {
    var frag = buildDOM.apply(this, arguments);
    this.parentNode.replaceChild(frag, this);
  }
};

const arrayFind = <T>(arr: Array<T>, predicate: (item: T, idx: number, arr: Array<T>) => boolean): T => {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i], i, arr)) {
      return arr[i]
    }
  }
};

const ponyfill = (childNode: Element | DocumentType | CharacterData, ...nodes: Array<Node | string>) => {
  const childNodeInterface = arrayFind([Element, DocumentType, CharacterData], (interfaceImpl) => childNode instanceof interfaceImpl)

  if (typeof (childNodeInterface as any).prototype.replaceWith === 'function') {
    return (childNode as any).replaceWith(...nodes);
  }

  return replaceWith.apply(childNode, nodes);
};

export default ponyfill
