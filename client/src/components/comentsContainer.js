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

    postComment = async (comment) => {
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
        let comment = {
            body: this.commentForm.value,
            author: { username: localStorage.username },
            posted: new Date()
        };
        this.setState({ comments: [...this.state.comments, comment] });
        this.postComment(comment);
        this.commentForm.value = "";
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        return (
            <div>
                <Grid item xs={12} md={6}>
                    {!this.state.comments ? <div></div> : (
                        <Grid>
                            {this.state.comments.map(comment => (
                                <CardActionArea component="a" href="#">
                                    <Card className="card">
                                        <div className="cardDetails">
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    {comment.author.username}
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">
                                                    {new Date(comment.posted).toLocaleString()}
                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>
                                                    {comment.body}
                                                </Typography>
                                                <Typography variant="subtitle1" color="primary">
                                                    Continue reading...
                                        </Typography>
                                            </CardContent>
                                        </div>
                                        <Hidden xsDown>
                                            <CardMedia className="cardMedia" image="image" />
                                        </Hidden>
                                    </Card>
                                </CardActionArea>
                            ))}
                        </Grid>
                    )}
                    <Grid className="comment-form">
                        <TextField
                            type="text"
                            onSubmit={this.handleSubmit}
                            inputRef={fc => this.commentForm = fc}
                            placeholder="type here..."
                            required
                        >
                        </TextField>
                        <Button 
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


