/** 
 * Collect mson-react UI components from mson-react/src/components.js 
 * and store them in the components variable 
*/
import components from '../components-ui/index'; 

// Load the compiler
import compiler from 'mson/lib/compiler';

// QUESTION: Is this the key that connects the react-mson react components with the MSON components?
// ANSWER: Yes. See other notes here.
class Utils {

  /**
   * get the react component that corresponds to the mson component we wish to display
   * This function currently gets called from only one place, mson-react/src/inner-component.js
   * 
   * @param {*} component The component whose UI rendering component we want to look up
   */
  getUIComponent(component) {
    console.log('Getting UI Component')
    const name = component.getClassName();
    const Component = components[name];
    if (Component !== undefined) {
      return Component; // when we get here, we have the actual react ui component that will wrap the mson component
    } else if (compiler.isCompiled(compiler.getComponent(name))) {
      const Parent = Object.getPrototypeOf(component.constructor);
      return this.getUIComponent(new Parent());
    } else {
      // The React component wasn't found so check the MSON layer to see if we can automatically
      // determine the component from any MSON.
      const ancestorName = compiler.getOldestCompiledAncestor(name);
      const Ancestor = compiler.getComponent(ancestorName);
      return this.getUIComponent(new Ancestor());
    }
  }
}

export default new Utils();
