import { GluegunToolbox } from 'gluegun';

export default (toolbox: GluegunToolbox) => {
  toolbox.initializeGit = async () => {
    const { print, system } = toolbox;
    const { options } = toolbox.parameters;

    if (options.initializeGit) {
      const command = `cd ${options.slug} && git init && git add --all`;
      await system.run(command);

      print.success('  Initialized Git');
    }
  };
};
