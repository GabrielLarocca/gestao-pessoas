import { createStore, combineReducers } from 'redux';
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import user from './ducks/user';

const reducers = combineReducers({ user });

const makeStore = ({ isServer }) => {
	if (isServer) {
		return createStore(reducers, composeWithDevTools());
	} else {
		const { persistStore, persistReducer } = require("redux-persist");
		const storage = require("redux-persist/lib/storage").default;

		const persistConfig = {
			key: "nextjs",
			whitelist: ["user"], // Add reducers to persist
			storage
		};

		const store = createStore(persistReducer(persistConfig, reducers), composeWithDevTools());

		store.__persistor = persistStore(store);

		return store;
	}
};

export const storeWrapper = createWrapper(makeStore, { debug: false });
