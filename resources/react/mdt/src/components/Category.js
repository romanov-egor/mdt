import React, { Component } from 'react';

import { connect } from 'react-redux';

import CategoriesController from '../controllers/CategoriesController'
import '../style/categories.css';

class Categories extends Component {

   constructor () {
      super();
   }

   onCategoryClick (e) {
      this.props.onChoosenCategory(e.target.dataset.itemid);
   }

   makeCategoriesView () {
      const categories = CategoriesController.getCategories();
      const result = [];
      const choosenCategory = +this.props.stateStore.categoryReducer.choosenCategory;
      let cssClassItem;

      categories.map((item, key) => {
         cssClassItem = choosenCategory === item.id ? 'choosen' : '';
         result.push(
            <li key={key}>
               <div
                  data-itemid={ item.id }
                  className={ 'one-item ' + cssClassItem }
                  onClick={ this.onCategoryClick.bind(this) }
                  >
                  { item.title }
               </div>
            </li>
         );
      });

      return result;
   }

   render() {
      return (
         <div className="default mainCategories">
            <div className="title">Категории:</div>
            <ul>
               { this.makeCategoriesView() }
            </ul>
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (CategoriesController.setGetDispatch(dispatch))
)(Categories);
