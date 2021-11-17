import { createStore } from "redux";
import LoginLOgout from "../reducer/reducer";

const stor = createStore(
  LoginLOgout
  //window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
);
export default stor;
