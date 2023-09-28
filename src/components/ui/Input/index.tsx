import React, {FC} from 'react';
import styles from './index.module.scss'
import Vector from '../../img/Vector.svg'
import getUnicodeFlagIcon from "country-flag-icons/unicode";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?:string
    descriptionLabel: string,
    error?: string,
    inputId?: string
    onChange?:  React.ChangeEventHandler<HTMLInputElement> | undefined,
    phone_prefix?:string

}

const Input: FC<InputProps> = ({phone_prefix,onChange ,icon, inputId, error, descriptionLabel, ...otherProps}) => {

    return (<>
            <label className={`${styles.descriptionLabel} ${error ? styles.error : ''}`}>

                <div className={styles.description}>
                    {descriptionLabel}
                    {error ? <span className={styles.errorDots}>*</span> : null}
                </div>
                    <input id={inputId} onChange={onChange} className={`${styles.inputGeneric} ${icon ? styles.iconBlock:''}`} {...otherProps} />
                {icon ? <div className={styles.icon}>{getUnicodeFlagIcon(icon)} {phone_prefix? <span className={styles.phone_prefix}>{phone_prefix}</span>:''}  <img src={Vector}/> </div>: null}
                {error ? <span className={styles.errorMessage}>{error}</span> : null}
            </label>

        </>
    );
};

export default Input;
