const Element = (props) => {

  const newElement = document.createElement(props?.elementType)

  props?.classList && newElement.classList.add(...props.classList)
  props?.text && (newElement.textContent = props.text)
  props?.children && newElement.append(...props.children)
  props?.src && (newElement.src = props.src)
  props?.onClick && (newElement.addEventListener('click', props.onClick))
  props?.href && newElement.setAttribute('href', props.href) 
  props?.id && newElement.setAttribute('id', props.id) 

  return newElement

}

module.exports = Element