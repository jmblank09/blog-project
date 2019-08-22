import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(p => {
          return {
            ...p,
            author: 'Max'
          }
        });
        this.setState({posts: updatedPosts});
      });
  }

  render () {
      const posts = this.state.posts
        .map(p => <Post key={p.id} title={p.title} author={p.author} />);

      return (
          <div>
              <section className="Posts">
                  {posts}
              </section>
              <section>
                  <FullPost />
              </section>
              <section>
                  <NewPost />
              </section>
          </div>
      );
  }
}

export default Blog;
