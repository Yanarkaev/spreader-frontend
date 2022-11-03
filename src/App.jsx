import styles from "./app.module.scss"
import Aside from "./components/Aside/Aside";

function App() {
  return (
    <div className={styles.app}>
     <Aside />
    </div>
  );
}

export default App;
