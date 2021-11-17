const initialState = { userlogin: {} };

const LoginLOgout = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { userlogin: { ...state.userlogin, ...action.payload } };
    case "LOGOUT":
      return { userlogin: null };

    default:
      return false;
  }
};
export default LoginLOgout;
