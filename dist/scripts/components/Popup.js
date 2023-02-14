import { Base } from "./Base.js";
export class Popup extends Base {
    constructor() {
        super("popup_template", "app", "popup_container", false);
        this._closePopup();
    }
    _closePopup() {
        const closeButton = this.element.querySelector(".close");
        closeButton.addEventListener("click", () => {
            this.element.classList.remove("visible_popup");
        });
    }
}
//# sourceMappingURL=Popup.js.map