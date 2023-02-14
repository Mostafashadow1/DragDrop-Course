var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoBind } from "../decorators/autoBind.js";
import { projectState } from "../store/ProjectState.js";
import { projectStatus } from "../utils/projectStatus.js";
import { Base } from "./Base.js";
import { Project } from "./Project.js";
export class ProjectsList extends Base {
    constructor(_status) {
        super("project-list", "app", `${_status}-projects`, false);
        this._status = _status;
        this.renderProjectList();
        if (JSON.parse(localStorage.getItem("projects"))) {
            const localStorageProjects = JSON.parse(localStorage.getItem("projects"));
            this._showProjectInDom(localStorageProjects);
        }
        projectState.pushListner((projects) => {
            this._showProjectInDom(projects);
        });
        this._runDragging();
    }
    renderProjectList() {
        const title = this.element.querySelector(".title");
        const list = this.element.querySelector(".projects-list");
        list.id = `${this._status}-list`;
        title.textContent = `${this._status} Projects`;
    }
    _showProjectInDom(projects) {
        const filterProjects = this._filterProjectsStatus(projects);
        this._renderProjects(filterProjects);
    }
    _renderProjects(projects) {
        const projectsList = document.getElementById(`${this._status}-list`);
        projectsList.innerHTML = "";
        for (const project of projects) {
            new Project(`${this._status}-list`, project);
        }
    }
    _filterProjectsStatus(projects) {
        const filterProjects = projects.filter((project) => {
            if (this._status === "Intial") {
                return project.status === projectStatus.Inital;
            }
            else if (this._status === "Active") {
                return project.status === projectStatus.Active;
            }
            else if (this._status === "Finished") {
                return project.status === projectStatus.Finished;
            }
        });
        return filterProjects;
    }
    _runDragging() {
        this.element.addEventListener("dragover", this._handleDragOver);
        this.element.addEventListener("drop", this._handleDrop);
    }
    _handleDragOver(e) {
        e.preventDefault();
    }
    _handleDrop(e) {
        const projectId = e.dataTransfer.getData("text/plain");
        const newStatus = (this.element.id === "Intial-projects" && projectStatus.Inital) ||
            (this.element.id === "Active-projects" && projectStatus.Active) ||
            (this.element.id === "Finished-projects" && projectStatus.Finished);
        projectState.changeProjectStatus(projectId, newStatus);
    }
}
__decorate([
    autoBind
], ProjectsList.prototype, "_handleDragOver", null);
__decorate([
    autoBind
], ProjectsList.prototype, "_handleDrop", null);
//# sourceMappingURL=ProjectsList.js.map