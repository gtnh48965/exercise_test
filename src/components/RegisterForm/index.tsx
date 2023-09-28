import React, {useEffect, useRef, useState} from 'react';
import Input from "../ui/Input";
import styles from './index.module.scss'
import IMask from 'imask';
import axios from "axios";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import useOnClickOutside from "../utils/useClickOutside";
import {Link} from "react-router-dom";
import {PropagateLoader} from "react-spinners";

export const BASE_URL = process.env.REACT_APP_API_URL

interface Country {
    id: number;
    name: string;
    short_code: string;
    prioritized: number;
    phone_mask: string;
    phone_prefix:string,
}

const RegisterForm = () => {
    const [mail, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [website, setWebsite] = useState('')
    const [numberEmployees, setNumberEmployees] = useState('')
    const [country, setCountry] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const [checkMail, setCheckMail] = useState(false);
    const [checkPhone, setCheckPhone] = useState(false);
    const [checkFirstName, setCheckFirstName] = useState(false);
    const [checkLastName, setCheckLastName] = useState(false);
    const [checkWebsite, setCheckWebsite] = useState(false);
    const [checkNumberEmployees, setCheckNumberEmployees] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkRepeatPassword, setCheckRepeatPassword] = useState(false);


    const refDropdownPhone = useRef(null)
    const refDropdownCountry = useRef(null)

    const [emailError, setEmailError] = useState('')
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')
    const [websiteError, setWebsiteError] = useState('')
    const [numberEmployeesError, setNumberEmployeesError] = useState('')

    const [phone_prefix, setPhone_prefix] = useState('')
    const [unicodeFlagIconPhone, setUnicodeFlagIconPhone] = useState('')
    const [unicodeFlagIconCountry, setUnicodeFlagIconCountry] = useState('')
    const [dropDownMenuPhone, setDropDownMenuPhone] = useState(false)
    const [dropDownMenuCountry, setDropDownMenuCountry] = useState(false)

    const [placeholderPhone, setPlaceholderPhone] = useState('')

    const [listValidationConfig, setListValidationConfig] = useState<Country[]>()

    const [loader, serLoader] = useState(false)

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    useEffect(() => {
        validationConfig()
    }, [])


    useEffect(() => {
        const inputPhone = document.getElementById('phone') as HTMLInputElement;
        const maskInput = placeholderPhone.replace(/\d/g, '0')
        const MaskOptions = {
            mask: maskInput,
            placeholderChar: '_',
            lazy: false
        }

        if (inputPhone) {
            const mask = IMask(inputPhone, MaskOptions);
            return () => {
                mask.destroy()
            }
        }
    }, [placeholderPhone])

    useEffect(() => {
        const inputPhone = document.getElementById('phone') as HTMLInputElement;
        if (inputPhone) {

            if (inputPhone.value.length > 0) {
                setPhoneError('')
            }
            if (inputPhone.value.length > 5) {
                setCheckPhone(true)
            } else {
                setCheckPhone(false)
            }

            inputPhone.addEventListener('input', (e) => {
                updateValuePhone(e)
            })
            return () => {
                inputPhone.removeEventListener('input', (e) => {
                    updateValuePhone(e)
                })
            }

        }
}
)
function validationConfig() {
    axios.get(`${BASE_URL}/api/auth/sign-up/info`,)
        .then(response => {
            serLoader(true)
            setListValidationConfig(response.data.data.countries)
            const countries = response.data.data.countries.find((country: Country) => country.prioritized === 1)
            setPlaceholderPhone(countries.phone_mask)
            setUnicodeFlagIconPhone(countries.short_code)
            setPhone_prefix(countries.phone_prefix)
            setCountry(countries.name)
            setUnicodeFlagIconCountry(countries.short_code)
        }).catch(e => console.log(e))
}


const nameChange = (e: string) => {
    setFirstName(e)
    if (e === '') {
        setCheckFirstName(false)
    } else {
        setFirstNameError('')
        setCheckFirstName(true)
    }
}

const websiteChange = (e: string) => {
    setWebsite(e)
    if (e === '') {
        setCheckWebsite(false)
    } else {
        setWebsiteError('')
        setCheckWebsite(true)
    }
}

const nameChangeLast = (e: string) => {
    setLastName(e)
    if (e === '') {
        setCheckLastName(false)
    } else {
        setCheckLastName(true)
        setLastNameError('')
    }
}


const emailChange = (e: string) => {
    setMail(e)
    if (!EMAIL_REGEXP.test(String(e).toLowerCase())) {
        setEmailError('некоректный Email')
        setCheckMail(false)
    } else {
        setEmailError('')
        setCheckMail(true)
    }
}
const numberEmployeesChange = (e: string) => {
    setNumberEmployees(e)
    if (e === '') {
        setCheckNumberEmployees(false)
    } else {
        setCheckNumberEmployees(true)
        setNumberEmployeesError('')
    }
}

function countryChange(name: string, short_code: string) {
    setUnicodeFlagIconCountry(short_code)
    setCountry(name)
    setDropDownMenuCountry(false)

}

const phoneChange = (short_code: string, placeholderPhone: string, phone_prefix: string) => {
    setPlaceholderPhone(placeholderPhone)
    setDropDownMenuPhone(false)
    setPhone_prefix(phone_prefix)
    setUnicodeFlagIconPhone(short_code)
}

const passwordChange = (e: string) => {
    setPassword(e)
    if (password.length < 7) {
        setPasswordError('пароль должен быть не меньше 8 символов')
        setCheckPassword(false)
    } else {
        setCheckPassword(true)
        setPasswordError('')
        setRepeatPasswordError('')
        if (repeatPassword !== password) {
            setRepeatPasswordError('пароль не совпадает')
        } else {
            setRepeatPasswordError('')
        }
    }
}

const repeatPasswordChange = (e: string) => {
    setRepeatPassword(e)
    if (e.length > 0) {
        setCheckRepeatPassword(true)
        setRepeatPasswordError('')
        if (repeatPassword !== password) {

            setRepeatPasswordError('пароль не совпадает')
        } else {
            setRepeatPasswordError('')
        }
    } else {
        setCheckRepeatPassword(false)
    }

}

const updateValuePhone = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target)
        setPhone(target.value)
}

