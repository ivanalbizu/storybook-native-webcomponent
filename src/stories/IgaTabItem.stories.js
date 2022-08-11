import { IgaTabItem } from '../js/tab/iga-tab-item';

export default {
  title: 'Tab/TabItem',
  component: IgaTabItem,
  parameters: {
    cssprops: {
      "color-tab-background-active": {
        category: 'Optional',
        value: "red",
        description: "BG button active color",
      },
      "color-tab-foreground": {
        category: 'Optional',
        value: "#414144",
        description: "FOREGROUND button color",
      },
    }
  },
};

const Template = ({...args}) => `<iga-tab-item>${args?.label}</iga-tab-item>`;

export const TabItem1 = Template.bind({});
TabItem1.args = {
  label: 'Tab ítem demo1'
};

export const TabItem2 = Template.bind({});
TabItem2.args = {
  label: 'Tab ítem 2'
};
