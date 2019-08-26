import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
  state = {
    posts: []
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
      .catch(error => console.log(error));
  }

  postSelectedHandler = (id) => {
    // this.props.history.push({pathname: '/posts/' + id});
    this.props.history.push('/posts/' + id);
  }

  render() {
    let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;

    if (!this.state.error) {
      posts = this.state.posts
        .map(p => (
          // <Link to={'/posts' + p.id} key={p.id}>
            <Post
              key={p.id}
              title={p.title}
              author={p.author}
              clicked={() => this.postSelectedHandler(p.id)} />
          // </Link>
        ));
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>

    );
  }
}

export default Posts;
