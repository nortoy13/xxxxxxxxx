import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.log(errorMessage);
    dispatch({ type: "loginError", payload: errorMessage });
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/");
  } catch (error) {
    const errorMessage = error.response.data.message;
    console.log(errorMessage);
    dispatch({ type: "signinError", payload: errorMessage });
  }
};
