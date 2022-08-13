import { CanvasDraw } from '../js/canvas/CanvasDraw';

export default {
  title: 'Canvas/CanvasDraw',
  component: CanvasDraw,
  argTypes: {
    particles: { control: 'number' },
    maxDistanceJoinParticles: { control: 'number' },
    btnBgColor: { control: 'color' }
  }
};

const Template = ({...args}) => `
  <div style="display:grid;place-content:center;position:absolute;inset:0;gap:1rem;">
    <button class="js-particles" style="background-color:purple;color:#fff;border:0;">click purple</button>
    <button class="js-particles" style="background-color:${args.btnBgColor};border:0">click tomato</button>
    <canvas-draw particles="${args.particles}" max-distance-join-particles="${args.maxDistanceJoinParticles}"></canvas-draw>
  </div>
`;

export const Canvas1 = Template.bind({});
Canvas1.args = {
  particles: 60,
  maxDistanceJoinParticles: 10,
  btnBgColor: 'tomato'
};

export const Canvas2 = Template.bind({});
Canvas2.args = {
  particles: 40,
  maxDistanceJoinParticles: 160
};
