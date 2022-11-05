import Aside from "./components/Aside/Aside";
import Dashboard from "./components/dashboard/Dashboard";
import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Dashboard />
    </div>
  );
}

export default App;
