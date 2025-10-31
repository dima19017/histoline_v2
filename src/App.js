import React, { useEffect, useMemo, useState } from "react";

// Пример данных
const people = [
  {
    name: "Пушкин А.С.",
    birthDate: 1799,
    deathDate: 1837,
    description: "Русский поэт и писатель, основоположник современного русского литературного языка."
  },
  {
    name: "Лермонтов М.Ю.",
    birthDate: 1814,
    deathDate: 1841,
    description: "Русский поэт и прозаик, автор романа 'Герой нашего времени'."
  },
  {
    name: "Толстой Л.Н.",
    birthDate: 1828,
    deathDate: 1910,
    description: "Русский писатель, автор 'Войны и мира' и 'Анны Карениной'."
  },
];

const events = [
  {
    title: "Падение Западной Римской империи",
    startYear: 476,
    endYear: 476,
    description: "Свержение Ромула Августа и конец античного западного мира."
  },
  {
    title: "Подписание Великой хартии вольностей",
    startYear: 1215,
    endYear: 1215,
    description: "Король Иоанн Безземельный признал права английской знати и ограничил абсолютную монархию."
  },
  {
    title: "Изобретение печатного станка",
    startYear: 1440,
    endYear: 1440,
    description: "Иоганн Гутенберг создал печатный станок с подвижными литерами."
  },
  {
    title: "Открытие Америки Колумбом",
    startYear: 1492,
    endYear: 1492,
    description: "Экспедиция Христофора Колумба достигла берегов Нового Света."
  },
  {
    title: "Великая французская революция",
    startYear: 1789,
    endYear: 1799,
    description: "Революция, приведшая к падению монархии и утверждению республиканских идей во Франции."
  },
  {
    title: "Первая мировая война",
    startYear: 1914,
    endYear: 1918,
    description: "Глобальный конфликт, вовлёкший крупнейшие державы мира."
  },
  {
    title: "Вторая мировая война",
    startYear: 1939,
    endYear: 1945,
    description: "Всемирная война 1939–1945 годов, крупнейший вооружённый конфликт в истории человечества."
  },
  {
    title: "Высадка человека на Луну",
    startYear: 1969,
    endYear: 1969,
    description: "Аполлон-11 доставил Нила Армстронга и Базза Олдрина на поверхность Луны."
  },
  {
    title: "Великие реформы Александра II",
    startYear: 1861,
    endYear: 1874,
    description: "Комплекс преобразований в Российской империи, включающий отмену крепостного права и военную реформу."
  },
  {
    title: "Отмена крепостного права в России",
    startYear: 1861,
    endYear: 1861,
    description: "Манифест Александра II об освобождении крестьян от крепостной зависимости."
  },
];

