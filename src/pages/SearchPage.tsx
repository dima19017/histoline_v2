import React from 'react';

const SearchPage: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Поиск</h1>
      <input 
        type="text" 
        placeholder="Введите запрос..." 
        className="w-full max-w-md p-2 border border-gray-300 rounded" 
      />
      <p className="mt-4 text-gray-600">
        Функция поиска находится в разработке.
      </p>
    </main>
  );
};

export default SearchPage;
