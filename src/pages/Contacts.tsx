import React from 'react';

const Contacts: React.FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold mb-4">Контакты</h1>
      <p className="text-gray-800">Свяжитесь с нами по электронной почте: <a href="mailto:info@histoline.example" className="text-blue-600 hover:underline">info@histoline.example</a></p>
      <p className="mt-2 text-gray-800">Телефон: +1 (234) 567-8901</p>
      <p className="mt-2 text-gray-600 text-sm">*Примечание: Контактные данные представлены в качестве примера.</p>
    </main>
  );
};

export default Contacts;