import React from 'react';

function Success({ message }) {
  return (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
}

export default Success;
