import React from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setIsMobile(window.innerWidth < 1570);
      },
      false
    );
  }, []);

  return { isMobile };
};

export default useMobile;
