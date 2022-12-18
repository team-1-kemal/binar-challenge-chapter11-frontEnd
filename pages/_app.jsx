import React from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ComponentWrapper } from '../components/ComponentWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ComponentWrapper>
        <Component {...pageProps} />
      </ComponentWrapper>
    </Provider>
  );
}

export default MyApp;
