import React from 'react';

import { ModalProvider } from 'styled-react-modal';
import { AuthProvider } from './auth';
import { CheckoutProvider } from './checkout';

const AppProvider = ({ children }) => (
  <AuthProvider>
    <CheckoutProvider>
      <ModalProvider>{children}</ModalProvider>
    </CheckoutProvider>
  </AuthProvider>
);

export default AppProvider;
