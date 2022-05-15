import React from "react";
import PostsList from "./postsList";
import Post from "./post";

const Posts = ({ match }) => {
  const posts = [
    { id: 1, label: "Post 1" },
    { id: 2, label: "Post 2" },
    { id: 3, label: "Post 3" },
    { id: 4, label: "Post 4" },
  ];
  const postId = match.params.postId;
  return (
    <>
      {postId ? (
        <Post id={postId} posts={posts} />
      ) : (
        <PostsList posts={posts} />
      )}
    </>
  );
};

export default Posts;
