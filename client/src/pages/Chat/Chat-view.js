import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { ENDPOINT } from '../../constants';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import "./Chat.css";

let socket;

function ChatView(props) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const {name , room } = props.location;
        
        socket = io(ENDPOINT)

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {

        })

        return () => {
                    
            socket.disconnect()
            socket.off()
        }
    }, [props.location])

    useEffect(() => {
        socket.on('message', (recivedMessage) => {
            setMessages([...messages, recivedMessage])
        })
    }, [messages])
    

    const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }

    
    return (
        <div className="outerContainer">
        <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users}/>
      </div>
  
    );
  }
  
  export default ChatView