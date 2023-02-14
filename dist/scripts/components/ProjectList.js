export class ProjectsList {
    constructor() {
        this._template = document.getElementById("fields");
        this._hostElement = document.getElementById("app");
        const templateContent = document.importNode(this._template.content, true);
        this._form = templateContent.firstElementChild;
        this._hostElement.insertAdjacentElement("afterbegin", this._form);
    }
}
//# sourceMappingURL=ProjectList.js.map