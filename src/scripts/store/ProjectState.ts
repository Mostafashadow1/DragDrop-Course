import { projectStatus } from "../utils/projectStatus.js";
import { ListnerType } from "./ListnerType.js";
import { ProjectRules } from "./ProjectRules.js";

class ProjectState {
  private static _instance: ProjectState;
  private _listners: ListnerType[] = [];
  private _projects: ProjectRules[] = [];
  private _localStorageProjects: ProjectRules[] = localStorage.getItem(
    "projects"
  )
    ? JSON.parse(localStorage.getItem("projects")!)
    : [];
  constructor() {
    // * when refresh page send localStorage Projects to projects state
    this._projects = this._localStorageProjects;
  }
  /**
   * @desc create singleton instance
   *
   */
  public static getInstance() {
    if (!this._instance) {
      this._instance = new ProjectState();
      return new ProjectState();
    }
    return this._instance;
  }
  /**
   * @desc create new  project
   * @param1 projectTitle : string
   * @param2 projectDesc : string
   */
  public createProject(title: string, desc: string): void {
    const newProject = new ProjectRules(
      Math.random().toString(),
      title,
      desc,
      projectStatus.Inital
    );
    this._projects.push(newProject);
    this._runListners();
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }
  /**
   @desc delete project from state and local storage into project id
   @param projectId : string
  * */
  public deleteProject(projectId: string): void {
    const projectsAfterDelete = this._projects.filter(
      (project: ProjectRules) => {
        return project.id !== projectId;
      }
    );
    this._projects = projectsAfterDelete;
    this._runListners();
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }

  public changeProjectStatus(
    projectId: string,
    newStatus: projectStatus | false
  ): void {
    const project = this._projects.find((p) => p.id === projectId);
    if (project && project.status !== newStatus) {
      project!.status = newStatus ? newStatus : project!.status;
      this._runListners();
      localStorage.setItem("projects", JSON.stringify(this._projects)); // * add all projects in local storage
    }
  }
  /**
   * @des pushhing listners in array
   * @param listner : function
   */
  public pushListner(listner: ListnerType) {
    this._listners.push(listner);
  }
  /**
   * @desc Run all lisners function and pass projects into them
   */
  private _runListners(): void {
    for (const listner of this._listners) {
      listner([...this._projects]);
    }
  }
}

export const projectState = ProjectState.getInstance();
