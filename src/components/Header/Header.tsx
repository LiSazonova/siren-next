import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';

const Header: React.FC = () => {
  return (
    <header className="">
      <div className="block lg:hidden">
        <MobileHeader />
      </div>
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>
    </header>
  );
};

export default Header;
