import React, { useEffect, useState } from "react";
import "./post.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import moment from "moment";
import { useDispatch } from "react-redux";
import { likePost } from "../../../actions/Posts";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useNavigate, useLocation } from "react-router-dom";
import { getPostsBySearch } from "../../../actions/Posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Post({ post }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result?._id;
  const hasLikedPost = post.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const query = useQuery();
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    searchPost();
  }, [tag]);
  const searchPost = () => {
    if (tag) {
      dispatch(getPostsBySearch({ search, tag: tag }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tag=${tag}`);
    }
  };
  useEffect(() => {}, [tag]);

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOffAltIcon fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpOffAltIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  return (
    <Card className="card" raised elevation={6}>
      <CardMedia
        style={{
          height: 0,
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backgroundBlendMode: "darken",
          cursor: "pointer",
        }}
        onClick={openPost}
        className="cardMedia"
        image={post.selectedFile}
        title={post.title}
      />
      <div className="overlay">
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">Topic: {post.category}</Typography>
        <Typography variant="body2">{moment(post.createdAt).calendar()}</Typography>
      </div>
      <div className="details">
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{ cursor: "pointer" }}
              onClick={(e) => setTag(e.target.innerText?.slice(1))}
            >{`#${tag.split(" ").join("")} `}</span>
          ))}
        </Typography>
      </div>
      <ButtonBase className="cardAction" onClick={openPost}>
        <Typography className="title" variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message.slice(0, 100)}... read more
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className="cardActions">
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
