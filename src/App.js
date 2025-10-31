import React, { useEffect, useMemo, useState } from "react";

// Пример данных
const people = [
  { name: "Пушкин А.С.", birthDate: 1799, deathDate: 1837 },
  { name: "Лермонтов М.Ю.", birthDate: 1814, deathDate: 1841 },
  { name: "Толстой Л.Н.", birthDate: 1828, deathDate: 1910 },
];

const Timeline = ({ visibleStartYear, visibleEndYear }) => {
  const lineHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  const yearToY = (year) => ((year - visibleStartYear) / (visibleEndYear - visibleStartYear)) * lineHeight;

  // Подбор шага рисок исходя из масштаба (примерно каждые 30px)
  const desiredPixelsPerTick = 30;
  const yearsPerPixel = (visibleEndYear - visibleStartYear) / Math.max(1, lineHeight);
  const approxStep = desiredPixelsPerTick * yearsPerPixel;
  const candidates = [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000];
  const tickStep = candidates.find(s => s >= approxStep) || candidates[candidates.length - 1];
  const labelStep = tickStep * 5;

  const firstTick = Math.ceil(visibleStartYear / tickStep) * tickStep;
  const ticks = [];
  for (let year = firstTick; year <= visibleEndYear; year += tickStep) {
    ticks.push(year);
  }

  return (
    <svg width={200} height={lineHeight}>
      <line x1={100} y1={0} x2={100} y2={lineHeight} stroke="black" strokeWidth={2} />
      {ticks.map((year) => {
        const y = yearToY(year);
        const isLabel = Math.round(year / labelStep) === year / labelStep;
        return (
          <g key={year}>
            <line
              x1={isLabel ? 90 : 95}
              x2={isLabel ? 110 : 105}
              y1={y}
              y2={y}
              stroke={isLabel ? "#666" : "#999"}
              strokeWidth={isLabel ? 2 : 1}
            />
            {isLabel && (
              <text x={85} y={y + 4} fontSize={10} textAnchor="end" fill="#444">
                {year}
              </text>
            )}
          </g>
        );
      })}
      {people.map((p, i) => {
        const yStart = yearToY(p.birthDate);
        const yEnd = yearToY(p.deathDate);
        return (
          <g key={i}>
            <line x1={80} x2={120} y1={yStart} y2={yEnd} stroke="blue" strokeWidth={6} />
            <text x={130} y={yStart + 5} fontSize={12}>{p.name}</text>
          </g>
        );
      })}
    </svg>
  );
};

function App() {
  const dataMaxYear = Math.max(...people.map(p => p.deathDate));
  const currentYear = new Date().getFullYear();
  const globalMinYear = 0;
  const globalMaxYear = Math.max(dataMaxYear, currentYear);

  const [centerYear, setCenterYear] = useState(currentYear);
  const [yearsPerScreen, setYearsPerScreen] = useState(globalMaxYear - globalMinYear);

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

  const zoomIn = () => {
    setYearsPerScreen(prev => Math.max(10, Math.round(prev / 2)));
  };
  const zoomOut = () => {
    setYearsPerScreen(prev => Math.min(globalMaxYear - globalMinYear, Math.round(prev * 2)));
  };

  const onWheel = (e) => {
    const lineHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    if (!lineHeight) return;
    const yearsPerPixel = yearsPerScreen / lineHeight;
    const deltaYears = e.deltaY * yearsPerPixel;
    let nextCenter = centerYear + deltaYears;
    const half = yearsPerScreen / 2;
    // Clamp to keep window within global bounds
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
      <div style={{ width: '200px', height: '100vh' }}>
        <Timeline visibleStartYear={visibleStartYear} visibleEndYear={visibleEndYear} />
      </div>
    </div>
  );
}

export default App;
