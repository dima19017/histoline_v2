export const people = [
  {
    name: "Пушкин А.С.",
    birthDate: 1799,
    deathDate: 1837,
    description: "Русский поэт и писатель, основоположник современного русского литературного языка.",
  },
  {
    name: "Лермонтов М.Ю.",
    birthDate: 1814,
    deathDate: 1841,
    description: "Русский поэт и прозаик, автор романа 'Герой нашего времени'.",
  },
  {
    name: "Толстой Л.Н.",
    birthDate: 1828,
    deathDate: 1910,
    description: "Русский писатель, автор 'Войны и мира' и 'Анны Карениной'.",
  },
];

export function sortPeopleByBirthDate(items = people) {
  return [...items].sort((a, b) => a.birthDate - b.birthDate);
}
export const people = [
  {
    name: "Пушкин А.С.",
    birthDate: 1799,
    deathDate: 1837,
    description:
      "Русский поэт и писатель, основоположник современного русского литературного языка.",
  },
  {
    name: "Лермонтов М.Ю.",
    birthDate: 1814,
    deathDate: 1841,
    description: "Русский поэт и прозаик, автор романа 'Герой нашего времени'.",
  },
  {
    name: "Толстой Л.Н.",
    birthDate: 1828,
    deathDate: 1910,
    description: "Русский писатель, автор 'Войны и мира' и 'Анны Карениной'.",
  },
];

