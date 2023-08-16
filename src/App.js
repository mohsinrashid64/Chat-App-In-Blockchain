// import { Component } from 'react';
import './App.css';
import Heading from "./Components/heading.js"
import List from './Components/list';


/////////////////////////////////////////////
// Importing multiple exports
// import pi, {doublePi, triplePi} from './Components/math'; // Note: Default Import Name does not Matter. However in the curly brackets name does matter.
// OR
import * as pi from "./Components/math";
/////////////////////////////////////////////

//


function App() {
  return (
    <div className="App">
      {/* <h1>App Page</h1> */}
      <Heading/>
      <List/>
      {/* <ul>
        <li>{pi}</li>
        <li>{doublePi()}</li>
        <li>{triplePi()} </li>
      </ul> */}
      {/* OR */}
      <ul>
        <li>{pi.default}</li>
        <li>{pi.doublePi()}</li>
        <li>{pi.triplePi()} </li>
      </ul>


    </div>
  );
}

export default App;


