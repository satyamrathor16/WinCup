import React from 'react';
import Components from './src/components';
import MainNavigation from './src/navigation/MainNavigation';
// import { Provider } from 'react-redux';
// import Store from './src/store';
const App = () => {
  return (
    // <Provider store={Store}>
      <Components.Container>
        <MainNavigation />
      </Components.Container>
    // </Provider>
  );
};

export default App;
