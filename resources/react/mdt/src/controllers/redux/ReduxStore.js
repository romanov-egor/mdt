import { createStore, combineReducers } from 'redux'
//import { routerReducer } from 'react-router-redux'

/*
 * Reducers
 */
import categoryReducer from './reducers/categoryReducer'

class Store {
   constructor () {
      this.store = createStore(
         combineReducers({
            categoryReducer: categoryReducer
         }),
         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
   }
}

const reduxStore = new Store();
export default reduxStore.store;
