import _ from 'lodash';
import * as Actions from 'actions/Actions';
import API from 'api/API';

export default class BookLoader {
  needsToSyncStore(params, store) {
    let collection = store.getState().books;
    if(collection) {
      const book = _.findWhere(collection, { isbn: params.id });
      if(book) {
        return false;
      }
    }
    return true;
  }

  syncStore(params, store) {
    let { dispatch } = store;
    let { session } = store.getState().app;
    const api = new API();

    let loadBooks = Actions.loadBooks();
    return loadBooks(dispatch, store.getState);
  };
}
