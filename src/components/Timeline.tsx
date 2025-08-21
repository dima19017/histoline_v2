import React, { useMemo } from 'react';
import eventsData from '../data/events.json';

interface TimelineProps {
  zoomLevel: number;
}

// Define the structure of timeline items
interface TimelineItem {
  id: number;
  type: 'event' | 'person';
  title: string;
  year: number;
  endYear?: number;
  birth?: number;
  death?: number;
  description: string;
  importance: number;
}

const Timeline: React.FC<TimelineProps> = ({ zoomLevel }) => {
  const presentYear = new Date().getFullYear();

  // Determine scale (pixels per year) based on zoom level
  const scale = zoomLevel === 0 ? 0.5 : zoomLevel === 1 ? 1 : 2;
  // Calculate container height to cover timeline from year 0 to present
  const containerHeight = presentYear * scale + 100;  // extra padding at bottom

  // Determine importance threshold for visibility at current zoom
  let importanceThreshold: number;
  if (zoomLevel === 0) {
    importanceThreshold = 5;   // at century view, show only most important (5)
  } else if (zoomLevel === 1) {
    importanceThreshold = 4;   // at decade view, show importance >=4
  } else {
    importanceThreshold = 1;   // at year view, show all
  }

  // Filter and sort events based on importance and year
  const timelineItems: TimelineItem[] = useMemo(() => {
    const items = (eventsData as TimelineItem[])
      .filter(item => item.importance >= importanceThreshold)
      .sort((a, b) => a.year - b.year);
    return items;
  }, [importanceThreshold]);

  // Choose tick interval based on zoom level (years between timeline markers)
  const tickInterval = zoomLevel === 0 ? 200   // centuries view: label every 200 years
                    : zoomLevel === 1 ? 50    // decades view: label every 50 years
                    : 10;                     // years view: label every 10 years
  // Generate an array of years for tick marks (including present year)
  const ticks: number[] = useMemo(() => {
    const years: number[] = [];
    for (let y = 0; y <= presentYear; y += tickInterval) {
      years.push(y);
    }
    if (years[years.length - 1] < presentYear) {
      years.push(presentYear);  // include the current year at end
    }
    return years;
  }, [presentYear, tickInterval]);

  return (
    <div className="relative" style={{ height: containerHeight }}>
      {/* Vertical timeline line */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bg-gray-300" 
        style={{ width: '2px', height: '100%' }} 
        aria-hidden="true"
      />
      {/* Year ticks and labels along the timeline */}
      {ticks.map(year => {
        const topPos = year * scale;
        return (
          <div 
            key={`tick-${year}`} 
            className="absolute left-1/2 -translate-x-1/2 text-gray-500 text-xs" 
            style={{ top: topPos }}
            aria-hidden="true"
          >
            {/* Tick mark line */}
            <div className="w-2 h-px bg-gray-400 -translate-x-1/2"></div>
            {/* Year label */}
            <div className="mt-1 -translate-x-1/2">{year}</div>
          </div>
        );
      })}
      {/* Timeline points for each event/person */}
      {timelineItems.map((item, index) => {
        // Calculate vertical position for the item
        const topPos = item.year * scale;
        // Determine point size based on importance
        let pointSizeClass = 'w-2 h-2';  // default small
        if (item.importance >= 5) {
          pointSizeClass = 'w-4 h-4';    // largest
        } else if (item.importance >= 3) {
          pointSizeClass = 'w-3 h-3';    // medium
        }
        // Determine color based on type
        const colorClass = item.type === 'event' ? 'bg-blue-600' : 'bg-green-600';
        // Alternate tooltip side: even index to right, odd to left
        const tooltipSideClass = index % 2 === 0 ? 'left-3' : 'right-3';

        // Prepare years text for tooltip (e.g. "1452–1519" or "1914–1918")
        let yearsText: string;
        if (item.type === 'person' && item.birth && item.death) {
          yearsText = `${item.birth}–${item.death}`;
        } else if (item.endYear) {
          yearsText = `${item.year}–${item.endYear}`;
        } else {
          yearsText = `${item.year}`;
        }

        return (
          <div
            key={item.id}
            tabIndex={0}
            className="absolute left-1/2 focus:outline-none"
            style={{ top: topPos }}
          >
            {/* Timeline point (dot) */}
            <div 
              className={`rounded-full ${colorClass} ${pointSizeClass}`} 
              style={{ transform: 'translateX(-50%)' }} 
              aria-hidden="true"
            />
            {/* Tooltip card (visible on hover or focus) */}
            <div 
              className={`absolute px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded shadow-lg opacity-0 transition-opacity duration-200 
                          group-hover:opacity-100 group-focus-within:opacity-100 ${tooltipSideClass}`}
            >
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm">{yearsText} г.</div>
              <div className="mt-1 text-sm">{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
