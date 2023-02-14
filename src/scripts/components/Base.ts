export class Base<T extends HTMLElement> {
  private _template!: HTMLTemplateElement;
  private _hostElement!: HTMLDivElement;
  public element: T;
  constructor(
    private _templateId: string,
    private _hostId: string,
    private _elementId: string,
    private _postionElementStart: boolean
  ) {
    const [template , _ ]= this._targetElements(this._templateId , this._hostId)
    // import template content
    const templateContent = document.importNode(template.content, true);
    // assign Element to render
    this.element = templateContent.firstElementChild! as T;
    if (this._elementId) {
      this.element.id = this._elementId;
      this._insertElement(this._postionElementStart);
    }
  }
  /**
   * @desc target elements : template , host
   * @param1 templateId : string
   * @param2 hostId : string
   * @returns template : HTMLTemplateElement, host : HTMLDivElement
   */
  private _targetElements(
    templateId: string,
    hostId: string
  ): [HTMLTemplateElement, HTMLDivElement] {
    this._template = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this._hostElement = document.getElementById(hostId)! as HTMLDivElement;
    return [this._template, this._hostElement];
  }
  /**
   * @desc insert element in postion start or end
   * @param postionStart : boolean
   * */
  private _insertElement(postionStart: boolean) {
    const isInsertStart = postionStart ? "afterbegin" : "beforeend";
    this._hostElement.insertAdjacentElement(isInsertStart, this.element);
  }
}