const submittingForm = () => {
    axios.post(`${BASE_URL}/api/auth/sign-up/info`, {
        "country_id": "ru",
        "plan_id": "1",
        "email": mail,
        "password": mail,
        "website": website,
        "employees_count": Number(numberEmployees),
        "name": firstName,
        "second_name": lastName,
        "phone": phone
    })
        .then(() => {
            console.log('done')
        }).catch(e => console.log(e))
}


const clickButton = () => {
    if (!checkPassword) {
        setPasswordError('Заполните поле')
    }
    if (!checkRepeatPassword) {
        setRepeatPasswordError('Заполните поле')
    }
    if (!checkMail) {
        setEmailError('Заполните поле')
    }
    if (!checkFirstName) {
        setFirstNameError('Заполните поле')
    }
    if (!checkPhone) {
        setPhoneError('Заполните поле')
    }
    if (!checkLastName) {
        setLastNameError('Заполните поле')
    }
    if (!checkWebsite) {
        setWebsiteError('Заполните поле')
    }
    if (!checkNumberEmployees) {
        setNumberEmployeesError('Заполните поле')
    }
    if(checkPassword && checkRepeatPassword &&
        checkMail && checkFirstName &&
        checkPhone && checkLastName &&
        checkWebsite && checkNumberEmployees
    ){
        submittingForm()
    }
}
useOnClickOutside(refDropdownPhone, () => setDropDownMenuPhone(false))
useOnClickOutside(refDropdownCountry, () => setDropDownMenuCountry(false))

