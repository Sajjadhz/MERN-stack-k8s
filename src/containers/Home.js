import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from "react-redux";

class Home extends Component {
    render() {
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            The <b>online</b> file downloader 3
                        </h4>
                        <p className="flow-text grey-text text-darken-1">
                            Let me handle your slow downloads and torrents!
                        </p>
                        <br />
                        <div className="col s6">
                            <Link
                                to="/register"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Register
                            </Link>
                        </div>
                        <div className="col s6">
                            <Link
                                to="/login"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                className="btn btn-large btn-flat waves-effect light-green black-text"
                            >
                                Log In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }
}

// Home.propTypes = {
//     loginUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(Home);