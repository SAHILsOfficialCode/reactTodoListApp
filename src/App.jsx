import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <TodoList />
      </div>
    </>
  );
}

export default App;
