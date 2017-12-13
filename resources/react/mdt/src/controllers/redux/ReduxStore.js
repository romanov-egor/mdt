import { createStore, combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

/*
 * Reducers
 */
import categoryReducer from './reducers/categoryReducer'
import taskReducer from './reducers/taskReducer'
import calendarReducer from './reducers/calendarReducer'
import popUpReducer from './reducers/popUpReducer'

class Store {
   constructor () {
      this.store = createStore(
         combineReducers({
            categoryReducer: categoryReducer,
            taskReducer: taskReducer,
            calendarReducer: calendarReducer,
            popUpReducer: popUpReducer
         }),
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
   }
}

const reduxStore = new Store();
export default reduxStore.store;
