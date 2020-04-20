import React, { useState } from 'react';

import config from './config';
import styles from './App.module.scss';

import { FindEmployee } from './components/FindEmployee';

function App() {
  const [pickedEmployee, setPickedEmployee] = useState();

  return (
    <div className={styles.App}>
      <header>
        <h1>
          <span>{config.app.title}</span>
          <small>{config.app.subTitle}</small>
        </h1>
      </header>
      <main>
        <FindEmployee initialEmployee={pickedEmployee} onPick={setPickedEmployee} />

        {pickedEmployee && (
          <div className={styles.pickedEmployee}>
            <h4>Selected Employee</h4>
            <pre>{JSON.stringify(pickedEmployee, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
