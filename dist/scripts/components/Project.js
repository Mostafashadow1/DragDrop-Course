var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoBind } from "../decorators/autoBind.js";
import { projectState } from "../store/ProjectState.js";
import { Base } from "./Base.js";
export class Project extends Base {
    constructor(projectsListId, project) {
        super("project-item", projectsListId, project.id, false);
        this._project = project;
        this._renderProject();
        this._deleteProject();
        this._runDragging();
    }
    _renderProject() {
        const title = this.element.querySelector(".project_title");
        const desc = this.element.querySelector(".project_desc");
        title.textContent = this._project.title;
        desc.textContent = this._project.desc;
    }
    _deleteProject() {
        const deleteButton = this.element.querySelector(".delete");
        deleteButton.addEventListener("click", this._handleDeleteProject);
    }
    _handleDeleteProject() {
        if (confirm("Are you sure you want to delete this project?")) {
            projectState.deleteProject(this._project.id);
        }
        return;
    }
    _runDragging() {
        this.element.addEventListener("dragstart", this._handleDragStart);
        this.element.addEventListener("dragend", this._handleDragEnd);
    }
    _handleDragStart(e) {
        this.element.style.opacity = ".6";
        e.dataTransfer.setData("text/plain", this._project.id);
        e.dataTransfer.effectAllowed = "move";
    }
    _handleDragEnd() {
        this.element.style.opacity = "1";
    }
}
__decorate([
    autoBind
], Project.prototype, "_handleDeleteProject", null);
__decorate([
    autoBind
], Project.prototype, "_handleDragStart", null);
__decorate([
    autoBind
], Project.prototype, "_handleDragEnd", null);
//# sourceMappingURL=Project.js.map