import React from 'react';
import { render, act } from '@testing-library/react';

import App from './App';
import config from './config';

test('renders app header', async () => {
  let app;
  await act(async () => {
    app = render(<App />);
  });

  const appTitle = app.getByText(config.app.title);
  expect(appTitle).toBeInTheDocument();
});
