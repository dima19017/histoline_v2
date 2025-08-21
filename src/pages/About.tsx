import React from 'react';

const About: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">О проекте</h1>
      <p className="text-gray-800">
        Проект <strong>Histoline</strong> создан для визуализации истории в удобном интерактивном формате. 
        Он отображает значимые исторические события и выдающихся личностей на вертикальной временной шкале.
      </p>
      <p className="mt-2 text-gray-800">
        Цель проекта – предоставить наглядный способ изучения хронологии событий, 
        позволяющий легко изменять масштаб и фильтровать информацию.
      </p>
    </main>
  );
};

export default About;
