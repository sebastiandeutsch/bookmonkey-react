import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';

import * as Actions from 'actions/Actions';

import Styles from 'stylesheets/containers/Sidebar.sass';

import Config from 'config/Config';

/**
 * Lebenslauf connected React Component
 */
export class Sidebar extends React.Component {
  render() {
    return (
      <aside className={Styles.Sidebar}>
        <h1>
          <Link to="/">Hello React + Redux</Link>
        </h1>
        <ul>
          <li>
            <Link to="/book/new">New Book</Link>
          </li>
          <li>
            <span>API: </span>
            <span>{Config.apiUrl}</span>
          </li>
          <li>
            <span>Something: </span>
            <span>{this.props.app.something}</span>
          </li>
        </ul>
      </aside>
    )
  }
}

export default connect(
  (state) => ({
    app: state.app
  }),
  (dispatch) => ({
    actions: bindActionCreators(Actions, dispatch)
  })
)(Sidebar);
