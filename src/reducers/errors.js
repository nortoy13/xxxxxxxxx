const errReducer = (err = "", action) => {
  switch (action.type) {
    case "loginError":
      return action.payload;
    case "signinError":
      return action.payload;
    default:
      return err;
  }
};

export default errReducer;
