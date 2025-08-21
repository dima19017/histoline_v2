import React from 'react';

const FilterPanel: React.FC = () => {
  return (
    <aside className="bg-gray-50 p-4 rounded md:w-64 md:mr-6">
      <h2 className="text-lg font-semibold mb-3">Фильтры</h2>
      {/* Filter options (UI stub, not functional) */}
      <div className="space-y-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" defaultChecked /> 
          <span>События</span>
        </label>
        <br />
        <label className="inline-flex items-center">
          <input type="checkbox" className="mr-2" defaultChecked /> 
          <span>Персоналии</span>
        </label>
      </div>
      {/* Search field (UI stub) */}
      <div className="mt-4">
        <input 
          type="text" 
          placeholder="Поиск..." 
          className="w-full p-2 border border-gray-300 rounded" 
        />
      </div>
    </aside>
  );
};

export default FilterPanel;
