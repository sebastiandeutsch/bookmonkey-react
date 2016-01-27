import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';

import BookForm from 'components/BookForm';

import Styles from 'stylesheets/containers/routes/books/BooksEdit.sass';

import * as Actions from 'actions/Actions';

/**
 * BooksShow
 */
export class BooksNew extends React.Component {
  handleSubmit = ::this.handleSubmit;

  static contextTypes = {
    storeIsSynchronized: React.PropTypes.bool
  };

  handleSubmit(book) {
    console.log(book);
    this.props.actions.createBook(book).then(
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
      let book = {
        isbn: "",
        title: "",
        subtitle: "",
        abstract: ""
      };

      return (
        <div className={Styles.Books}>
          <h2>
            New Book: {book.title}
          </h2>
          <BookForm book={book} onSubmit={this.handleSubmit} />
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
)(BooksNew);
