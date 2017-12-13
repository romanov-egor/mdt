import React, { Component } from 'react'
//import logo from './logo.svg'
import './App.css'

import PopUp from './components/PopUp'

import { connect } from 'react-redux'

import Category from './components/Category'
import Tasks from './components/Tasks'
import Calendar from './components/Calendar'

class App extends Component {

   hidePopUp () {
      this.props.hidePopUp();
   }

   render() {
      const stateStore = this.props.stateStore.popUpReducer;
      const taskReducer = this.props.stateStore.taskReducer;
      return (
         <div>
            <section className="main-block">
               <Category />

               <Tasks type="category" />
               <Tasks type="calendar" />

               <Calendar />
            </section>

            {
               stateStore.showPopUp &&
               <PopUp onSaveHandler={ stateStore.onSaveMethod && stateStore.onSaveMethod.bind(this) } />
            }
            {
               taskReducer.dragElement &&
               <div className='drag-elemt-wrap'>
                  { taskReducer.dragElement.toString() }
               </div>
            }
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => ({})
)(App);
