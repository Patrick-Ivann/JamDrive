import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { getPosts } from "../../actions/postActions";

import PostForms from "./PostForm";
import PostFeed from "./PostFeed";


import SpinnerLoading from "../common/LoadingImg";





class Posts extends Component {

    componentDidMount() {

        this.props.getPosts()
    }





    render() {

        const { posts, loading } = this.props.post;


        let postContent;

        if (posts === null || loading) {

            postContent = <SpinnerLoading></SpinnerLoading>

        } else {

            postContent = <PostFeed posts={posts}></PostFeed>

        }

        return (
            <div>

                <PostForms></PostForms>

                {postContent}

            </div>
        )
    }
}


Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired

}

const mapStateToProps = state => ({

    post: state.post,
    auth: state.auth,
    errors: state.errors

})

export default connect(mapStateToProps, { getPosts })(Posts)