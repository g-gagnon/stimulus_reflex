import { extractElementAttributes, extractElementDataset } from './attributes'
import { getReflexRoots } from './reflexes'
import { uuidv4 } from './utils'
import { elementToXPath } from './utils'
import Schema from './schema'

export default class ReflexData {
  constructor (
    options,
    reflexElement,
    controllerElement,
    reflexController,
    permanentAttributeName,
    target,
    args,
    url,
    tabId
  ) {
    this.options = options
    this.reflexElement = reflexElement
    this.controllerElement = controllerElement
    this.reflexController = reflexController
    this.permanentAttributeName = permanentAttributeName
    this.target = target
    this.args = args
    this.url = url
    this.tabId = tabId
  }

  get attrs () {
    this._attrs =
      this._attrs ||
      this.options['attrs'] ||
      extractElementAttributes(this.reflexElement)

    return this._attrs
  }

  get reflexId () {
    this._reflexId = this._reflexId || this.options['reflexId'] || uuidv4()
    return this._reflexId
  }

  get selectors () {
    this._selectors =
      this._selectors ||
      this.options['selectors'] ||
      getReflexRoots(this.reflexElement)

    return typeof this._selectors === 'string'
      ? [this._selectors]
      : this._selectors
  }

  get resolveLate () {
    return this.options['resolveLate'] || false
  }

  get dataset () {
    this._dataset = this._dataset || extractElementDataset(this.reflexElement)
    return this._dataset
  }

  get innerHTML () {
    return this.includeInnerHtml ? this.reflexElement.innerHTML : ''
  }

  get textContent () {
    return this.includeTextContent ? this.reflexElement.textContent : ''
  }

  get xpathController () {
    return elementToXPath(this.controllerElement)
  }

  get xpathElement () {
    return elementToXPath(this.reflexElement)
  }

  get formSelector () {
    const attr = this.reflexElement.attributes[Schema.reflexFormSelector]
      ? this.reflexElement.attributes[Schema.reflexFormSelector].value
      : undefined
    return this.options['formSelector'] || attr
  }

  get includeInnerHtml () {
    const attr =
      this.reflexElement.attributes[Schema.reflexIncludeInnerHtml] || false
    return this.options['includeInnerHTML'] || attr
      ? attr.value !== 'false'
      : false
  }

  get includeTextContent () {
    const attr =
      this.reflexElement.attributes[Schema.reflexIncludeTextContent] || false
    return this.options['includeTextContent'] || attr
      ? attr.value !== 'false'
      : false
  }

  valueOf () {
    return {
      attrs: this.attrs,
      dataset: this.dataset,
      selectors: this.selectors,
      reflexId: this.reflexId,
      resolveLate: this.resolveLate,
      xpathController: this.xpathController,
      xpathElement: this.xpathElement,
      inner_html: this.innerHTML,
      text_content: this.textContent,
      formSelector: this.formSelector,
      reflexController: this.reflexController,
      permanentAttributeName: this.permanentAttributeName,
      target: this.target,
      args: this.args,
      url: this.url,
      tabId: this.tabId
    }
  }
}
