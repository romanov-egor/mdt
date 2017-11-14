import React, { Component } from 'react';

import { connect } from 'react-redux';

import CategoriesController from '../controllers/CategoriesController'

class PopUp extends Component {

   hidePopUp (e) {
      if (e.target.classList.contains('pop-up-background')) {
         this.props.hidePopUp();
      }
   }

   findEditedTask () {
      const taskId = this.props.stateStore.categoryReducer.choosenTaskForEdit;
      const tasks = CategoriesController.makeCat();
      let result = [];

      tasks.forEach((category, id) => {
         category.tasks && category.tasks.forEach((task, key) => {
            if (task.id === taskId) {
               result.push(task);
            }
         });
      });

      return result;
   }

   onChangeText (e) {
      const val = e.target.value;
      if (!!val) {
         this.props.onChangeText(e.target.value);
      }
   }

   getTaskText () {
      const newText = this.props.stateStore.categoryReducer.newText;
      if (!newText) {
         return this.findEditedTask()[0].text;
      }
      return newText;
   }

   render() {
      const stateStore = this.props.stateStore.categoryReducer;
      return (
         <div>
            <div className="full-block" onClick={ this.hidePopUp.bind(this) }>
               <div className="pop-up-background"></div>
               <div className="pop-up">
                  <div className="title">
                     Изменить задачу:
                  </div>
                  <div className="changedText">
                     <input
                        type="text"
                        onChange={ this.onChangeText.bind(this) }
                        value={ this.getTaskText.call(this) } />
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (CategoriesController.setGetDispatch(dispatch))
)(PopUp);
