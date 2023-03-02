import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions/users";
import { getPosts } from "../../actions/Posts";
import { useParams } from "react-router-dom";
import Form from "../Form/Form";
import CollectionTable from "./CollectionTable";

const PersonalPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  const { userInfo } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const { posts, isLoading } = useSelector((state) => state.posts);
  const userPosts = posts.filter((post) => post?.creator === userInfo?._id);
  return (
    <section>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <CollectionTable
        isLoading={isLoading}
        user={userInfo}
        posts={userPosts}
        setCurrentId={setCurrentId}
      />
    </section>
  );
};

export default PersonalPage;
