import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';

import Styles from 'stylesheets/components/BookForm.sass';

import FlatButton from 'components/FlatButton';

/**
 * FlatButton
 */
export default class BookForm extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  handleSubmitClick = ::this.handleSubmitClick;

  handleSubmitClick(event) {
    event.preventDefault();

    let book = {
      isbn: this.refs.isbn ? this.refs.isbn.value : this.props.book.isbn,
      title: this.refs.title.value,
      subtitle: this.refs.subtitle.value,
      abstract: this.refs.abstract.value
    };

    this.props.onSubmit(book);
  }

  render() {
    const { book } = this.props;

    let isbnRow, label;
    if(book.isbn && book.isbn.length > 0) {
      label = "Update";
    } else {
      isbnRow = <li>
        <input ref="isbn" type="text" placeholder="ISBN" defaultValue={this.props.book.isbn} />
      </li>
      label = "Create";
    }

    return (
      <ul>
        {isbnRow}
        <li>
          <input ref="title" type="text" placeholder="Title" defaultValue={book.title} />
        </li>
        <li>
          <input ref="subtitle" type="text" placeholder="Subtitle" defaultValue={book.subtitle} />
        </li>
        <li>
          <textarea ref="abstract" placeholder="Abstract" defaultValue={book.abstract} />
        </li>
        <li>
          <FlatButton onClick={this.handleSubmitClick}>
            {label}
          </FlatButton>
        </li>
      </ul>
    )
  }
}
