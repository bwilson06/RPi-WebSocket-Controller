import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import io from "socket.io-client";


class Home extends Component {
    constructor(props){
        super(props);
    this.state = {
        pinState: false
    }

    this.socket = io.connect("http://localhost:3001");

    this.turnOn = () => {
        this.setState({pinState: true}, this.sendMessage)
    }
    this.turnOff = () => {
        this.setState({pinState: false}, this.sendMessage)
    }

    this.sendMessage = () => {
        this.socket.emit("newState", this.state.pinState);
    }
}
    
    render() {
        return (
            <div>
                <Jumbotron>
                    <div className="text-center">
                <Button variant="primary" size="lg" value="true" onClick={this.turnOn}>Turn Led On</Button>
                <Button variant="danger" size="lg" onClick={this.turnOff}>Turn Led Off</Button>
                </div>
                </Jumbotron>
            </div>
        );
    }
}

export default Home;