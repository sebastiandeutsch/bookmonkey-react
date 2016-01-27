import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'components/FlatButton';

import Styles from 'stylesheets/containers/routes/books/BooksEdit.sass';

import * as Actions from 'actions/Actions';

/**
 * BooksShow
 */
export class BooksEdit extends React.Component {
  handleSubmitClick = ::this.handleSubmitClick;

  static contextTypes = {
    storeIsSynchronized: React.PropTypes.bool
  };

  handleSubmitClick(event) {
    let book = _.findWhere(this.props.books, { isbn: this.props.params.id });

    book.title = this.refs.title.value;
    book.subtitle = this.refs.subtitle.value;
    book.abstract = this.refs.abstract.value;

    this.props.actions.updateBook(book).then(
      (response) => {
        this.props.actions.redirectTo('/');
      },
      (error) => {
        console.log("error");
        this.props.actions.redirectTo('/');
      }
    );
  }

  render() {
    if(this.context.storeIsSynchronized) {
      let book = _.findWhere(this.props.books, { isbn: this.props.params.id });

      return (
        <div className={Styles.Books}>
          <h2>
            Edit Book: {book.title}
          </h2>
          <ul>
            <li>
              <input ref="title" type="text" defaultValue={book.title} />
            </li>
            <li>
              <input ref="subtitle" type="text" defaultValue={book.subtitle} />
            </li>
            <li>
              <textarea ref="abstract" defaultValue={book.abstract} />
            </li>
            <li>
              <FlatButton onClick={this.handleSubmitClick}>
                Update
              </FlatButton>
            </li>
          </ul>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

export default connect(
  (state) => ({
    books: state.books.collection
  }),
  (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)(BooksEdit);
