import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import axios from "axios";

export default function CommentBlock() {
    // Data with comments
    const [data, setData] = useState([]);

    // Function for receiving data with comments
    const handleOutput = async () => {
        const response = await axios.get('http://localhost:8000/api/comments')
            .then(res => setData(res.data.comments))
    }

    // Function useEffect for updates
    useEffect(() => {
        handleOutput()
    },[]);

    return(
        <div className="commentWrap">
            {data.map((item, index) => {
                    return(
                        <div className="mt-10 commentBlock" key={item.comment_id}>
                            <div className="mb-2 flex comment items-center">
                                <img src="https://www.freeiconspng.com/thumbs/person-icon/person-icon-8.png" className="mr-4" width="50" alt=""/>
                                <h2 className="mr-3">{item.username}</h2>
                                <p className="mr-5">{item.created_at}</p>
                                <Button className="ml-auto">Reply</Button>
                            </div>
                            <div>
                                <p>{item.text_content}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}
