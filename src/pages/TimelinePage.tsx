import React, { useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import Timeline from '../components/Timeline';

const TimelinePage: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1); // 0 = centuries, 1 = decades, 2 = years

  // Handlers to adjust zoom level within [0, 2]
  const zoomOut = () => setZoomLevel(z => Math.max(0, z - 1));
  const zoomIn = () => setZoomLevel(z => Math.min(2, z + 1));

  // Label for zoom level for accessibility or display
  const zoomLabels = ["Века", "Десятилетия", "Годы"];

  return (
    <main className="p-4">
      {/* Page title */}
      <h1 className="text-xl font-semibold mb-4">Лента времени</h1>
      {/* Layout: filter panel and timeline side by side on desktop, stacked on mobile */}
      <div className="md:flex">
        {/* Filters sidebar (UI stub) */}
        <FilterPanel />
        {/* Timeline area */}
        <div className="flex-1 relative">
          {/* Zoom controls */}
          <div className="mb-4 flex items-center justify-end space-x-2">
            <button 
              onClick={zoomOut} 
              disabled={zoomLevel <= 0}
              className="px-3 py-1 border rounded disabled:opacity-50"
              aria-label="Zoom out"
            >
              −
            </button>
            <span className="font-medium text-gray-700">{zoomLabels[zoomLevel]}</span>
            <button 
              onClick={zoomIn} 
              disabled={zoomLevel >= 2}
              className="px-3 py-1 border rounded disabled:opacity-50"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>
          {/* Timeline visualization component */}
          <Timeline zoomLevel={zoomLevel} />
        </div>
      </div>
    </main>
  );
};

export default TimelinePage;
