import { GluegunToolbox } from 'gluegun';
import templates from '../templates';

export default (toolbox: GluegunToolbox) => {
  toolbox.createPlugin = async () => {
    const { options } = toolbox.parameters;
    const { print, template } = toolbox;

    print.divider();

    const copyTemplates = templates.reduce((promises: any[], tpl: any) => {
      const target = `${options.slug}/${
        typeof tpl === 'string' ? tpl : tpl.target
      }`;

      const copy = template.generate({
        target,
        template: typeof tpl === 'string' ? tpl : tpl.template,
        props: options
      });

      print.success(`  Create: ${target}`);

      return promises.concat(copy);
    }, []);

    await Promise.all(copyTemplates);
  };
};
