/**
 * Component Generator
 */
'use strict';

const { moduleExists } = require('../utils/moduleExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    /*
    {
      type: 'list',
      name: 'type',
      message: 'Select the type of component',
      default: 'Stateless Function',
      choices: () => [
        'Stateless Function',
        'React.PureComponent',
        'React.Component',
        'Styled component',
      ],
    },
    */
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the module ?',
      default: 'User',
      validate: value => {
        if (/.+/.test(value)) {
          return moduleExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    /*
    {
      type: 'list',
      name: 'sizeType',
      message: 'Select the type of component for the atomic design',
      default: 'atom',
      choices: () => ['atom', 'molecule', 'organism', 'template', 'page', 'chart'],
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: false,
      message: 'Do you want to load the component asynchronously?',
    },
    */
  ],
  actions: data => {
    // Generate index.js
    let componentTemplate;
    let paternImport;
    /*
    switch (data.type) {
      case 'Stateless Function': {
        componentTemplate = './component/stateless.js.hbs';
        break;
      }
      case 'Styled component': {
        componentTemplate = './component/styled.js.hbs';
        break;
      }
      default: {
        componentTemplate = './component/class.js.hbs';
      }
    }
    switch (data.sizeType) {
      // 'atom', 'molecule', 'organism', 'template', 'page'
      case 'atom':
        paternImport = /(\/\/ needle-import-atoms)/g;
        break;
      case 'molecule':
        paternImport = /(\/\/ needle-import-molecules)/g;
        break;
      case 'organism':
        paternImport = /(\/\/ needle-import-organisms)/g;
        break;
      case 'template':
        paternImport = /(\/\/ needle-import-templates)/g;
        break;
      case 'chart':
        paternImport = /(\/\/ needle-import-charts)/g;
        break;
      default:
        paternImport = /(\/\/ needle-import-pages)/g;
    }
  */
    const actions = [
      {
        type: 'add',
        path:
          '../../src/modules/{{ kebabCase name }}/{{ kebabCase name }}.module.ts',
        templateFile: './module/module.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../../src/modules/{{ kebabCase name }}/{{ kebabCase name }}.constants.ts',
        templateFile: './module/constants.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../../src/modules/{{ kebabCase name }}/{{ kebabCase name }}.controller.ts',
        templateFile: './module/controller.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../../src/modules/{{ kebabCase name }}/{{ kebabCase name }}.dto.ts',
        templateFile: './module/dto.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../../src/modules/{{ kebabCase name }}/{{ kebabCase name }}.entity.ts',
        templateFile: './module/entity.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../../src/modules/{{ kebabCase name }}/{{ kebabCase name }}.repository.ts',
        templateFile: './module/repository.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path:
          '../../src/modules/{{ kebabCase name }}/{{ kebabCase name }}.service.ts',
        templateFile: './module/service.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'modify',
        path: '../../src/app.module.ts',
        pattern: /(\/\/ needle-module-import)/g,
        template:
          "import { {{properCase name}}Module } from './modules/{{ kebabCase name }}/{{ kebabCase name }}.module';\n$1",
      },
      {
        type: 'modify',
        path: '../../src/app.module.ts',
        pattern: /(\/\/ needle-module-includes)/g,
        template: '{{properCase name}}Module,\n$1',
      },
      {
        type: 'modify',
        path: '../../src/app.routes.ts',
        pattern: /(\/\/ needle-module-import)/g,
        template:
          "import { {{properCase name}}Module } from './modules/{{ kebabCase name }}/{{ kebabCase name }}.module';\n$1",
      },
      {
        type: 'modify',
        path: '../../src/app.routes.ts',
        pattern: /(\/\/ needle-modules-routes)/g,
        templateFile: './module/routing.ts.hbs',
      },
    ];

    // If they want a i18n messages file
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path:
          '../../src/components//{{sizeType}}s/{{properCase name}}/messages.js',
        templateFile: './component/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If want Loadable.js to load the component asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path:
          '../../src/components//{{sizeType}}s/{{properCase name}}/Loadable.js',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    return actions;
  },
};
