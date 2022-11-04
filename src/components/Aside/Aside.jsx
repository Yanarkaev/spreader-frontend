import React from "react";
import style from "./aside.module.scss";
import chat from "../../assets/Aside/chatIcon.svg";
import contacts from "../../assets/Aside/contactsIcon.svg";
import doska from "../../assets/Aside/dashboardIcon.svg";
import email from "../../assets/Aside/emailIcon.svg";
import settings from "../../assets/Aside/settingsIcon.svg";
import tasks from "../../assets/Aside/tasksIcon.svg";
import deals from "../../assets/Aside/dealsIcon.svg";

const Aside = () => {
  return (
    <>
      <div className={style.dashboard}>
        <header> LOGO </header>
        <div className={style.mySelf}>
          <div className={style.nameAndEmail}>
            <div className={style.names}>Sierra Ferguson</div>
            <div className={style.email}>iznor@gmail.com</div>
          </div>
        </div>

        <main className={style.menu}>
          <div className={style.doska}>
            <img src={doska} className="img" alt="i" />
            <button>Доска</button>
          </div>
          <div className={style.tasks}>
            <img src={tasks} className="img" alt="i" />
            <button>Задания</button>
          </div>
          <div className={style.email}>
            <img src={email} className="img" alt="i" />
            <button>Email</button>
          </div>
          <div className={style.contacts}>
            <img src={contacts} className="img" alt="i" />
            <button>Контакты</button>
          </div>
          <div className={style.chat}>
            <img src={chat} className="img" alt="i" />
            <button>Чат</button>
          </div>
          <div className={style.deals}>
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
