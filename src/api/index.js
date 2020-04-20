const URLS = {
  getEmployees: '/api/employees.json',
};

export const logError = (...args) => {
  // In reality, call monitoring service
  console.error(...args);
};

export const getEmployees = async () => {
  let employees = [];
  try {
    const resp = await fetch(URLS.getEmployees);
    if (resp.ok !== true) throw new Error('Bad url');
    employees = await resp.json();
  } catch (error) {
    logError('API > getEmployees', error || 'Failed to load employees list');
  }
  return employees;
};
