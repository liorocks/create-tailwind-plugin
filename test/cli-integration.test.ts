import { system, filesystem } from 'gluegun';

expect.addSnapshotSerializer({
  test: val => typeof val === 'string',
  // Remove new line at the end and replace 4 backslashes with 2.
  print: val => val.trim().replace(/\\\\/gi, '\\')
});

const src = filesystem.path(__dirname, '..');

const cli = async cmd =>
  system.run(
    'node ' + filesystem.path(src, 'bin', 'create-tailwind-plugin') + ` ${cmd}`
  );

test('creates a plugin', async done => {
  const output = await cli('fake-plugin-name');

  expect(output).toContain('Create Tailwind CSS Plugin');

  expect(output).toContain('Create: fake-plugin-name/index.js');
  expect(output).toContain('Create: fake-plugin-name/test.js');
  expect(output).toContain('Create: fake-plugin-name/package.json');
  expect(output).toContain('Create: fake-plugin-name/LICENSE');
  expect(output).toContain('Create: fake-plugin-name/README.md');
  expect(output).toContain('Create: fake-plugin-name/.gitignore');
  expect(output).toContain('Create: fake-plugin-name/.editorconfig');
  expect(output).toContain('Create: fake-plugin-name/.eslintrc');
  expect(output).toContain('Create: fake-plugin-name/.prettierrc');
  expect(output).toContain(
    'Create: fake-plugin-name/.github/workflows/test.yml'
  );

  expect(filesystem.isDirectory('fake-plugin-name/.git')).toBe(false);

  expect(output).toContain('Next Steps:');
  expect(output).toContain('$ cd fake-plugin-name');
  expect(output).toContain('$ npm install');
  expect(output).toContain('$ npm run watch');

  expect(output).toContain(
    'Docs: https://github.com/Landish/create-tailwind-plugin'
  );

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates index.js', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/index.js');

  expect(output).toContain('Create: fake-plugin-name/index.js');

  expect(filesystem.isFile('fake-plugin-name/index.js')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    const plugin = require('tailwindcss/plugin');

    module.exports = plugin(
      function ({ addUtilities, theme, variants }) {
        // If your plugin requires user config,
        // you can access these options here.
        // Docs: https://tailwindcss.com/docs/plugins#exposing-options
        const options = theme('fakeName');

        // Add CSS-in-JS syntax to create utility classes.
        // Docs: https://tailwindcss.com/docs/plugins#adding-utilities
        const utilities = {
          '.example-utility-class': {
            display: 'block',
          },
        };

        // Conditionally add utility class based on user configuration.
        if (options.YOUR_PLUGIN_CUSTOM_OPTION) {
          utilities['.custom-utility-class'] = {
            'background-color': 'red',
          };
        }

        addUtilities(utilities, {
          variants: variants('fakeName'),
        });
      },
      {
        theme: {
          // Default options for your custom plugin.
          // Docs: https://tailwindcss.com/docs/plugins#exposing-options
          fakeName: {
            YOUR_PLUGIN_CUSTOM_OPTION: false,
          },
        },
        variants: {
          // Default variants for your custom plugin.
          // Docs: https://tailwindcss.com/docs/plugins#variants
          fakeName: ['responsive'],
        },
      }
    );
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates test.js', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/test.js');

  expect(output).toContain('Create: fake-plugin-name/test.js');

  expect(filesystem.isFile('fake-plugin-name/test.js')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    const merge = require('lodash/merge');
    const cssMatcher = require('jest-matcher-css');
    const postcss = require('postcss');
    const tailwindcss = require('tailwindcss');
    const customPlugin = require('./index.js');

    expect.extend({
      toMatchCss: cssMatcher,
    });

    function generatePluginCss(overrides) {
      const config = {
        theme: {
          // Default options for your plugin.
          fakeName: {
            YOUR_PLUGIN_CUSTOM_OPTION: false,
          },
        },
        variants: {
          // Default variants for your plugin.
          fakeName: [],
        },
        corePlugins: false,
        plugins: [customPlugin],
      };

      return postcss(tailwindcss(merge(config, overrides)))
        .process('@tailwind utilities', {
          from: undefined,
        })
        .then(({ css }) => css);
    }

    test('utility classes can be generated', () => {
      return generatePluginCss().then(css => {
        expect(css).toMatchCss(\`    
        .example-utility-class {
          display: block
        }
        \`);
      });
    });

    test('options can be customized', () => {
      return generatePluginCss({
        theme: {
          fakeName: {
            YOUR_PLUGIN_CUSTOM_OPTION: true,
          },
        },
      }).then(css => {
        expect(css).toMatchCss(\`    
        .example-utility-class {
          display: block
        }
        .custom-utility-class {
          background-color: red
        }
        \`);
      });
    });

    test('variants can be customized', () => {
      return generatePluginCss({
        theme: {
          screens: {
            sm: '640px',
          },
        },
        variants: {
          fakeName: ['responsive', 'hover'],
        },
      }).then(css => {
        expect(css).toMatchCss(\`
        .example-utility-class {
          display: block
        } 
        .hover\\:example-utility-class:hover {
          display: block
        } 
        @media (min-width: 640px) {
          .sm\\:example-utility-class {
            display: block
          }
          .sm\\:hover\\:example-utility-class:hover {
            display: block
          }
        }
        \`);
      });
    });
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates package.json', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/package.json');

  expect(output).toContain('Create: fake-plugin-name/package.json');

  expect(filesystem.isFile('fake-plugin-name/package.json')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    {
      "name": "fake-plugin-name",
      "version": "1.0.0",
      "description": "Your Tailwind CSS Plugin Description",
      "main": "index.js",
      "scripts": {
        "lint": "eslint .",
        "lint:fix": "eslint . --fix",
        "format": "prettier --write --loglevel=error . !CHANGELOG.md",
        "test": "jest",
        "test:watch": "jest --watch",
        "release": "standard-version",
        "postrelease": "git push --follow-tags origin main && npm publish"
      },
      "husky": {
        "hooks": {
          "pre-commit": "npm run lint:fix && npm run format && npm run test"
        }
      },
      "repository": {
        "type": "git",
        "url": "git+https://github.com/Your Github Username/fake-plugin-name.git"
      },
      "bugs": {
        "url": "https://github.com/Your Github Username/fake-plugin-name/issues"
      },
      "homepage": "https://github.com/Your Github Username/fake-plugin-name#readme",
      "keywords": [
        "create-tailwind-plugin",
        "tailwind-css-plugin",
        "tailwindcss",
        "plugin"
      ],
      "author": "",
      "license": "MIT",
      "devDependencies": {
        "eslint": "^7.2.0",
        "eslint-config-airbnb-base": "^14.2.1",
        "eslint-config-prettier": "^6.15.0",
        "eslint-plugin-import": "^2.22.1",
        "eslint-plugin-jest": "^24.1.3",
        "eslint-plugin-prettier": "^3.1.4",
        "husky": "^4.3.0",
        "jest": "^26.6.3",
        "jest-matcher-css": "^1.1.0",
        "lint-staged": "^10.5.2",
        "lodash": "^4.17.20",
        "postcss": "^8.1.9",
        "prettier": "^2.2.0",
        "standard-version": "^9.1.0",
        "tailwindcss": "^2.0.1"
      }
    }
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates LICENSE', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/LICENSE');

  expect(output).toContain('Create: fake-plugin-name/LICENSE');

  expect(filesystem.isFile('fake-plugin-name/LICENSE')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    MIT License

    Copyright (c) 2021 

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates README.md', async done => {
  const output = await cli('--name="Fake Plugin Name"');
  const file = filesystem.read('fake-plugin-name/README.md');

  expect(output).toContain('Create: fake-plugin-name/README.md');

  expect(filesystem.isFile('fake-plugin-name/README.md')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    # Fake Plugin Name

    > Your Tailwind CSS Plugin Description

    Install the plugin from npm:

    \`\`\`
    $ npm install fake-plugin-name
    \`\`\`

    Then add the plugin to your \`tailwind.config.js\` file:

    \`\`\`js
    // tailwind.config.js
    module.exports = {
      theme: {
        // ...
        // Optional. Your plugin might not have any options at all.
        fakeName: {
          // ...
          YOUR_PLUGIN_CUSTOM_OPTION: true,
          // ...
        },
      },
      variants: {
        // ...
        // Optional. Your plugin might not have any variants at all.
        fakeName: ['responsive'],
        // ...
      },
      plugins: [
        // ...
        require('fake-plugin-name'),
        // ...
      ],
    };
    \`\`\`

    This plugin will generate following CSS:

    \`\`\`css
    /* ... */
    .example-utility-class {
      display: block;
    }

    .custom-utility-class {
      background-color: red;
    }
    /* ... */
    \`\`\`

    ## License

    Fake Plugin Name is licensed under the MIT License.

    ## Credits

    Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates .gitignore', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/.gitignore');

  expect(output).toContain('Create: fake-plugin-name/.gitignore');

  expect(filesystem.isFile('fake-plugin-name/.gitignore')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    .DS_Store
    node_modules
    npm-debug.log
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates .editorconfig', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/.editorconfig');

  expect(output).toContain('Create: fake-plugin-name/.editorconfig');

  expect(filesystem.isFile('fake-plugin-name/.editorconfig')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    root = true

    []
    indent_style = tab
    indent_size = 2
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = false
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates .eslintrc', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/.eslintrc');

  expect(output).toContain('Create: fake-plugin-name/.eslintrc');

  expect(filesystem.isFile('fake-plugin-name/.eslintrc')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    {
      "env": {
        "jest": true
      },
      "extends": ["airbnb-base", "prettier"],
      "plugins": ["prettier"],
      "rules": {
        "import/no-extraneous-dependencies": "off",
        "prettier/prettier": ["error"],
        "func-names": "off"
      }
    }
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates .prettierrc', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/.prettierrc');

  expect(output).toContain('Create: fake-plugin-name/.prettierrc');

  expect(filesystem.isFile('fake-plugin-name/.prettierrc')).toBe(true);
  expect(file).toMatchInlineSnapshot(`
    {
      "singleQuote": true,
      "tabWidth": 2,
      "printWidth": 80,
      "arrowParens": "avoid"
    }
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('creates .github/workflows/test.yml', async done => {
  const output = await cli('--name=fake-plugin-name');
  const file = filesystem.read('fake-plugin-name/.github/workflows/test.yml');

  expect(output).toContain(
    'Create: fake-plugin-name/.github/workflows/test.yml'
  );

  expect(filesystem.isFile('fake-plugin-name/.github/workflows/test.yml')).toBe(
    true
  );
  expect(file).toMatchInlineSnapshot(`
    # This workflow will do a clean install of node dependencies, build the source code and run tests across different versions of node
    # For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

    name: Tests

    on:
      push:
        branches: [main]
      pull_request:
        branches: [main]

    jobs:
      build:
        runs-on: ubuntu-latest

        strategy:
          matrix:
            node-version: [12.x]

        steps:
          - uses: actions/checkout@v2
          - name: Use Node.js \${{ matrix.node-version }}
            uses: actions/setup-node@v1
            with:
              node-version: \${{ matrix.node-version }}
          - run: npm ci
          - run: npm test
  `);

  filesystem.remove('fake-plugin-name');
  done();
});

test('description can be customized', async done => {
  await cli('--name=fake-plugin-name --description="my custom description"');
  const readme = filesystem.read('fake-plugin-name/README.md');
  const packageJson = filesystem.read('fake-plugin-name/package.json');

  expect(readme).toContain('my custom description');
  expect(packageJson).toContain('"description": "my custom description"');

  filesystem.remove('fake-plugin-name');
  done();
});

test('author can be customized', async done => {
  await cli('--name=fake-plugin-name --author="John Doe"');
  const packageJson = filesystem.read('fake-plugin-name/package.json');
  const license = filesystem.read('fake-plugin-name/LICENSE');

  expect(packageJson).toContain('"author": "John Doe"');
  expect(license).toContain('Copyright (c) 2021 John Doe');

  filesystem.remove('fake-plugin-name');
  done();
});

test('git-initialize can be customized', async done => {
  const output = await cli('--name=fake-plugin-name --initialize-git');

  expect(output).toContain('Initialized Git');
  expect(filesystem.isDirectory('fake-plugin-name/.git')).toBe(true);

  filesystem.remove('fake-plugin-name');
  done();
});

test('github-username can be customized', async done => {
  await cli('--name=fake-plugin-name --github-username=Landish');
  const packageJson = filesystem.read('fake-plugin-name/package.json');

  expect(packageJson).toContain(`
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Landish/fake-plugin-name.git"
  },
  "bugs": {
    "url": "https://github.com/Landish/fake-plugin-name/issues"
  },
  "homepage": "https://github.com/Landish/fake-plugin-name#readme",
  `);

  filesystem.remove('fake-plugin-name');
  done();
});
