import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

interface Props {
  onClick?: () => void;
  variant?: 'mobile' | 'desktop';
}

const NavigationLinks: React.FC<Props> = ({ onClick, variant = 'desktop' }) => {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  const locale = useLocale();

  const mobileStyles =
    'block px-6 py-8 w-full border-t border-[#747474] text-right';
  const desktopStyles = 'px-2 hover:underline';

  const linkStyle = variant === 'mobile' ? mobileStyles : desktopStyles;

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/collections`, label: t('collections') },
  ];

  return (
    <nav>
      <ul
        className={
          variant === 'mobile'
            ? 'w-screen text-lg font-inter uppercase list-none'
            : 'flex items-center gap-8 text-lg font-inter uppercase list-none'
        }
      >
        {links.map(({ href, label }, idx) => {
          const isActive = pathname === href;
          return (
            <li
              key={href}
              className={
                variant === 'mobile' && idx === links.length - 1
                  ? `${linkStyle} border-b`
                  : linkStyle
              }
            >
              <Link
                href={href}
                onClick={onClick}
                className={`block w-full ${
                  isActive ? 'text-black' : 'text-[#747474]'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationLinks;
