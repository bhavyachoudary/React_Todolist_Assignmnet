import React, { Component } from 'react';
import Navs from './Navs';
 import Addtasks from './Addtasks';


export class Home extends Component {
    render() {
        return (
            <div>
                <Navs/>
                <Addtasks/>
               
                
            </div>
        )
    }
}

export default Home
