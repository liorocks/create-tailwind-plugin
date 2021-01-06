import { GluegunCommand } from 'gluegun';

const command: GluegunCommand = {
  name: 'create-tailwind-plugin',
  description: 'Create Tailwind CSS Plugin',
  run: async toolbox => {
    try {
      await toolbox.printHeader();

      await toolbox.parseOptions();

      await toolbox.createPlugin();

      await toolbox.initializeGit();

      await toolbox.installPackages();

      await toolbox.printFooter();
    } catch (error) {
      console.log(error);
      toolbox.print.printHelp(toolbox);
    }
  }
};

export default command;
