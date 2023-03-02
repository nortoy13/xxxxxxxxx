import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Grow, Grid } from "@mui/material";
import Posts from "../Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/Posts";
import "./home.css";
import BiggestCol from "../Posts/BiggestCol";

function Home() {
  const language = useSelector((state) => state.lan);

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search ", searchTerm);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const { posts } = useSelector((state) => state.posts);
  const placeholder = language === "uz" ? "qidirish" : "Search Items";

  return (
    <Grow in>
      <Container maxWidth="xl">
        <div className="search-container">
          <div className="search-inner">
            <input value={value} onChange={onChange} placeholder={placeholder} />
          </div>
          <div className="dropdown">
            {posts
              ?.filter((item) => {
                const searchTerm = value?.toLowerCase();
                const title = item?.title?.toLowerCase();
                return searchTerm && title?.includes(searchTerm) && title !== searchTerm;
              })
              .slice(0, 5)
              .map((item) => (
                <Link to={`/posts/${item._id}`} key={item._id}>
                  <div onClick={() => onSearch(item.full_name)} className="dropdown-row">
                    {item.title}
                  </div>
                </Link>
              ))}
            {posts
              ?.filter((item) => {
                const searchTerm = value?.toLowerCase();
                const message = item?.message?.toLowerCase();
                return searchTerm && message?.includes(searchTerm) && message !== searchTerm;
              })
              .slice(0, 5)
              .map((item) => (
                <Link to={`/posts/${item._id}`} key={item._id}>
                  <div onClick={() => onSearch(item.full_name)} className="dropdown-row">
                    in description: {item.message.slice(0, 50)}
                  </div>
                </Link>
              ))}
            {posts
              ?.filter((item) => {
                const searchTerm = value?.toLowerCase();
                const comments = item?.comments?.join()?.toLowerCase();
                return searchTerm && comments?.includes(searchTerm) && comments !== searchTerm;
              })
              .slice(0, 5)
              .map((item) => (
                <Link to={`/posts/${item._id}`} key={item._id}>
                  <div onClick={() => onSearch(item.full_name)} className="dropdown-row">
                    in comment of: {item.title}
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <h3 className="homeTitle">{language === "uz" ? "So'ngi narsalar" : "Latest items"}</h3>
        <Grid
          className="gridContainer"
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={12}>
            <Posts />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <h3 className="homeTitle" style={{ marginTop: "20px" }}>
              {language === "uz" ? "Katta to'plam" : "Biggest Colection"}
            </h3>
            <BiggestCol />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
