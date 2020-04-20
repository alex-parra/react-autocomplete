import React from 'react';

import config from './config';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <header>
        <h1>
          <span>{config.app.title}</span>
          <small>{config.app.subTitle}</small>
        </h1>
      </header>
      <main>-- main content --</main>
    </div>
  );
}

export default App;
