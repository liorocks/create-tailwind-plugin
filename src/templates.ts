const templates: any[] = [
  'index.js',
  'test.js',
  'package.json',
  'README.md',
  'LICENSE',
  // npx has trouble finding .gitignore file
  // so we have to remove dot from file name
  {
    template: 'gitignore',
    target: '.gitignore'
  },
  '.editorconfig',
  '.eslintrc',
  '.prettierrc',
  '.github/workflows/test.yml'
];

export default templates;
