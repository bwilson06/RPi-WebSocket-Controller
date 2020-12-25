import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import io from "socket.io-client";
import '../Main.css'


class Home extends Component {
    constructor(props){
        super(props);
    this.state = {
        servoAngle: 0,
        loading: true,
        mouseX: 0,
        mouseY: 0,
        canvasInit: false
    }

    this.socket = io.connect("http://localhost:3001");

    this.updateValue = (event) => {
        this.setState({servoAngle: event.target.value}, this.sendMessage)
        console.log(event.target.value)
    }

    this.sendMessage = () => {
        var stateMessage = {
            mouseX: this.state.mouseX,
            mouseY: this.state.mouseY
        }
        this.socket.emit("newState", stateMessage);
    }

    this.trackPos = (event) => {
            if (this.state.canvasInit == true){
            var mouseX = event.pageX - event.target.offsetLeft
            var mouseY = Math.abs(event.pageY -  event.target.offsetTop -  event.target.clientHeight)
            var scaledY = Math.floor(((180 - 0) / (480 - 0)) * (mouseY - 480) + 90)
            var scaledX = Math.floor(((180-0) / (640 - 0)) * (mouseX - 640) + 90) 
            if (mouseX >= 640){
            mouseX = 640
            }else if(mouseX <= 0){
            mouseX = 0
            }else if (mouseY >= 480){
            mouseY = 480
            }else if (mouseY <= 0){
            mouseY = 0
            }
            if (scaledX >= 90){
                scaledX = 90
            }else if (scaledX <= -90){
                scaledX = -90
            }
            this.setState({mouseX: scaledX, mouseY: scaledY}, this.sendMessage())
        }
    }

    this.initializeCanvas = (event) => {
        this.setState({canvasInit: true})
    }

    this.renderInitButton = () => {
        if (this.state.canvasInit){
            return (
                <></>
            )
        }else{
            return(
                <Button variant="primary" id="init-laser-btn" onClick={(event) => this.initializeCanvas(event)}>Initialize Tracking</Button>
            )
        }
    }

    this.QuitTracking = () => {
        this.setState({canvasInit: false})
        this.setState({mouseX: 0, mouseY: 0})
    }

    this.renderQuitButton = () => {
        if (this.state.canvasInit){
            return (
                <Button variant="danger" onClick={(event) => this.QuitTracking(event)}>Quit Tracking</Button>
            )
        }else{
            return (
                <></>
            )
        }
    }

}

    componentDidMount(){
        this.setState({loading: false})
    }
    
    render() {
        if (this.state.loading == true){
        return (
            <div>
                <Jumbotron>
                    <div className="text-center">
                        <h1>Move servo motor</h1>
                        <div style={{display: "flex"}}></div>
                        <input type="range"
                        min={0} max={180}
                        value={this.state.servoAngle}
                        onChange={this.updateValue} >
                        </input>
                        <h1>{this.state.servoAngle}°</h1>
                        <Button size="lg" variant="info">+10°</Button>
                        <Button size="lg" variant="info">-10°</Button>
                    </div>
                </Jumbotron>
            </div>
        );
        }else{
            return (
                <div>
                <Jumbotron>
                        <h1 className="text-center">Move servo motor</h1>
                        <div className="text-center">
                        <Button className="camera-buttons" variant="info">-</Button>
                        <input type="range"
                        min={0} max={180}
                        value={this.state.servoAngle}
                        onChange={this.updateValue}
                        className="value-slider" >
                        </input>
                        <Button className="camera-buttons" variant="info">+</Button>
                        </div>
                        <h1 className="text-center">{this.state.servoAngle}°</h1>
                </Jumbotron>
                <div className="text-center yo">
                 <iframe width="640" height="480" src="http://192.168.1.96:8080">Unwanted text here</iframe>
                 <div>
                 <div className="mouse-canvas" id="mouse-canvas" onMouseMove={(event) => this.trackPos(event)}>
                     {this.renderInitButton()}
                 </div>
                <h2>[Mouse X Pos: {this.state.mouseX}], [Mouse Y Pos: {this.state.mouseY}]</h2>
                {this.renderQuitButton()}
                 </div>
                </div>
                <br></br>
            </div>
            )
        }
    }
}

export default Home;