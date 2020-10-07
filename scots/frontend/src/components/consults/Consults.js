import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getConsults } from '../../actions/consults';
import Card from './Card';
import "react-datepicker/dist/react-datepicker.css";

export class Consults extends Component {

   static propTypes = {
      consults: PropTypes.array.isRequired
   };

   componentDidMount() {
      this.props.getConsults();
   }

   render() {
      return (
         <Fragment>
            <br />
            {this.props.consults.map(c => (
               <Card consult={c} />
            ))}
            <br />
         </Fragment>
      )
   }
}

const mapStateToProps = state => ({
   consults: state.consults.consults
})

export default connect(mapStateToProps, { getConsults })(Consults);
