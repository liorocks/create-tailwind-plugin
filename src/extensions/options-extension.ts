import { GluegunToolbox } from 'gluegun';
import { cleanName } from '../utils';

const defaultOptions: Object = {
  name: '',
  description: 'Your Tailwind CSS Plugin Description',
  author: '',
  githubUsername: 'Your Github Username',
  initializeGit: false,
  installPackages: false
};

export default (toolbox: GluegunToolbox) => {
  const { strings, parameters } = toolbox;
  const { kebabCase, camelCase } = strings;

  toolbox.parseOptions = async () => {
    // Set name initially
    const name = getName();
    setOptions({ name });

    // If name was not provided, ask questions
    if (!getName()) {
      setOptions(await toolbox.askQuestions());
    }

    // Set slug/path and config (tailwind theme key)
    const slug = kebabCase(getName());
    const config = camelCase(cleanName(getName()));

    return setOptions({ slug, config });
  };

  // Get Plugin Name
  const getName = (): string => {
    if (parameters.first) {
      return parameters.first;
    }
    if (parameters.options?.name) {
      return parameters.options.name;
    }

    return defaultOptions['name'];
  };

  const setOptions = (options = {}) => {
    parameters.options = {
      ...defaultOptions,
      ...parameters.options,
      ...options
    };

    return parameters.options;
  };
};
