import React, { useState, useEffect } from 'react';
import ReactInputMask from 'react-input-mask';

const InputMask = props => {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  return <ReactInputMask {...props} />;
};

export default InputMask;
