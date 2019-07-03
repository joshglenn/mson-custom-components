// A contact component that captures the user's first name, last name and email address
export const contact = {
  name: 'app.Contact',
  component: 'Form',
  fields: [
    {
      name: 'firstName',
      component: 'TextField',
      label: 'First Name',
      required: true,

      // When block is false, the next field will appear on the same line, i.e. the first name and
      // last name will be on the same line
      block: false
    },
    {
      name: 'lastName',
      component: 'TextField',
      label: 'Last Name'
    },
    {
      name: 'email',
      component: 'EmailField',
      label: 'Email'
    }
  ]
};

// Uses a RecordList to display a list of contacts
export const contacts = {
  name: 'app.Contacts',
  component: 'RecordList',
  label: 'Contacts',
  
  baseFormFactory: {
    // This factory creates Contacts
    component: 'Factory',
    product: {
      component: 'app.Contact'
    }
  },

  // We will use local storage to persist the data. This could be easily swapped out to use Firebase
  // or some other store. Or, you could create your own custom store to interact with a GraphQL/REST
  // API.
  store: {
    component: 'LocalStorageStore',
    storeName: 'contactsLocalStorage'
  }
};

export const customTextPage = {
  name: 'app.CustomTextPage',
  component: 'CustomText',
  text: `
# Custom Components in MSON

Published by: Josh Glenn  
July 3, 2019

The page you're seeing is rendered by a custom mson-react UI Component. A MSON UI Component is 
a react component designed to act as the display layer for a MSON Component.

You might ask: Why is that so special? Well, mson is in its infancy, and there isn't much documentation
to speak of. I just spent about 16 hours or more trying to figure out how to create a custom component 
in MSON without having to fork the mson and mson-react repos. I finally got it. 

First of all, some background information: In mson and mson-react, there is more than one type of custom component. 
There are custom mson components that are something akin to a model layer (but they are really much more than that).
And then there are custom react components which act as the rendering layer for mson components.

Many rendering components already exist in the mson-react library, as well as many mson components. 

TODO: Answer the question: "MSON Components and React Components in MSON: What's the difference?"

## Registering Components with the MSON Compiler

### MSON Components

A mson component does not render anything to the screen. It may tell the system how it wants to be displayed.
For instance, a Contact component may have a property called "displayEditButton". If that property is set to true,
then the display layer should render an Edit button to the screen, giving the user the option to edit the contact.

### Standard UI Components Included in mson-react

Standard UI Components in mson-react don't need special treatment. mson-react automatically finds the react
component and uses it to display the mson component. 

### How MSON-React Matches the UI Component with the MSON Component

Using a function called \`localComponentUtils.getUIComponent(component);\`, mson-react looks for the react component
that should be used to display a mson component, then returns it to the caller, which at the time of this writing is only
the react class called InnerComponent, located in [inner-component.js](https://github.com/redgeoff/mson-react/blob/41542beab6fb7d4e758c0bb0ef6a6a09ec51246c/src/inner-component.js)

### How MSON-React Renders UI Components

When you register a mson component with the compiler, you give it a component property. That component property
basically tells mson that it is a component of a certain type. For instance, in the following example, we define
a mson component called \`app.Home\`. Take a look:

\`\`\`
{
  name: 'app.Home',
  component: 'CustomText',
  text: '# Welcome Check out the examples on the left'
};
\`\`\`

Its component field specifies that its type is CustomText. In order to display
the CustomText object, two things must be true: 

  - the mson component must be registered with the compiler.

  - the react UI component must be available to the render function in mson's InnerComponent class, which looks for the
  UI component ***by name***

The problem arises when you try to use a custom react component
to display the custom mson component you've defined. If you have loaded mson-react as a dependency, it won't have
access to your custom UI component. 

(1) fork the mson-react repo and use that as the starting point for your app or 

(2) leave mson-react intact, customizing just the components needed to display your custom UI components. This is
the method I have chosen

(3) there may be other means to do this, though I'm not sure yet what they might be.

### My Solution

I chose to go with option 2, leaving mson-react intact, but borrowing parts of it so that the app could render my
custom UI components. I have uploaded this to github in a repo called mson-custom-components you want to take a look
at the source code. In fact, if you're reading this, chances are you've already found the repo.

This solution overrides a few of mson-react files, specifically:

| Filename |  Changes |
|---|-------------------|
| app-container.js    | Unchanged  |
| app.js              | Changed to reference component.js locally |
| bundle.js           | Unchanged |
| component-utils.js  | Unchanged |
| component.js        | Changed to reference applicable files locally             |
| inner-component.js  | * Add local sources when searching for render component   |
| render.js           | Changed to reference applicable files locally             |


`
};

// The main app component and the menu option
export const app = {
  name: 'app.App',
  component: 'App',
  menu: {
    component: 'Menu',
    items: [
      {
        // The route to the list of contacts
        path: '/contacts',
        label: 'Contacts',
        content: {
          component: 'app.Contacts'
        }
      },
      {
        // The route to the custom text page
        path: '/custom-text',
        label: 'Custom Components',
        heading: 'Custom Components in MSON',
        content: {
          component: 'app.CustomTextPage'
        }
      }
    ]
  }
};
