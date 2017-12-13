const defaultState = {
   choosenCategory: null,
   categories: null
};

export default function (state = defaultState, action) {
   if (action.type === 'CATEGORY_CHOOSE') {
      state.choosenCategory = action.payload;
   }
   if (action.type === 'CATEGORY_LOADED') {
      state.categories = action.payload;
   }
   if (action.type === 'ADD_CATEGORY') {
      state.categories = action.payload;
   }
   if (action.type === 'CATEGORY_ADDED') {
      state.categories.push(action.payload);
   }
   if (action.type === 'CATEGORY_EDITED') {
      state.categories.map(function (oneCategory) {
         if (oneCategory['id'] === action.payload['id']) {
            oneCategory['title'] = action.payload['title'];
         }
         return oneCategory;
      });
   }
   if (action.type === 'CATEGORY_DELETED') {
      state.categories = state.categories.filter(function (oneCategory) {
         return oneCategory['id'] !== action.payload['id'];
      });
   }
   if (action.type === 'UNCHOOSE_CATEGORY') {
      state.choosenCategory = null;
   }

   return Object.assign({}, state);
}
