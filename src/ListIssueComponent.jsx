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
    }
    
    editIssue(id){
      this.props.history.push(`/update-issues/${id}`)
    }

    componentDidMount(){
        IssueService.getIssues().then((res) =>{
            this.setState({issues: res.data})
        });
    }

    addIssue(){
    this.props.history.push('/add-issues');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Issues List</h2>
                <div className = "row">
                <Button variant="contained" color="default" onClick={this.addIssue} className={Button} startIcon={<CloudUploadIcon />}>Create or Delete Issue </Button>
                </div>
            <TableContainer component={Paper}>
      <Table className="table" size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Issues Id</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Report</TableCell>
            <TableCell align="right">Created On</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.issues.map(
              issue => (
            <TableRow key={issue.id}>
              <TableCell component="th" scope="row">{issue.name} </TableCell>
              <TableCell align="right">{issue.createdBy}</TableCell>
              <TableCell align="right">{issue.issueDescription}</TableCell>
              <TableCell align="right">{issue.issueSummary}</TableCell>
              <TableCell align="right">{issue.createdOn}</TableCell>
              <TableCell align="right">{issue.status}</TableCell>
              <TableCell align="right">{issue.title}</TableCell>
              <TableCell>
              <Button color="primary" onClick={() =>this.editIssue(issue.id)} className={Button} >Update</Button>
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