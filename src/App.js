// add new item 
// delete a new item
// complete a new item 

import React, { Component } from 'react'; 

class App extends Component {
  constructor(props){
    super(props); 

    this.state={
      newItem:"", 
      list:[]
    }
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
    list, newItem:""
  })
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
      </div>
    </div>
    ); 
  }
}

export default App; 
