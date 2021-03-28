import React from "react";
import { connect } from "react-redux";
import "../App.css";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditModeEnabled: false,
      currentItemId: null
    };
    this.taskInput = React.createRef();
    this.newTask = React.createRef();
  }

  deleteTask = id => {
    this.props.onDeleteTask(id);
  };

  saveTask = id => {
    let newInputValue = document.getElementById(id);
    if (newInputValue.value.trim() && newInputValue.value.length) {
      this.props.onSave(document.getElementById(id));
      this.setState({
        isEditModeEnabled: false,
        currentItemId: id
      });
    } else {
      alert("The field must not be empty :)");
    }
  };

  completedTask = id => {
    const { todos } = this.props.todoStore;
    let changedTask = {};

    todos.forEach(item => {
      if (item.id === id) {
        changedTask = item;
      }
    });

    changedTask.isChecked = !changedTask.isChecked;
    this.props.onToggleTask(id, changedTask);

    this.setState({
      isChecked: !this.state.isChecked,
      currentItemId: id
    });
  };

  enableEditMode = id => {
    this.setState({
      isEditModeEnabled: !this.state.isEditModeEnabled,
      currentItemId: id
    });
  };

  renderListLabel = item => {
    const { isEditModeEnabled, currentItemId } = this.state;
    if (isEditModeEnabled && currentItemId === item.id) {
      return (
        <input
          className="app__item-text"
          id={item.id}
          type="text"
          defaultValue={item.taskName}
          ref={this.newTask}
        />
      );
    } else {
      return (
        <span
          className={`app__task ${item.isChecked ? "app__completed-task" : ""}`}
        >
          {item.taskName}
        </span>
      );
    }
  };

  render() {
    const { item } = this.props;
    const { isEditModeEnabled } = this.state;
    const { currentItemId } = this.state;

    return (
      <li className="app__list-item" key={item.id}>
        <button
          className="app__task-completed btn-group"
          onClick={() => this.completedTask(item.id)}
        />

        {this.renderListLabel(item)}

        {isEditModeEnabled && currentItemId === item.id && (
          <button
            className="app__edited-task-save btn-group"
            onClick={() => this.saveTask(item.id)}
          />
        )}

        {(!isEditModeEnabled || currentItemId !== item.id) && (
          <button
            className="app__edit-task btn-group"
            onClick={() => this.enableEditMode(item.id)}
          />
        )}

        <button
          className="app__remove-task btn-group"
          onClick={() => this.deleteTask(item.id)}
        />
      </li>
    );
  }
}

export default connect(
  state => ({
    todoStore: state
  }),
  dispatch => ({
    onDeleteTask: id => {
      dispatch({
        type: "DELETE_TASK",
        payload: {
          id
        }
      });
    },
    onToggleTask: (id, task) => {
      dispatch({
        type: "TOGGLE_TODO",
        payload: {
          id,
          task
        }
      });
    },
    onSave: newTask => {
      dispatch({
        type: "SAVE_TASK",
        payload: {
          taskName: newTask.value,
          id: newTask.id
        }
      });
    }
  })
)(TodoItem);