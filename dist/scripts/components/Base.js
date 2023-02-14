export class Base {
    constructor(_templateId, _hostId, _elementId, _postionElementStart) {
        this._templateId = _templateId;
        this._hostId = _hostId;
        this._elementId = _elementId;
        this._postionElementStart = _postionElementStart;
        const [template, _] = this._targetElements(this._templateId, this._hostId);
        const templateContent = document.importNode(template.content, true);
        this.element = templateContent.firstElementChild;
        if (this._elementId) {
            this.element.id = this._elementId;
            this._insertElement(this._postionElementStart);
        }
    }
    _targetElements(templateId, hostId) {
        this._template = document.getElementById(templateId);
        this._hostElement = document.getElementById(hostId);
        return [this._template, this._hostElement];
    }
    _insertElement(postionStart) {
        const isInsertStart = postionStart ? "afterbegin" : "beforeend";
        this._hostElement.insertAdjacentElement(isInsertStart, this.element);
    }
}
//# sourceMappingURL=Base.js.map