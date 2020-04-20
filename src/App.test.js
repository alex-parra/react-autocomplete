import React from 'react';
import {render} from '@testing-library/react';

import App from './App';
import config from './config';

test('renders app header', () => {
  const {getByText} = render(<App />);
  const appTitle = getByText(config.app.title);
  expect(appTitle).toBeInTheDocument();
});
