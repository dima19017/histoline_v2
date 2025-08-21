import React from 'react';

const Home: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать на Histoline!</h1>
      <p className="text-gray-800">
        Histoline – интерактивная вертикальная лента времени, отображающая важные исторические события и выдающихся личностей от 0 года до наших дней.
      </p>
      <p className="mt-2 text-gray-800">
        Используйте раздел <strong>«Линии»</strong>, чтобы просмотреть временную шкалу. Вы можете изменять масштаб (века, десятилетия, годы) и наводить курсор на точки, чтобы увидеть подробности.
      </p>
    </main>
  );
};

export default Home;
