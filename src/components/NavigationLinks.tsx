import Link from 'next/link';

interface Props {
  onClick?: () => void;
}

const NavigationLinks: React.FC<Props> = ({ onClick }) => (
  <nav className="w-screen text-lg font-inter uppercase list-none text-right">
    <li className="border-t border-[#747474] w-full">
      <Link href="/" className="block px-6 py-8 w-full" onClick={onClick}>
        Головна
      </Link>
    </li>
    <li className="border-t border-[#747474] w-full">
      <Link href="/about" className="block px-6 py-8 w-full" onClick={onClick}>
        Про нас
      </Link>
    </li>
    <li className="border-t border-b border-[#747474] w-full">
      <Link
        href="/collections"
        className="block px-6 py-8 w-full"
        onClick={onClick}
      >
        Колекції
      </Link>
    </li>
  </nav>
);
export default NavigationLinks;
