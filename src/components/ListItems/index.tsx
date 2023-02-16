import Item from "../Item";

interface Todo {
  id?: string;
  name: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  onDeleteItem?: (index: number) => void;
  onEditItem?: (todo: Todo, index: number) => void;
}

function ListItems({ todos, onDeleteItem, onEditItem }: Props) {
  console.log("hello from list: ", todos);
  const handleDeleteItem = (index: number) => {
    if (onDeleteItem) onDeleteItem(index);
  };

  const handleEditItem = (todo: Todo, index: number) => {
    if (onEditItem) onEditItem(todo, index);
  };
  return (
    <div>
      <h1>Hola Lista</h1>
      <ul>
        {todos.map((todo, index) => (
          <Item
            {...todo}
            key={todo.id}
            index={index}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ListItems;
