import React from 'react';
import RegisterForm from "../../components/RegisterForm";
import styles from './index.module.scss'
import Header from "../../components/Header";

const RegisterPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.formWrap}>
                <Header/>
                <h1>Регистрация</h1>
                <div className={styles.containerForm}>
                <RegisterForm/>
                </div>
            </div>
            <div className={styles.frame}/>
        </div>
    );
};

export default RegisterPage;
