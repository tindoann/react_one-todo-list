import React, { Component } from 'react'
import styles from './App.css'; 
// add new item 
// delete a new item
// complete a new item 

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  //incorporating local storage 
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
  }

  addItem() {
    // create a new item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
 
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  }
  
  render() {
    return (
      <div>

      <h1 className="app-title">ONE LIST</h1>
        
        <div className="container">
        <div
          style={{
            padding: 30,
            textAlign: "left",
            maxWidth: 500,
            margin: "auto"
          }}
        >
          Add an Item...
          <br />
          <input
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button
            className="add-btn btn-floating"
            onClick={() => this.addItem()}
            disabled={!this.state.newItem.length}
          >
            <i class="material-icons"> + </i>
          </button>
          <br /> <br />
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
                    <i class="material-icons">x</i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      </div>
    );
  }
}

export default App; 



/* import React, { Component } from 'react'; 

class App extends Component {
  constructor(props){
    super(props); 

    this.state={
      newItem:"", 
      list:[]
    }
  }

  updateInput(key, value){
    //update react state
    this.setState({
      [key]: value
    })
  }

  addItem(){
  //create item with unique id 
    const newItem={
      id: 1 + Math.random(), 
      value: this.state.newItem.slice()
    }; 

  //copy of current list of items
  const list = [...this.state.list]; 

  //ad new item to list
  list.push(newItem); 

  //update state with new list and reet newItem input
  this.setState({
    list, 
    newItem:""
    }); 
  }

  deleteItem(id){
    //copy current list of items
    const list = [...this.state.list]; 

    //filter out item being deleted
    const updateList = list.filter(item => item.id !== id); 

    this.setState({list: updateList}); 
  }
  render() {
    return (
      <div className="App">
        <div>
        Add an Item...
        <br/>
        <Input
          type='text'
          placeholder='Type item here...'
          value={this.state.newItem}
          onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button 
             onClick={() => this.addItem()}
          >
            Add
          </button>
          <br/>
          <ul>
            {this.state.list.map(item => {
              return(
                <li key={item.id}>
                {item.value}
                <button>
                 onClick={() => this.deleteItem(item.id)}
                 >
                 X
                </button>
                </li>
              )
            })}
          </ul>
      </div>
    </div>
    ); 
  }
}

export default App; 

*/