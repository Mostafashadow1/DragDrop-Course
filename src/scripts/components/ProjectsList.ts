import { autoBind } from "../decorators/autoBind.js";
import { ProjectRules } from "../store/ProjectRules.js";
import { projectState } from "../store/ProjectState.js";
import { projectStatus } from "../utils/projectStatus.js";
import { Base } from "./Base.js";
import { Project } from "./Project.js";
export class ProjectsList extends Base<HTMLDivElement> {
  constructor(private _status: "Intial" | "Active" | "Finished") {
    super("project-list", "app", `${_status}-projects`, false);
    this.renderProjectList();
    // * when refresh page get all projects from localStorage and show in the dom
    if (JSON.parse(localStorage.getItem("projects")!)) {
      const localStorageProjects = JSON.parse(
        localStorage.getItem("projects")!
      );
      this._showProjectInDom(localStorageProjects);
    }
    projectState.pushListner((projects: ProjectRules[]) => {
      this._showProjectInDom(projects);
    });

    this._runDragging();
  }
  /**
   * @desc render projects list specific own  status
   */
  private renderProjectList(): void {
    const title = this.element.querySelector(".title")! as HTMLHeadingElement;
    const list = this.element.querySelector(
      ".projects-list"
    )! as HTMLDivElement;
    list.id = `${this._status}-list`;
    title.textContent = `${this._status} Projects`;
  }

  /**
   * @desc show all projects in dom after filtering
   * @param projects: ProjectRules
   */
  private _showProjectInDom(projects: ProjectRules[]) {
    const filterProjects = this._filterProjectsStatus(projects);
    this._renderProjects(filterProjects);
  }
  /**
   * @desc render all projects in project list
   */
  private _renderProjects(projects: ProjectRules[]): void {
    const projectsList = document.getElementById(
      `${this._status}-list`
    ) as HTMLDivElement;
    projectsList.innerHTML = "";
    for (const project of projects) {
      new Project(`${this._status}-list`, project);
    }
  }
  /**
   * @desc take project from state and filter that specific project Status add them in projects array to render
   * @param projects : ProjectRules[]
   * @return project after filter
   */
  private _filterProjectsStatus(projects: ProjectRules[]) {
    const filterProjects = projects.filter((project: ProjectRules) => {
      if (this._status === "Intial") {
        return project.status === projectStatus.Inital;
      } else if (this._status === "Active") {
        return project.status === projectStatus.Active;
      } else if (this._status === "Finished") {
        return project.status === projectStatus.Finished;
      }
    });
    return filterProjects;
  }

  /**
   * @desc run dragging on the projects list : dragOver , drop
   */
  private _runDragging(): void {
    this.element.addEventListener("dragover", this._handleDragOver);
    this.element.addEventListener("drop", this._handleDrop);
  }

  /**
   * @desc  prevent default behavior beacuase i want to drop project
   */
  @autoBind
  private _handleDragOver(e: DragEvent): void {
    e.preventDefault();
  }
  @autoBind
  private _handleDrop(e: DragEvent): void {
    const projectId = e.dataTransfer!.getData("text/plain");
    const newStatus =
      (this.element.id === "Intial-projects" && projectStatus.Inital) ||
      (this.element.id === "Active-projects" && projectStatus.Active) ||
      (this.element.id === "Finished-projects" && projectStatus.Finished);
  

    projectState.changeProjectStatus(projectId, newStatus);
  }
}
