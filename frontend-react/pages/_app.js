import React from "react";
import AxiosSetup from '../helpers/axios';
import NProgress from 'nprogress';
import Router from 'next/router';
import { useStore } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { storeWrapper } from "../store/storeConfig";

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/globals.css";

Router.events.on('routeChangeStart', url => {
	NProgress.start();
});
Router.events.on('routeChangeComplete', () => {
	NProgress.done();
});
Router.events.on('routeChangeError', () => {
	NProgress.done();
});

function MyApp({ Component, pageProps }) {
	const store = useStore((state) => state);

	return (
		<PersistGate persistor={store.__persistor} loading={""}>
			<AxiosSetup store={store}>
				<Component {...pageProps} />
			</AxiosSetup>
		</PersistGate>
	);
}

export default storeWrapper.withRedux(MyApp);