import React from "react";
import TodoList from "./components/todo-list";
import { connect } from "react-redux";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { date: new Date() };
    this.taskInput = React.createRef();
  }

  componentDidMount = () => {
    this.timerID = setInterval(() => this.tick(), 1000);
  };

  componentWillUnmount = () => {
    clearInterval(this.timerID);
  };

  tick = () => {
    this.setState({
      date: new Date()
    });
  };

  addTask = () => {
    if (
      this.taskInput.current.value.trim() &&
      this.taskInput.current.value.length
    ) {
      this.props.onAddTask(this.taskInput.current.value);
      this.taskInput.current.value = "";
    } else {
      alert("The field must not be empty :)");
    }
  };

  render() {
    const { todos } = this.props.todoStore;

    return (
      <div className="app">
        <div className="app__time-date">
          <span className="app__date">
            {this.state.date.toLocaleDateString()}
          </span>
          <span className="app__time">
            {this.state.date.toLocaleTimeString()}
          </span>
        </div>
        <div className="app__container">
          <form
            className="app__form"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              className="app__input-add"
              type="text"
              ref={this.taskInput}
            />
            <button className="app__btn-add" onClick={() => this.addTask()}>
              ADD TASK #{todos.length + 1}
            </button>
          </form>
        </div>

        <TodoList />
      </div>
    );
  }
}

export default connect(
  state => ({
    todoStore: state
  }),
  dispatch => ({
    onAddTask: taskName => {
      dispatch({
        type: "ADD_TASK",
        payload: {
          taskName,
          id: Date.now().toString(),
          isComplete: false
        }
      });
    }
  })
)(App);