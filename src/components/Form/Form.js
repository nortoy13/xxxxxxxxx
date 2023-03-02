import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/Posts";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./form.css";
function Form({ currentId, setCurrentId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const language = useSelector((state) => state.lan);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  const handeleSubmit = (e) => {
    e.preventDefault();
    const category = document.getElementById("category").value;
    const post = { ...postData, name: user?.result?.name, category: category };
    if (currentId) {
      dispatch(updatePost(currentId, post));
      clear();
    } else {
      dispatch(createPost(post, navigate));
      clear();
    }
  };
  let err = useSelector((state) => state.err);

  return (
    <Paper className="paper" elevation={6}>
      <form autoComplete="off" noValidate className="form" onSubmit={handeleSubmit}>
        <Typography variant="h6">
          {currentId
            ? language === "uz"
              ? "Tahrirlash"
              : "Editing"
            : language === "uz"
            ? "Yaratish"
            : "Creating"}{" "}
          {language === "uz" ? "" : "collection"}
        </Typography>
        <TextField
          className="text-input"
          required
          name="title"
          variant="outlined"
          label={language === "uz" ? "Sarlavha" : "Title"}
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          className="text-input"
          required
          name="message"
          variant="outlined"
          label={language === "uz" ? "Tavsif" : "Description"}
          fullWidth
          multiline
          rows={3}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          className="text-input"
          name="tags"
          variant="outlined"
          label={language === "uz" ? "Teglar" : "Tags"}
          fullWidth
          required
          value={postData.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e.target.value.split(","),
            })
          }
        />
        <label htmlFor="category">Choose a topic </label>
        <select name="category" id="category">
          <option value="not specified">not specified</option>
          <option value="books">Books</option>
          <option value="stamps">stamps</option>
          <option value="coke">Coke</option>
          <option value="car">Car</option>
          <option value="computer">Computer</option>
        </select>
        <div className="fileInput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          />
        </div>
        <Typography color="error">{err ? "you should fill required fields" : ""}</Typography>
        <Button
          className="buttonSubmit"
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          {language === "uz" ? "Topshirish" : "Submit"}
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          {language === "uz" ? "Tozalash" : "Clear"}
        </Button>
      </form>
    </Paper>
  );
}
export default Form;
