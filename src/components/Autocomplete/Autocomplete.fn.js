import React, { useState, useEffect, useRef } from 'react';

import styles from './style.module.scss';

const Autocomplete = (props) => {
  const { getOptions, matcher, onSelect, children, matchComponent, maxSuggestions = 10 } = props;

  const blurTimeout = useRef(null);
  const [allOptions, setAllOptions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [focusMatch, setFocusMatch] = useState();

  useEffect(() => {
    return () => clearTimeout(blurTimeout.current);
  });

  useEffect(() => {
    getOptions().then(setAllOptions);
  }, [getOptions]);

  const updateMatches = (value) => {
    const text = (value || '').trim();

    if (!text) {
      clearMatches();
      onSelect();
    }

    const matches = allOptions.filter((opt) => matcher(text, opt));
    setMatches(matches.slice(0, maxSuggestions));
  };

  const clearMatches = () => {
    setMatches([]);
    setFocusMatch();
  };

  const handleMatchClick = (match) => () => {
    onSelect(match);
    clearMatches();
  };

  const handleInputKey = (ev) => {
    const keys = ['Enter', 'ArrowDown', 'ArrowUp'];
    if (matches.length === 0 || !keys.includes(ev.key)) return;

    ev.preventDefault();
    if (ev.key === 'Enter' && focusMatch != null) handleMatchClick(matches[focusMatch])();
    if (ev.key === 'ArrowDown') setFocusMatch((m = -1) => (m + 1) % matches.length);
    if (ev.key === 'ArrowUp') setFocusMatch((m = 0) => (matches.length + m - 1) % matches.length);
  };

  const handleInputBlur = () => {
    blurTimeout.current = setTimeout(() => clearMatches(), 100);
  };

  return (
    <div className={styles.Autocomplete} data-cy="autoCompleteWrap">
      <span className={styles.compHint}>Functional Autocomplete</span>
      <div onKeyDown={handleInputKey} onBlur={handleInputBlur}>
        {children({ updateMatches })}
      </div>
      <ol className={styles.suggestions}>
        {matches.map((match, i) => (
          <li
            key={match.id}
            className={i === focusMatch ? styles.focused : null}
            onClick={handleMatchClick(match)}
            onMouseEnter={() => setFocusMatch(i)}
          >
            {React.createElement(matchComponent, { match })}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Autocomplete;
