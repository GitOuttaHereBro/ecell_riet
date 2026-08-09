/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactLenis } from 'lenis/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import LandingPage from './components/LandingPage';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const FormDetails = lazy(() => import('./components/FormDetails'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-mono">Loading...</div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}
