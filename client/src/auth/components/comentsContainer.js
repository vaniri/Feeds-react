import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { apiUrl } from '../../utils';
import { Grid, TextField, Button, Paper, } from '@material-ui/core';
import { AccountBox, Comment } from '@material-ui/icons';

const CommentsContainer = ({ newsId }) => {
    const [ comments, setComments] = useState([]);
    const curRef = useRef(null);

    const getComments = async () => {
        try {
            let res = await axios.get(apiUrl(`/api/news/${newsId}`));
            if (res.data.message === "OK") {
                console.log("Successfully got comments data");
                setComments(res.data.newsObj.comments);
            } else {
                console.log("Fail get comments data");
            }
        } catch (err) {
            console.log(`FAIL get comments data: ${err}`);
        }
    }

    const postComment = async () => {
        let body = curRef.current.value;
        try {
            let res = await axios.post(apiUrl('/api/comments'),
                { body, newsItem: newsId },
                { headers: { 'Authorization': `Bearer ${localStorage.token}` } });
            if (res.data.message === "OK") {
                console.log("Successfully create a comment");
            } else {
                console.log("FAIL create a comment");
            }
        } catch (err) {
            console.log(`FAIL create a comment: ${err}`);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (curRef.value !== "") {
            let comment = {
                body: curRef.current.value,
                author: { username: localStorage.username },
                posted: new Date()
            };
            setComments([ ...comments, comment ]);
            postComment(comment);
            curRef.current.value  = "";
        }
    }

    useEffect(() => {
        getComments();
    }, [])

        return (
            <div>
                {comments.map(comment => (
                    <Grid md={7} key={comment.id}>
                        <Grid>
                            <h5 className="comment-author"><AccountBox /> {comment.author.username}</h5>
                            <p className="date">{new Date(comment.posted).toLocaleString()}</p>
                            <p><Comment /> {comment.body}</p>
                        </Grid>
                    </Grid>
                ))}
                <Paper style={{ padding: 16, marginTop: '5em', border: 'solid 0.05em orchid', boxShadow: 'none' }}>
                    <Grid container>
                        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                            <TextField
                                id="comment-input"
                                type="text"
                                inputRef={curRef}
                                onSubmit={handleSubmit}
                                placeholder="type here..."
                            />
                        </Grid>
                        <Grid xs={2} md={1} item>
                            <Button
                                id="comment-button"
                                fullWidth
                                color="secondary"
                                variant="outlined"
                                onClick={handleSubmit}
                            >
                                SUBMIT 
                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
}

export default CommentsContainer;