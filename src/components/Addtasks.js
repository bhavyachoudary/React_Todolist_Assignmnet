import React, { Component } from 'react'
import { Container, Form,Row ,Col, Button} from 'react-bootstrap';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import * as Icon from 'react-bootstrap-icons';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios';

const regExForTask = RegExp(/^[ A-Za-z0-9]*$/);
var arr=[];

export class Addtasks extends Component {
    constructor(props)
    {
        super(props);
        this.state={
           
            date:'',
            formData:[],
            isFlag:false,
            index:0,
            task:'',
            priority:'',
            errors:{task:'',priority:''},
            tasks:[{id:1,task:"Learning Python",priority:3,date:'07-Oct-2021'}]}
            
    }
  
    componentDidMount(){
        const URL = "http://localhost:3002/TableData";
      
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({formData:data})
            console.log(this.state.formData)
        })

        const allTasks = localStorage.getItem("taskList");
        this.setState({tasks: JSON.parse(allTasks) });

 
}

    handler=(event)=>
    {
        event.preventDefault();
        const{name,value}=event.target;
        let errors=this.state.errors;
        switch(name){
            case 'task':
                errors.task=regExForTask.test(value)?'':'should be in alphnumberic';
                break;
            case 'priority':
                errors.priority=value>5?'Priority shoulb be 1-5':'';
                break;
         
        }
        this.setState({errors,[name]:value},()=>{
            console.log(errors)
        })
    }

   addTask=(event)=>{
   
       let arr=[];
        event.preventDefault();
       let {task,priority,id,tasks,date}=this.state;
       this.setState({tasks:[...tasks,{id,task,priority,date}]})
       console.log(tasks)

       arr.push(...tasks,{id,task,priority,date});
       localStorage.setItem('taskList',JSON.stringify(arr));
       
    //    arr.push({task,priority})
    //    localStorage.setItem("taskList",JSON.stringify(arr))

       document.querySelectorAll("input").forEach(ele=>{ele.value=" "})
       this.add();
  
   }

   add = (event) => {
   
    let formData = {
        task: this.state.task, 
        priority: this.state.priority
      
         }
    
    const URL = "http://localhost:3002/TableData"
    axios.post(URL, formData)
    
    .catch(err => { console.log(err) })
    console.log(formData);
  
}

 deleteTask = (id) => {
// const tasks=[...this.state.tasks];
    const user = JSON.parse(localStorage.getItem('taskList'))
    console.log(user)
    const bool = window.confirm("Do You really want to delele this?")
    if (bool == true) {
    user.splice(id, 1)
        this.setState({ tasks:[...user] });
        localStorage.setItem('taskList', JSON.stringify(user));
    }
    const user1 = JSON.parse(localStorage.getItem('taskList'))
    const userd = user1.TaskList
    this.setState({...userd})
    }


    editTask=(index) =>{
         console.log(this.state.tasks)
         const tasks=[...this.state.tasks];
         console.log(tasks)
        tasks[index].task= `<strike>${tasks[index].task}</strike>`;
        this.setState({tasks:[...tasks]})
       
       } 
       
    updateIndex(index){

        let tasksBox= this.state.tasks;
        let item=tasksBox[index]
        this.setState({id:item.id,task:item.task,priority:item.priority,date:item.date,index:index,isFlag:true})
       
    }

    updatetask(index) {
        // const temp=this.state.id;
        console.log(index)
        let tasks = [...this.state.tasks];
        let update = document.getElementById("value2").value;
        let update1 = document.getElementById("value3").value;
        let update2=document.getElementById("date-picker1").value
       
       this.state.tasks[this.state.index] = {"task":update,"priority":update1,"date":update2}
       this.setState({ tasks: this.state.tasks,isFlag:false });

       localStorage.setItem("taskList",JSON.stringify(this.state.tasks)) 

}
   
