import React, { Component } from 'react';
import IssueService from './IssueService';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Calendar from 'ciqu-react-calendar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class UpdateIssueComponent extends Component {
    

    constructor(props) {
        super(props);
        
        this.state = {

            id: this.props.match.params.id,
            createdBy: ' ',
            issueDescription: ' ',
            issueSummary: ' ',
            createdOn: ' ',
            status: ' ',
            title: ' '

        }
        
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeCreatedByHandler = this.changeCreatedByHandler.bind(this);
        this.updateIssue = this.updateIssue.bind(this);
    }
    
    componentDidMount(){
        IssueService.getIssueById(this.state.id).then((res) =>{
            let issue = res.data;
            this.setState({id: issue.id,
            createdBy: issue.createdBy,
            issueDescription: issue.issueDescription,
            issueSummary: issue.issueSummary,
            createdOn: issue.createdOn,
            status: issue.status,
            title: issue.title
            });
        });
    }

    updateIssue = (I) =>{
        I.preventDefault();
        let issue = {id: this.state.id, createdBy: this.state.createdBy, issueDescription: this.state.issueDescription, issueSummary: this.state.issueSummary,
        createdOn: this.state.createdOn, status: this.state.status, title: this.state.title};
        console.log('issue =>' + JSON.stringify(issue));
        IssueService.updateIssue(issue, this.state.id).then( res =>{
            this.props.history.push('/issues');
        });
    }
    
    changeIdHandler = (event) =>{
        this.setState({id: event.target.value});
    }

    changeCreatedByHandler = (event) =>{
        this.setState({createdBy: event.target.value});
    }

    changeIssueDescriptionHandler = (event) =>{
        this.setState({issueDescription: event.target.value});
    }

    changeIssueSummaryHandler = (event) =>{
        this.setState({issueSummary: event.target.value});
    }

    changeIssueCreatedOnHandler = (event) =>{
        this.setState({createdOn: event.target.value});
    }

    changeStatusHandler = (event) =>{
        this.setState({status: event.target.value});
    }

    changeTitleHandler = (event) =>{
        this.setState({title: event.target.value});
    }

    cancel(){
        this.props.history.push('/issues');
    }

    onChange = (createdOn, inputValue) => {
        console.log(createdOn.format('YYYY-MM-DD'))
        this.setState({createdOn})
      }
    
      onOpenChange = (status) => {
        console.log('open status: ' + status)
      }
    
      disabledDate = (currentDate, inputValue) => {
        return false
      }

    render() {
        const {onChange, onOpenChange, disabledDate} = this
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className ="text-center">Update Issue</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Id: </label>
                                        <input placeholder = "id" name="id" className="form-control"
                                        value={this.state.id} onChange={this.changeIdHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Created By: </label>
                                        <input placeholder = "Created By" name="Number" className="form-control"
                                        value={this.state.createdBy} onChange={this.changeCreatedByHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Issue Description: </label>
                                        <input placeholder = "Issue Description" name="Description" className="form-control"
                                        value={this.state.issueDescription} onChange={this.changeIssueDescriptionHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Issue Summary: </label>
                                        <input placeholder = "Issue Summary" name="Summary" className="form-control"
                                        value={this.state.issueSummary} onChange={this.changeIssueSummaryHandler}/>
                                    </div>
                                    <div>
                                            <Calendar
                                                onChange={onChange}
                                                value={this.state.createdOn}
                                                allowClear={true}
                                                disabled={false}
                                                placeholder={'please input date'}
                                                format={'YYYY-MM-DD'}
                                                onOpenChange={onOpenChange}
                                                disabledDate={disabledDate}
                                            />
                                            </div>
                                    <div className="form-group">
                                            <label>Status:</label>
                                            <select
                                            name="status"
                                            onChange={this.changeStatusHandler}
                                            className="form-control"
                                            value={this.state.status}
                                            >
                                            <option value="">Please select status</option>
                                            <option value="CREATED">CREATED</option>
                                            <option value="CLOSE">CLOSE</option>
                                            <option value="COMPLETED">COMPLETED</option>
                                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                                            </select>
                                        </div>
                                    <div className = "form-group">
                                        <label> Title: </label>
                                        <input placeholder = "Title" name="Title" className="form-control"
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <Button variant="contained" onClick={this.updateIssue} color="primary" size="large" className="button" startIcon={<SaveIcon />}> Save </Button>
                                    <Button variant="contained" onClick={this.cancel.bind(this)} color="secondary" className="button" startIcon={<DeleteIcon />}> Cancel </Button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateIssueComponent;