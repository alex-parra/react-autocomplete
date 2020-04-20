import React, { useState } from 'react';

import { Autocomplete } from '../Autocomplete';
import { FieldText } from '../FieldText';
import { getEmployees } from '../../api';

const fullname = (employee) => `${employee.first_name} ${employee.last_name}`.trim();
const matchEmployee = (text, employee) => {
  const rx = new RegExp(text, 'gi');
  return rx.test(fullname(employee));
};

const EmployeeSuggestion = ({ match }) => <p style={{ margin: 0 }}>{fullname(match)}</p>;

const FindEmployee = ({ initial, onSelect }) => {
  const [employeeName, setEmployeeName] = useState(initial ? fullname(initial) : '');

  const handleChange = (ev) => setEmployeeName(ev.target.value);

  const handleSelected = (employee) => {
    setEmployeeName(employee ? fullname(employee) : '');
    onSelect(employee);
  };

  return (
    <Autocomplete
      getOptions={getEmployees}
      matcher={matchEmployee}
      onSelect={handleSelected}
      matchComponent={EmployeeSuggestion}
    >
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
