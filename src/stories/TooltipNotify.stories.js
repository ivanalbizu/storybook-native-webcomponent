import { TooltipNotify } from '../js/tooltip/tooltip-notify';

export default {
  title: 'Tooltip/tip',
  component: TooltipNotify,
  argTypes: {
    fill: { control: 'color' },
    bulletColor: { control: 'color'},
    count: { control: 'number'}
  }
};

const Template = ({...args}) => `
<div style="max-width: 600px;margin: auto;text-align: center;">
  <tooltip-notify fill="${args.fill}" bullet-color="${args.bulletColor}" count="5">
    <li>
      <span
        ><strong>Automated builds</strong> from personal or public Git
        repos</span
      >
    </li>
    <li>
      <span><strong>Deploy</strong> to global edge network</span>
    </li>
    <li>
      <span
        >Live site previews with a <strong>collaboration UI</strong> for
        team members</span
      >
    </li>
    <li>
      <span><strong>Instant rollbacks</strong> to any version</span>
    </li>
    <li>
      <span
        ><strong>Deploy static assets</strong> & dynamic serverless
        functions</span
      >
    </li>
  </tooltip-notify>
</div>
`;

export const TooltipNotify1 = Template.bind({});
TooltipNotify1.args = {
  fill: 'green',
  bulletColor: 'blue',
  count: 2
};
