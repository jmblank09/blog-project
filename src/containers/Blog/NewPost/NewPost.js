import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount() {
      // If unauth => this.props.history.replace('/posts');
      console.log(this.props);
    }

    postDataHandler = () => {
      const data = {...this.state};

      axios.post('/posts', data)
        .then(response => {
          // this.setState({submitted: true});
          this.props.history.push('/posts');
        });
    }

    render () {
        const {
          submitted,
          title,
          content,
          author
        } = this.state;
        let redirect = null;

        if (this.state.submitted) {
          redirect = <Redirect to="/posts" />;
        }

        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
