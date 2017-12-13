const defaultState = {
   showPopUp: false,
   popUpType: null,
   popUpInputText: null,
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
   }
   if (action.type === 'SET_POPUP_INPUT_TEXT') {
      state.popUpInputText = action.payload;
   }

   return Object.assign({}, state);
}
