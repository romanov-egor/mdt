const defaultState = {
   showPopUp: false,
   choosenCategory: undefined,
   deletedTasks: [],
   doneTasks: [],
   choosenTaskForEdit: undefined,
   newText: '',
   choosenDay: undefined
};

export default function (state = defaultState, action) {
   if (action.type === 'CATEGORY_CHOOSE') {
      state.choosenCategory = action.payload;
   }
   if (action.type === 'DAY_CHOOSE') {
      state.choosenDay = action.payload;
   }
   if (action.type === 'TASK_DELTED') {
      state.deletedTasks.push(action.payload);
   }
   if (action.type === 'SHOW_POPUP') {
      state.showPopUp = true;
   }
   if (action.type === 'HIDE_POPUP') {
      state.showPopUp = false;
      state.newText = '';
   }
   if (action.type === 'CHOOSEN_TASK_FOR_EDIT') {
      state.showPopUp = true;
      state.choosenTaskForEdit = action.payload;
   }
   if (action.type === 'TASK_CHANGED_TEXT') {
      state.newText = action.payload;
   }
   if (action.type === 'TASK_DONE') {
      if (state.doneTasks.includes(action.payload)) {
         state.doneTasks = state.doneTasks.filter(function (item, id) {
            return item !== action.payload;
         });
      } else {
         state.doneTasks.push(action.payload);
      }
   }

   return Object.assign({}, state);
}
