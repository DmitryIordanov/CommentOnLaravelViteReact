import React from "react";
import { Head } from '@inertiajs/react';
import AddCommentForm from '@/Pages/Comment/AddCommentForm';
import CommentBlock from "@/Pages/Comment/CommentBlock";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
export default function Main() {
    return (
        <>
            <Head title="Main" />
            <CssBaseline />
            <HideOnScroll>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Dmitry Iordanov
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Container>
                <Box sx={{ my: 2 }}>
                    <div className="mainShadow flex flex-col items-center">
                        <AddCommentForm/>
                        <CommentBlock/>
                    </div>
                </Box>
            </Container>
        </>
    );
}
