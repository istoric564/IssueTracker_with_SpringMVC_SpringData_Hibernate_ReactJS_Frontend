import React, { Component } from 'react';
import IssueService from './IssueService';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ListIssueComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            issues : []
        }
        this.addIssue = this.addIssue.bind(this);
        this.editIssue = this.editIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);
    }

    deleteIssue(id){
      IssueService.deleteIssue(id).then(res =>{
        this.setState({issues: this.state.issues.filter(issues => issues.id !== id)});
      });
    }

    viewIssue(id){
      this.props.history.push(`/view-issue/${id}`)
    }
    
    editIssue(id){
      this.props.history.push(`/add-issues/${id}`)
    }

    componentDidMount(){
        IssueService.getIssues().then((res) =>{
            this.setState({issues: res.data})
        });
    }

    addIssue(){
    this.props.history.push('/add-issues/-1');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Issues List</h2>
                <div className = "row">
                <Button variant="contained" color="default" onClick={this.addIssue} className={Button} startIcon={<CloudUploadIcon />}>Create Issue </Button>
                </div>
            <TableContainer component={Paper}>
      <Table className="table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Issues Id</TableCell>
            <TableCell align="center">Created By</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Report</TableCell>
            <TableCell align="center">Created On</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.issues.map(
              issue => (
            <TableRow key={issue.id}>
              <TableCell align="center">{issue.id} </TableCell>
              <TableCell align="center">{issue.createdBy}</TableCell>
              <TableCell align="center">{issue.issueDescription}</TableCell>
              <TableCell align="center">{issue.issueSummary}</TableCell>
              <TableCell align="center">{issue.createdOn}</TableCell>
              <TableCell align="center">{issue.status}</TableCell>
              <TableCell align="center">{issue.title}</TableCell>
              <TableCell>
              <Button color="primary" align="center" size="medium" onClick={() =>this.editIssue(issue.id)} className={Button} >           Update</Button>
              <Button color="secondary" align="center" size="medium" onClick={() =>this.deleteIssue(issue.id)} className={Button} >        Delete</Button>
              <Button color="secondary" align="center" size="medium" onClick={() =>this.viewIssue(issue.id)} className={Button} >        View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        );
    }
}

export default ListIssueComponent;