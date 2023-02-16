import { configureStore } from "@reduxjs/toolkit";
import counter from "./reducers/counter";
import todos from "./reducers/todos";

const store = configureStore({
  reducer: {
    counter: counter,
    todos: todos,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
