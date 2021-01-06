import { GluegunToolbox } from 'gluegun';

export default (toolbox: GluegunToolbox) => {
  toolbox.printFooter = async () => {
    const { options } = toolbox.parameters;
    const { print } = toolbox;

    print.divider();
    print.warning('  Next Steps:');
    print.divider();
    print.warning(`  $ cd ${options.slug}`);

    if (!options.installPackages) {
      print.warning('  $ npm install');
    }

    print.warning('  $ npm run watch');
    print.divider();

    print.info(`  Docs: https://github.com/Landish/create-tailwind-plugin`);
    print.divider();
  };
};
