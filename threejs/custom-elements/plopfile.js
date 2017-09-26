module.exports = ( plop ) => {

  plop.setGenerator('element', {
    description: 'Create a new Custom Element',

    prompts: [{
      type: 'input',
      name: 'tagName',
      message: 'tag name:',
    }],

    actions: [{
      type: 'add',
      path: 'src/elements/{{kebabCase tagName}}.js',
      templateFile: 'plop-templates/element.js',
    },
    {
      type: 'add',
      path: 'public/css/{{kebabCase tagName}}.css',
      templateFile: 'plop-templates/element.css',
    }],
  }); // component
};
