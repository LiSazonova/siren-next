import GoogleAuthRedirect from '@/components/auth/GoogleAuthRedirect';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <GoogleAuthRedirect />
      {children}
    </>
  );
};

export default Layout;
