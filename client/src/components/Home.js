import React, { Component } from 'react';
import io from "socket.io-client";

class Home extends Component {
    constructor(props){
        super(props);
        console.log('yo')
        this.socket = io.connect("http://localhost:3001");
    }
    render() {
        return (
            <div>
                <h1>yo</h1>
            </div>
        );
    }
}

export default Home;