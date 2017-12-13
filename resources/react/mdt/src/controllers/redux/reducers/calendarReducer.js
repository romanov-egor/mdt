const defaultState = {
   calendarDate: null,
   datesWithTasks: null
};

export default function (state = defaultState, action) {
   if (action.type === 'ON_SET_CALENDAR_DATE') {
      state.calendarDate = action.payload;
   }
   if (action.type === 'ON_LOAD_TASKS_BY_DATE') {
      state.datesWithTasks = action.payload['datesWithTasks'];
   }

   return Object.assign({}, state);
}
