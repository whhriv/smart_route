import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const [showImage, setShowImage] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      
      history.push('/createRoute');
    }, 1000);

    return () => clearTimeout(timeout);
  }, [history]);

  return (
    <div>
      {showImage && (
        <img
          src="../../public/smart_route_logo.png"
          alt="Your Image"
          onLoad={() => setShowImage(true)}
          style={{ display: showImage ? 'block' : 'none' }}
        />
      )}
    </div>
  );
};

export default LandingPage;
