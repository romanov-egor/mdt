import RequestController from '../controllers/RequestController'

/**
 * Categories controller
 */
class Categories extends RequestController {
   constructor (props) {
      super(props);

      this.dispatcherObj = {
         onChoosenCategory: this.onChoosenCategory.bind(this),
         setCategoryNameForEdit: this.setCategoryNameForPopUp.bind(this),
         showPopUp: this.showPopUp.bind(this),
         clearTaskListBlock: this.clearTaskListBlock.bind(this)
      }
   }

   clearTaskListBlock () {
      this.dispatch({
         type: 'UNCHOOSE_CATEGORY'
      });
   }

   /**
    * Set category name on pop-up input
    * @param {String} categoryName
    */
   setCategoryNameForPopUp (categoryName) {
      this.dispatch({
         type: 'SET_POPUP_INPUT_TEXT',
         payload: categoryName
      });
   }

   /**
    * Show Pop-up for category editor. It must set to store the type of changes.
    * Iyt can be add new category or edit that.
    * It will be called onSaveMethod after request for saving changes
    * @param  {String} popUpType - addCategory/editCategory
    * @param  {Function} onSaveMethod
    */
   showPopUp (popUpType, onSaveMethod) {
      this.dispatch({
         type: 'SHOW_POPUP',
         payload: [popUpType, onSaveMethod]
      });
   }

   /**
    * Send event that category choosen to update tasks list
    * @param  {JSON} data
    */
   onChoosenCategory (idCategory) {
      this.getCategoryTasks(idCategory);
      this.dispatch({
         type: 'CATEGORY_CHOOSE',
         payload: idCategory
      });
   }

   /**
    * Send event that category loaded to update category list, then hide pop-up
    * @param  {JSON} data
    */
   makeCategoriesCallback (data) {
      this.dispatch({
         type: 'CATEGORY_LOADED',
         payload: data || []
      });
   }

   /**
    * Send event that category added to update category list, then hide pop-up
    * @param  {JSON} data
    */
   saveCategoriesCallback (data) {
      this.dispatch({
         type: 'CATEGORY_ADDED',
         payload: data
      });
      this.dispatch({
         type: 'HIDE_POPUP'
      });
   }

   /**
    * Send event that category was updated to update category list, then hide pop-up
    * @param  {JSON} data
    */
   editCategoriesCallback (data) {
      this.dispatch({
         type: 'CATEGORY_EDITED',
         payload: data
      });
      this.dispatch({
         type: 'HIDE_POPUP'
      });
   }

   /**
    * Send event that category deleted to update list, then hide pop-up
    * @param  {JSON} data
    */
   deleteCategoriesCallback (data) {
      this.dispatch({
         type: 'CATEGORY_DELETED',
         payload: data
      });
      this.dispatch({
         type: 'HIDE_POPUP'
      });
   }

   /**
    * Send data with tasks array to store
    * @param {Array} data - tasks array
    */
   getCategoryTasksCallback (data) {
      this.dispatch({
         type: 'ON_LOAD_TASKS_BY_CATEGORY',
         payload: data
      });
   }

   /**
    * Load all categories as soon as page loaded
    */
   makeCat () {
      this.url('http://localhost:8080/mdt/category/getAllCategories');
      this.resopnseType('GET');
      this.makeRequest().then(
         result => this.makeCategoriesCallback(result),
         error => console.log (error)
      );
   }

   /**
    * Add new Category. Make a request and send data to callback
    * @param {String} name - category name
    */
   addCategory (name) {
      this.url('http://localhost:8080/mdt/category/create');
      this.resopnseType('POST');

      this.makeRequest({
         id: '',
         title: name
      }).then(
         result=>this.saveCategoriesCallback(result),
         error => console.log (error)
      );
   }

   /**
    * Edit category name. Make a request and send data to callback
    * @param  {String} name - category name
    * @param  {Int} categoryId - category id
    */
   editCategory (name, categoryId) {
      this.url('http://localhost:8080/mdt/category/update');
      this.resopnseType('POST');

      this.makeRequest({
         id: categoryId,
         title: name
      }).then(
         result=>this.editCategoriesCallback(result),
         error => console.log (error)
      );
   }

   /**
    * Delete category. Make a request and send data to callback
    * @param  {Int} categoryId - category id
    */
   deleteCategory (categoryId) {
      this.url('http://localhost:8080/mdt/category/delete');
      this.resopnseType('POST');

      this.makeRequest({
         id: categoryId,
         title: ''
      }).then(
         result=>this.deleteCategoriesCallback(result),
         error => console.log (error)
      );
   }

   /**
    * Get All tasks by category
    * @param  {Int} categoryId
    */
   getCategoryTasks (categoryId) {
      this.url('http://localhost:8080/mdt/category/getAllTasksByCategory/' + categoryId);
      this.resopnseType('GET');

      this.makeRequest().then(
         result=>this.getCategoryTasksCallback(result),
         error => console.log (error)
      );
   }

   /**
    * set and get dispatch object
    * @param {Object} dispatch
    */
   setGetDispatch (dispatch) {
      this.dispatch = dispatch;
      return this.dispatcherObj;
   }
}

export default new Categories();
