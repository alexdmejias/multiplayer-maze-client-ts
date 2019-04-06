import { UI_CHANAGE_MODAL, modalTypes } from "./types";

export function changeModal(modalType?: modalTypes) {
  return {
    type: UI_CHANAGE_MODAL,
    payload: {
      modalType
    }
  }
}
