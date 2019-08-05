import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {setUser, handleLogout} from '../store/actions/auth';

// Navigation bar 
class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
                <Link className="navbar-brand" to="/">Warbler Clone</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {
                            this.props.user.isAuthenticated && (
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/message">Message</Link>
                                </li>
                            )
                        }
                    </ul>
                    <aside className="my-2 my-lg-0">
                        {
                            this.props.user.isAuthenticated ?
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <span className="nav-link logout" onClick={this.props.handleLogout}>Signout<span className="sr-only">(current)</span></span>
                                    </li>
                                </ul> 
                            :
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/login">Signin <span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to="/signup">Signup</Link>
                                    </li>
                                </ul> 
                        }   
                    </aside>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state){
    return ({
        user: state.currentUser
    })
}

export default connect(mapStateToProps, {setUser, handleLogout})(Navbar)