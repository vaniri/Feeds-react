import React, { Component } from 'react';
import axios from 'axios';
import { Container, FilledInput, Button } from '@material-ui/core';

class CommentsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { comments: [] };
    }

    getComments = async () => {
        try {
            let res = await axios.get(`/api//news/${postId}`);
            if (res.message === "OK") {
                console.log("Successfully got comments data");
                this.setState = { comments: res.data.comments };
            } else {
                console.log("Fail get comments data");
            }
        } catch (err) {
            console.log(`FAIL get comments data: ${err}`);
        }
    }

    postComment = async () => {
        try {
            let res = await axios.post('/api//comments',
                { headers: { 'Authorization': `Bearer ${localStorage.token}` } });
            if (res.message === "OK") {
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
        this.commentForm.value = "";
    }

    componentDidMount() {
        this.getComments();
    }

    render() {
        return (
            <div>
                {this.state.comments.map(comment => (
                    <Container className="news-info" maxWidth="sm">
                        <p>{comment.author}</p>
                        <p>posted: {new Date(comment.posted).toLocaleString()}</p>
                        <p>{comment.body}</p>
                    </Container>
                ))};
                <FilledInput
                    type="text"
                    onSubmit={this.handleSubmit}
                    ref={(fc) => this.commentForm = fc}
                    placeholder="type here..."
                    required
                >
                </FilledInput>
                <Button type="sybmit">SUBMIT
                </Button>
            </div>
        )
    }
}

export default CommentsContainer;