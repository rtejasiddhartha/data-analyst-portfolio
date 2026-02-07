import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import AppMobile from './AppMobile';
import AppTablet from './AppTablet';
import AppDesktop from './AppDesktop';

const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
};

const AppSelector = () => {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= BREAKPOINTS.mobile) {
        setDeviceType('mobile');
      } else if (width <= BREAKPOINTS.tablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  switch (deviceType) {
    case 'mobile': return <AppMobile />;
    case 'tablet': return <AppTablet />;
    case 'desktop': return <AppDesktop />;
    default: return <AppDesktop />;
  }
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppSelector />);
