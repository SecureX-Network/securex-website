import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { WebsiteLayout } from './WebsiteLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FeaturesPage from './pages/FeaturesPage';
import SecurityPage from './pages/SecurityPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}