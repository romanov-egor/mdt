const defaultState = {
   deletedTasks: [],
   doneTasks: [],
   choosenTaskForEdit: undefined,
   categoryTasks: null,
   calendarTasks: null,
   dragElement: null
};

export default function (state = defaultState, action) {
   if (action.type === 'TASK_CHANGED') {
      state.categoryTasks && state.categoryTasks.forEach((task, id) =>{
         if (task['id'] === action.payload['id']) {
            for (var key in task) {
               task[key] = action.payload[key];
            }
         }
      });
      state.calendarTasks && state.calendarTasks.forEach((task, id) =>{
         if (task['id'] === action.payload['id']) {
            for (var key in task) {
               task[key] = action.payload[key];
            }
         }
      });
   }
   if (action.type === 'TASK_DELTED') {
      state.deletedTasks.push(action.payload);
   }
   if (action.type === 'TASK_ADDED') {
      state.categoryTasks.push(action.payload);
   }
   if (action.type === 'CHOOSEN_TASK_FOR_EDIT') {
      state.showPopUp = true;
      state.choosenTaskForEdit = action.payload;
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
   if (action.type === 'ON_LOAD_TASKS_BY_CATEGORY') {
      state.categoryTasks = action.payload;
      state.tasksCalendarChanged = false;
   }
   if (action.type === 'ON_LOAD_TASKS_BY_DATE') {
      state.calendarTasks = action.payload;
      state.tasksCategoryChanged = false;
   }
   if (action.type === 'TASK_DELETED') {
      state.categoryTasks = state.categoryTasks.filter((oneTask) => {
         return oneTask['id'] !== action.payload['id'];
      });
   }
   if (action.type === 'UNCHOOSE_CATEGORY') {
      state.categoryTasks = null;
   }
   if (action.type === 'DRAG_TASK') {
      state.dragElement = action.payload;
   }

   return Object.assign({}, state);
}
