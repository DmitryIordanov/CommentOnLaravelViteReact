import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import { useFormik } from 'formik';

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

    return errors;
};

export default function AddCommentForm() {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            homePage: '',
            content: ''
        },
        validate,
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form className="addCommentForm" onSubmit={formik.handleSubmit}>
            <h1 className="mb-4">Add Comment</h1>
            <div className="mb-5">
                <TextField
                    error={formik.errors.username ? true : false}
                    id="outlined-basic"
                    label="Enter your name..."
                    variant="outlined"
                    helperText={formik.errors.username ? <div className="text-danger">{formik.errors.username}</div> : null}
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
                    helperText={formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
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
                    helperText={formik.errors.content ? <div className="text-danger">{formik.errors.content}</div> : null}
                    name="content"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                ></TextField>
            </div>
            <Button variant="contained" type='submit'>Add comment</Button>
        </form>
    );
}
