import React, {useState} from "react";
import {Button, TextField, CardHeader, CardActions, Typography} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axios from "axios";
import { useFormik } from 'formik';

export default function AddCommentForm() {
    // Form validation function via formik
    const validate = values => {
        const errors = {};

        if (!values.username) {
            errors.username = 'Обязательное поле';
        } else if (values.username.length > 20) {
            errors.username = 'Должно быть не более 20 символов.';
        } else if (values.username.length < 3) {
            errors.username = 'Должность быть не меньше 3 символов';
        }

        if (!values.email) {
            errors.email = 'Обязательное поле';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Неверный адрес электронной почты';
        }

        if (!values.text_content) {
            errors.text_content = 'Обязательное поле';
        } else if (values.text_content.length > 999) {
            errors.text_content = 'Должно быть не более 999 символов';
        } else if (values.text_content.length < 10) {
            errors.text_content = 'Должность быть не меньше 10 символов';
        }

        if (!values.captcha) {
            errors.captcha = 'Обязательное поле'
        } else if (values.captcha !== isCaptcha) {
            errors.captcha = 'Неверно введена капча'
        }

        return errors;
    };
    // Random string for captcha
    const randomString = Math.random().toString(36).slice(8);
    // Captcha output
    const [isCaptcha, setIsCaptcha] = useState(randomString);
    // User entered text
    const [text, setText] = useState("");
    // Open modal
    const [open, setOpen] = React.useState(false);
    // Open modal setOpen true
    const handleOpen = () => setOpen(true);
    // Open modal setOpen false
    const handleClose = () => setOpen(false);

    // Modal style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 565,
        borderRadius: 4,
        bgcolor: 'background.paper',
        border: '1px solid #96BBE0',
        boxShadow: 24,
        p: 4,
    };

    // onClick Button update captcha
    const refreshString = () => {
        setText("");
        setIsCaptcha(Math.random().toString(36).slice(8));
    };

    // Formik function
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            home_url: '',
            text_content: '',
            captcha: ''
        },
        onSubmit: values => {
            axios.post('http://localhost:8000/api/comments', JSON.stringify(values), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        },
        validate: validate,
        isInitialValid: false,
        validateOnBlur: false,
        validateOnChange: false,
        validateOnMount: false
    });
    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>Add Comment</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
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
                                    name="home_url"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.home_url}
                                ></TextField>
                            </div>
                            <div className="mb-5">
                                <TextField
                                    error={formik.errors.text_content ? true : false}
                                    id="standard-multiline-flexible"
                                    label="Enter your text..."
                                    multiline
                                    variant="outlined"
                                    helperText={formik.errors.text_content ? <Typography className="text-danger">{formik.errors.text_content}</Typography> : null}
                                    name="text_content"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.text_content}
                                ></TextField>
                            </div>
                            <div className="mb-5">
                                <CardActions>
                                    <Button
                                        startIcon={<RefreshIcon/>}
                                        onClick={() => refreshString()}
                                    ></Button>
                                    <div className="h3">{isCaptcha}</div>
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
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
