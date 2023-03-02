import { FETCH_USER, FETCH_USERS, DELETE, BLOCK } from "../constants/actionTypes";
import * as api from "../api";

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);
    dispatch({ type: FETCH_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  console.log(id);
  try {
    await api.deleteUser(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const blockUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.blockUser(id);
    dispatch({ type: BLOCK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const unlockUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.unlockUser(id);
    dispatch({ type: BLOCK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addToAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.addToAdmin(id);
    dispatch({ type: BLOCK, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const removeFromAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeFromAdmin(id);
    dispatch({ type: BLOCK, payload: data });
  } catch (error) {
    console.log(error);
  }
};
