import React, { Component } from 'react'

import { connect } from 'react-redux'

import CalendarController from '../controllers/CalendarController'
import '../style/calendar.css'

class Calendar extends Component {

   onClickOnDay (e) {
      this.props.onChooseDay(e.target.dataset.day);
   }

   /**
    * Make calendar days
    */
   makeDays () {
      let calendarDate = new Date(this.state.currentDate);
      let startDate = 1;
      let startDay = new Date(calendarDate.setDate(1)).getDay();
      let nextMonth = calendarDate.getMonth() + 1;
      let lastMonthDate = new Date(calendarDate.getFullYear(), nextMonth, 0);
      let endDate = lastMonthDate.getDate();
      let lastMonthDay = lastMonthDate.getDay();
      let date = new Date();
      let dayDate = date.getDate();
      let currentMonth = calendarDate.getMonth() === date.getMonth();
      let result = [];
      let dayWithTasks;

      /**
       * Add days previous months
       */
      const addPrevDays = function () {
         let prevMonth = new Date(new Date(calendarDate).setDate(0));
         let prevLastDay = prevMonth.getDay();
         let prevCurDate = prevMonth.getDate();
         let prevResult = [];
         while (prevLastDay > 0) {
            prevResult.unshift(
               <div
               key={prevCurDate + 'calendarDayPrev'}
               className="defaultBlock__item-day prevNextDays"
               data-day={ prevCurDate }>
                  <div data-day={ prevCurDate } className="day-num">{ prevCurDate }
                  </div>
               </div>
            );
            prevCurDate -= 1;
            prevLastDay--;
         }
         return prevResult;
      }

      /**
       * Add days next months
       */
      const addNextDays = function () {
         let nextMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
         let nextStartDay = nextMonth.getDay();
         let nextDate = nextMonth.getDate();
         let nextResult = [];
         while(nextStartDay <= 7) {
            nextResult.push(
               <div
               key={nextDate + 'calendarDayNext'}
               className="defaultBlock__item-day prevNextDays"
               data-day={ nextDate }>
                  <div data-day={ nextDate } className="day-num">{ nextDate }
                  </div>
               </div>
            );
            nextStartDay++;
            nextDate++;
         }
         return nextResult;
      }

      /**
       * Check temporary date while calendar rendering
       * @param  {DATETIME} tempDate
       * @return {String} css class if we have tasks
       */
      const checkTempDate = function (tempDate) {
         /*if () {

         }
         return ;*/
      }

      while (startDate <= endDate) {
         dayWithTasks = checkTempDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate()));
         if (startDate === 1 && startDay !== 1) {
            addPrevDays().forEach((item, key)=> {
               result.push(item);
            });
         }
         result.push(
            <div
            key={startDate + 'calendarDay'}
            className= { 'defaultBlock__item-day ' + (currentMonth && (dayDate === startDate) ? 'current' : '') }
            data-day={ startDate }
            onClick={ this.onClickOnDay.bind(this) }>
               <div data-day={ startDate } className="day-num">{ startDate }
               </div>
            </div>
         );
         if (startDate === endDate && lastMonthDay !== 0) {
            addNextDays().forEach((item, key)=> {
               result.push(item);
            });
         }
         startDate++;
      };
      return result;
   }

   /**
    * Save current calendar date
    * get tasks by this date
    */
   componentWillMount () {
      this.changeCalendarDate(new Date());
      this.props.getTasksByDate(new Date());
   }

   /**
    * Returns month name by month index
    */
   getMonthName () {
      var months = [
      'Январь', 'Февраль', 'Март',
      'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь',
      'Октябрь', 'Ноябрь', 'Декабрь'];
      return months[new Date(this.state.currentDate).getMonth()];
   }

   /**
    * change calendar period to day before
    */
   setPrevMonth (prev, e) {
      let curDate = new Date(this.state.currentDate);
      let curMonth = curDate.getMonth();
      let newMonth = prev ? curMonth - 1 : curMonth + 1;
      curDate = new Date(curDate.setMonth(newMonth));
      this.setState({'currentDate': curDate});
   }

   /**
    * Send to reduxStore and to this store current calendar date
    * @param  {DateTime} curDate
    */
   changeCalendarDate (curDate) {
      this.setState({'currentDate': curDate});
      this.props.setCalendarDateInStore(curDate);
   }

   render() {
      return (
         <div className="defaultBlock calendar">
            <div className="defaultBlock__title">
               <div
               className="prevMonth"
               onClick={ this.setPrevMonth.bind(this, true) }>
               </div>
               <div className="monthName">
                  { this.getMonthName() }
               </div>
               <div
               className="nextMonth"
               onClick={ this.setPrevMonth.bind(this, false) }>
               </div>
            </div>
            <div className="defaultBlock__calendar">
               { this.makeDays.apply(this) }
            </div>
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (CalendarController.setGetDispatch(dispatch))
)(Calendar);
