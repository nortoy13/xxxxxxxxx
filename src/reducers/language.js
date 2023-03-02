const lanReducer = (lan = localStorage.getItem("language") ? "uz" : "eng", action) => {
  switch (action.type) {
    case "uz":
      return action.payload;
    case "en":
      return action.payload;
    default:
      return lan;
  }
};

export default lanReducer;
