import produce from 'immer';
import {
  UI_CHANAGE_MODAL,
  UiActionTypes,
  UiState
} from './types'

const initialState: UiState = {
  modal: undefined
}

export default function(state = initialState, action: UiActionTypes) {
  switch(action.type) {
    case UI_CHANAGE_MODAL:
      return produce(state, draft => {
        draft.modal = action.payload.modalType;
      });

    default:
      return state;
  }
}