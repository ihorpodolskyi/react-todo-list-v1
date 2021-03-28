const initialState = {
  todos: []
};

export default function list(state = initialState, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        todos: [...state.todos, action.payload]
      };
    case "DELETE_TASK":
      return {
        todos: state.todos.filter(item => item.id !== action.payload.id)
      };
    case "SAVE_TASK":
      return {
        todos: state.todos.map(item => {
          if (item.id !== action.payload.id) {
            return item;
          } else {
            return action.payload;
          }
        })
      };
    case "TOGGLE_TASK":
      return {
        todos: state.todos.map(item => {
          if (item.id !== action.payload.id) {
            return item;
          } else {
            return action.payload.task;
          }
        })
      };
    default:
      return state;
  }
}