// eslint-disable-next-line valid-jsdoc
/**
 * refer to: https://github.com/ipcjs/bilibili-helper
 */

function createElement(type, props, children) {
  let elem = null;
  if (type === 'text') {
    return document.createTextNode(props);
  } else {
    elem = document.createElement(type);
  }
  for (const n in props) {
    if (n === 'style') {
      // eslint-disable-next-line guard-for-in
      for (const x in props.style) {
        elem.style[x] = props.style[x];
      }
    } else if (n === 'className') {
      elem.className = props[n];
    } else if (n === 'event') {
      // eslint-disable-next-line guard-for-in
      for (const x in props.event) {
        elem.addEventListener(x, props.event[x]);
      }
    } else {
      props[n] !== undefined && elem.setAttribute(n, props[n]);
    }
  }
  if (children) {
    if (typeof children === 'string') {
      elem.innerHTML = children;
    } else {
      for (let i = 0; i < children.length; i++) {
        if (children[i] != null) {
          elem.appendChild(children[i]);
        }
      }
    }
  }
  return elem;
}

export {createElement};
