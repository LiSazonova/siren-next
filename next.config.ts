import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
    images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com"
    }
  ]
}
  };

export default withNextIntl(config);