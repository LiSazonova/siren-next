import Link from 'next/link';
import Icon from './Icon';
import { useLocale } from 'next-intl';
import SearchBar from './SearchBar';
import clsx from 'clsx';

const MobileIcons = ({
  isSearchOpen,
  toggleSearch,
}: {
  isSearchOpen: boolean;
  toggleSearch: () => void;
}) => {
  const locale = useLocale();

  if (isSearchOpen) {
    return (
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isSearchOpen
            ? 'max-w-full opacity-100 translate-x-0'
            : 'max-w-0 opacity-0 translate-x-full'
        )}
      >
        <div className="flex items-center gap-2">
          <SearchBar onClose={toggleSearch} />
          <button onClick={toggleSearch} aria-label="Close Search">
            <Icon
              name="close"
              alt="Close"
              width={24}
              height={24}
              className="align-middle"
            />
          </button>
        </div>
      </div>
      // <div className="flex items-center gap-2">
      //   <SearchBar onClose={toggleSearch} />
      //   <button onClick={toggleSearch} aria-label="Close Search">
      //     <Icon name="close" alt="Close" width={24} height={24} />
      //   </button>
      // </div>
    );
  }
  return (
    <ul className="flex items-center gap-8 text-lg font-inter uppercase list-none">
      <li className="mt-2">
        <button onClick={toggleSearch} aria-label="Open Search">
          <Icon name="search" alt="Search" width={25} height={24} />
        </button>
      </li>
      <li className="">
        <Link
          href="https://www.instagram.com/__the_siren__official_/profilecard/?igsh=MTA5OWE4d3luaXA2eg=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="inst" alt="Instagram" width={24} height={24} />
        </Link>
      </li>
      <li className="">
        <Link href={`/${locale}/cart`} className="">
          <Icon name="basket" alt="Instagram" width={24} height={24} />
        </Link>
      </li>
    </ul>
  );
};

export default MobileIcons;
