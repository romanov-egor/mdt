import React, { Component } from 'react';

import { connect } from 'react-redux';

import PopUpController from '../controllers/PopUpController'

import '../style/popUp.css'

class PopUp extends Component {

   hidePopUp (e) {
      if (e.target.classList.contains('pop-up-background')) {
         this.props.hidePopUp();
      }
   }

   getTitle () {
      let popUpType = this.props.stateStore.popUpReducer.popUpType;
      let title;
      switch (popUpType) {
         case 'addCategory':
            title = 'Добавить категорию'
            break;
         case 'editCategory':
            title = 'Изменить название категории'
            break;
         case 'addTask':
            title = 'Добавить задачу'
            break;
         case 'editTask':
            title = 'Изменить название задачи'
            break;
         default:
            title = ''
      }
      return title;
   }

   getBody () {
      let store = this.props.stateStore.popUpReducer;
      let result;

      switch (store.popUpType) {
         case 'addCategory':
            result = <input type="text" onChange={ this.onChageValue.bind(this) } placeholder="Название категории" />
            break;
         case 'addTask':
            result = <input type="text" onChange={ this.onChageValue.bind(this) } placeholder="Текст задачи" />
            break;
         case 'editCategory':
         case 'editTask':
            result = <input type="text"
                     onChange={ this.onChageValue.bind(this) }
                     value={ (this.state && this.state.inputValue) || store.popUpInputText } />
            break;
         default:
            result = ''
      }

      return result;
   }

   onChageValue (e) {
      this.setState({
         inputValue: e.target.value
      });
   }

   onSave (e) {
      let store = this.props.stateStore.popUpReducer;
      if ((this.state && this.state.inputValue) || store.popUpInputText) {
         this.props.onSaveHandler((this.state && this.state.inputValue) || store.popUpInputText);
      } else {
         alert ('Название обязательно для заполнения');
      }
   }

   render() {
      return (
         <div>
            <div className="full-block" onClick={ this.hidePopUp.bind(this) }>
               <div className="pop-up-background"></div>
               <div className="pop-up">
                  <div className="title">
                     { this.getTitle() }
                  </div>
                  <div className="changedText">
                     { this.getBody() }
                  </div>
                  <div className="save-btn" onClick={ this.onSave.bind(this) }>
                     Сохранить
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (PopUpController.setGetDispatch(dispatch))
)(PopUp);
