import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectIntro from './components/ProjectIntro';
import ModelViewer3D from './components/ModelViewer3D';
import WorkDone from './components/WorkDone';
import Objectives from './components/Objectives';
import HowItWorks from './components/HowItWorks';
import SystemComponents from './components/SystemComponents';
import Sustainability from './components/Sustainability';
import Outcomes from './components/Outcomes';
import TechnicalHighlights from './components/TechnicalHighlights';
import ProjectGallery from './components/ProjectGallery';
import TeamSection from './components/TeamSection';
import GuideSection from './components/GuideSection';
import UniversitySection from './components/UniversitySection';
import FutureScope from './components/FutureScope';
import ConclusionCTA from './components/ConclusionCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top sticky navbar */}
      <Navbar />

      {/* Main content sections */}
      <main>
        <Hero />
        <ProjectIntro />
        
        {/* Interactive 3D Model Section */}
        <ModelViewer3D />

        {/* Project Work Log & Photos of Work Done */}
        <WorkDone />

        <Objectives />
        <HowItWorks />
        <SystemComponents />
        <Sustainability />
        <Outcomes />
        <TechnicalHighlights />
        <ProjectGallery />
        <TeamSection />
        <GuideSection />
        <UniversitySection />
        <FutureScope />
        <ConclusionCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
