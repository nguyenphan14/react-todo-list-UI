import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem.js';
import tick from './img/dropdown.svg';
class App extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'All',
      allComplete: false,
      todoItems: [
        {
          title: "Learn React",
          isComplete:  true
        },
        {
          title: "Revise",
          isComplete: true
        },
        {
          title: "Cook Rice",
          isComplete: false
        }
      ]
    }

    this.onItemClicked = this.onItemClicked.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.imgOnClicked = this.imgOnClicked.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
  }


  onItemClicked(item) {
    return (e) => {
      let indexItem = this.state.todoItems.indexOf(item);
      let newItems = [...this.state.todoItems];
      newItems[indexItem].isComplete = !newItems[indexItem].isComplete;
      this.setState({
        todoItems: newItems
      })
    }
  }

  onKeyDown(event) {
    if(event.keyCode === 13) { //Enter key code
      let text = event.target.value;
      event.target.value = '';
      this.setState({
        todoItems: [{
          title: text,
          isComplete: false
        },
        ...this.state.todoItems]
      })
    }
  }

  imgOnClicked(event) {

    let newItems = [...this.state.todoItems].map((item) => {
      return {title: item.title, isComplete: !this.state.allComplete}
    })

    this.setState({
      allComplete: !this.state.allComplete,
      todoItems: newItems
    })
  }

  onClickFilter(event) {
    let filerValue = event.target.innerText;
    this.setState({
      filter: filerValue
    })
  }

  onClearCompleted() {
    let newTodoItems = [...this.state.todoItems];
    newTodoItems = newTodoItems.filter((item) => item.isComplete === false);
    this.setState({
      todoItems: newTodoItems
    })
  }

  render() {
    let tickClassName = this.state.allComplete ? 'allCompleted' : 'allComplete';
    let renderItems = [...this.state.todoItems];
    if(this.state.filter === 'Active') {
      renderItems = renderItems.filter((item) => item.isComplete === false);
    } else if(this.state.filter === 'Completed') {
      renderItems = renderItems.filter((item) => item.isComplete === true);
    }

    if(this.state.todoItems.length > 0) {
      return (
        <div className="App">
            <div className="Header">
              <img className={tickClassName} onClick={this.imgOnClicked} src={tick} width="25px"/>
              <input type="text"
              placeholder="What need to be done?"
              onKeyDown={this.onKeyDown}/>
            </div>
            {renderItems.map((item, index) => <TodoItem 
            key={index} 
            item={item} 
            onClick={this.onItemClicked(item)}
            /> )}
            <div className="Filter">
              <div className="Filter__Number">{renderItems.filter((item) => item.isComplete === false).length} items left</div>
              <ul className="Filter__State">
                <li onClick={this.onClickFilter.bind(this)}>All</li>
                <li onClick={this.onClickFilter.bind(this)}>Active</li>
                <li onClick={this.onClickFilter.bind(this)}>Completed</li>
              </ul>
              <div onClick={this.onClearCompleted} className="Filter__Clear">Clear Completed</div>
            </div>
        </div>
      )
    } else {
      return (
        <div className="App">Nothing Here</div>
      )
    }
    
  }
}

export default App;
