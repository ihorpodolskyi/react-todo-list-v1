import React from "react";
import TodoItem from "./todo-item";
import { connect } from "react-redux";
import "../App.css";

class TodoList extends React.Component {
  render() {
    const { todos } = this.props.todoStore;

    return (
      <ul className="app__tasks-list">
        {todos.map(item => (
          <TodoItem key={item.id} item={item} />
        ))}
      </ul>
    );
  }
}

export default connect(
  state => ({
    todoStore: state
  }),
  dispatch => ({})
)(TodoList);
