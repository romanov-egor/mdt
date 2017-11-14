
/**
 * Categories controller
 */
class Categories {
   constructor () {
      this.categories = this.makeCat();

      this.dispatcherObj = {
         onChoosenCategory: this.onChoosenCategory.bind(this),
         onDeleteTask: this.onDeleteTask.bind(this),
         onChooseDay: this.onChooseDay.bind(this),
         onEditTask: this.onEditTask.bind(this),
         hidePopUp: this.hidePopUp.bind(this),
         onDoneTask: this.onDoneTask.bind(this),
         onChangeText: this.onChangeText.bind(this)
      }
   }

   onChangeText (valueText) {
      this.dispatch({
         type: 'TASK_CHANGED_TEXT',
         payload: valueText
      });
   }

   onDoneTask (idCategory) {
      this.dispatch({
         type: 'TASK_DONE',
         payload: +idCategory
      });
   }

   hidePopUp () {
      this.dispatch({ type: 'HIDE_POPUP' });
   }

   onEditTask (idTask) {
      this.dispatch({
         type: 'CHOOSEN_TASK_FOR_EDIT',
         payload: +idTask
      });
   }

   onChooseDay (dayNum) {
      this.dispatch({
         type: 'DAY_CHOOSE',
         payload: +dayNum
      });
   }

   onDeleteTask (idCategory) {
      this.dispatch({
         type: 'TASK_DELTED',
         payload: +idCategory
      });
   }

   onChoosenCategory (idCategory) {
      this.dispatch({
         type: 'CATEGORY_CHOOSE',
         payload: idCategory
      });
   }

   setGetDispatch (dispatch) {
      this.dispatch = dispatch;
      return this.dispatcherObj;
   }

   makeCat () {
      return [
         {
            id: 0,
            title: 'Категория 1',
            tasks: [
               {
                  id: 10,
                  text: 'Задача номер 1. Текст',
                  done: false
               },
               {
                  id: 11,
                  text: 'Задача номер 2. Текст',
                  done: false
               },
               {
                  id: 12,
                  text: 'Задача номер 3. Текст',
                  done: false
               },
               {
                  id: 13,
                  text: 'Задача номер 4. Текст',
                  done: false
               },
            ]
         },
         {
            id: 1,
            title: 'Категория 2',
            tasks: [
               {
                  id: 20,
                  text: 'Задача номер 10. Текст',
                  done: false
               },
               {
                  id: 21,
                  text: 'Задача номер 20. Текст',
                  done: false
               },
               {
                  id: 22,
                  text: 'Задача номер 30. Текст',
                  done: false
               },
               {
                  id: 23,
                  text: 'Задача номер 40. Текст',
                  done: false
               },
            ]
         },
         {
            id: 2,
            title: 'Категория 3',
            tasks: [
               {
                  id: 30,
                  time: 3,
                  text: 'Задача номер 101. Текст',
                  done: false
               },
               {
                  id: 31,
                  time: 3,
                  text: 'Задача номер 201. Текст',
                  done: false
               },
               {
                  id: 32,
                  text: 'Задача номер 301. Текст',
                  done: false
               },
               {
                  id: 33,
                  text: 'Задача номер 401. Текст',
                  done: false
               },
            ]
         },
         {
            id: 3,
            title: 'Категория 4',
         },
         {
            id: 4,
            title: 'Категория 5',
         },
         {
            id: 5,
            title: 'Категория 6',
         },
         {
            id: 6,
            title: 'Категория 7',
         },
         {
            id: 7,
            title: 'Категория 8',
         },
         {
            id: 8,
            title: 'Категория 9',
         },
         {
            id: 9,
            title: 'Категория 10',
         }
      ]
   }

   getCategories () {
      return this.categories;
   }

}

export default new Categories();
