import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Loader= () => {
  return (
    <div style={{ marginTop: '400px', textAlign: 'center' }}>
      <PropagateLoader color="#306cce" size={15} />
    </div>
  );
};

export default Loader;
