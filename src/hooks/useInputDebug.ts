import { useState, useEffect, useCallback } from 'react';

interface InputDebugInfo {
  backendName?: string;
  label?: string;
  xtype?: string;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  htmlType?: string;
  currentValue?: string;
  domId?: string;
  className?: string;
}

export const useInputDebug = () => {
  const [isDebugOpen, setIsDebugOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<InputDebugInfo | null>(null);

  const extractInputInfo = useCallback((element: HTMLInputElement | HTMLTextAreaElement): InputDebugInfo => {
    return {
      backendName: element.getAttribute('data-backend-name') || undefined,
      label: element.getAttribute('data-label') || undefined,
      xtype: element.getAttribute('data-xtype') || undefined,
      minLength: element.getAttribute('data-min-length') ? Number(element.getAttribute('data-min-length')) : undefined,
      maxLength: element.getAttribute('data-max-length') ? Number(element.getAttribute('data-max-length')) : undefined,
      minValue: element.getAttribute('data-min-value') ? Number(element.getAttribute('data-min-value')) : undefined,
      maxValue: element.getAttribute('data-max-value') ? Number(element.getAttribute('data-max-value')) : undefined,
      htmlType: element.type || undefined,
      currentValue: element.value || undefined,
      domId: element.id || undefined,
      className: element.className || undefined,
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+Alt+0
      if (event.ctrlKey && event.altKey && event.key === '0') {
        event.preventDefault();
        event.stopPropagation();

        const activeElement = document.activeElement;
        
        // Check if the focused element is an input or textarea
        if (
          activeElement && 
          (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')
        ) {
          const inputElement = activeElement as HTMLInputElement | HTMLTextAreaElement;
          const info = extractInputInfo(inputElement);
          setDebugInfo(info);
          setIsDebugOpen(true);
        } else {
          // No input focused, show a message
          setDebugInfo({
            backendName: 'No input focused',
            label: 'Please click on an input field first',
            xtype: 'error',
          });
          setIsDebugOpen(true);
        }
      }
    };

    // Add event listener to document
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [extractInputInfo]);

  const closeDebug = useCallback(() => {
    setIsDebugOpen(false);
    setDebugInfo(null);
  }, []);

  return {
    isDebugOpen,
    debugInfo,
    closeDebug,
  };
};