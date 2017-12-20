import React, { Component } from 'react';

import { connect } from 'react-redux';
import CategoriesController from '../controllers/CategoriesController'
import '../style/defaultBlock.css';
import '../style/categories.css';

class Categories extends Component {

   /**
    * Add category
    * @param {String} name
    */
   addCategory (categoryObj) {
      if (categoryObj.inputValue) {
         CategoriesController.addCategory(categoryObj.inputValue);
      }
   }

   /**
    * Edit category name
    * @param {String} name
    */
   editCategory (categoryObj) {
      if (categoryObj.inputValue) {
         CategoriesController.editCategory(categoryObj.inputValue, +this.state.editCategoryId);
      }
   }

   /**
    * Delete category
    */
   deleteCategory (e) {
      let result = window.confirm('Вы уверены');
      if (result) {
         let categoryId = e.target.getAttribute('data-itemid');
         CategoriesController.deleteCategory(categoryId);
      }
   }

   /**
    * Show pop up block:
    *    to add category - just send command to open block
    *    to edit category - save category name in popUp store
    * @param {String} type - type to show
    * @param  {Oject} e
    */
   showPopUp (type, e) {
      if (type === 'addCategory') {
         this.props.showPopUp(type, this.addCategory.bind(this));
      } else if (type === 'editCategory') {
         let categoryId = e.target.getAttribute('data-itemid');
         let categoryName = e.target.parentNode.parentNode.previousElementSibling.innerText;
         this.setState({'editCategoryId': categoryId});
         this.props.setCategoryNameForEdit(categoryName);
         this.props.showPopUp(type, this.editCategory.bind(this));
      }
   }

   /**
    * Get tasks by category
    * @param {Object} e
    */
   onCategoryChoose (e) {
      let target = e.target;
      let categoryId = target.getAttribute('data-itemid');
      if ((!this.state.categoryId || this.state.categoryId !== categoryId)
         && !target.getAttribute('data-blocktype')) {
         this.props.onChoosenCategory(categoryId);
         this.setState({'categoryId': categoryId});
      } else if (categoryId === this.state.categoryId) {
         this.setState({'categoryId': null});
         this.props.clearTaskListBlock();
      }
   }

   /**
    * Show buttons
    * @param  {Object} e
    */
   onCategoryMouseOver (e) {
      let target = CategoriesController.findParentElemtByAttribute(e.target, 'data-itemid', 2);
      let categoryKey = target.getAttribute('data-itemid');
      let stateButtons = this.state ? this.state.buttons : {};
      stateButtons[categoryKey] = e.type !== 'mouseleave';
      this.setState({'buttons': stateButtons});
   }

   /**
    * Make category list view
    * @return {JSX} view
    */
   makeCategoriesView () {
      let result = [];
      const categories = this.props.stateStore.categoryReducer.categories;
      const choosenCategory = +this.props.stateStore.categoryReducer.choosenCategory;
      let cssClassItem;

      if (!categories || !categories.length) {
         CategoriesController.makeCat();
      } else {
         categories.map((item, key) => {
            cssClassItem = choosenCategory === item.id ? 'choosen' : '';
            result.push(
               <div
               key={key}
               data-itemid={ item.id }
               title={ item.title }
               className={ 'defaultBlock__one-item ' + cssClassItem }
               onMouseEnter={ this.onCategoryMouseOver.bind(this) }
               onMouseLeave={ this.onCategoryMouseOver.bind(this) }
               onClick={ this.onCategoryChoose.bind(this) } >
                  <div
                  className='defaultBlock__one-item__title'
                  data-itemid={ item.id }>{ item.title }
                  </div>
                  <div className='defaultBlock__one-item__buttons'>
                     {
                        this.state && this.state.buttons[item.id] &&
                        <div>
                           <div
                           className="edit-item"
                           data-itemid={ item.id }
                           data-blocktype='btn'
                           onClick={ this.showPopUp.bind(this, 'editCategory') }>
                           </div>
                           <div
                           className="delete-item"
                           data-blocktype='btn'
                           data-itemid={ item.id }
                           onClick={ this.deleteCategory.bind(this) }>
                           </div>
                        </div>
                     }
                  </div>
               </div>
            );
            return true;
         });
      }

      return result;
   }

   render() {
      return (
         <div className="defaultBlock categories">
            <div className="defaultBlock__title">
               <div className="defaultBlock__text">Категории</div>
               <div className="defaultBlock__button add-btn" onClick={ this.showPopUp.bind(this, 'addCategory') }>
               </div>
            </div>
            <div className="defaultBlock__items">
               { this.makeCategoriesView() }
            </div>
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (CategoriesController.setGetDispatch(dispatch))
)(Categories);
