import RequestController from '../controllers/RequestController'

/**
 * PopUp controller
 */
class PopUp extends RequestController {
   constructor () {
      super();

      this.dispatcherObj = {
         hidePopUp: this.hidePopUp.bind(this)
      }
   }

   hidePopUp () {
      this.dispatch({
         type: 'HIDE_POPUP'
      });
   }

   setGetDispatch (dispatch) {
      this.dispatch = dispatch;
      return this.dispatcherObj;
   }

}

export default new PopUp();
