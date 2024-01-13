import "./App.css";
import { TodosContainer } from "./components/custom/todos/TodosContainer";

function App() {
  return (
    <section>
      <div>
        <h1 className="bg-red-200 text-3xl font-semibold p-5 rounded-md">
          Hello Todo's Project with React Redux
        </h1>
        <TodosContainer />
      </div>
    </section>
  );
}

export default App;
