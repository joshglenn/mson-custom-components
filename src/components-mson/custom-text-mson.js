import Component from 'mson/lib/component';

export default class CustomText extends Component {
  _className = 'CustomText'; // does this mean, the reactclassname?

  _create(props) {
    super._create(props);

    this.set({
      schema: {
        component: 'Form',
        fields: [
          {
            name: 'text',
            component: 'TextField',
            label: 'Text',
            multiline: true,
            docLevel: 'basic',
            help: 'Any markdown. See markdownguide.org'
          }
        ]
      }
    });
  }
}
