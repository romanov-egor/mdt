import React, { Component } from 'react';

import { connect } from 'react-redux';

import CategoriesController from '../controllers/CategoriesController'

class Calendar extends Component {

   constructor () {
      super();
   }

   onClickOnDay (e) {
      this.props.onChooseDay(e.target.dataset.day);
   }

   makeDays () {
      let self = this;
      let days = [25, 26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5]
      let result = [];

      days.forEach(function (item, key) {
         result.push(
            <div key={key} className="item-day" data-day={ item } onClick={ self.onClickOnDay.bind(self) }>
               <div data-day={ item } className="day-num">{ item }</div>
            </div>
         )
      });

      return result;
   }

   render() {
      return (
         <div className="default calendar">
            <div className="month-title">
               Октябрь
            </div>
            <div className="calendar-block">
               { this.makeDays.apply(this) }
            </div>
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (new CategoriesController().setGetDispatch(dispatch))
)(Calendar);
