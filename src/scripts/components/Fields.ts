import { autoBind } from "../decorators/autoBind.js";
import { projectState } from "../store/ProjectState.js";
import {
  assignValidateInputs,
  handleValidationErrors,
} from "../utils/validation/validation_helpers.js";
import { Base } from "./Base.js";
export class Fields extends Base<HTMLFormElement> {
  constructor() {
    super("fields", "app", "form", true);
    this._addProject();
  }
  private _addProject(): void {
    this.element.addEventListener("submit", this._handleAddProject);
  }
  /**
   * @desc handle add projects
   */
  @autoBind
  private _handleAddProject(e: Event): void {
    e.preventDefault();
    const [titleInput, descInput] = this._targetInputs();
    const [titleValue, descValue] = this._getInputsValues(
      titleInput,
      descInput
    );
    if (this._validateInputsValues(titleValue, descValue)) {
      projectState.createProject(titleValue, descValue);
      this._clearInputsValues(titleInput, descInput);
    }
  }

  /**
   * @desc get project inputs
   * @returns inputs [title , desc] : HTMLInputsElement[]
   */
  private _targetInputs(): HTMLInputElement[] {
    const titleInput = document.getElementById("title")! as HTMLInputElement;
    const descInput = document.getElementById("desc")! as HTMLInputElement;
    return [titleInput, descInput];
  }
  /**
   * @desc get  inputs values
   * @param1 titleInput : HTMLInputElement
   * @param2 descInput : HTMLInputElement
   * @returns values [title , desc] : string[]
   */
  private _getInputsValues(
    titleInput: HTMLInputElement,
    descInput: HTMLInputElement
  ): string[] {
    const titleValue = titleInput.value;
    const descValue = descInput.value;
    return [titleValue, descValue];
  }
  /**
   * @desc make validation
   * @param1 titleValue :string
   * @param2 descValue :string
   * @returns true ? inputs is valid : inputs not valid show error message
   */
  private _validateInputsValues(titleValue: string, descValue: string) {
    const [titleInputRule, descInputRule] = assignValidateInputs(
      titleValue,
      descValue
    );
    const titleErrorMsg = handleValidationErrors(titleInputRule);
    const descErrorMsg = handleValidationErrors(descInputRule);
    // target poup
    const popupContainer = document.getElementById(
      "popup_container"
    )! as HTMLDivElement;
    const descPopup = document.querySelector(
      ".desc_popup"
    )! as HTMLParagraphElement;
    if (titleErrorMsg.length) {
      popupContainer.classList.add("visible_popup");
      descPopup.textContent = titleErrorMsg;
      return false;
    } else if (descErrorMsg.length) {
      popupContainer.classList.add("visible_popup");
      descPopup.textContent = descErrorMsg;
      return false;
    }
    return true;
  }

  /**
   * @desc clear inputs values
   * @param1 title input : HTMLInputElement
   * @param2 descraption input : HTMLInputElement
   */
  private _clearInputsValues(
    titleInput: HTMLInputElement,
    descInput: HTMLInputElement
  ): void {
    titleInput.value = "";
    descInput.value = "";
  }
}
