import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import HomePage from '../pages/Home';
import MapPage from '../pages/map';
import ChatPage from '../pages/chat';
import { RadarIcon } from 'lucide-react';

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'home',
    title: 'Home',
  },
  {
    segment: 'map',
    title: 'Map',
  },
  {
    segment: 'chat',
    title: 'Chat',
  },
  {
    segment: 'logout',
    title: 'Logout',
  }
];

function DashboardLayoutBranding(props) {
  const { window } = props;
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img  src="../src/assets/logo.jpeg" alt="israel" />,
        title: 'AI Book Writer',
        homeUrl: '../page/chat.jsx',
      }}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBranding;