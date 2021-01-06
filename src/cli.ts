import { build } from 'gluegun';

export async function run(argv) {
  const cli = build()
    .brand('create-tailwind-plugin')
    .src(__dirname)
    .help()
    .version()
    .exclude(['semver', 'http', 'patching', 'package-manager'])
    .create();

  await cli.run(argv);
}
