import Link from 'next/link';
import { useLocale } from 'next-intl';
import Icon from '../Icon';
import CartIconBadge from '../CartIconBadge';
import UserAuthToggle from './UserAuthToggle';

const DesktopIcons = () => {
  const locale = useLocale();
  return (
    <div>
      <ul className="flex items-center gap-8 text-lg font-inter uppercase list-none">
        <li className="">
          <Link
            href="https://www.instagram.com/__the_siren__official_/profilecard/?igsh=MTA5OWE4d3luaXA2eg=="
            target="_blank"
            rel="noopener noreferrer"
            className=""
          >
            <Icon name="inst" alt="Instagram" width={24} height={24} />
          </Link>
        </li>
        <li className="relative">
          <CartIconBadge />
        </li>
        <li className="">
          <UserAuthToggle />
        </li>
      </ul>
    </div>
  );
};

export default DesktopIcons;
