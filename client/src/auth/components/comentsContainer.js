import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Hidden, TextField, Button } from '@material-ui/core';

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
        if(this.commentForm.value !== "") {
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
                                <img className="avatar" src={'https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF.jpg'} />
                            </Grid>
                            <Grid className="comment">
                                    <h5 className="comment-author">{comment.author.username}</h5>
                                    <p className="date">{new Date(comment.posted).toLocaleString()}</p>
                                    <p>{comment.body}</p>
                            </Grid>
                    </Grid>
                ))}

                <Grid id="comment-form" md={3}>
                    <Grid>
                        <TextField
                            id="comment-input"
                            type="text"
                            onSubmit={this.handleSubmit}
                            inputRef={fc => this.commentForm = fc}
                            placeholder="type here..."
                            required
                        >
                        </TextField>
                    </Grid>
                    <Grid>
                        <Button
                            id="leave-comment"
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                            onClick={this.handleSubmit}
                        >
                            SUBMIT
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default CommentsContainer;