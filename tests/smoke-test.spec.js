import { test, expect } from '@playwright/test';

test.describe('Smoke Test Your-Energy', () => {
  test('Successfully loads the homepage and checks the header elements', async ({ page }) => {
    // 1. Відкриваємо головну сторінку (використовує baseURL з конфігу)
    await page.goto('./');

    // 2. Перевірка, що хедер існує і видимий
    await expect(page.locator('.header > .container')).toBeVisible();

    // 3. Перевірка логотипу
    const logo = page.locator('.header__logo > a > img');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src'); // Додатково перевіряємо, що у картинки є шлях

    // 4. Перевірка навігаційних кнопок
    // Перевірка що текст кнопки 1 містить "Home"
    await expect(page.locator('.header__nav-link').nth(0)).toBeVisible();
    await expect(page.locator('.header__nav-link').nth(0)).toContainText('Home');

    // Перевірка що текст кнопки 2 містить "Favorite"
    await expect(page.locator('.header__nav-link').nth(1)).toBeVisible();
    await expect(page.locator('.header__nav-link').nth(1)).toContainText('Favorite');

    // 5. Перевірка кнопок соціальних мереж
    // Facebook
    await expect(page.locator('.header__socials-link > img').nth(0)).toBeVisible();
    // Instagram
    await expect(page.locator('.header__socials-link > img').nth(1)).toBeVisible();
    // YouTube
    await expect(page.locator('.header__socials-link > img').nth(2)).toBeVisible();

    // --- Скролінг ---
    // Виконуємо плавний скролінг до футера
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded(); // Playwright сам скролить, якщо це потрібно
    await expect(footer).toBeVisible();

    // Знаходимо поле імейлу у футері
    const emailInput = page.locator('.footer__subscribe-form-field > [name="email"]');
    const userEmail = test.info().project.use.env.userEmail; // Отримуємо емейл з конфігу

    await expect(emailInput).toBeVisible();
    await emailInput.fill(userEmail); // Аналог .type() у Cypress

    // Перевірка, що в полі саме мій емейл
    await expect(emailInput).toHaveValue(userEmail);

    // Натискаємо кнопку відправки (Send)
    const sendButton = page.locator('.footer__subscribe-form-button');
    await expect(sendButton).toBeVisible();
    await expect(sendButton).toBeEnabled(); // Перевірка, що кнопка не заблокована
    await sendButton.click();

    // Перевіряємо, що контейнер зі сповіщенням стосовно підписки став видимим
    await expect(page.locator('.global-notification__content')).toBeVisible();

    // Перевіряємо текст сповіщення (ілі/або)
    const notificationText = page.locator('#js-global-notification-text');
    await expect(notificationText).toBeVisible();
    
    // В Playwright перевірка на декілька варіантів тексту робиться через регулярний вираз
    await expect(notificationText).toHaveText(/Thank you for subscribing!|Subscription already exists/);
  });
});