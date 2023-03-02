import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../actions/users";
import TableOfUsers from "./TableOfUsers";
import "./adminPage.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [allUsers]);
  return (
    <div>
      <TableOfUsers users={allUsers} />
    </div>
  );
};

export default AdminPage;
