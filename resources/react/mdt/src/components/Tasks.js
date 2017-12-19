import React, { Component } from 'react';

import { connect } from 'react-redux';

import strftime from 'strftime'
import SweetAlert from 'sweetalert-react'

import TasksController from '../controllers/TasksController'
import '../style/tasks.css';

/**
 * Компонент отрисовывает задачи
 * Отрисовку данных надо переписать полностью. Так как это полный п*здец.
 */
class Tasks extends Component {

   constructor () {
      super();
      this._dargElement = false;
      this._timeout = false;
      this.state = { 'buttons': [] }
   }

   /**
    * Shedule task
    * @return {[type]} [description]
    */
   scheduleTask (e) {
      let calendarDate = this.props.stateStore.calendarReducer.calendarDate;

      if (strftime('%Y-%m-%d', calendarDate) < strftime('%Y-%m-%d', new Date())) {
         alert ('Нельзя мазафака');
         return;
      }

      let taskId = +e.target.getAttribute('data-itemid');
      let taskObj = this.taskFinder(taskId);
      //let taskObj = JSON.parse(JSON.stringify(this.taskFinder(taskId)));
      taskObj['scheduled'] = true;
      taskObj['scheduleDate'] = strftime('%Y-%m-%d', calendarDate);
      TasksController.editTask(taskObj);
   }

   /**
    * Task done, send request
    * @param  {Object} e
    */
   taskDoneOrNot (e) {
      let target = e.target;
      let taskId = +target.getAttribute('data-itemid');
      let taskObj = this.taskFinder(taskId);
      taskObj['done'] = !taskObj['done'];
      TasksController.editTask(taskObj);
   }

   /**
    * Delete Task
    * @param  {Object} e
    */
   deleteTask (e) {
      let result = window.confirm('Вы уверены');
      if (result) {
         let categoryId = e.target.getAttribute('data-itemid');
         TasksController.deleteTask(categoryId);
      }
   }

   /**
    * Add task
    * @param {String} text
    */
   addTask (text) {
      if (text) {
         TasksController.addTask({
            id: null,
            text: text,
            categoryId: +this.props.stateStore.categoryReducer.choosenCategory,
            done: false,
            scheduled: false,
            scheduleDate: new Date().toISOString().slice(0,10)
         });
      }
   }

   /**
    * Show pop up block for add task
    * @param {String} type - type to show
    * @param  {Oject} e
    */
   showPopUp (type, e) {
      this.props.showPopUp(type, this.addTask.bind(this));
   }

   /**
    * Find task object in redux store by id
    * @param  {Int} taskId
    * @return {Object} - task object
    */
   taskFinder (taskId) {
      let tasks;
      if (this.props.type === 'category') {
         tasks = this.props.stateStore.taskReducer.categoryTasks;
      } else if (this.props.type === 'calendar') {
         tasks = this.props.stateStore.taskReducer.calendarTasks;
      }
      let taskObj;
      tasks.forEach((item, key)=> {
         if (!taskObj && item['id'] === taskId) {
            taskObj = item;
         }
      });

      return taskObj;
   }

   /**
    * Edit task name
    * @return {String} name
    */
   editTask (name) {
      if (name) {
         let taskId = +this.state.editTaskId;
         let taskObj = this.taskFinder(taskId);
         taskObj['text'] = name;
         TasksController.editTask(taskObj, this.props.type);
      }
   }

   /**
    * Open pop-up for edit task
    * @param  {Object} e
    */
   onTaskClick (type, e) {
      if (this._dargElement) {
         this._dargElement = false;
         return;
      }
      let target = e.target;
      if (target.getAttribute('data-blocktype') === 'btn') {
         return;
      }
      target = TasksController.findParentElemtByClassName(e.target, 'defaultBlock__one-item', 3);
      target = target.querySelector('.defaultBlock__one-item__title');
      let taskId = target.getAttribute('data-itemid');
      let taskName = target.innerText;
      this.setState({'editTaskId': taskId});
      this.props.setTaskNameForEdit(taskName);
      this.props.showPopUp(type, this.editTask.bind(this));
   }

