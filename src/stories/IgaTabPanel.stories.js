import { IgaTabPanel } from '../js/tab/iga-tab-panel';

export default {
  title: 'Tab/TabPanel',
  component: IgaTabPanel,
};

const Template = ({...args}) => `<iga-tab-panel active-panel="true"><span slot="panel">${args?.panel}</span></iga-tab-panel>`;

export const TabPanel1 = Template.bind({});
TabPanel1.args = {
  panel: 'content'
};

export const TabPanelHTML = Template.bind({});
TabPanelHTML.args = {
  panel: `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac eleifend nunc. Mauris malesuada orci et odio dignissim euismod. Curabitur in ornare libero. Phasellus cursus rhoncus congue. Suspendisse sapien augue.</p>
<button type="button">Button</button>
  `
};
