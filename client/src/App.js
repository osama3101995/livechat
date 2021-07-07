import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import Join from "./pages/Join/Join";
import Chat from "./pages/Chat/Chat";

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/chat" exact component={Chat} />
      </Router>
    </div>
  );
}

export default App;
