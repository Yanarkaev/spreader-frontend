import React from "react";
import style from "./aside.module.scss";
import chat from "../../assets/Aside/chat1.svg";
import contacts from "../../assets/Aside/contacts.svg";
import doska from "../../assets/Aside/dashboard.svg";
import email from "../../assets/Aside/email.svg";
import settings from "../../assets/Aside/settings.svg";
import tasks from "../../assets/Aside/tasks.svg";
import deals from "../../assets/Aside/deals.svg";
// import menuLogo from "../../assets/Aside/profile.svg";
const Aside = () => {
  return (
    <>
      <div className={style.dashboard}>
        <header className={style.logo}> LOGO </header>
        <div className={style.mySelf}>
          <div className={style.nameAndEmail}>
            <div className={style.names}>Sierra Ferguson</div>
            <div className={style.email}>iznor@gmail.com</div>
          </div>
        </div>

        <main className={style.menu}>
          <div className={style.navItem}>
            <img src={doska} className="img" alt="i" />
            <button>Доска</button>
          </div>
          <div className={style.navItem}>
            <img src={tasks} className="img" alt="i" />
            <button>Задания</button>
          </div>
          <div className={style.navItem}>
            <img src={email} className="img" alt="i" />
            <button>Email</button>
          </div>
          <div className={style.navItem}>
            <img src={contacts} className="img" alt="i" />
            <button>Контакты</button>
          </div>
          <div className={style.navItem}>
            <img src={chat} className="img" alt="i" />
            <button>Чат</button>
          </div>
          <div className={style.navItem}>
            <img src={deals} className="img" alt="i" />
            <button>Сделки</button>
          </div>
          <div className={style.line}></div>
          <div className={style.settings}>
            <img src={settings} alt="i" />
            <button>Настройки</button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Aside;
