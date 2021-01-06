export const cleanName = (name: string = ''): string => {
  return name
    .replace(/tailwindcss/gi, '')
    .replace(/tailwind/gi, '')
    .replace(/plugin/gi, '')
    .replace(/css/gi, '')
    .replace('--', '-');
};
