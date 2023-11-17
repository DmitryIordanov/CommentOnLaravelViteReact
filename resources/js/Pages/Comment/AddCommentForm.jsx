import React, {useState} from "react";
import {Button, TextField, CardHeader, CardActions, Typography} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useFormik } from 'formik';

export default function AddCommentForm() {
    const validate = values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Обязательное поле';
        } else if (values.username.length > 15) {
            errors.username = 'Должно быть не более 3 символов.';
        } else if (values.username.length < 3) {
            errors.username = 'Должность быть не меньше 3 символов';
        }

        if (!values.email) {
            errors.email = 'Обязательное поле';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Неверный адрес электронной почты';
        }

        if (!values.content) {
            errors.content = 'Обязательное поле';
        } else if (values.content.length > 999) {
            errors.content = 'Должно быть не более 999 символов';
        } else if (values.content.length < 10) {
            errors.content = 'Должность быть не меньше 10 символов';
        }

        if (!values.captcha) {
            errors.captcha = 'Обязательное поле'
        } else if (values.captcha !== isCaptcha) {
            errors.captcha = 'Неверно введена капча'
        }

        return errors;
    };
    const randomString = Math.random().toString(36).slice(8);
    const [isCaptcha, setIsCaptcha] = useState(randomString);
    const [text, setText] = useState("");

    const refreshString = () => {
        setText("");
        setIsCaptcha(Math.random().toString(36).slice(8));
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            homePage: '',
            content: '',
            captcha: ''
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
        isInitialValid: false,
        validate: validate,
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false
    });
    return (
        <form className="addCommentForm" onSubmit={formik.handleSubmit}>
            <CardHeader title="Add Comment" className="text-center"></CardHeader>
            <div className="mb-5">
                <TextField
                    error={formik.errors.username ? true : false}
                    id="outlined-basic"
                    label="Enter your name..."
                    variant="outlined"
                    helperText={formik.errors.username ? <Typography className="text-danger">{formik.errors.username}</Typography> : null}
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                ></TextField>
            </div>
            <div className="mb-5">
                <TextField
                    error={formik.errors.email ? true : false}
                    id="outlined-basic"
                    label="Enter your email..."
                    variant="outlined"
                    helperText={formik.errors.email ? <Typography className="text-danger">{formik.errors.email}</Typography> : null}
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                ></TextField>
            </div>
            <div className="mb-5">
                <TextField
                    id="outlined-basic"
                    label="Url home page..."
                    variant="outlined"
                    type="text"
                    name="homePage"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.homePage}
                ></TextField>
            </div>
            <div className="mb-5">
                <TextField
                    error={formik.errors.content ? true : false}
                    id="standard-multiline-flexible"
                    label="Enter your text..."
                    multiline
                    variant="outlined"
                    helperText={formik.errors.content ? <Typography className="text-danger">{formik.errors.content}</Typography> : null}
                    name="content"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                ></TextField>
            </div>
            <div className="mb-5">
                <CardActions>
                    <div className="h3">{isCaptcha}</div>
                    <Button
                        startIcon={<RefreshIcon/>}
                        onClick={() => refreshString()}
                    ></Button>
                </CardActions>
                <TextField
                    error={formik.errors.captcha ? true : false}
                    type="text"
                    className="w-60"
                    label="Enter Captcha"
                    name="captcha"
                    value={formik.values.captcha}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.captcha ? <Typography className="text-danger">{formik.errors.captcha}</Typography> : null}
                />
            </div>
            <Button variant="contained" type='submit'>Add comment</Button>
        </form>
    );
}
