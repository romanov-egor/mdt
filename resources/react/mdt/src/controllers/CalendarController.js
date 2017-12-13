import RequestController from '../controllers/RequestController'

/**
 * Calendar controller
 */
class CalendarController extends RequestController {
   constructor () {
      super();

      this.dispatcherObj = {
         getTasksByDate: this.getTasksByDate.bind(this),
         setCalendarDateInStore: this.saveCalendarDateInStore.bind(this)
      }
   }

   /**
    * Sase date in store
    */
   saveCalendarDateInStore (date) {
      this.dispatch({
         type: 'ON_SET_CALENDAR_DATE',
         payload: date
      });
   }

   /**
    * Send request to get tasks by date
    * @param  {DateTime} date
    */
   getTasksByDate (date) {
      // here now we get all task with shedule, but this is wrong
      this.url('http://localhost:8080/mdt/category/getAllTasksByDate');
      this.resopnseType('GET');

      this.makeRequest().then(
         result=>this.getCalendarTasksCallback(result, date),
         error => console.log (error)
      );
   }

   /**
    * Get tasks by date controller
    * now we parse result to get dates with tasks, then get tasks
    */
   getCalendarTasksCallback (result, date) {
      let datesWithTasks = [];
      let currentTasks = [];
      let curDate = date.getDate();
      let curMonth = date.getMonth();
      let curYear = date.getFullYear();
      let tempDateArray;
      let tempDate;

      result.forEach((item, key)=> {
         tempDateArray = item['date'].split('.');
         tempDate = new Date(+tempDateArray[2], +tempDateArray[0]-1, +tempDateArray[1]);
         datesWithTasks.push(tempDate);

         if ((+tempDateArray[0]) === curDate && (+tempDateArray[1]-1) === curMonth && (+tempDateArray[2]) === curYear) {
            item['tasks'].forEach((task)=> {
               currentTasks.push(task);
            });
         }
      });

      this.dispatch({
         type: 'ON_LOAD_TASKS_BY_DATE',
         payload: {
            currentTasks: currentTasks,
            datesWithTasks: datesWithTasks
         }
      });
   }

   setGetDispatch (dispatch) {
      this.dispatch = dispatch;
      return this.dispatcherObj;
   }

}

export default new CalendarController();
