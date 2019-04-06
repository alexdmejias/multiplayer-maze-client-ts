export type modalTypes = string | undefined;

export interface UiState {
  modal: modalTypes
}

export const UI_CHANAGE_MODAL = 'UI_CHANGE_MODAL';

interface UiChangeModalAction {
  type: typeof UI_CHANAGE_MODAL;
  payload: {
    modalType: modalTypes
  }
}

export type UiActionTypes = UiChangeModalAction;