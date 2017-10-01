module.exports = ( plop ) => {
  plop.setGenerator('component', {
    description: 'Creates an a-frame component',

    prompts: [{
      type: 'input',
      name: 'tagName',
      message: 'tag name:',
    }],

    actions: [{
      type: 'add',
      path: 'src/components/{{kebabCase tagName}}.js',
      templateFile: 'plop-templates/component.js',
    }],
  }); // component

  plop.setGenerator('reducer', {
    description: 'Creates reducer for the Store',

    prompts: [{
      type: 'input',
      name: 'name',
      message: 'name:',
    }, {
      type: 'input',
      name: 'type',
      message: 'action type',
    }],

    actions: [{
      type: 'add',
      path: 'src/reducers/{{camelCase name}}.js',
      templateFile: 'plop-templates/reducer.js',
    }],
  }); // component
};
