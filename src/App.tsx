import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import TimelinePage from './pages/TimelinePage';
import About from './pages/About';
import Contacts from './pages/Contacts';
import SearchPage from './pages/SearchPage';
import AddEventModal from './components/AddEventModal';

const App: React.FC = () => {
  // State for controlling the "Add Event" modal visibility
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      {/* Top navigation bar (common on all pages) */}
      <NavBar onAddEventClick={() => setShowAddModal(true)} />

      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>

      {/* Modal for "Add Event" (appears on top of any page when triggered) */}
      {showAddModal && <AddEventModal onClose={() => setShowAddModal(false)} />}
    </>
  );
};

export default App;
