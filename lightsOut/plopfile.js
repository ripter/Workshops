module.exports = ( plop ) => {

  // Example:
  // plop.setGenerator('component', {
  //   description: 'Creates a native web component and registers it',
  //
  //   prompts: [{
  //     type: 'input',
  //     name: 'tagName',
  //     message: 'tag name:',
  //   }],
  //
  //   actions: [{
  //     type: 'add',
  //     path: 'src/components/{{kebabCase tagName}}.js',
  //     templateFile: 'plop-templates/component.js',
  //   },
  //   {
  //     type: 'modify',
  //     path: 'src/index.js',
  //     pattern: /(\/\/ IMPORT COMPONENTS)/g,
  //     template: '$1\nimport { {{camelCase tagName}} } from \'./components/{{kebabCase tagName}}.js\';',
  //   }],
  //
  // });
};
