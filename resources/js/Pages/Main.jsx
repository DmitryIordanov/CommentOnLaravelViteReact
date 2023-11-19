import React from "react";
import { Head } from '@inertiajs/react';
import AddCommentForm from '@/Pages/Comment/AddCommentForm';
import CommentBlock from "@/Pages/Comment/CommentBlock";

export default function Main() {
    return (
        <>
            <Head title="Main" />
            <div className="sm:flex sm:justify-center sm:items-center">
                <div className="max-w-7xl mx-auto p-6 lg:p-8 flex flex-col justify-center items-center">
                    <AddCommentForm/>
                    <CommentBlock/>
                </div>
            </div>
        </>
    );
}
