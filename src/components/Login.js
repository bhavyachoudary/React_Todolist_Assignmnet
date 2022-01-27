import React, { Component } from 'react';


import {Container,Row,Button,InputGroup,Form,Col} from 'react-bootstrap';
import {BrowserRouter as Router,Route,Link,withRouter} from 'react-router-dom';
import { Redirect } from 'react-router';

const regForName=RegExp(/^[a-zA-Z]{3,100}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass=RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
const isLogin=false

export class Login extends Component {
    constructor(props){
        super(props);
        this.state={
           dataVal:{ 
               uname:null,
               email:null,
               password:null
            },
               formData:[],
               userData:[],
           errors:{
                uname:'',
                email:'',
                password:''
          }
           
           
        }
    }
   
    componentDidMount()
    {
        const URL="http://localhost:3001/UserData"
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
            this.setState({userData:data})
        })
    }

    handler=(event)=>{
            const{name,value}=event.target;
            let errors=this.state.errors;
            let fetchVal = this.state.dataVal;
            console.log(fetchVal)
            switch(name){
               
                case 'uname':
                errors.uname=regForName.test(value)?'':'userName should be in aplahbets';
                fetchVal.uname = value;
                break;

                case 'email':
                       errors.email=regForEmail.test(value)? '':'Email is not valid';
                       fetchVal.email = value;
                       break;
             
                case 'password':
                       errors.password=regForPass.test(value)? '':'password should be in aplhanumeric & special chars';
                       fetchVal.password = value;
                        this.state.password=value;
              
              
                }
                this.setState({errors,[name]:value},()=>{
                    console.log(errors)
                })
        }

        loginSubmit=(event)=>{
            let arr=[]
            event.preventDefault();
           
            let items = this.state.dataVal;
            console.log(items.email)
          
           if(this.validate(this.state.errors))
            {
                console.log(this.state.userData)
                for(var i=0;i<this.state.userData.length;i++) {
                    if(this.state.userData[i].email === items.email && this.state.userData[i].password === items.password) {
                      alert("Login Succesfull");
                       this.setState({formData : [...this.state.formData,
                        {
                        'email':items.email,
                        'password':items.password
                       
                      }]
                      
                    });
                //    arr.push({})
                      
                    // this.logIn=true;
                  
                    localStorage.setItem('userdetails',items.email);
                    this.props.history.push("/home")
                   break;
                    }
                    else if(i===this.state.userData.length-1){
                        alert("Users data not correct");
                    }
                }
                  console.log(this.state)
                    document.getElementById('email').value='';
                     document.getElementById('password').value='';
                     console.log(this.state)
                }            
                else {
                   alert("Invalid Form");
                    document.getElementById('email').value='';
                     document.getElementById('password').value='';
                 
                }
            }
          validate=(errors)=>{
             let valid=true;
             Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
             return valid;
         }
   
       
        
       
    render() {
        const {errors}=this.state;
        const {email,password}=this.state;
        const {logIn}=this.state
      
        return (
            <>
            <Container>
            
            <Container className=" w-75 pt-3 pb-3  mt-5 mb-3 bord bg-log">
                <h2 className="pt-2 pb-3 text-center text-green">Login Form</h2>
                <hr/>
                <Row>
                    <Col md={6}>
                        <img src="login.jpg" className="w-75 pl-4"/>
                    </Col>
                <Col md={5}>
                    <Form  onSubmit={this.loginSubmit} className="pt-4 ">

                    <Form.Group className="mb-3 " >
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={this.handler} required/>
                            {errors.email.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.email}</p>}
                        </Form.Group>

                     <Form.Group className="mb-3" >
                            <Form.Label>Pasword:</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={this.handler} required />
                            {errors.password.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.password}</p>}
                        </Form.Group>

                       
                                            
                         <Button variant="success" type="submit" className="mt-3" >Login</Button>
                         <Button variant="warning" type="submit" href="/registration" className="ml-3 mt-3"> Sign Up</Button>
                        

                    </Form>
                    </Col>
                </Row>
            </Container>

           </Container>
           </>
     )

  }   

  
    }
export default Login;
