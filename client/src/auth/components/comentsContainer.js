import React, { Component } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, Paper, } from '@material-ui/core';
import { AccountBox, Comment } from '@material-ui/icons';

class CommentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { comments: [] };
        this.newsId = props;
    }

    getComments = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/news/${this.newsId.newsId}`);
            if (res.data.message === "OK") {
                console.log("Successfully got comments data");
                this.setState({ comments: res.data.newsObj.comments });
            } else {
                console.log("Fail get comments data");
            }
        } catch (err) {
            console.log(`FAIL get comments data: ${err}`);
        }
    }

    postComment = async () => {
        let body = this.commentForm.value;
        try {
            let res = await axios.post('http://localhost:3001/comments',
                { body, newsItem: this.newsId.newsId },
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

    handleSubmit = event => {
        event.preventDefault();
        if (this.commentForm.value !== "") {
            let comment = {
                body: this.commentForm.value,
                author: { username: localStorage.username },
                posted: new Date()
            };
            this.setState({ comments: [...this.state.comments, comment] });
            this.postComment(comment);
            this.commentForm.value = "";
        }
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        return (
            <div>
                {this.state.comments.map(comment => (
                    <Grid md={7}>
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
                            <TextField style={{  }}
                                id="comment-input"
                                type="text"
                                onSubmit={this.handleSubmit}
                                inputRef={fc => this.commentForm = fc}
                                placeholder="type here..."
                            />
                        </Grid>
                        <Grid xs={2} md={1} item>
                            <Button
                                id="comment-button"
                                fullWidth
                                color="secondary"
                                variant="outlined"
                                onClick={this.handleSubmit}
                            >
                                SUBMIT 
                        </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}

export default CommentsContainer;