import React from "react";
import style from "./aside.module.scss";
import chatIcon from "../../assets/Aside/chatIcon.svg"
import contactsIcon from "../../assets/Aside/contactsIcon.svg"
import dashboardIcon from "../../assets/Aside/dashboardIcon.svg"
import emailIcon from "../../assets/Aside/emailIcon.svg"
import settingsIcon from "../../assets/Aside/settingsIcon.svg"
import tasksIcon from "../../assets/Aside/tasksIcon.svg"
import dealsIcon from "../../assets/Aside/dealsIcon.svg"

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
            <img src={dashboardIcon} alt="i" /> Доска
          </div>
          <div className={style.tasks}>
            <img src={tasksIcon} alt="i" />
            Задания
          </div>
          <div className={style.email}>
            <img src={emailIcon} alt="i" />
            Email
          </div>
          <div className={style.contacts}>
            <img src={contactsIcon} alt="i" />
            Контакты
          </div>
          <div className={style.chat}>
            <img src={chatIcon} alt="i" />
            Чат
          </div>
          <div className={style.deals}>
            <img src={dealsIcon} alt="i" />
            Сделки
          </div>
          <div className={style.line}></div>
          <div className={style.settings}>
            <img src={settingsIcon} alt="i" /> Настройки
          </div>
        </main>
      </div>
    </>
  );
};

export default Aside;
