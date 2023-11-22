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
    const [data, setData] = useState([]);
    // Data with reply.
    const [reply, setReply] = useState([]);
    // Get the total number of pages.
    const [pageCount, setPageCount] = useState();
    // Substitute the value in the url to get the page you need.
    const [pageNumber, setPageNumber] = useState();
    // Value for filtering comments by Username
    const [sortUsername, setSortUsername] = useState('null');
    // Value for filtering comments by Created_at
    const [sortDate, setSortDate] = useState('null');
    // For a button that shows the form under the comment
    const [showForm, setShowForm] = useState(false);
    // For a button that shows the reply under the comment
    const [showComment, setShowComment] = useState(false);

    // Function to change value sortUsername
    const handleChangeUser = (event) => {
        setSortUsername(event.target.value);
    };

    // Function to change value sortDate
    const handleChangesDate = (event) => {
        setSortDate(event.target.value);
    };

    // Function to create an array from pageCount.
    const getPageArray = (totalPage) => {
        const result = [];
        for (let i = 0; i < totalPage; i++) {
            result.push(i + 1);
        }
        return result;
    }

    // Function for receiving data with comments.
    const handleOutput = async () => {

        // Request Axios for comment
        await axios.get(
            'http://localhost:8000/api/comments?page=' + pageNumber
            + '&date=' + sortDate
            + '&username=' + sortUsername
        )
            .then((data) => {
                    setData(data.data.comments.data);
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

    // Divide the total number of posts by the number that can fit on one page (default - 25).
    const pagesArray = Math.ceil(pageCount / 4);
    // Substitute pagesArray into the getPage Array function.
    const resultPage = getPageArray(pagesArray);

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
                {data.map((item, index) => {
                    return(
                        <div className="mt-10 commentBlock" key={item.comment_id}>
                            <div className="flex comment items-center">
                                <img src="https://www.freeiconspng.com/thumbs/person-icon/person-icon-8.png" className="mr-4" width="50" alt=""/>
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
                                                                    <img src="https://www.freeiconspng.com/thumbs/person-icon/person-icon-8.png" className="mr-4" width="50" alt=""/>
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
                    <nav aria-label="pagination navigation" className="MuiPagination-root MuiPagination-text css-1oj2twp-MuiPagination-root">
                        <ul className="MuiPagination-ul css-wjh20t-MuiPagination-ul">
                            {resultPage.map((item) => {
                                return(
                                    <li key={item}>
                                        <button onClick={() => setPageNumber(item)} className={pageNumber === item ? "MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textPrimary MuiPaginationItem-page css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root Mui-selected" : "MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textPrimary MuiPaginationItem-page css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root"} type="button">
                                            {item}
                                        </button>
                                    </li>
                                );
                            })
                            }
                        </ul>
                    </nav>
                    <Pagination style={{display: 'none'}} color="primary" />
                </div>
            </div>
        </>
    );
}
