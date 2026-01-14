const STORAGE_KEYS = {
  START_DATE: 'shift-start-date',
  START_SHIFT_NUMBER: 'shift-start-number',
  START_SHIFT_TYPE: 'shift-start-type',
  OVERRIDES: 'shift-overrides',
  CURRENT_SHIFT: 'shift-current-viewing'
};

export const storage = {
  getStartDate: () => {
    return localStorage.getItem(STORAGE_KEYS.START_DATE);
  },
  
  setStartDate: (date) => {
    localStorage.setItem(STORAGE_KEYS.START_DATE, date);
  },
  
  getStartShiftNumber: () => {
    return localStorage.getItem(STORAGE_KEYS.START_SHIFT_NUMBER) || '1';
  },
  
  setStartShiftNumber: (number) => {
    localStorage.setItem(STORAGE_KEYS.START_SHIFT_NUMBER, number);
  },
  
  getStartShiftType: () => {
    return localStorage.getItem(STORAGE_KEYS.START_SHIFT_TYPE) || 'day-shift';
  },
  
  setStartShiftType: (type) => {
    localStorage.setItem(STORAGE_KEYS.START_SHIFT_TYPE, type);
  },
  
  getCurrentShift: () => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SHIFT) || '1';
  },
  
  setCurrentShift: (number) => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_SHIFT, number);
  },
  
  getOverrides: () => {
    const data = localStorage.getItem(STORAGE_KEYS.OVERRIDES);
    return data ? JSON.parse(data) : {};
  },
  
  setOverrides: (overrides) => {
    localStorage.setItem(STORAGE_KEYS.OVERRIDES, JSON.stringify(overrides));
  },
  
  clear: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};
