import { GluegunToolbox } from 'gluegun';

export default (toolbox: GluegunToolbox) => {
  toolbox.installPackages = async () => {
    const { options } = toolbox.parameters;
    const { print, system } = toolbox;

    if (options.installPackages) {
      print.divider();
      print.warning('  Installing Packages...');
      print.divider();

      const command = `cd ${options.slug} && npm install && npm run format --silent && git add --all`;
      await system.spawn(command, {
        shell: true,
        stdio: 'inherit',
        stderr: 'inherit'
      });

      print.divider();
      print.success('  Packages Installed');
    }
  };
};
