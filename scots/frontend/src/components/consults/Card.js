import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateConsult } from '../../actions/consults';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class Card extends Component {
   state = {
      emailSent: '',
      firstVisit: '',
      reviewed: '',
      reportSent: '',
      comments: ''
   }

   static propTypes = {
      consult: PropTypes.object.isRequired,
      updateConsult: PropTypes.func.isRequired
   }

   onChange = (name, value) => {
      this.setState({ [name]: value });
   }

   saveComments = value => {
      this.setState({ comments: value });
   }

   formatDate = value => {
      if (!value) {
         return value;
      }
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return value.toLocaleDateString(undefined, options);
   }

   onClick = (row, e) => {
      e.preventDefault();
      const emailSent = this.formatDate(this.state.emailSent);
      const firstVisit = this.formatDate(this.state.firstVisit);
      const reviewed = this.formatDate(this.state.reviewed);
      const reportSent = this.formatDate(this.state.reportSent);
      const comments = this.state.comments;
      this.props.updateConsult({ row, emailSent, firstVisit, reviewed, reportSent, comments });
   }

   render() {
      const CustomInput = ({ value, onClick }) => (
         <button className="btn btn-secondary btn-sm" onClick={onClick}>
            {value ? value : "00/00/0000"}
         </button>
      );
      const c = this.props.consult;
      return (
         <Fragment>
            <div className="card">
               <div className="card-header text-light bg-primary">
                  <h5>{c.data["Faculty Full Name:"]} &nbsp;&nbsp; {c.data["Course Name and Section:"]}</h5>
               </div>
               <div className="card-body">
                  <p className="card-text h6 text-dark"><b>On-Campus or On-Line: </b>{c.data["On-Campus or On-Line"]}</p>
                  <p className="card-text h6 text-dark"><b>Course Days: </b>{c.data["Course Days"]}</p>
                  <p className="card-text h6 text-dark"><b>Course Time: </b>{c.data["Course Time:"]}</p>
                  <p className="card-text h6 text-dark"><b>SCOT Options: </b>{c.data["SCOT Options"]}</p>
                  <p className="card-text h6 text-dark"><b>Preferred Method of Contact: </b>{c.data["Preferred Method of Contact"]}</p>
                  <table>
                     <thead>
                        <tr className="d-flex text-center">
                           <th className="col-2">Email Sent</th>
                           <th className="col-2">First Visit</th>
                           <th className="col-2">Reviewed</th>
                           <th className="col-2">Report Sent</th>
                           <th className="col-6">Comment</th>
                           <th className="col-2" />
                        </tr>
                     </thead>
                     <tbody>
                        <tr className="d-flex text-center">
                           <td className="col-2"><DatePicker
                              customInput={<CustomInput />}
                              selected={c.data["Email Sent"] ? new Date(c.data["Email Sent"]) : this.state.emailSent}
                              onChange={(date) => this.onChange("emailSent", date)} /></td>
                           <td className="col-2"><DatePicker
                              customInput={<CustomInput />}
                              selected={c.data["First Visit"] ? new Date(c.data["First Visit"]) : this.state.firstVisit}
                              onChange={(date) => this.onChange("firstVisit", date)} /></td>
                           <td className="col-2"><DatePicker
                              customInput={<CustomInput />}
                              selected={c.data["Report Reviewed"] ? new Date(c.data["Report Reviewed"]) : this.state.reviewed}
                              onChange={(date) => this.onChange("reviewed", date)} /></td>
                           <td className="col-2"><DatePicker
                              customInput={<CustomInput />}
                              selected={c.data["Report Sent"] ? new Date(c.data["Report Sent"]) : this.state.reportSent}
                              onChange={(date) => this.onChange("reportSent", date)} /></td>
                           <td className="col-6"><input className="w-100" type="text" value={c.data["Comments"]}
                              onChange={(value) => this.saveComments(value)}></input></td>
                           <td className="col-2"><button type="button" className="btn btn-success btn-sm font-weight-bold"
                              onClick={e => this.onClick(c.row, e)}>Update</button></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </Fragment>
      );
   }
}

export default connect(null, { updateConsult })(Card);