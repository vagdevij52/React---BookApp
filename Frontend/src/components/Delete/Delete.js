import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

class Delete extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {  
            BookID:''
        };
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
        this.submitDeleteHandler = this.submitDeleteHandler.bind(this);
    }
    componentWillMount(){
        this.setState({
            deleteBookFlag : false
        })
    }

    bookIdChangeHandler = (e) => {
        this.setState({
            bookIdChangeHandler : e.target.value
        })
    }

    submitDeleteHandler = (e) =>{
        e.preventDefault();
        const data = {
            BookID : this.state.bookIdChangeHandler
        }
        axios.post('http://localhost:3001/delete',data)
    .then(response => {
        console.log("Status Code in frontend - delete.js: ",response.status);
        if(response.status === 200){
             this.setState({
                deleteBookFlag : true,
             })
        }
    }).catch(err=>{        
            console.log("400 server -- Book doesn't exists");
            document.getElementById('bookNotAvailable').innerHTML = "Book doesn't exist";
            console.log(err);
            this.setState({
                deleteBookFlag : false,
            });
    });
    }
    render(){

        if(cookie.load('cookie')){
            console.log("Able to read cookie");
        }else{
            console.log("Not Able to read cookie");
             return <Redirect to= "/login"/>
        }
        
        const deleteBookRedirect = this.state.deleteBookFlag;
         if(deleteBookRedirect === true){
              return <Redirect to= "/home"/>
         }else{
            console.log("render() - book doesnt exist");
         }
        return(
            <div class="container">
                <form onSubmit={this.submitDeleteHandler} method="post">
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input required onChange = {this.bookIdChangeHandler} type="number" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit">Delete</button>
                    </div>
                    <br/><br/><br/>
                    <div>
                    <div id="bookNotAvailable" style={{color: "red",fontSize:"18px"}}></div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Delete;