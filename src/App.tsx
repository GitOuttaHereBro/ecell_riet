/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactLenis } from 'lenis/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import FormDetails from './components/FormDetails';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
              <LandingPage />
            </ReactLenis>
          } 
        />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/form/:formId" element={<FormDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
