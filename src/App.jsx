import styles from "./app.module.scss";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className={styles.app}>
      <Dashboard />
    </div>
  );
}

export default App;
