import React, { useState } from 'react';

import config from './config';
import styles from './App.module.scss';

import { FieldText } from './components/FieldText';

function App() {
  const [employeeName, setEmployeeName] = useState('');

  return (
    <div className={styles.App}>
      <header>
        <h1>
          <span>{config.app.title}</span>
          <small>{config.app.subTitle}</small>
        </h1>
      </header>
      <main>
        <FieldText
          name="findEmployee"
          label="Employee:"
          value={employeeName}
          onChange={(ev) => setEmployeeName(ev.target.value)}
          placeholder="Type employee name..."
          autoFocus
        />
        <p>Employee name: "{employeeName}"</p>
      </main>
    </div>
  );
}

export default App;