if (!loader) {
    return <div className={styles.isLoaderContainer}><PropagateLoader size={16} color={'#6100FF'}/></div>
}

return (
    <div className={styles.wrap}>
        <div className={styles.wrapElementsLine}>

            <Input descriptionLabel={'Фамилия'} error={lastNameError}
                   onChange={e => nameChangeLast(e.target.value)}
                   value={lastName}
                   type={'text'} placeholder={'Введите фамилию'}/>

            <Input descriptionLabel={'Имя'} value={firstName} error={firstNameError}
                   onChange={e => nameChange(e.target.value)}
                   type={'text'}

                   placeholder={'Введите имя'}/>
        </div>

        <Input descriptionLabel={'Email'} error={emailError} value={mail} name={'email'}
               onChange={event => emailChange(event.target.value)}
               placeholder={'Введите почту'}/>

        <Input descriptionLabel={'Сайт'} onChange={e => websiteChange(e.target.value)} type={'text'}
               placeholder={'Вставьте ссылку на сайт вашей компании '} error={websiteError}/>

        <div className={styles.wrapList}>

            <Input descriptionLabel={'Номер телефона'} onChange={e => setPhone(e.target.value)}
                   placeholder={placeholderPhone} value={phone} name={'phone'}
                   error={phoneError}
                   icon={unicodeFlagIconPhone} inputId={'phone'} id={'phone'} phone_prefix={phone_prefix}
                   type={'text'}
                   onClick={() => setDropDownMenuPhone(true)}/>
            {listValidationConfig && dropDownMenuPhone ?
                <div ref={refDropdownPhone} className={styles.select__dropdown}>
                    {listValidationConfig.map((e, index) => (<div className={styles.select__item} key={index}
                                                                  onClick={() => phoneChange(e.short_code, e.phone_mask, e.phone_prefix)}>
                        <div>{getUnicodeFlagIcon(e.short_code)}</div>
                        <div className={styles.select__item__name}>{e.name}</div>
                        <div className={styles.select__item__phone}>{e.phone_prefix}</div>
                    </div>))}
                </div> : null}
        </div>

        <div className={styles.wrapElementsLine}>

            <Input descriptionLabel={'Количество сотрудников'} value={numberEmployees}
                   onChange={e => numberEmployeesChange(e.target.value)} error={numberEmployeesError}
                   type={'number'} placeholder={'0'}/>

            <div className={styles.wrapList}>

                <Input descriptionLabel={'Страна'} icon={unicodeFlagIconCountry} value={country}
                       placeholder={'Страна'} onClick={() => setDropDownMenuCountry(true)}/>
                {listValidationConfig && dropDownMenuCountry ?
                    <div ref={refDropdownCountry} className={styles.select__dropdown}>
                        {listValidationConfig.map((e, index) => (
                            <div className={styles.select__item} onClick={() => {
                                countryChange(e.name, e.short_code)
                            }} key={index}>
                                <div>{getUnicodeFlagIcon(e.short_code)}</div>
                                <div className={styles.select__item__name}>{e.name}</div>
                            </div>))}
                    </div> : null}
            </div>
        </div>

        <div className={styles.wrapElementsLine}>

            <Input descriptionLabel={'Пароль'} name={'password'}
                   onChange={(e) => {
                       passwordChange(e.target.value)
                   }}
                   error={passwordError}
                   type={'password'} placeholder={'*************'}/>

            <Input descriptionLabel={'Подтвердите пароль'} error={repeatPasswordError}
                   onChange={(e) => repeatPasswordChange(e.target.value)} type={'password'}
                   placeholder={'*************'}/>

        </div>
        <button onClick={clickButton} className={styles.register}>Зарегестрироваться</button>
        <span className={styles.link__span}>У меня уже есть аккаунт. <Link className={styles.link}
                                                                           to={''}>Войти</Link></span>
    </div>
);
}
;

export default RegisterForm;
