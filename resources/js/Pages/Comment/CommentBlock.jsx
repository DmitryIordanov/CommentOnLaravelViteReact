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

export default function CommentBlock() {
    // Data with comments.
    const [data, setData] = useState([]);
    // Get the total number of pages.
    const [pageCount, setPageCount] = useState();
    // Substitute the value in the url to get the page you need.
    const [pageNumber, setPageNumber] = useState();
    // Value for filtering comments by Username
    const [sortUsername, setSortUsername] = useState('null');
    // Value for filtering comments by Created_at
    const [sortDate, setSortDate] = useState('null');

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
    }

    // Divide the total number of posts by the number that can fit on one page (default - 25).
    const pagesArray = Math.ceil(pageCount / 4);
    // Substitute pagesArray into the getPage Array function.
    const result = getPageArray(pagesArray);

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
                            <div className="mt-3">
                                <Button><ReplyIcon /> Reply</Button>
                            </div>
                            <div className='mt-3 commentReply' style={{display:'none'}}>
                                <div className="mt-10">
                                    <div className="flex comment items-center">
                                        <img src="https://www.freeiconspng.com/thumbs/person-icon/person-icon-8.png" className="mr-4" width="50" alt=""/>
                                        <h2 className="mr-3">guest</h2>
                                        <p className="mr-5">21.11.2023 в 15:41</p>
                                    </div>
                                    <div className="mt-2">
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                                    </div>
                                    <div className="mt-3">
                                        <Button><ReplyIcon/>Reply</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
                <div className="mt-8 flex justify-center">
                    <nav aria-label="pagination navigation" className="MuiPagination-root MuiPagination-text css-1oj2twp-MuiPagination-root">
                        <ul className="MuiPagination-ul css-wjh20t-MuiPagination-ul">
                            <li>
                                <button className="MuiButtonBase-root Mui-disabled MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textPrimary Mui-disabled MuiPaginationItem-previousNext css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root" tabIndex="-1" type="button" disabled="" aria-label="Go to previous page">
                                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPaginationItem-icon css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="NavigateBeforeIcon"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                                </button>
                            </li>
                            {result.map((item) => {
                                return(
                                    <li key={item}>
                                        <button onClick={() => setPageNumber(item)} className={pageNumber === item ? "MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textPrimary MuiPaginationItem-page css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root Mui-selected" : "MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textPrimary MuiPaginationItem-page css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root .css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root"} type="button">
                                            {item}
                                        </button>
                                    </li>
                                );
                            })
                            }
                            <li>
                                <button className="MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-sizeMedium MuiPaginationItem-text MuiPaginationItem-circular MuiPaginationItem-textPrimary MuiPaginationItem-previousNext css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root" tabIndex="0" type="button" aria-label="Go to next page">
                                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiPaginationItem-icon css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="NavigateNextIcon"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg><span className="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <Pagination style={{display: 'none'}} color="primary" />
                </div>
            </div>
        </>
    );
}
