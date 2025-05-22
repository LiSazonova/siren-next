import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

interface Props {
  onClick?: () => void;
}
const AuthLinks: React.FC<Props> = ({ onClick }) => {
  const t = useTranslations('AuthLinks');
  const locale = useLocale();

  return (
    <div className="flex flex-row items-center justify-end gap-8 py-8 px-6 text-[18px] border-b border-gray uppercase">
      <Link
        href={`/${locale}/signin`}
        onClick={onClick}
        className="hover:underline"
      >
        {t('signin')}
      </Link>
      <Link
        href={`/${locale}/signup`}
        onClick={onClick}
        className="hover:underline"
      >
        {t('signup')}
      </Link>
    </div>
  );
};

export default AuthLinks;
