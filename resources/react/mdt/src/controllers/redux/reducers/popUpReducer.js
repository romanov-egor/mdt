const defaultState = {
   showPopUp: false,
   popUpType: null,
   popUpInputText: null,
   popUpSelectValue: null,
   onSaveMethod: null
};

export default function (state = defaultState, action) {
   if (action.type === 'SHOW_POPUP') {
      state.showPopUp = true;
      state.popUpType = action.payload[0];
      state.onSaveMethod = action.payload[1] || null;
   }
   if (action.type === 'HIDE_POPUP') {
      state.showPopUp = false;
      state.popUpInputText = null;
      state.popUpSelectValue = null;
   }
   if (action.type === 'SET_POPUP_INPUT_TEXT') {
      state.popUpInputText = action.payload;
   }
   if (action.type === 'SET_POPUP_SELECT_VALUE') {
      state.popUpSelectValue = action.payload;
   }

   return Object.assign({}, state);
}