const Timeline = ({ visibleStartYear, visibleEndYear, onHoverChange }) => {
  const lineHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const yearsPerPixel = (visibleEndYear - visibleStartYear) / Math.max(1, lineHeight);

  const yearToY = (year) => ((year - visibleStartYear) / (visibleEndYear - visibleStartYear)) * lineHeight;

  const axisX = 180; // сдвигаем ось правее, чтобы слева было место под подписи
  return (
    <svg width={420} height={lineHeight}>
      <line x1={axisX} y1={0} x2={axisX} y2={lineHeight} stroke="black" strokeWidth={2} />
      {(() => {
        // Плотная раскладка у оси: альтернативно вправо/влево, без вертикальных пересечений в колонке
        const sorted = [...people].sort((a, b) => a.birthDate - b.birthDate);
        const columnLastEndYear = new Map(); // colIndex -> last death year

        const baseAxisX = axisX;
        const columnSpacing = 24;
        const placements = [];

        const candidateCol = (i) => {
          const magnitude = Math.floor(i / 2) + 1; // 1,1,2,2,3,3...
          const sign = i % 2 === 0 ? 1 : -1; // +,-,+,-
          return sign * magnitude; // 1,-1,2,-2,3,-3...
        };

        for (const p of sorted) {
          let chosen = null;
          // ищем ближайшую к оси колонку, где нет пересечения
          for (let i = 0; i < 100; i++) {
            const col = candidateCol(i);
            const lastEnd = columnLastEndYear.get(col);
            if (lastEnd === undefined || p.birthDate >= lastEnd) {
              chosen = col;
              break;
            }
          }
          if (chosen === null) {
            chosen = candidateCol(100); // fallback очень далеко, но фактически недостижимо при малом числе людей
          }
          columnLastEndYear.set(chosen, p.deathDate);
          placements.push({ person: p, col: chosen });
        }

        return placements.map(({ person: p, col }, i) => {
          const yStart = yearToY(p.birthDate);
          const yEnd = yearToY(p.deathDate);
          const x = col > 0 ? baseAxisX + Math.abs(col) * columnSpacing : baseAxisX - Math.abs(col) * columnSpacing;
          const color = ['#1d4ed8', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444'][i % 5];
          const labelOffset = 8;
          const isLeft = col < 0;
          return (
            <g
              key={`${p.name}-${col}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => {
                onHoverChange({
                  visible: true,
                  title: p.name,
                  subtitle: `${p.birthDate} — ${p.deathDate}`,
                  description: p.description,
                  x: e.clientX + 18,
                  y: e.clientY - 12,
                });
              }}
              onMouseMove={(e) => {
                onHoverChange({
                  visible: true,
                  title: p.name,
                  subtitle: `${p.birthDate} — ${p.deathDate}`,
                  description: p.description,
                  x: e.clientX + 18,
                  y: e.clientY - 12,
                });
              }}
              onMouseLeave={() => {
                onHoverChange({ visible: false });
              }}
            >
              <line x1={x} x2={x} y1={yStart} y2={yEnd} stroke={color} strokeWidth={6} />
              <text
                x={isLeft ? x - labelOffset : x + labelOffset}
                y={yStart + 4}
                fontSize={12}
                fill="#333"
                textAnchor={isLeft ? 'end' : 'start'}
              >
                {p.name}
              </text>
            </g>
          );
        });
      })()}
      {(() => {
        const getEventStart = (ev) => ev.startYear ?? ev.year;
        const getEventEnd = (ev) => ev.endYear ?? ev.year;

        const sortedEvents = [...events].sort((a, b) => getEventStart(a) - getEventStart(b));
        const columnLastEndYear = new Map();
        const baseAxisX = axisX;
        const columnSpacing = 18;
        const minGapYears = Math.max(1, yearsPerPixel * 28);
        const placements = [];

        const candidateCol = (i) => {
          if (i === 0) return 0;
          const magnitude = Math.floor((i - 1) / 2) + 1;
          const sign = (i - 1) % 2 === 0 ? 1 : -1;
          return sign * magnitude;
        };

        for (const ev of sortedEvents) {
          let chosen = null;
          for (let i = 0; i < 120; i++) {
            const col = candidateCol(i);
            const lastEnd = columnLastEndYear.get(col);
            const startYear = getEventStart(ev);
            const endYear = getEventEnd(ev);
            if (lastEnd === undefined || startYear - lastEnd >= minGapYears) {
              chosen = col;
              columnLastEndYear.set(col, endYear);
              break;
            }
          }
          if (chosen === null) {
            chosen = candidateCol(120);
          }
          placements.push({ event: ev, col: chosen });
        }

        return placements.map(({ event: ev, col }, idx) => {
          const startYear = getEventStart(ev);
          const endYear = Math.max(getEventEnd(ev), startYear);
          const yStart = yearToY(startYear);
          const yEnd = yearToY(endYear);
          const yMarker = endYear !== startYear ? (yStart + yEnd) / 2 : yStart;
          const x = baseAxisX + col * columnSpacing;
          const isLeft = col < 0;
          const color = ['#7c3aed', '#f97316', '#22c55e', '#e11d48', '#14b8a6'][idx % 5];
          const labelOffset = 10;
          const subtitle = startYear === endYear ? `${startYear} год` : `${startYear} — ${endYear} гг.`;
          return (
            <g
              key={`${ev.title}-${col}`}
              style={{ cursor: 'pointer' }}
              onMouseEnter={(e) => {
                onHoverChange({
                  visible: true,
                  title: ev.title,
                  subtitle,
                  description: ev.description,
                  x: e.clientX + 18,
                  y: e.clientY - 12,
                });
              }}
              onMouseMove={(e) => {
                onHoverChange({
                  visible: true,
                  title: ev.title,
                  subtitle,
                  description: ev.description,
                  x: e.clientX + 18,
                  y: e.clientY - 12,
                });
              }}
              onMouseLeave={() => {
                onHoverChange({ visible: false });
              }}
            >
              {endYear !== startYear && (
                <line x1={x} x2={x} y1={yStart} y2={yEnd} stroke={color} strokeWidth={4} strokeLinecap="round" />
              )}
              <circle cx={x} cy={yMarker} r={6} fill={color} stroke="#fff" strokeWidth={2} />
              <text
                x={isLeft ? x - labelOffset : x + labelOffset}
                y={yMarker + 4}
                fontSize={11}
                fill="#222"
                textAnchor={isLeft ? 'end' : 'start'}
              >
                {ev.title}
              </text>
            </g>
          );
        });
      })()}
    </svg>
  );
};

function App() {
  const currentYear = new Date().getFullYear();
  const allYears = [
    ...people.map(p => p.deathDate),
    ...events.map(e => (e.endYear ?? e.year)),
    ...events.map(e => (e.startYear ?? e.year)),
    currentYear
  ];
  const dataMaxYear = Math.max(...allYears);
  const globalMinYear = 0;
  const globalMaxYear = Math.max(dataMaxYear, currentYear);

  const [centerYear, setCenterYear] = useState(currentYear);
  const [yearsPerScreen, setYearsPerScreen] = useState(globalMaxYear - globalMinYear);
  const [tooltip, setTooltip] = useState({
    visible: false,
    title: '',
    subtitle: '',
    description: '',
    x: 0,
    y: 0,
  });

  const [visibleStartYear, visibleEndYear] = useMemo(() => {
    const half = yearsPerScreen / 2;
    let start = centerYear - half;
    let end = centerYear + half;
    // Не выходим за глобальные пределы
    if (start < globalMinYear) {
      end += (globalMinYear - start);
      start = globalMinYear;
    }
    if (end > globalMaxYear) {
      start -= (end - globalMaxYear);
      end = globalMaxYear;
    }
    return [start, end];
  }, [centerYear, yearsPerScreen, globalMinYear, globalMaxYear]);

  // Подписи лет на краю экрана
  const lineHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  const yearsPerPixel = yearsPerScreen / Math.max(1, lineHeight);
  const desiredPixelsPerLabel = 60;
  const approxLabelStep = desiredPixelsPerLabel * yearsPerPixel;
  const stepCandidates = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000];
  const labelStep = stepCandidates.find(s => s >= approxLabelStep) || stepCandidates[stepCandidates.length - 1];
  const firstLabel = Math.ceil(visibleStartYear / labelStep) * labelStep;
  const yearLabels = [];
  for (let y = firstLabel; y <= visibleEndYear; y += labelStep) {
    yearLabels.push(y);
  }
  const yearToY = (year) => {
    if (!lineHeight) return 0;
    return ((year - visibleStartYear) / (visibleEndYear - visibleStartYear)) * lineHeight;
  };

  const zoomIn = () => {
    setYearsPerScreen(prev => Math.max(10, Math.round(prev / 2)));
  };
  const zoomOut = () => {
    setYearsPerScreen(prev => Math.min(globalMaxYear - globalMinYear, Math.round(prev * 2)));
  };

  const updateTooltip = (update) => {
    setTooltip(prev => {
      const next = { ...prev, ...update };
      if (typeof window !== 'undefined') {
        const margin = 16;
        const tooltipWidth = 260;
        if (update.x !== undefined) {
          const maxX = window.innerWidth - margin - tooltipWidth;
          next.x = Math.min(Math.max(update.x, margin), Math.max(margin, maxX));
        }
        if (update.y !== undefined) {
          const maxY = window.innerHeight - margin;
          next.y = Math.min(Math.max(update.y, margin), Math.max(margin, maxY));
        }
      }
      return next;
    });
  };

  const onWheel = (e) => {
    const lineHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    if (!lineHeight) return;
    if (e.ctrlKey) {
      // Zoom: ctrl + wheel. Use multiplicative scaling based on deltaY
      const zoomFactor = Math.pow(1.1, Math.sign(e.deltaY));
      const newYearsPerScreen = Math.min(
        globalMaxYear - globalMinYear,
        Math.max(5, Math.round(yearsPerScreen * zoomFactor))
      );
      // Keep center fixed while zooming, then clamp if needed
      const half = newYearsPerScreen / 2;
      let nextCenter = centerYear;
      if (nextCenter - half < globalMinYear) nextCenter = globalMinYear + half;
      if (nextCenter + half > globalMaxYear) nextCenter = globalMaxYear - half;
      setCenterYear(nextCenter);
      setYearsPerScreen(newYearsPerScreen);
      e.preventDefault(); // prevent browser zoom
      return;
    }

    // Pan: normal wheel scroll moves through years
    const yearsPerPixel = yearsPerScreen / lineHeight;
    const deltaYears = e.deltaY * yearsPerPixel;
    let nextCenter = centerYear + deltaYears;
    const half = yearsPerScreen / 2;
    if (nextCenter - half < globalMinYear) nextCenter = globalMinYear + half;
    if (nextCenter + half > globalMaxYear) nextCenter = globalMaxYear - half;
    setCenterYear(nextCenter);
    e.preventDefault();
  };

  useEffect(() => {
    // Глобальный обработчик: крутить можно в любом месте экрана
    const handler = (e) => onWheel(e);
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [centerYear, yearsPerScreen, globalMinYear, globalMaxYear]);

  return (
    <div
      className="App"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <div style={{ position: 'fixed', top: 16, right: 16, display: 'flex', gap: 8 }}>
        <button onClick={zoomIn} style={{ padding: '6px 10px' }}>+</button>
        <button onClick={zoomOut} style={{ padding: '6px 10px' }}>−</button>
      </div>
      {/* Левая панель с годами */}
      <div style={{ position: 'fixed', left: 8, top: 0, height: '100vh', width: 60, pointerEvents: 'none' }}>
        {yearLabels.map((y) => (
          <div key={y} style={{ position: 'absolute', top: yearToY(y) - 6, left: 0, color: '#444', fontSize: 12 }}>
            {y}
          </div>
        ))}
      </div>
      <div style={{ width: '420px', height: '100vh' }}>
        <Timeline
          visibleStartYear={visibleStartYear}
          visibleEndYear={visibleEndYear}
          onHoverChange={updateTooltip}
        />
      </div>
      {tooltip.title && (
        <div
          style={{
            position: 'fixed',
            top: tooltip.y,
            left: tooltip.x,
            transform: `translateY(-110%) scale(${tooltip.visible ? 1 : 0.96})`,
            opacity: tooltip.visible ? 1 : 0,
            transition: 'opacity 0.16s ease, transform 0.2s ease',
            pointerEvents: 'none',
            background: 'rgba(15, 23, 42, 0.9)',
            color: '#e2e8f0',
            padding: '12px 16px',
            borderRadius: '14px',
            boxShadow: '0 18px 32px rgba(15, 23, 42, 0.35)',
            minWidth: 220,
            maxWidth: 260,
            backdropFilter: 'blur(6px)',
            zIndex: 1000,
            border: '1px solid rgba(148, 163, 184, 0.25)'
          }}
        >
          <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{tooltip.title}</div>
          <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 8 }}>{tooltip.subtitle}</div>
          <div style={{ fontSize: 13, lineHeight: 1.45 }}>{tooltip.description}</div>
        </div>
      )}
    </div>
  );
}

export default App;
