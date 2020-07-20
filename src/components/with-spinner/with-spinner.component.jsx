import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} /> // This way we can pass through the props to the component we wrap
  );
};


// WithSpinner is a HOC that takes the component as the argument and returns us back the spinner componenent that will 
// render the component we passed in when the loading is false 

export default WithSpinner;
