import React, {Component} from "react";

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            username: "",
            profileUrl: "",
            number: "",
            name: ""
        }
    }
    
    // Handle the change in an input field
    onInputChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value 
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // If request from signup form then route should be signup else t shoul be login
        let route = this.props.signUp ? "signup" : "login";
        // Calling a user action passed in a props and sending form data and route as params.
        this.props.userAction("post", `users/${route}`, this.state).then(res=>{
            this.props.history.push('/');
        }).catch((error)=>{
            return null;
        });
        // Reset a form
        this.setState({
            email: "",
            password: "",
            username: "",
            profileUrl: "",
            number: "",
            name: ""
        })
    }

    render(){
        // Destructure all the data from props
        let {heading, buttonText, signUp, onError, removeError, history} = this.props;

        // To remove an error when route is changed -> Invoking remove error action 
        history.listen(()=>{
            removeError();
        })

        return(
            <div className="col-md-6 col-sm-12 offset-md-3 mb-4"> 
                <h1 align="center" className="mt-5 mb-4">{heading}</h1>
                {
                    onError === null ? " " : 
                    <p className="alert alert-danger mt-4" role="alert">{onError}</p>
                }
                <form className="form form-control" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" 
                            value={this.state.email}
                            onChange={this.onInputChange}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" name="password" id="exampleInputPassword1" placeholder="Password" 
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" 
                            value={this.state.password}
                            onChange={this.onInputChange}
                        />
                        <small id="emailHelp" className="form-text" style={{color:'red'}}>Password should contain atleast 1 UPPERCASE, 1 lowercase, 1 special character (eg: '@', '$'), number and it should have atleast 6 character</small>
                    </div>
                    {
                        
                        // If signup is passed as a props then display a signup page.
                        signUp && (
                            // This is the content to be added in the from when signup key is set in the props
                            <div> 
                                <div className="form-group">
                                    <label for="name">Full Name</label>
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Enter your name." 
                                        value={this.state.name}
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="username">Username</label>
                                    <input type="text" className="form-control" name="username" id="username" aria-describedby="emailHelp" placeholder="Enter username" 
                                        value={this.state.username}
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="imageurl">Profile image url</label>
                                    <input type="url" className="form-control" name="profileUrl" id="profileUrl" placeholder="Paste your image url here." 
                                        value={this.state.profileUrl}
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="number">Contact info.</label>
                                    <input type="number" min="1000000000" max="9999999999" className="form-control" name="number" id="number" placeholder="Enter a valid mobile number." 
                                        value={this.state.number}
                                        onChange={this.onInputChange}
                                    />
                                </div>
                            </div>
                        )
                    }
                    <button type="submit" className="btn btn-primary col-12">{buttonText}</button>
                </form>
            </div>
        )
    }
}

export default Login