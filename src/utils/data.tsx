import BlueBerrySVG from '../components/svg/Blueberry';
import HeroSVG from '../components/svg/Hero';
import LingonSVG from '../components/svg/Lingon';
import MushromSVG from '../components/svg/Mushroom';
import { IForageCardComponent, UIForage } from './interfaces';

const forages: UIForage[] = [
  {
    name: 'Chantarelle',
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

export const forageEntitiesCollection: IForageCardComponent[] = [
  {
    name: 'Chantarelle',
    Icon: HeroSVG,
    amountFound: 0,
    iconBgColor: '#D2A6FF',
  },
  {
    name: 'Lingon',
    Icon: LingonSVG,
    amountFound: 0,
    iconBgColor: '#93A8F0',
  },
  {
    name: 'Blueberry',
    Icon: BlueBerrySVG,
    amountFound: 0,
    iconBgColor: '#93F0A8',
  },
];
export default forages;
