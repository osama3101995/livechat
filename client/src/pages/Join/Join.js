import React, {Component} from 'react';
import { Link } from "react-router-dom";
import "./Join.css";

class Join extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      room: '',
    };
    
  }

  render(){

    const styles = {
      root: {
        flexGrow: 1,
      },
    };

  const classes  = styles;
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => 
            {
              this.setState(
                {name: event.target.value,}
              )
            }
          } />
        </div>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => 
            {
              this.setState(
                {room: event.target.value,}
              )
            }} />
        </div>


        {(!this.state.name || !this.state.room) ? null : <Link to={`/chat?name=${this.state.name}&room=${this.state.room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>}
      </div>
    </div>
  );
  }

}

export default  Join;