import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    window.location.href = '/login';
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
        <div className="navbar-nav ml-auto">
            <img
                className="rounded-circle"
                src={user.avatar} alt=""
                style={{ width: '25px', height: '25px', marginTop: '6px'}}
                
            />
          <div className="navbar-nav nav-item dropdown ml-auto">
            <a className="nav-link dropdown-toggle"
               href="http://example.com" id="dropdown02"
               data-toggle="dropdown"
               aria-haspopup="true"
               aria-expanded="false">{user.name}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdown02">
                <Link className="dropdown-item" to="/dashboard">Your Profile</Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to="/" onClick={this.onLogoutClick.bind(this)}>Sign out</Link>
            </div>
          </div>
        </div>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item m-2">
            <Link className="btn btn-info" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item m-2">
            <Link className="btn btn-light" to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            TRAVELSAATHI
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <Link className="navbar-brand text-info" to="/posts">
                    {' '}
                    Posts
                </Link>
              </li>
            </ul>
              {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
