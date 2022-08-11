import { IgaTab } from '../js/tab/iga-tab';
import datas from './data/tab-content'
const data = datas.items

export default {
  title: 'Tab/Tab',
  component: IgaTab,
  argTypes: {
    justify: {
      options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
      control: { type: 'select' },
    },
  },
  parameters: {
    cssprops: {
      "color-tab-background-active": {
        category: 'Optional',
        value: "tomato",
        description: "BG button active color",
      },
      "color-tab-foreground": {
        category: 'Optional',
        value: "#414144",
        description: "FOREGROUND button color",
      },
      "trans-dur": {
        category: 'Optional',
        value: "0.2s",
        description: "Transition duration (ms/s units)",
      },
      "trans-del": {
        category: 'Optional',
        value: "0.1s",
        description: "Transition delay (ms/s units)",
      },
    }
  },
};

const Template = ({...args}) => `
<iga-tab justify="${args.justify}" active="${args.active}">
  <div slot="group-tabs" role="tablist">
    ${args.data.map(tab => `<iga-tab-item><span>${tab.label}</span></iga-tab-item>`).join("")}
  </div>
  <main slot="group-panels" class="tabs__panels">
    ${args.data.map(tab => `<iga-tab-panel>${tab.content}</span></iga-tab-panel>`).join("")}
  </main>
</iga-tab>
`;

export const Tab1 = Template.bind({});
Tab1.args = {
  active: 0,
  justify: 'flex-start',
  data
};
