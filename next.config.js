const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest\.json$/],
    scope: '/',
    sw: 'service-worker.js',
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'production',
  },

  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // images: {
  //   loader: 'imgix',
  //   path: '/',
  // },

  images: {
    domains: [
      'coinpos-uat.azurewebsites.net',
      'coinpos-prod.azurewebsites.net',
      'localhost',
      'profile.line-scdn.net',
      'images.unsplash.com',
      'img.icons8.com',
      'i.ibb.co',
      'i.postimg.cc',
      'fakestoreapi.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      '',
    ],
  },
  /*webpack: (config, { isServer }) => {
    if (!isServer) {
        // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.node = {
            fs: 'empty'
        }
    }

    return config;
  }*/
});

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({});
