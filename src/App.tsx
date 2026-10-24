import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LenisProvider } from './context/LenisContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InitialLoader } from './components/InitialLoader';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { SkillsPage } from './pages/SkillsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <Router>
      <LenisProvider>
        {/* Desktop-only subtle glowing pointer follower */}
        <CustomCursor />

        {/* Vertical scroll progress bar on viewport edge */}
        <ScrollProgress />

        {/* Initial cinematic loading screen */}
        {!loaderComplete && <InitialLoader onComplete={() => setLoaderComplete(true)} />}

        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-primary)',
          }}
        >
          <Navbar />

          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </LenisProvider>
    </Router>
  );
};

export default App;
