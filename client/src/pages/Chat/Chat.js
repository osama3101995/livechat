import React, {Component} from 'react';
import "./Chat.css";
import { io } from "socket.io-client";
import { ENDPOINT } from '../../constants';
import ChatView from './Chat-view';

class Chat extends Component {

  ;

  constructor(props) {
    super(props);
    this.state = {
      name : (new URLSearchParams(this.props.location.search)).get('name'),
      room: (new URLSearchParams(this.props.location.search)).get('room'),
    };

  }



  render(){


  return (
    <ChatView location = {{name: this.state.name, room : this.state.room}}></ChatView>
  );
  }





}

export default  Chat;