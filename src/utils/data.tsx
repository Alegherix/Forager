import BlueBerrySVG from '../components/svg/Blueberry';
import LingonSVG from '../components/svg/Lingon';
import MushromSVG from '../components/svg/Mushroom';
import { UIForage } from './interfaces';

const forages: UIForage[] = [
  {
    name: 'Kantarell',
    Icon: MushromSVG,
    url: '/mushroom.svg',
  },
  {
    name: 'Lingon',
    Icon: LingonSVG,
    url: '/lingon.svg',
  },
  {
    name: 'Blueberry',
    Icon: BlueBerrySVG,
    url: '/blueberry.svg',
  },
];
export default forages;
