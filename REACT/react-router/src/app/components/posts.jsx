import React from "react";
import PostsList from "./postsList";
import Post from "./post";
import query from "query-string";
import _ from "lodash";

const Posts = ({ match, location }) => {
  const posts = [
    { id: 1, label: "Post 1" },
    { id: 2, label: "Post 2" },
    { id: 3, label: "Post 3" },
    { id: 4, label: "Post 4" },
  ];
  console.log(location);
  const search = query.parse(location.search);
  const postId = match.params.postId;
  console.log(search);
  const cropPost = search
    ? _(posts).splice(0).take(search.count).value()
    : posts;
  return (
    <>
      {postId ? (
        <Post id={postId} posts={posts} />
      ) : (
        <PostsList posts={cropPost} />
      )}
    </>
  );
};

export default Posts;
