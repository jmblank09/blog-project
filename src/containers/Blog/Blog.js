import React, { Component, Suspense } from 'react';
import {
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));
// new way of lazy loading
// const AsyncNewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {
  state = {
    auth: false
  }

  render () {
      return (
          <div className="Blog">
            <header>
              <nav>
                <ul>
                  <li>
                    <NavLink
                      to="/posts"
                      exact
                      activeClassName="my-active"
                      activeStyle={{
                        color: '#FA923F',
                        textDecoration: 'underline'
                      }}>
                      Posts
                    </NavLink>
                  </li>
                  <li><NavLink to={{
                      pathname: '/new-post',
                      hash: '#submit',
                      search: '?quick-submit=true'
                    }}>New Post</NavLink></li>
                </ul>
              </nav>
            </header>
            {/* Routes */}
            <Switch>
              {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
              {/*
                new way of lazy loading
                <Suspense fallback={<div>Loading...</div>}>
                  <Route path="/new-post" component={AsyncNewPost} />
                </Suspense>
                */}
              <Route path="/posts" component={Posts} />
              <Route render={() => <h1>Not found</h1>} />
              {/* <Redirect from="/" to="/posts" /> */}
              {/* <Route path="/" component={Posts} />  */}
            </Switch>
          </div>
      );
  }
}

export default Blog;
