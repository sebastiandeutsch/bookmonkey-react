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
export class BooksNew extends React.Component {
  handleSubmitClick = ::this.handleSubmitClick;

  static contextTypes = {
    storeIsSynchronized: React.PropTypes.bool
  };

  handleSubmitClick(event) {
    let book = {
      isbn: "",
      title: "",
      subtitle: "",
      abstract: ""
    };

    book.isbn = this.refs.isbn.value;
    book.title = this.refs.title.value;
    book.subtitle = this.refs.subtitle.value;
    book.abstract = this.refs.abstract.value;

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
          <ul>
            <li>
              <input ref="isbn" type="text" defaultValue={book.isbn} />
            </li>
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
                Create
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
)(BooksNew);
