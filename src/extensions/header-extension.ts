import { GluegunToolbox } from 'gluegun';

export default (toolbox: GluegunToolbox) => {
  toolbox.printHeader = async () => {
    const { print, meta } = toolbox;

    print.divider();
    print.warning(`  Create Tailwind CSS Plugin v${meta.version()}`);
  };
};
