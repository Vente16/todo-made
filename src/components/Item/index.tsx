import { useState } from "react";

interface Todo {
  id?: string;
  name: string;
  completed: boolean;
}

interface Props extends Todo {
  index?: number;
  onDeleteItem?: (index: number) => void;
  onEditItem?: (todo: Props, index: number) => void;
}

function Item({
  id,
  name,
  index = 0,
  completed,
  onDeleteItem,
  onEditItem,
}: Props) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const handleComplete = () => {
    if (onEditItem) onEditItem({ name, id, completed: true }, index);
  };

  const handleDelete = () => {
    if (onDeleteItem) onDeleteItem(index);
  };
  const handleChangeInput = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  return (
    <li>
      {toggleEdit ? (
        <>
          <input onChange={handleChangeInput} value={inputValue} />
          <button
            type="button"
            onClick={() => {
              setToggleEdit(false);
              setInputValue(name);
            }}
          >
            x
          </button>
          <button
            type="button"
            onClick={() => {
              if (onEditItem)
                onEditItem({ name: inputValue, id, completed }, index);
              setToggleEdit(false);
            }}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          {name}
          <button type="button" onClick={() => setToggleEdit(true)}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </li>
  );
}

export default Item;
