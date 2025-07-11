
"use client" 

import * as React from "react"
import { useEffect, useRef, useState } from "react";
 
export interface AnimatedTabsProps {
  tabs: { label: string; value: string }[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
 
export function AnimatedTabs({ tabs, defaultValue, onValueChange }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0].value);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  // Initialize without animation
  useEffect(() => {
    if (defaultValue && !isInitialized) {
      setActiveTab(defaultValue);
      setIsInitialized(true);
    }
  }, [defaultValue, isInitialized]);
 
  useEffect(() => {
    const container = containerRef.current;
 
    if (container && activeTab && isInitialized) {
      const activeTabElement = activeTabRef.current;
 
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
 
        const clipLeft = offsetLeft + 16;
        const clipRight = offsetLeft + offsetWidth + 16;
 
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100,
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100,
        ).toFixed()}% round 17px)`;
      }
    }
  }, [activeTab, isInitialized]);
 
  return (
    <div className="relative bg-secondary/50 border border-primary/10 mx-auto flex w-fit flex-col items-center rounded-full py-2 px-4">
      <div
        ref={containerRef}
        className={`absolute z-10 w-full overflow-hidden ${
          isInitialized 
            ? '[clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]'
            : '[clip-path:inset(0px_50%_0px_50%_round_17px)]'
        }`}
      >
        <div className="relative flex w-full justify-center bg-primary">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className="flex h-8 items-center rounded-full p-3 text-sm font-medium text-primary-foreground whitespace-nowrap"
              tabIndex={-1}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
 
      <div className="relative flex w-full justify-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
 
          return (
            <button
              key={tab.value}
              ref={isActive ? activeTabRef : null}
              onClick={() => handleTabChange(tab.value)}
              className="flex h-8 items-center cursor-pointer rounded-full p-3 text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
