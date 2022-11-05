// import Aside from "./components/Aside/Aside";
// import Dashboard from "./components/dashboard/Dashboard";
import styles from "./app.module.scss";
import Task from "./components/task/Task";

function App() {
  return (
    <div className={styles.app}>
      <Task />
    </div>
  );
}

export default App;
