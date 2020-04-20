import React, { useState, useEffect } from 'react';

import styles from './style.module.scss';

const Autocomplete = (props) => {
  const { getOptions, matcher, onSelected, children } = props;

  const [allOptions, setAllOptions] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    getOptions().then(setAllOptions);
  }, [getOptions]);

  const updateMatches = (value) => {
    const text = (value || '').trim();
    let matches = [];
    if (text) matches = allOptions.filter((opt) => matcher(text, opt));
    setMatches(matches);
  };

  const handleMatchClick = (match) => {
    onSelected(match);
    setMatches([]);
  };

  return (
    <div className={styles.Autocomplete}>
      {children({
        updateMatches,
      })}
      <div className={styles.suggestions}>
        {matches.map((match) => (
          <div key={match.id} onClick={() => handleMatchClick(match)}>
            <p>
              {match.first_name} {match.last_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autocomplete;
