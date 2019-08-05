import axios from 'axios'; //Using axios to send the request to the server. Light weight as compared to jquery

export function setHeaders(token){
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

// Handler for userLogin and SignUp
export function apiCall(method, route, userdata){
    // Returning promise to the actions
    return new Promise((resolve, reject)=>{
        // Making a post request to localhost:3001/users/login or localhost:3001/users/signup 
        return axios[method](route, userdata).then( res =>{
            return resolve(res.data);
        }).catch(error=>{
            return reject(error.response.data.error ? error.response.data.error : "Please Check your internet connection.");
        })
    })
}