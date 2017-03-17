module.exports = ( plop ) => {

  plop.setGenerator('component', {
    description: 'Creates a native web component and registers it',

    prompts: [{
      type: 'input',
      name: 'tagName',
      message: 'tag name:',
    }],

    actions: [{
      type: 'add',
      path: 'src/components/{{kebabCase tagName}}.js',
      templateFile: 'plop-templates/component.js',
    },
    {
      type: 'add',
      path: 'less/{{kebabCase tagName}}.less',
      templateFile: 'plop-templates/component.less',
    },
    {
      type: 'modify',
      path: 'src/index.js',
      pattern: /(\/\/ IMPORT COMPONENTS)/g,
      template: '$1\nimport { {{camelCase tagName}} } from \'./components/{{kebabCase tagName}}.js\';',
    },
    {
     type: 'modify',
      path: 'src/index.js',
      pattern: /(\/\/ REGISTER COMPONENTS)/g,
      template: '$1\nVue.component(\'{{kebabCase tagName}}\', {{camelCase tagName}});',
    },
    {
      type: 'modify',
      path: 'less/index.less',
      pattern: /(\/\* COMPONENT STYLES \*\/)/g,
      template: '$1\n@import "{{kebabCase tagName}}.less";',
    }],

  }); // component
};
