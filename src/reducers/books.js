import * as Actions from 'constants/ActionTypes';

const initialState = {
  collection: []
};

const actionsMap = {
  /**
   * sets the collection
   */
  [Actions.SET_BOOKS]: (state, action) => {
    state = { ...state };

    state.collection = action.payload.books;

    return state;
  },

  /**
   * adds a book
   */
  [Actions.CREATE_BOOK]: (state, action) => {
    state = { ...state };

    state.collection.push(action.payload.book);

    return state;
  },


  /**
   * updates a book
   */
  [Actions.UPDATE_BOOK]: (state, action) => {
    state = { ...state };

    let book = _.findWhere(state.collection, { isbn: action.payload.book.isbn });
    book.title = action.payload.book.title;
    book.subtitle = action.payload.book.subtitle;
    book.abstract = action.payload.book.abstract;

    console.log(state);

    return state;
  },

}

export default function books(state = initialState, action) {
  const reduceFn = actionsMap[ action.type ];

  if (!reduceFn) {
    return state;
  }

  return reduceFn(state, action);
}
