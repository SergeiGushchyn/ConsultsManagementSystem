import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from '../../actions/auth';

export class Header extends Component {
   static propTypes = {
      auth: PropTypes.object.isRequired,
      logout: PropTypes.func.isRequired
   }
   render() {
      const { isAuthenticated, user } = this.props.auth;

      const authLinks = (
         <div className="float-right font-weight-bold">
            <Link className="text-light mx-2" to="/consults">My Consults</Link>
            <button className="btn btn-secondary btn-sm mx-2" onClick={this.props.logout}>Logout</button>
         </div>
      );

      const adminLinks = (
         <div className="float-right font-weight-bold">
            <Link className="text-light mx-2" to="/register">Register</Link>
            <Link className="text-light mx-2" to="/login">Login</Link>
         </div>
      );

      const guestLinks = (
         <div className="float-right font-weight-bold">
            <Link className="text-light mx-2" to="/register">Register</Link>
            <Link className="text-light mx-2" to="/login">Login</Link>
         </div>
      );

      return (
         <div>
            <nav className="navbar navbar-dark bg-primary">
               <h3 className="text-light">Consults Management System</h3>
               {isAuthenticated ? authLinks : guestLinks}
            </nav>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
