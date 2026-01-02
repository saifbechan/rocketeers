import { type PlaywrightTestConfig, devices } from '@playwright/test';
import path from 'path';

const config: PlaywrightTestConfig = {
  timeout: 30 * 1000,
  testDir: path.join(__dirname, 'e2e'),
  retries: 2,
  outputDir: 'test-results/',

  webServer: {
    command: process.env.PREPUSH ? 'npm run start -- -p 3030' : 'npm run dev',
    url: process.env.PREPUSH
      ? 'http://localhost:3030'
      : 'http://localhost:3000',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.PREPUSH,
  },

  use: {
    trace: 'retry-with-trace',
    baseURL:
      process.env.BASE_URL ??
      (process.env.PREPUSH ? 'http://localhost:3030' : 'http://localhost:3000'),
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: devices['iPhone 12'],
    },
  ],
};

export default config;
