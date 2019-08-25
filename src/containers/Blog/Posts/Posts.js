import React, { Component } from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    selectedPostId: null
  };

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(p => {
          return {
            ...p,
            author: 'Max'
          }
        });
        this.setState({posts: updatedPosts});
      })
      .catch(error => console.log());
  }

  postSelected = (id) => {
    this.setState({selectedPostId: id});
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts
        .map(p => <Post
          key={p.id}
          title={p.title}
          author={p.author}
          clicked={() => this.postSelected(p.id)} />);
    }

    return (
      <section className="Posts">
          {posts}
      </section>
    );
  }
}

export default Posts;
