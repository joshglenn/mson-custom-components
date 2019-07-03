// This file is just boilerplate used to register the MSON components and then instantiate the app

import compiler from 'mson/lib/compiler';
import * as components from './components';
import * as additionalComponents from './components-mson';

import Component from 'mson/lib/component';
//import MSONReactComponent from './component';

// Make sure we only process front-end actions
Component.setLayer('frontEnd');

// Register all the components
for (let name in components) {
  let component = components[name];
  compiler.registerComponent(component.name, component);
}

// Register the additional components
for (let name in additionalComponents) {
  let component = additionalComponents[name];
  compiler.registerComponent(component.name, component);
}

// Intantiate the app
const app = compiler.newComponent({
  component: 'app.App'
});

export default app;
