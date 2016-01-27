import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'components/FlatButton';

import Styles from 'stylesheets/containers/routes/books/BooksIndex.sass';

import * as Actions from 'actions/Actions';

/**
 * Layout
 */
export class BooksIndex extends React.Component {
  render() {
    return (
      <div className={Styles.Books}>
        <h2>
          All Books
        </h2>
        <ol>
          {this.props.books.map((book, key) =>
            <li key={key}>
              <Link to={"/book/" + book.isbn}>
                {book.title}
              </Link>
            </li>
          )}
        </ol>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    books: state.books.collection
  }),
  (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)(BooksIndex);
