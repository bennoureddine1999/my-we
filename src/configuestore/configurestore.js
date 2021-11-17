import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import LoginLOgout from "../reducer/reducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, LoginLOgout);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export { store, persistor };
