import React from 'react';
import {Switch, Route, withRouter} from "react-router-dom";
import Home from '../Components/Home';
import {connect} from 'react-redux';
import Form from '../Components/Form';
import {setUserAction} from '../store/actions/auth';
import {removeError} from '../store/actions/error';

// Routing configuration in main 
function Main(props){
    // Getting set userAction from the connect() function 
    const {setUserAction, error, removeError, user, message} = props;
    return(
        <Switch>
            {/* Landing page */}
            <Route exact path="/" render={(props)=><Home currentUser={user} messages={message} {...props} />}/>
            {/* Route for login page */}
            <Route path="/login" render={(props)=><Form removeError={removeError} heading="Welcome back :)" onError={error} buttonText="Login" userAction={setUserAction} {...props} />} />
            {/* Route for signup page */}
            <Route path="/signup" render={(props)=><Form removeError={removeError} heading="Join Warbler !!" buttonText="SignUp" onError={error} userAction={setUserAction} signUp {...props} />} />
        </Switch>
    )
}

// Mapping state to props of the component
function mapStateToProps(state) {

    return {
        user: state.currentUser,
        error: state.errorReducer.message
    }
}

// withRouter gives the history of all the routes. setUserAction passed as state to Main which is rendered as props.
export default withRouter(connect(mapStateToProps, {setUserAction, removeError})(Main))