import { useState, useEffect } from 'react';
const { detect } = require('detect-browser');

export const useBrowserDetect = () => {
  const [browserName, setBrowserName] = useState<string>('');

  useEffect(() => {
    const browser = detect();
    if (browser) {
      setBrowserName(browser.name);
    }
  }, []);

  return browserName;
};
