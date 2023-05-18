import { BranchesList } from '../../components/BranchesList/BranchesList';
import s from "./AdminPage.module.scss"

export const AdminPage = () => {
    return (
        <div className={s.AdminPage}>
            <BranchesList />
        </div>
    );
};
