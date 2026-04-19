import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div>
      <div className="flex border-b border-[#d42f3f]/20">
        {tabs.map((tab, i) => (
          <button
            key={i}
            className={`
              py-2.5 px-4 font-medium text-sm border-b-2 -mb-px transition-all duration-200
              ${i === activeIndex
                ? 'text-[#d42f3f] border-[#d42f3f]'
                : 'text-[#6b6b6b] border-transparent hover:text-[#1a1a1a]'}
            `}
            onClick={() => setActiveIndex(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">{tabs[activeIndex].content}</div>
    </div>
  );
};