import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { increment } from "./redux/actions/counter";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { getProducts } from "./redux/reducers/counter";
import { addTodo, deleteTodo, editTodo } from "./redux/actions/todos";
import ListItems from "./components/ListItems";

interface Todo {
  id?: string;
  name: string;
  completed: boolean;
}

function App() {
  const [count, setCount] = useState(0);
  const counter = useAppSelector((state) => state.counter.count);
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const handleDispatch = () => {
    // dispatch(increment(3));
    // dispatch(getProducts(4));
    dispatch(addTodo({ name: "test", completed: false }));
  };

  const hanleDeleteTodo = (index: number) => {
    console.log("from top parent: ", index);
    dispatch(deleteTodo(index));
  };

  const hanleEditTodo = (todo: Todo, index: number) => {
    dispatch(editTodo({ todo, index }));
    // console.log("Todo to edit from top parent: ", { todo, index });
  };

  //onDeleteItem?: (index: number) => void;
  // onEditItem?: (todo: Todo) => void;

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleDispatch}>count is {counter}</button>
      </div>

      <ListItems
        todos={todos}
        onDeleteItem={hanleDeleteTodo}
        onEditItem={hanleEditTodo}
      />
    </div>
  );
}

export default App;
