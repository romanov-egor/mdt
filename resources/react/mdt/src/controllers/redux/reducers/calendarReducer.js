const defaultState = {
   calendarDate: null,
   datesWithTasks: null,
   loadCalendarTasks: false
};

export default function (state = defaultState, action) {
   if (action.type === 'ON_SET_CALENDAR_DATE') {
      state.calendarDate = action.payload;
   }
   if (action.type === 'LOAD_CALENDAR_TASKS') {
      state.loadCalendarTasks = true;
   }
   if (action.type === 'ON_LOAD_TASKS_BY_DATE') {
      state.loadCalendarTasks = false;
   }
   if (action.type === 'ON_LOAD_CALENDAR_DAYS_WITH_TASKS') {
      state.datesWithTasks = action.payload;
   }

   return Object.assign({}, state);
}
