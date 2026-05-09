import { chromium } from 'playwright-core';

const browser = await chromium.connectOverCDP('http://localhost:9333');
const ctx = browser.contexts()[0] ?? await browser.newContext();

const consoleErrors = [];

// Desktop screenshot
const desktopPage = await ctx.newPage();
desktopPage.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push('[desktop] ' + msg.text());
});
desktopPage.on('pageerror', (err) => {
  consoleErrors.push('[desktop pageerror] ' + err.message);
});
await desktopPage.setViewportSize({ width: 1440, height: 900 });
await desktopPage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await desktopPage.waitForTimeout(2000);
await desktopPage.screenshot({ path: '/Users/seantins9/Desktop/vgc-calc-desktop.png', fullPage: true });
console.log('Desktop screenshot saved');

// Read first results
const firstMoveText = await desktopPage.evaluate(() => {
  const sections = Array.from(document.querySelectorAll('section'));
  const moves = sections.find(s => s.textContent?.includes('Attacker Moves'));
  return moves?.textContent?.substring(0, 800) ?? 'NOT FOUND';
});
console.log('--- ATTACKER MOVES SECTION (first 800 chars) ---');
console.log(firstMoveText);

// Mobile screenshot
const mobilePage = await ctx.newPage();
mobilePage.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push('[mobile] ' + msg.text());
});
await mobilePage.setViewportSize({ width: 390, height: 844 });
await mobilePage.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await mobilePage.waitForTimeout(2000);

// Check no horizontal scroll
const horizontalScroll = await mobilePage.evaluate(() => {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth;
});
console.log('Mobile horizontal scroll:', horizontalScroll ? 'YES (BAD)' : 'NO');

await mobilePage.screenshot({ path: '/Users/seantins9/Desktop/vgc-calc-mobile.png', fullPage: true });
console.log('Mobile screenshot saved');

console.log('\n--- CONSOLE ERRORS ---');
console.log(consoleErrors.length === 0 ? 'NONE' : consoleErrors.join('\n'));

await desktopPage.close();
await mobilePage.close();
await browser.close();
process.exit(0);
