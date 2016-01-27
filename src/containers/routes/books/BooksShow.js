import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';

import FlatButton from 'components/FlatButton';

import Styles from 'stylesheets/containers/routes/books/BooksShow.sass';

import * as Actions from 'actions/Actions';

/**
 * BooksShow
 */
export class BooksShow extends React.Component {
  handleEditClick = ::this.handleEditClick;

  static contextTypes = {
    storeIsSynchronized: React.PropTypes.bool
  };

  handleEditClick(event) {
    const book = _.findWhere(this.props.books, { isbn: this.props.params.id });

    this.props.actions.redirectTo('/book/' + book.isbn + '/edit');
  }

  render() {
    if(this.context.storeIsSynchronized) {
      const book = _.findWhere(this.props.books, { isbn: this.props.params.id });

      return (
        <div className={Styles.Books}>
          <h2>
            Book: {book.title}
          </h2>
          <p>
            {book.subtitle}
          </p>
          <p>
            {book.abstract}
          </p>
          <div className={Styles.functions}>
            <FlatButton onClick={this.handleEditClick}>
              Edit
            </FlatButton>
          </div>
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
)(BooksShow);
