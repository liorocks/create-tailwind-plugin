import { cleanName } from '../src/utils';

test('cleanName removes `tailwind` from string', () => {
  const result = 'fake-name';
  expect(cleanName('fake-tailwind-name')).toEqual(result);
});

test('cleanName removes `tailwindcss` from string', () => {
  const result = 'fake-name';
  expect(cleanName('fake-tailwindcss-name')).toEqual(result);
});

test('cleanName removes `plugin` from string', () => {
  const result = 'fake-name';
  expect(cleanName('fake-plugin-name')).toEqual(result);
});

test('cleanName removes uppercase words from string', () => {
  const result = '-fake-name-';
  expect(cleanName('Tailwind-fake-Plugin-name-TAILWINDCSS')).toEqual(result);
});
