import { GluegunToolbox } from 'gluegun';
import { PromptOptions } from 'gluegun/build/types/toolbox/prompt-enquirer-types';

export default (toolbox: GluegunToolbox) => {
  toolbox.askQuestions = async () => {
    const { options } = toolbox.parameters;
    const { system, print, prompt } = toolbox;

    const questions: PromptOptions[] = [
      {
        type: 'input',
        name: 'name',
        message: 'Plugin Name',
        required: true,
        initial: 'Your Tailwind CSS Plugin Name',
        validate: name => (name.trim() === '' ? 'Name is required' : true)
      },
      {
        type: 'input',
        name: 'description',
        message: 'Plugin Description',
        required: true,
        initial: options.description,
        validate: description =>
          description.trim() === '' ? 'Description is required' : true
      },
      {
        type: 'input',
        name: 'author',
        message: 'Plugin Author',
        validate: author =>
          author.trim() === '' ? 'Author is required' : true,
        required: true,
        initial: async () => {
          if (options.author.trim() !== '') {
            return options.author;
          }
          return system.run('git config --global user.name', {
            trim: true
          });
        }
      },
      {
        type: 'input',
        name: 'githubUsername',
        message: 'Github Username',
        initial: options.githubUsername,
        required: true,
        validate: username =>
          username.trim() === '' ? 'Username is required' : true
      },
      {
        type: 'confirm',
        name: 'initializeGit',
        message: 'Initialize Git',
        initial: true,
        required: true
      },
      {
        type: 'confirm',
        name: 'installPackages',
        message: 'Install Packages',
        initial: options.installPackages,
        required: true
      }
    ];

    print.divider();

    return prompt.ask(questions);
  };
};
