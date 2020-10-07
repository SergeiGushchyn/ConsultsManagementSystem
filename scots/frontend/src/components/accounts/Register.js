/**
 *  Authentication code example was used from Traversy Media
 *  https://www.youtube.com/watch?v=Uyei2iDA4Hs
 */

import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth'


export class Register extends Component {
   state = {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: ''
   }

   static propTypes = {
      register: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool
   }

   onSubmit = e => {
      e.preventDefault();
      const { username, firstName, lastName, password, password2 } = this.state;
      if (password !== password2) {
         console.log("Passwords do not match");
      } else {
         const newUser = {
            username,
            firstName,
            lastName,
            password
         };
         this.props.register(newUser);
      }
   }

   onChange = e => this.setState({ [e.target.name]: e.target.value });

   render() {
      if (this.props.isAuthenticated) {
         return <Redirect to="/" />;
      }
      const { username, firstName, lastName, password, password2 } = this.state;
      return (
         <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
               <h3 className="text-center">Register</h3>
               <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                     <label>Username</label>
                     <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={this.onChange}
                        value={username}
                     />
                  </div>
                  <div className="form-group">
                     <label>First Name</label>
                     <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        onChange={this.onChange}
                        value={firstName}
                     />
                  </div>
                  <div className="form-group">
                     <label>Last Name</label>
                     <input
                        type="text"
                        className="form-control"
                        name="lasttName"
                        onChange={this.onChange}
                        value={lastName}
                     />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={this.onChange}
                        value={password}
                     />
                  </div>
                  <div className="form-group">
                     <label>Confirm Password</label>
                     <input
                        type="password"
                        className="form-control"
                        name="password2"
                        onChange={this.onChange}
                        value={password2}
                     />
                  </div>
                  <div className="form-group">
                     <button type="submit" className="btn btn-primary">
                        Register
              </button>
                  </div>
                  <p>
                     Already have an account? <Link to="/login">Login</Link>
                  </p>
               </form>
            </div>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);