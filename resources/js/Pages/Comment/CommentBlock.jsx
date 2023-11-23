import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import parse from 'html-react-parser';
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ReplyIcon from '@mui/icons-material/Reply';
import AddCommentForm from "@/Pages/Comment/AddCommentForm.jsx";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CommentBlock() {
    // Data with comments.
    const [isData, setIsData] = useState([]);
    // Data with reply.
    const [reply, setReply] = useState([]);
    // Get the total number of pages.
    const [pageCount, setPageCount] = useState();
    // Substitute the value in the url to get the page you need.
    const [pageNumber, setPageNumber] = useState(1);
    // Value for filtering comments by Username
    const [sortUsername, setSortUsername] = useState('null');
    // Value for filtering comments by Created_at
    const [sortDate, setSortDate] = useState('null');
    // For a button that shows the form under the comment
    const [showForm, setShowForm] = useState(false);
    // For a button that shows the reply under the comment
    const [showComment, setShowComment] = useState(false);
    // Divide the total number of posts by the number that can fit on one page (default - 25).
    const pagesTotal = Math.ceil(pageCount / 25);

    // Function to change value sortUsername
    const handleChangeUser = (event) => {
        setSortUsername(event.target.value);
    };

    // Function to change value sortDate
    const handleChangesDate = (event) => {
        setSortDate(event.target.value);
    };

    // Function to change value pageNumber
    const handleChangePaginate = (event, value) => {
        setPageNumber(value);
    };


    // Function for receiving data with comments.
    const handleOutput = async () => {

        // Request Axios for comment
        await axios.get(
            'http://localhost:8000/api/comments?page=' + pageNumber
            + '&date=' + sortDate
            + '&username=' + sortUsername
        )
            .then((data) => {
                    setIsData(data.data.comments.data);
                    setPageCount(data.data.comments.total);
                }
            )

        // Axios request for reply
        await axios.get('http://localhost:8000/api/reply')
            .then((data) => {
                    setReply(data.data.comments);
                }
            )
    }

    // Function useEffect for updates.
    useEffect(() => {
        handleOutput()
    },[pageNumber, sortDate, sortUsername]);
    return(
        <>
            <div className="mt-5">
                <FormControl variant="filled" sx={{m: 1, minWidth: 120}}>
                    <InputLabel id="demo-simple-select-filled-label">Username</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={sortUsername}
                        onChange={handleChangeUser}
                    >
                        <MenuItem value="null"><em>None</em></MenuItem>
                        <MenuItem value="alphabet">Alphabet</MenuItem>
                        <MenuItem value="alphabetback">Desc</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="filled" sx={{m: 1, minWidth: 130}}>
                    <InputLabel id="demo-simple-select-filled-label">Date added</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={sortDate}
                        onChange={handleChangesDate}
                    >
                        <MenuItem value="null"><em>None</em></MenuItem>
                        <MenuItem value="random">Random</MenuItem>
                        <MenuItem value="latest">Latest</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="commentWrap">
                {isData.map((item, index) => {
                    return(
                        <div className="mt-10 commentBlock" key={item.comment_id}>
                            <div className="flex comment items-center">
                                <img src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png" className="mr-4" width="50" alt=""/>
                                <h2 className="mr-3">{item.username}</h2>
                                <p className="mr-5">{item.created_at}</p>
                            </div>
                            <div className="mt-2">
                                {parse(item.text_content)}
                            </div>
                            <div className="mt-3 mb-3">
                                <Button onClick={() => {showForm === item.comment_id ? setShowForm(false) : setShowForm(item.comment_id)}}>
                                    <ReplyIcon/>
                                    Reply
                                </Button>
                                <Button onClick={() => {showComment === item.comment_id ? setShowComment(false) : setShowComment(item.comment_id)}}>
                                    {showComment === item.comment_id ? <KeyboardArrowDownIcon/> : <KeyboardArrowUpIcon/>}
                                    Show
                                </Button>
                            </div>
                            <div style={{marginLeft: '50px'}}>
                                {showForm === item.comment_id
                                    ?<AddCommentForm visible={true} commentId={item.comment_id}/>
                                    :false
                                }
                            </div>
                            {showComment === item.comment_id
                                ?<div style={{marginLeft: '50px'}}>
                                    {reply.map((items, index) => {
                                        return(
                                                <div key={index}>
                                                    {items.parent_id === item.comment_id
                                                        ?<div className='mt-3 commentReply'>
                                                            <div className="mt-5">
                                                                <div className="flex comment items-center">
                                                                    <img src="https://cdn-icons-png.flaticon.com/512/9385/9385289.png" className="mr-4" width="50" alt=""/>
                                                                    <h2 className="mr-3">{items.username}</h2>
                                                                    <p className="mr-5">{items.created_at}</p>
                                                                </div>
                                                                <div className="mt-2">
                                                                    {parse(items.text_content)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :false
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                :false
                            }
                        </div>
                    );
                })
                }
                <div className="mt-8 flex justify-center">
                    <Pagination
                        className="mb-10"
                        page={pageNumber}
                        count={pagesTotal || 1}
                        onChange={handleChangePaginate}
                        size='large'
                        color="primary"
                        shape="rounded"
                        showFirstButton
                        showLastButton
                    />
                </div>
            </div>
        </>
    );
}
