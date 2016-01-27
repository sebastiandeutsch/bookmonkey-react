import * as types from 'constants/ActionTypes';
import API from 'api/API';

/**
 * Action creator for redirecting
 * @param url
 */
export function redirectTo(url) {
  return {
    type: types.UPDATE_URL,
    payload: {
      method: 'push',
      args: url
    }
  }
}

export function loadBooks() {
  return (dispatch, getState) => {
    let api = new API();
    return api.loadBooks().then(
      (response) => {
        dispatch({
          type: types.SET_BOOKS,
          payload: {
            books: response.data
          }
        })
      },
      (error) => {
        dispatch({
          type: types.SET_BOOKS,
          payload: new Error("Can't load books"),
          error: true
        })
      }
    );
  };
}

export function updateBook(book) {
  return (dispatch, getState) => {
    let api = new API();
    return api.updateBook(book).then(
      (response) => {
        console.log("update was successfull");
      },
      (error) => {
        console.log("update had an error");
      }
    );
  };
}

/**
 * Action creator that changes something
 * @param something
 */
export function changeSomething(something) {
  return {
    type: types.CHANGE_SOMETHING,
    payload: {
      something
    }
  };
};

/**
 * Action creator that changes something asynchronous
 * @param something
 */
export function changeSomethingAsync(something) {
  return (dispatch, getState) => {
    let api = new API();
    return api.getSomething(something).then(
      (response) => {
        dispatch({
          type: types.CHANGE_SOMETHING,
          payload: {
            something: response.data
          }
        });
        dispatch(redirectTo('/'));
      },
      (error) => {
        dispatch({
          type: types.CHANGE_SOMETHING,
          payload: new Error("Async was not successfull"),
          error: true
        });
      }
    );
  };
};
