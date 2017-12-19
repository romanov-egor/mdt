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
      this.url('http://localhost:8080/mdt/category/getAllTasksByDate/' + date);
      this.resopnseType('GET');

      this.makeRequest(date).then(
         result=>this.getCalendarTasksCallback(result, date),
         error => console.log (error)
      );
   }

   /**
    * Get tasks by date controller
    * now we parse result to get dates with tasks, then get tasks
    */
   getCalendarTasksCallback (result, date) {
      this.dispatch({
         type: 'ON_LOAD_TASKS_BY_DATE',
         payload: result
      });
   }

   setGetDispatch (dispatch) {
      this.dispatch = dispatch;
      return this.dispatcherObj;
   }

}

export default new CalendarController();
