import React, { Component } from 'react';

import { connect } from 'react-redux';

import CategoriesController from '../controllers/CategoriesController'

/**
 * Компонент отрисовывает задачи
 * Отрисовку данных надо переписать полностью. Так как это полный п*здец.
 */
class Tasks extends Component {

   constructor () {
      super();
   }

   doneItem (e) {
      this.props.onDoneTask(e.target.dataset.itemid);
   }

   editItem (e) {
      this.props.onEditTask(e.target.dataset.itemid);
   }

   deleteItem (e) {
      this.props.onDeleteTask(e.target.dataset.itemid);
   }

   makeItemsList (stateStore, items) {
      let result = [];
      let deletedTasks = stateStore.deletedTasks;
      let doneTasks = stateStore.doneTasks;
      let changedTaskId = stateStore.choosenTaskForEdit;
      let newTaskText = stateStore.newText;
      let cssClassText, itemText;

      items.map((item, key) => {
         if (!deletedTasks.includes(item.id)) {
            cssClassText = doneTasks.includes(item.id) ? 'line-through' : '';
            itemText = item.id !== changedTaskId ? item.text : (newTaskText ? newTaskText : item.text);

            result.push(
               <div className="li-item" key={key + this.props.type}>
                  <div
                  data-itemid={ item.id }
                  className="one-item">
                     <div className={ 'item-text ' + cssClassText }>
                        { itemText }
                     </div>
                     <div className="item-buttons">
                        <div className="edit-item" data-itemid={ item.id } onClick={ this.editItem.bind(this) }>
                        </div>
                        <div className="done-item" data-itemid={ item.id } onClick={ this.doneItem.bind(this) } >
                        </div>
                        <div className="delete-item" data-itemid={ item.id } onClick={ this.deleteItem.bind(this) } >
                        </div>
                     </div>
                  </div>
               </div>
            );
         }
      });

      return result;
   }

   makeTimeTasksView (stateStore, items) {
      let tasks = new CategoriesController().makeCat();
      let time = stateStore.choosenDay;
      let tasksTime = [];

      if (time === undefined) {
         return [];
      }

      tasks = tasks.filter(function (item, index) {
         if (item.tasks) {
            item.tasks.forEach(function (task, i) {
               if (task.time && task.time === time) {
                  tasksTime.push(task);
               }
            });
         } else {
            return false;
         }
      });

      if (!tasksTime.length) {
         return [];
      }

      return this.makeItemsList(stateStore, tasksTime);
   }

   makeDefaultTasksView (stateStore) {
      let tasks = new CategoriesController().makeCat();
      let category = stateStore.choosenCategory;

      if (category === undefined) {
         return [];
      }

      tasks = tasks.filter(function (item, index) {
         return item.id === +category;
      });

      if (!tasks[0].tasks) {
         return [];
      }

      return this.makeItemsList(stateStore, tasks[0].tasks);
   }

   render() {
      const stateStore = this.props.stateStore.categoryReducer;
      return (
         <div className="default tasks">
            <div className="title">Задачи:</div>
            {
               this.props.type === 'category' &&
               this.makeDefaultTasksView(stateStore)
            }
            {
               this.props.type === 'time' &&
               this.makeTimeTasksView(stateStore)
            }
         </div>
      );
   }
}

export default connect(
   state => ({ stateStore: state }),
   dispatch => (new CategoriesController().setGetDispatch(dispatch))
)(Tasks);
