import React from 'react';

import styles from './style.module.scss';

class Autocomplete extends React.Component {
  state = {
    allOptions: [],
    matches: [],
    focusMatch: undefined,
  };

  blurTimeout = null;

  componentDidMount() {
    this.props.getOptions().then((options) => {
      this.setState({ allOptions: options });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.blurTimeout);
  }

  updateMatches = (value) => {
    const text = (value || '').trim();

    if (!text) {
      this.clearMatches();
      this.props.onSelect();
    }

    const matches = this.state.allOptions.filter((opt) => this.props.matcher(text, opt));
    this.setState({ matches: matches.slice(0, this.props.maxSuggestions) });
  };

  clearMatches = () => {
    this.setState({
      matches: [],
      focusMatch: undefined,
    });
  };

  handleMatchClick = (match) => () => {
    this.props.onSelect(match);
    this.clearMatches();
  };

  handleInputKey = (ev) => {
    const keys = ['Enter', 'ArrowDown', 'ArrowUp'];
    if (this.state.matches.length === 0 || !keys.includes(ev.key)) return;

    ev.preventDefault();
    if (ev.key === 'Enter' && this.state.focusMatch != null) {
      this.handleMatchClick(this.state.matches[this.state.focusMatch])();
    }

    if (ev.key === 'ArrowDown') {
      this.setState((state) => ({ focusMatch: ((state.focusMatch || -1) + 1) % this.state.matches.length }));
    }

    if (ev.key === 'ArrowUp') {
      this.setState((state) => ({
        focusMatch: (this.state.matches.length + (state.focusMatch || 0) - 1) % this.state.matches.length,
      }));
    }
  };

  handleInputBlur = () => {
    this.blurTimeout = setTimeout(() => this.clearMatches(), 100);
  };

  render() {
    const { matches, focusMatch } = this.state;
    return (
      <div className={styles.Autocomplete} data-cy="autoCompleteWrap">
        <span className={styles.compHint}>Class Autocomplete</span>
        <div onKeyDown={this.handleInputKey} onBlur={this.handleInputBlur}>
          {this.props.children({ updateMatches: this.updateMatches })}
        </div>
        <ol className={styles.suggestions}>
          {matches.map((match, i) => (
            <li
              key={match.id}
              className={i === focusMatch ? styles.focused : null}
              onClick={this.handleMatchClick(match)}
              onMouseEnter={() => this.setState({ focusMatch: i })}
            >
              {React.createElement(this.props.matchComponent, { match })}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default Autocomplete;