dateChange=()=>{

        const datePicker=document.getElementById("date-picker").value
        const fetchDate = JSON.parse(localStorage.getItem('taskList'))
 
        this.setState({date:datePicker})
        // this.setState({ tasks: this.state.tasks });

        // localStorage.setItem("taskList",JSON.stringify(this.state.tasks)) 
        JSON.parse(localStorage.getItem('taskList'))

    }

    render() {
      const {errors}=this.state;
      const storageData = JSON.parse(localStorage.getItem('taskList'));
      console.log(storageData)

       return (
            <div>
            
               <Container className="con pb-4 mb-4 ">
                   <Container className="mt-4 mb-2 w-100" >
                   <h2>Todo List</h2>
                  <Row>
                  <Col lg={8}>
                        <Form onSubmit={this.addTask} className="form-style">
                   
                            <Row>
                            <Col>
                                   <label>Task Title</label>
                               </Col>
                            </Row>
                            <Row>
                                <Col>
                                   <input type="text" name="task" id="taskName" placeholder="Enter Task" className="form-control" onChange={this.handler}/>
                                   {errors.task.length>0&&<span style={{color:'red'}}>{errors.task}</span>}
                               </Col>
                            </Row>
                            <Row>
                                <Col>
                                   <label>Priority</label>
                               </Col>
                            </Row>
                            <Row>
                                <Col>
                                   <input type="number" name="priority" id="dateTask" placeholder="Enter Priority" className="form-control" onChange={this.handler}/>
                                   {errors.priority.length>0&&<span style={{color:'red'}}>{errors.priority}</span>}
                               </Col>
                           
                            </Row>
                            <Row>
                                <Col>
                                   <label>Calender</label>
                               </Col>
                            </Row>

                            <Row>
                            <Col>
                                   
                                <DatePickerComponent placeholder="Enter Date" id="datepick" width="300px" className="brd"
                                format="dd-MMM-yyyy" onChange={this.dateChange} id="date-picker"></DatePickerComponent>
                            </Col>
                           
                              </Row>

                          
                 

                           <br/>
                            <input type="submit" value="Add Task" onClick="SubmitForm()" className="btn btn-success" />
                        </Form>
                        </Col>
                       
                   
                   
                   
{/*                     
            </Col>
                 <Col lg={4}>
                 <h4>Data from Server</h4>
                     <table border="1" className="p-4 mt-3 w-75">
                     
                    <thead>
                        <tr>
                            <th>Id</th>
                        <th>TaskName</th>
                        <th>Priority</th>
                        </tr>
                       
                    </thead>
                    
                    <tbody>{storageData.map((item,index)=>
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{item.task}</td>
                            <td>{item.priority}</td>
                        </tr>
                    
                        )}
                        
                    </tbody> 
                 </table>
              </Col> */}

               </Row>
                </Container>
                
                   <Container className="mt-5">
                       <Row><Col md={8}>
                       <table className="table bord"  >
                       <thead>
                           <tr>
                               <th>Id</th>
                               <th>Date</th>
                               <th>Task</th>
                               <th>Priority</th>
                               <th colSpan="2" className="text-center">Actions</th>
                           </tr>
                       </thead>
                       
                          <tbody>
                          {this.state.tasks.map((pro,index)=>
                        
                          <tr key={index}>
                              <td>{index+1}</td>
                              <td>{pro.date}</td>

                              <td>{ReactHtmlParser(pro.task)}</td>

                              {/* <td style={ this.state.isFlag? { textDecoration:'line-through'} : {}}>{pro.task}</td> */}
                              <td>{pro.priority ==1 ? 'Lowest':
                              pro.priority  ==2 ? 'Low':
                              pro.priority ==3 ? 'Average':
                              pro.priority ==4 ? 'High': 'Highest'}</td>
                            
                               <td><button type="button" className="btn btn-light" onClick={()=>this.deleteTask(index)} ><Icon.X color="red" size={30} /></button></td>
                               <td><button type="button" className="btn btn-light"  onClick={()=>this.editTask(index)} ><Icon.Check lg color="green" size={30} /></button></td>
                               <td><button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>this.updateIndex(index)} >Update</button></td>
                          </tr>
                            )}
                      </tbody>
                      {/* <button onClick={this.addTodo()}>Save</button>
                    
                       */}
                   </table>
                           </Col></Row>
                   
                   
               </Container>
                {this.state.isFlag == 1? 

               <div class="container mt-5">
     
                <div class="modal" id="myModal">
                <div class="modal-dialog">
                <div class="modal-content">
                 <div class="modal-header">
                     <h5 class="modal-title text-dark">UPDATE</h5>
                     <button type="button" class="btn-close btn btn-danger" data-bs-dismiss="modal">Close</button>
                 </div>
                 <div class="modal-body">
                     <form>
                    
                         <div class="mb-3">
                             <label class="form-label required">TASKName</label>
                             <input type="text" id="value2" placeholder="Enter Task"  class="form-control"/>
                         </div>
                         <div class="mb-3">
                             <label class="form-label required">PRIORITY</label>
                             <input type="number" id="value3" placeholder="Enter Priority"  class="form-control"/>
                         </div>
                         <div className="text-dark">
                            <label class="form-label required">DATE</label>
                            <DatePickerComponent placeholder="Enter Date" width="460px"
                                format="dd-MMM-yy"  id="date-picker1"></DatePickerComponent>
                        </div>
                         
                     </form>
                 </div>
                 <div class="modal-footer">
                     <button type="submit" class="btn btn-warning"  data-bs-dismiss="modal" onClick={() => this.updatetask()} >Add</button>
                    
                 </div>
             </div>
                    </div>
                </div>
            </div>
            
            :''}
               </Container>
            </div>
        )
    }
}

export default Addtasks