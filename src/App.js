import React, { useState } from 'react';

import config from './config';
import styles from './App.module.scss';

import { FindEmployee } from './components/FindEmployee';

function App() {
  const [employee, setEmployee] = useState();
  const [mode, setMode] = useState('fn');

  return (
    <div className={styles.App}>
      <header>
        <h1>
          <span>{config.app.title}</span>
          <small>{config.app.subTitle}</small>
        </h1>
        <div className={styles.toggles}>
          <label>
            <input type="radio" value="fn" checked={mode === 'fn'} onChange={() => setMode('fn')} />
            Function Component
          </label>
          <label>
            <input type="radio" value="cls" checked={mode === 'cls'} onChange={() => setMode('cls')} />
            Class Component
          </label>
        </div>
      </header>
      <main>
        <FindEmployee initial={employee} onSelect={setEmployee} mode={mode} />

        <div className={styles.pickedEmployee}>
          <h4>Employee Details</h4>
          {employee && <pre>{JSON.stringify(employee, null, 2)}</pre>}
          {!employee && <small>Please select an employee above</small>}
        </div>
      </main>
    </div>
  );
}

export default App;
