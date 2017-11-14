import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { connect } from 'react-redux'

import Category from './components/Category'
import Tasks from './components/Tasks'
import Calendar from './components/Calendar'
import PopUp from './components/PopUp'

import CategoriesController from './controllers/CategoriesController'

class App extends Component {

   hidePopUp () {
      this.props.hidePopUp();
   }

   render() {
      const stateStore = this.props.stateStore.categoryReducer;
      return (
         <div>
            <section className="main-block">
               <Category />

               <Tasks type="category" />
               <Tasks type="time" />

               <Calendar />
            </section>
            {
               stateStore.showPopUp &&
               <PopUp />
            }
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (CategoriesController.setGetDispatch(dispatch))
)(App);
