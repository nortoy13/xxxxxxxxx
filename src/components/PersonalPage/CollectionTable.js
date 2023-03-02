import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { deletePost } from "../../actions/Posts";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ userInfo, posts, setCurrentId, isLoading }) {
  const language = useSelector((state) => state.lan);
  const dispatch = useDispatch();
  const handleDelete = () => {
    const checkboxs = document.querySelectorAll("input");
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        dispatch(deletePost(checkbox.name));
      }
    });
  };
  const handleEdit = () => {
    const checkboxs = document.querySelectorAll("input");
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        setCurrentId(checkbox.name);
      }
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
    checkboxs.forEach((checkbox) => (checkbox.checked = false));
  };
  const [isSorted, setIsSorted] = useState(false);
  const [sortByTopic, setSortByTopic] = useState(false);
  const postsRef = useRef(posts);
  const postsCopy = [...posts];
  useEffect(() => {
    let category = document.getElementById("topic")?.value
      ? document.getElementById("topic")?.value
      : "";
    console.log(category);
    postsRef.current = [
      ...postsCopy.filter((post) => (category ? post.category === category : post)),
    ];
    setIsSorted(isSorted);
  }, [sortByTopic]);
  posts = [...postsRef?.current];
  if (isLoading) {
    return <CircularProgress style={{ marginTop: "40px" }} />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: "30px",
          marginBottom: "10px",
        }}
      >
        <h2 className="collectionTableTitle">
          {language === "uz" ? "To'plamlar Jadvali" : "Table of Collection"}
        </h2>
        <div className="filterButtons">
          <label>sort by topic</label>
          <select name="category" id="topic" onChange={() => setSortByTopic(!sortByTopic)}>
            <option value="">all</option>
            <option value="not specified">not specified</option>
            <option value="books">Books</option>
            <option value="stamps">stamps</option>
            <option value="coke">Coke</option>
            <option value="car">Car</option>
            <option value="computer">Computer</option>
          </select>
          <input type="submit" onClick={() => setIsSorted(!isSorted)} />
          <Button
            style={{ margin: "0 10px" }}
            color="info"
            variant="contained"
            onClick={() => setIsSorted(!isSorted)}
          >
            {language === "uz" ? "Kun boyicha saralash" : "Sorting by date"}
          </Button>
        </div>
        <div className="tableButtons">
          <Button style={{ margin: "0 10px" }} variant="contained" onClick={handleEdit}>
            <EditIcon />
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                {language === "uz" ? "To'plam nomi" : "Collection Title"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Tavsif" : "Description"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Teglar" : "Tags"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Mavzu" : "Topic"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Yuklangan Sana" : "uploaded at"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Tanlash" : "Select"}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isSorted ? posts.reverse() : posts).map((post) => (
              <StyledTableRow key={post._id}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{post.message.slice(0, 100)}...</StyledTableCell>
                <StyledTableCell align="right">{post.tags.join(",")}</StyledTableCell>
                <StyledTableCell align="right">{post.category}</StyledTableCell>
                <StyledTableCell align="right">
                  {moment(post.createdAt).format("Do MMMM YYYY")}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <input type="checkbox" name={post._id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