   /**
    * Show buttons
    * @param  {Object} e
    */
   onTaskMouseOver (e) {
      let target = TasksController.findParentElemtByAttribute(e.target, 'data-itemid', 2);
      let taskKey = target.getAttribute('data-itemid');
      let stateButtons = this.state ? this.state.buttons : {};
      stateButtons[taskKey] = e.type !== 'mouseleave';
      this.setState({'buttons': stateButtons});
   }

   /**
    * Mouse down on task element
    * Only on category tasks
    * @param  {Object} e
    */
   onMouseDown (e) {
      if (this.props.type === 'category' && !this._timeout) {
         let target = e.target;
         this._timeout = setTimeout(function () {
            this.startDrag(target);
         }.bind(this), 1000);
      }
   }

   /**
    * Format data from BL, make tasks view
    * @param  {Array} tasks
    * @return {JSX-Array}
    */
   makeTasksView (tasks) {
      let result = [];
      let cssClassDone = '';
      tasks.map((item, key) => {
         cssClassDone = item['done'] ? 'taskDone' : '';
         result.push(
            <div
            title={ item.text }
            className={'defaultBlock__one-item ' + (item.scheduled ? 'scheduled' : '') }
            data-itemid={ item.id }
            onClick={ this.onTaskClick.bind(this, 'editTask') }
            onMouseEnter={ this.onTaskMouseOver.bind(this) }
            onMouseLeave={ this.onTaskMouseOver.bind(this) }
            key={ item.id }>
               <div className={'defaultBlock__one-item__title ' + cssClassDone} data-itemid={ item.id }>
                  { item.text }
               </div>
               <div className="defaultBlock__one-item__buttons">
                  {
                     this.props.type === 'category' && this.state && this.state.buttons[item.id] &&
                     <div>
                        {
                           !item.scheduled &&
                           <div
                           className='schedule'
                           data-itemid={ item.id }
                           data-blocktype='btn'
                           onClick={ this.scheduleTask.bind(this) }>
                           </div>
                        }
                        <div
                        className={ (item['done'] && 'not-done-item') || 'done-item' }
                        data-itemid={ item.id }
                        data-blocktype='btn'
                        onClick={ this.taskDoneOrNot.bind(this) }>
                        </div>
                        <div
                        className="delete-item"
                        data-blocktype="btn"
                        data-itemid={ item.id }
                        onClick={ this.deleteTask.bind(this) }>
                        </div>
                     </div>
                  }
               </div>
            </div>
         );
         return true;
      });
      return result;
   }

   render() {
      const calendarStore = this.props.stateStore.calendarReducer;
      const tasksStore = this.props.stateStore.taskReducer;
      const categoryReducer = this.props.stateStore.categoryReducer;

      return (
         <div className="defaultBlock tasks">
            <div className="defaultBlock__title">
               <div className="defaultBlock__text">
                  { this.props.type === 'category' && 'Задачи' }
                  {
                     this.props.type === 'calendar' && calendarStore.calendarDate &&
                     (calendarStore.calendarDate.getDate() + '.' + (calendarStore.calendarDate.getMonth() + 1) + '.' + calendarStore.calendarDate.getFullYear())
                  }
               </div>
               {
                  this.props.type === 'category' && categoryReducer.choosenCategory &&
                  <div
                  className="defaultBlock__button add-btn"
                  onClick={ this.showPopUp.bind(this, 'addTask') }>
                  </div>
               }
            </div>
            <div className="defaultBlock__items">
               {
                  this.props.type === 'category' && tasksStore.categoryTasks &&
                  this.makeTasksView(tasksStore.categoryTasks)
               }
               {
                  this.props.type === 'calendar' && tasksStore.calendarTasks &&
                  this.makeTasksView(tasksStore.calendarTasks)
               }
            </div>
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (TasksController.setGetDispatch(dispatch))
)(Tasks);
