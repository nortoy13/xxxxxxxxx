import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@mui/material";
import "./posts.css";
function BiggestCol() {
  const { posts, isLoading } = useSelector((state) => state.posts);
  if (!posts?.length && !isLoading) return <p className="noPosts">No posts</p>;
  const cars = posts.filter((item) => item.category === "car");
  const allPosts = [...cars];
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid className="posts-container" container alignItems="stretch" spacing={3}>
      {allPosts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
}

export default BiggestCol;
