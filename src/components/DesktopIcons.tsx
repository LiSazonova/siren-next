import Link from 'next/link';
import Icon from './Icon';
import { useLocale } from 'next-intl';

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
        <li className="">
          <Link href={`/${locale}/cart`} className="">
            <Icon name="basket" alt="Instagram" width={24} height={24} />
          </Link>
        </li>
        <li className="">
          <Link href="/collections" className="">
            <Icon name="user" alt="Instagram" width={24} height={24} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DesktopIcons;
