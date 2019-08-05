import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getMessageAction } from "../store/actions/message";

// Landing page
// function Home(props){
//     if(props.currentUser.isAuthenticated){
//         props.messageAction('get', '/messages/', {header: {authorization: "Bearer "+localStorage.getItem('jwtToken')}}).then((res=>{
//             console.log(res);
//         })).catch((error)=>{
//             console.log(error);
//         })
//         return (
//             <div>
//                 Welcome back to Warbler !!!
                
//             </div>
//         )
//     }else{
//         return(
//             <div className="container mt-5">
//                 <h1 align="center" className="col-md-6 offset-md-3">Welcome to wabler</h1>
//                 <Link to="/signup" className="btn btn-primary btn-lg col-md-4 offset-md-4">SignUp to Warbler !!</Link>
//             </div>
//         )
//     }
// }

class Home extends Component{
    componentWillMount(){
        if(this.props.currentUser.isAuthenticated){
            this.props.getMessageAction('get', 'messages/', {}).then((res)=>{
                console.log(res);
            }).catch((error)=>{
                console.log(error)
            });
        }
    }

    render(){
        if(this.props.currentUser.isAuthenticated){
            // this.props.messageAction('get', '/messages/', {header: {authorization: "Bearer "+localStorage.getItem('jwtToken')}}).then((res=>{
            //     console.log(res);
            // })).catch((error)=>{
            //     console.log(error);
            // })
            console.log(this.props.messages);
            return (
                <div>
                    Welcome back to Warbler !!!
                    {
                        this.props.messages.map((message)=>{
                            return (
                                <p>{message.text}</p>
                            )
                        })
                    }
                </div>
            )
        }else{
            return(
                <div className="container mt-5">
                    <h1 align="center" className="col-md-6 offset-md-3">Welcome to wabler</h1>
                    <Link to="/signup" className="btn btn-primary btn-lg col-md-4 offset-md-4">SignUp to Warbler !!</Link>
                </div>
            )
        }
    }
}

const mapStateToProps = (state)=>{
    console.log(state);
    return {
        messages: state.messageReducer
    }
}

export default connect(mapStateToProps, {getMessageAction})(Home);