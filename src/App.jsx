import styles from "./app.module.scss";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
// import styles from "./app.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Main />
      <Aside />
    </div>
  );
}

export default App;
