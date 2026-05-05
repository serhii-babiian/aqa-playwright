// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Запускаємо тести послідовно, щоб уникнути конфліктів при підписці */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. */
  use: {
    /* Показувати браузер під час тесту (як у Cypress) */
    headless: false,
    
    /* URL для проекту */
    baseURL: 'https://serhii-babiian-bachelor.github.io/js-course-work-babiian-serhii/',

    /* Додаємо емейл як глобальну змінну */
    env: {
      userEmail: 'se.babiian@gmail.com'
    },

    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
    /* Робимо скріншот при падінні тесту */
    screenshot: 'only-on-failure',
  },

  /* Налаштування браузерів */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});