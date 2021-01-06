# Create Tailwind CSS Plugin

> Create [Tailwind CSS](https://tailwindcss.com) plugin and publish on [npm](https://www.npmjs.com) with ease

![screenshot](https://github.com/Landish/create-tailwind-plugin/blob/main/screenshot.gif?raw=true)

## Demo

[tailwindcss-plugin-demo](https://github.com/Landish/tailwindcss-plugin-demo) is generated with `create-tailwind-plugin`

## Features

- Tests with [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/) config with [`airbnb-base`](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) and [`prettier`](https://github.com/prettier/eslint-config-prettier)
- Format code with [Prettier](https://prettier.io/)
- Pre-commit hooks with [husky](https://github.com/typicode/husky)
- Automatic tests with [Github Actions](https://github.com/features/actions)
- Automatic versioning with [standard-version](https://github.com/conventional-changelog/standard-version)

## Usage

```shell
$ npx create-tailwind-plugin
```

Alternatively, you can also pass following options to avoid prompt questions.

```shell
$ npx create-tailwind-plugin --name="Your Plugin Name" --description="Your Plugin Description" --author="Your Name" --github-username="Your Github Username" --initialize-git --install-packages
```

### Options

| Option               | Description                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `--name`             | Used in **README.md** and in **package.json** as `name` key                   |
| `--description`      | Used in **README.md** and in **package.json** as `description` key            |
| `--author`           | Used in **LICENSE** and in **package.json** as `author` key                   |
| `--github-username`  | Used in **package.json** in `repository.url`, `bugs.url`, and `homepage` keys |
| `--initialize-git`   | Runs `git init && git add --all` command in plugin directory                  |
| `--install-packages` | Runs `npm install && npm run format --silent` command in plugin directory     |

## Next Steps

- Run `npm install` and `npm run watch` commands in your plugin directory
- Update **README.md**, **index.js** and **test.js** files to match your plugin needs
- Run `npm run release` command, when you're ready to publish on [npm](https://www.npmjs.com)
- Learn more about Tailwind CSS plugins in [docs](https://tailwindcss.com/docs/plugins)

Feel free to [open an issue](https://github.com/Landish/create-tailwind-plugin/issues/new), if you are having a trouble with `create-tailwind-plugin`. PR's are welcome.

## License

Create Tailwind CSS Plugin is licensed under the [MIT License](https://github.com/Landish/create-tailwind-plugin/blob/main/LICENSE).
