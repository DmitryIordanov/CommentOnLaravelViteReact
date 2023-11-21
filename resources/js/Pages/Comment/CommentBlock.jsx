import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import Pagination from '@mui/material/Pagination';
import parse from 'html-react-parser';
import axios from "axios";

export default function CommentBlock() {
    // Data with comments.
    const [data, setData] = useState([]);
    // Get the total number of pages.
    const [pageCount, setPageCount] = useState();
    // Substitute the value in the url to get the page you need.
    const [pageNumber, setPageNumber] = useState();

    // Function to create an array from pageCount.
    const getPageArray = (totalPage) => {
        const result = [];
        for (let i = 0; i < totalPage; i++) {
            result.push(i + 1)
        }
        return result;
    }

    // Function for receiving data with comments.
    const handleOutput = async () => {
        const response = await axios.get('http://localhost:8000/api/comments?page=' + pageNumber)
            .then((data) => {
                    setData(data.data.comments.data);
                    setPageCount(data.data.comments.total);
                }
            )
    }

    // Divide the total number of posts by the number that can fit on one page (default - 25).
    const pagesArray = Math.ceil(pageCount / 2);
    // Substitute pagesArray into the getPage Array function.
    const result = getPageArray(pagesArray);

    // Function useEffect for updates.
    useEffect(() => {
        handleOutput()
    },[pageNumber]);

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
                                <p>{parse(item.text_content)}</p>
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
    );
}
