import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { addNewJob } from "../actions/jobActions";
// import {DragDrop} from './DragDrop';
// import FileDrop from 'react-file-drop';
import classnames from "classnames";
import socket from '../utils/webSocket.js'

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            link: "",
            errors: {}
        };
    }

    // handleDrop = (files, event) => {
    //     console.log(files, event);
    // };

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    onMyJobsClick = e => {
        e.preventDefault();
        this.props.history.push("/jobs");
    };

    onDownloadClick = e => {
        e.preventDefault();
        const jobData = {
            id: this.props.auth.user.id,
            link: this.state.link
        };
        this.props.addNewJob(jobData, this.props.history);
    };

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value , errors: {}});
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const { user } = this.props.auth;
        const { errors } = this.state;

        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="row">
                        <div className="col l6 left-align">
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    bottom: '9rem'
                                }}
                                onClick={this.onMyJobsClick}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                My Jobs
                            </button>
                        </div>

                        <div className="col l6 right-align">
                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                    bottom: '9rem'
                                }}
                                onClick={this.onLogoutClick}
                                className="btn btn-large waves-effect waves-light hoverable red accent-3"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Hey there,</b> {user.name.split(" ")[0]}!
                                <p className="flow-text grey-text text-darken-1">
                                    What do you need me to download today?
                                </p>
                            </h4>

                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.link}
                                    error={errors.link}
                                    id="link"
                                    placeholder="paste your link here"
                                    className={classnames("", {
                                        invalid: errors.error
                                    })}
                                />

                                <span className="red-text">
                                    {errors.error}
                                </span>
                            </div>

                            <button
                                style={{
                                    width: "150px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem",
                                }}
                                onClick={this.onDownloadClick}
                                className="btn btn-large waves-effect waves-light hoverable green accent-3"
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        socket.on("connect", () => {
            socket.emit("userId", {userId: this.props.auth.user.id})
        });
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    addNewJob: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { logoutUser, addNewJob }
)(Dashboard);