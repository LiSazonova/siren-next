import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => (
  <Link href="/" className="grow lg:grow-0">
    <Image
      src="/Images/logo.svg"
      alt="Siren Store"
      width={52}
      height={78}
      priority
    />
  </Link>
);

export default Logo;
