import axios from "axios";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    userId: "",
    id: "",
    title: "",
    completed: false,
  });
  const [newTodo, setNewTodo] = useState(""); // Added state for new todo

  const url = "https://jsonplaceholder.typicode.com/todos";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => setTodos(response.data))
      .catch((err) => console.log("Error", err));
  }, []);

  // Update functionality
  const handleEdit = (id) => {
    setShow(true);
    const todoIndex = todos.find((todo) => todo.id === id);
    setData({
      userId: todoIndex.userId,
      id: todoIndex.id,
      title: todoIndex.title,
      completed: todoIndex.completed,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Save functionality
  const handleSave = () => {
    if (data.title.trim() !== "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === data.id ? { ...todo, title: data.title } : todo
      );
      setTodos(updatedTodos);
      setShow(false);
    } else {
      alert("Title cannot be empty");
    }
  };

  // Delete functionality
  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    // Dummy call to delete
    axios.delete(`${url}/${id}`).catch((err) => console.error(err));
  };

  // Toggle completion status
  const handleToggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  // Add new todo functionality
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoObj = {
        userId: todos.userId + 1, // set the user ID accordingly
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };

      setTodos([newTodoObj, ...todos]);
      setNewTodo("");

      // Dummy call to add new todo
      axios.post(url, newTodoObj).catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <span style={{ fontSize: "25px" }}>Add new todo : </span>

        <input
          type="text"
          name="newTodo"
          value={newTodo}
          placeholder="Enter new todo"
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ height: "25px" }}
        ></input>
        {"  "}
        <button type="submit" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <br />
      <div>
        {show && (
          <div>
            <span>Change the title :</span>{" "}
            <input
              type="text"
              name="title"
              value={data.title}
              placeholder="Edit the content"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            ></input>
            <button type="submit" onClick={handleSave}>
              Submit
            </button>
          </div>
        )}
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              listStyle: "none",
              textAlign: "center",
            }}
          >
            {todo.title}
            {todo.completed ? " - Completed" : " - Not Completed"} <br />
            <button onClick={() => handleEdit(todo.id)}>Edit</button>
            {"  "}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
            {"  "}
            <button onClick={() => handleToggleCompletion(todo.id)}>
              {todo.completed ? "Mark as Not Completed" : "Mark as Completed"}
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
