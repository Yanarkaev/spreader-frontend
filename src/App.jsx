
import Aside from "./components/Aside/Aside";
import Dashboard from "./components/dashboard/Dashboard";


import styles from "./app.module.scss";
import Main from "./components/Main/Main"

function App() {
  return (
    <div className={styles.app}>
      <Dashboard />
      <Main />
    </div>
  );
}

export default App;
