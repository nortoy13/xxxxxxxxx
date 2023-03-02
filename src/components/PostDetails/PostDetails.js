import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts, getPost } from "../../actions/Posts";
import CommentSection from "./CommentSection";

import "./postDetails.css";

function PostDetails() {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.lan);
  const { id } = useParams();
  useEffect(() => {
    dispatch(getPosts());
  }, [post]);
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  const openPost = (_id) => navigate(`/posts/${_id}`);
  if (!post) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className="loadingPaper">
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  if (post) {
    var recommendedPosts = posts?.filter(({ _id }) => _id !== post?._id);
  }
  return (
    <Paper
      className="postDetails"
      style={{ padding: "20px", borderRadius: "15px", marginBottom: "20px" }}
      elevation={6}
    >
      <div className="Acard">
        <div className="section">
          <Typography variant="h4" component="h2">
            {post?.title}
          </Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
            {post?.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6">
            {language === "uz" ? "Muallif:" : "Created by:"} {post?.name}
          </Typography>
          <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className="imageSection">
          <img className="media" src={post?.selectedFile} alt={post?.title} />
        </div>
      </div>
      {recommendedPosts?.length && (
        <div className="section">
          <Typography variant="h5" gutterBottom>
            {language === "uz" ? "Sizga yoqishi mumkin" : "You might also like"}
          </Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
              <div
                style={{ margin: "20px", cursor: "pointer" }}
                onClick={() => openPost(_id)}
                key={_id}
              >
                <Typography variant="h6" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {message.slice(0, 25)}... more
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {language === "uz" ? "Yoqtirishlar soni:" : "Likes:"} {likes.length}
                </Typography>
                <img src={selectedFile} width="200px" alt="img" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
}

export default PostDetails;
