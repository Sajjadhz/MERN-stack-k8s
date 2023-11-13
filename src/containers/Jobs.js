import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { logoutUser } from "../actions/authActions";
import MaterialTable from "material-table";
import CircularProgress from '@material-ui/core/CircularProgress';
import socket from '../utils/webSocket.js'
import {Button, Dialog, DialogActions,DialogContent, DialogTitle, DialogContentText} from "@material-ui/core";

class Jobs extends Component {
    constructor() {
        super();
        this.state = {
            jobs: [],
            showDelete: false
        };
    }

    handleDeleteConfirm = () => {
        socket.emit('deleteJob', this.state.deleteId);

        this.setState({
            showDelete: false,
            deleteId: null,
            deleteName: null,
            deleteProgress: 0
        })
    };

    handleDeleteCancel = () => {
        this.setState({
            showDelete: false,
            deleteId: null,
            deleteName: null,
            deleteProgress: 0
        })
    };

    changeData = () => socket.emit('initial data');

    renderConfirm = () => {
        return (
            <Dialog open={this.state.showDelete}  aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Delete this job?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Do you really want to delete the download '${this.state.deleteName}' ? It has already completed ${parseInt(this.state.deleteProgress)}%.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDeleteCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleDeleteConfirm} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    render() {

        return (
            <div className="container">
                {this.renderConfirm()}
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to home
                        </Link>
                    </div>
                </div>
                <div style={{ marginTop: "4rem" }} className="row">
                    <MaterialTable
                        columns={[
                            { title: "Date added", field: "date", type: 'datetime'},
                            { title: "Name", field: "name", searchable: true, cellStyle: {height: '10px'}},
                            { title: "Status", field: "status"},
                            { title: "Download Speed", field: "download_speed", type: 'string'},
                            { title: "Progress", field: "progress", render: rowData => rowData.progress ?
                                    <CircularProgress variant="static" value={rowData.progress} />:
                                    <CircularProgress variant="static" color={'secondary'} value={100} />
                            }
                        ]}
                        data={this.state.jobs}
                        title="Your downloads"
                        actions={[
                            rowData => ({
                                icon: 'pause',
                                tooltip: 'Resume Job',
                                onClick: (event, rowData) => socket.emit('pauseJob', rowData.id),
                                hidden: rowData.status !== 'active'
                            }),
                            rowData => ({
                                icon: 'play_arrow',
                                tooltip: 'Resume Job',
                                onClick: (event, rowData) => socket.emit('resumeJob', rowData.id),
                                hidden: rowData.status !== 'paused'
                            }),
                            rowData => ({
                                icon: 'save_alt',
                                tooltip: 'Download',
                                onClick: (event, rowData) => socket.emit('downloadJob', rowData.id),
                                hidden: rowData.status !== 'complete' && rowData.status !== 'zipping' && rowData.status !== 'ready'
                            }),
                            {
                                icon: 'clear',
                                tooltip: 'Remove Job',
                                onClick: (event, rowData) => this.setState({
                                    showDelete: true,
                                    deleteId: rowData.id,
                                    deleteName: rowData.name,
                                    deleteProgress: rowData.progress
                                })
                            }
                        ]}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.fetchJob = setInterval(() => {
            socket.emit('getJobs', {userId: this.props.auth.user.id});
        }, 1000);

        socket.on("get_jobs_res", data => this.setState({
            jobs: data.map(e => {
                // console.log(e);
                return {
                    id: e.id,
                    date: new Date(e.date),
                    name: e.name,
                    status: e.progress < 100.00 ? e.status : 'complete',
                    download_speed: parseInt(e.download_speed / 1000) + ' KB/s',
                    progress: e.progress,
                    dir: e.dir,
                }
            })
        }));

        socket.on("download_ready", data => console.log(data));
    }

    componentWillUnmount() {
        clearInterval(this.fetchJob);

        socket.off('get_jobs_res');
        socket.off('download_ready');
    }

}

Jobs.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Jobs);