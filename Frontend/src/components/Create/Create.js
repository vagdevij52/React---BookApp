import axios from 'axios';
import cookie from 'react-cookies';
import React, {Component} from 'react';
import {Redirect} from 'react-router';
import { useState } from 'react'


class Create extends Component{
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {  
            BookID:'',
            Title:'',
            Author:'',
            createBookFlag:false
        };
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
        this.bookTitleChangeHandler = this.bookTitleChangeHandler.bind(this);
        this.bookAuthorChangeHandler = this.bookAuthorChangeHandler.bind(this);
        this.submitCreateHandler = this.submitCreateHandler.bind(this);
    }

    componentWillMount(){
        this.setState({
            createBookFlag : false
        })
    }

    bookIdChangeHandler = (e) => {
        this.setState({
            bookIdChangeHandler : e.target.value
        })
    }
    bookTitleChangeHandler = (e) => {
        this.setState({
            bookTitleChangeHandler : e.target.value
        })
    }
    bookAuthorChangeHandler = (e) => {
        this.setState({
            bookAuthorChangeHandler : e.target.value
        })
    }
    

    submitCreateHandler = (e) =>{
        let redirectHome = null;
        console.log("Bookd id in create.js frontend : "+this.state.bookIdChangeHandler);
        e.preventDefault();
        const data = {
            BookID : this.state.bookIdChangeHandler,
            Title : this.state.bookTitleChangeHandler,
            Author : this.state.bookAuthorChangeHandler
        }
        axios.defaults.data = true;
        axios.post('http://localhost:3001/create',data)
        .then(response => {
            console.log("Status Code in frontend: ",response.status);
            if(response.status === 200){
                 this.setState({
                    createBookFlag : true,
                 })
            }
        }).catch(err=>{
                this.setState({
                    createBookFlag : false,
                });
                console.log("500 server -- Book already exists");
                document.getElementById("bookAlrdyExists").innerHTML = "Book already exists";
        });
    }
    render(){

        if(cookie.load('cookie')){
            console.log("Able to read cookie");
        }else{
            console.log("Not Able to read cookie");
             return <Redirect to= "/login"/>
        }

        const createBookRedirect = this.state.createBookFlag;
         if(createBookRedirect === true){
              return <Redirect to= "/home"/>
         }else{
            console.log("render() - book already exists");
         }
        return(
            <div>
            <div class="container"></div>
            <div>
                <br/>
                <div className="container">
                    <form onSubmit={this.submitCreateHandler} method="post">
                        <div style={{width: '30%'}} className="form-group">
                            <input  required onChange = {this.bookIdChangeHandler} type="number" className="form-control"  name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} className="form-group">
                                <input required onChange = {this.bookTitleChangeHandler} type="text" className="form-control"  name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} className="form-group">
                                <input required onChange = {this.bookAuthorChangeHandler}  type="text" className="form-control"  name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                        <button className="btn btn-success"  type="submit">Create</button>
                        </div>
                        <br/><br/>
                        <div>
                        <div id="bookAlrdyExists" style={{color: "red",fontSize:"18px"}}></div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        )
    }
}

export default Create;