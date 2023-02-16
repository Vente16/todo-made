import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id?: string;
  name: string;
  completed: boolean;
}

interface TodoList {
  todos: Todo[];
}

const initialState: TodoList = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      const { payload } = action;
      const newTodo = { ...payload, id: `${new Date().getTime()}` };
      state.todos = [...state.todos, newTodo];
    },
    deleteTodo(state, action: PayloadAction<number>) {
      const { payload } = action;
      state.todos = state.todos.filter((_, index) => index !== payload);
    },
    editTodo(state, action: PayloadAction<{ todo: Todo; index: number }>) {
      const {
        payload: { index, todo },
      } = action;
      state.todos[index] = todo;
    },
  },
});

export default todosSlice.reducer;
