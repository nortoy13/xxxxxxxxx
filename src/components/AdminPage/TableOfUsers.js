import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  addToAdmin,
  blockUser,
  deleteUser,
  unlockUser,
  removeFromAdmin,
} from "../../actions/users";

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

export default function CustomizedTables({ users }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.lan);
  const handleDelete = () => {
    const checkboxs = document.querySelectorAll("input");
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        dispatch(deleteUser(checkbox.name));
      }
    });
  };
  const handleBlock = () => {
    const checkboxs = document.querySelectorAll("input");
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        dispatch(blockUser(checkbox.name));
        checkbox.checked = false;
      }
    });
  };
  const handleUnblock = () => {
    const checkboxs = document.querySelectorAll("input");
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        dispatch(unlockUser(checkbox.name));
        checkbox.checked = false;
      }
    });
  };
  const addAdmin = () => {
    const checkboxs = document.querySelectorAll("input");
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        dispatch(addToAdmin(checkbox.name));
        checkbox.checked = false;
      }
    });
  };
  const removeAdmin = () => {
    const checkboxs = document.querySelectorAll("input");
    checkboxs.forEach((checkbox) => {
      if (checkbox.checked) {
        dispatch(removeFromAdmin(checkbox.name));
        checkbox.checked = false;
      }
    });
  };
  const handleChange = () => {
    const all = document.getElementById("selectAll");
    const checkboxs = document.querySelectorAll("input");
    if (all.checked) {
      checkboxs.forEach((checkbox) => (checkbox.checked = true));
    } else {
      checkboxs.forEach((checkbox) => (checkbox.checked = false));
    }
  };
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
        <h2 className="adminPageTitle">
          {language === "uz" ? "Foydalanuvchilar Ro'yhati" : "Table of Users"}
        </h2>
        <div className="tableButtons">
          <Button variant="contained" onClick={addAdmin}>
            {language === "uz" ? "Adminga qo'shish" : "Add to Admin"}
          </Button>
          <Button style={{ margin: "0 10px" }} onClick={removeAdmin} variant="contained">
            {language === "uz" ? "Admindan chiqarish" : "Remove from Admin"}
          </Button>
          <Button variant="contained" onClick={handleUnblock}>
            <LockOpenIcon />
          </Button>
          <Button
            style={{ margin: "0 10px" }}
            color="warning"
            variant="contained"
            onClick={handleBlock}
          >
            <LockIcon />
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
                {language === "uz" ? "Foydalanuvchi ismi" : "Name of User"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Epochta" : "Email"}
              </StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Qo'shilgan sana:" : "Joined at"}
              </StyledTableCell>
              <StyledTableCell align="right">{language === "uz" ? "Roli" : "Role"}</StyledTableCell>
              <StyledTableCell align="right">
                {language === "uz" ? "Holati" : "Status"}
              </StyledTableCell>
              <StyledTableCell align="right">
                <input type="checkbox" id="selectAll" onClick={handleChange} />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row">
                  <Link to={`/users/${user._id}`}>{user.name}</Link>
                </StyledTableCell>
                <StyledTableCell align="right">{user.email}</StyledTableCell>
                <StyledTableCell align="right">
                  {moment(user.createdAt).format("Do MMMM YYYY")}
                </StyledTableCell>
                <StyledTableCell align="right">{user.isAdmin ? "admin" : "user"}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.isBlocked ? "blocked" : "active"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <input type="checkbox" name={user._id} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
