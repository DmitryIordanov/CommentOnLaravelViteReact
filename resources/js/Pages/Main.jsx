import React from "react";
import { Head } from '@inertiajs/react';
import AddCommentForm from './Comment/AddCommentForm';

export default function Main() {
    return (
        <>
            <Head title="Main" />
            <div className="sm:flex sm:justify-center sm:items-center">
                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <AddCommentForm/>
                </div>
            </div>
        </>
    );
}
