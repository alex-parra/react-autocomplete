import React, { useState } from 'react';

import { Autocomplete } from '../Autocomplete';
import { FieldText } from '../FieldText';
import { getEmployees } from '../../api';

const fullname = (employee) => `${employee.first_name} ${employee.last_name}`.trim();
const matchEmployee = (text, employee) => fullname(employee).toLowerCase().startsWith(text.toLowerCase());

const FindEmployee = ({ initialEmployee, onPick }) => {
  const [employeeName, setEmployeeName] = useState(() => {
    if (initialEmployee) return fullname(initialEmployee);
    return '';
  });

  const handleChange = (ev) => setEmployeeName(ev.target.value);
  const onSelected = (employee) => {
    setEmployeeName(fullname(employee));
    onPick(employee);
  };

  return (
    <Autocomplete getOptions={getEmployees} matcher={matchEmployee} onSelected={onSelected}>
      {({ updateMatches }) => {
        const onChange = (ev) => {
          handleChange(ev);
          updateMatches(ev.target.value);
        };

        return (
          <FieldText
            name="findEmployee"
            label="Employee:"
            value={employeeName}
            onChange={onChange}
            placeholder="Type employee name..."
            autoFocus
          />
        );
      }}
    </Autocomplete>
  );
};

export default FindEmployee;
