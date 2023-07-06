// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'selubi.tech',
  tagline: 'An Infrastructure Engineer\'s personal & experiment site.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://notes.selubi.tech',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Selubi', // Usually your GitHub org/user name.
  projectName: 'selubi.github.io', // Usually your repo name.
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false,


  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath:'/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Selubi/selubi.github.io/tree/main/',
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        respectPrefersColorScheme: true,
      },
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      navbar: {
        // title: 'selubi.tech',
        logo: {
          alt: 'selubi.tech logo',
          src: 'img/logo-light.png',
          srcDark: 'img/logo-dark.png',
          href: 'https://www.selubi.tech/',

        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'defaultSidebar',
            position: 'left',
            label: 'Notes',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          // {
          //   href: 'https://github.com/Selubi/selubi.github.io',
          //   label: 'GitHub',
          //   position: 'right',
          // },
          // {
          //   type: 'localeDropdown',
          //   position: 'right',
          // },
          {
            href: "https://github.com/Selubi/selubi.github.io",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub repository",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [

          {
            label: 'GitHub',
            href: 'https://github.com/Selubi',
          },
          {
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/selubi/',
          },
          {
            label: 'Email: contact@selubi.tech',
            href: 'mailto:contact@selubi.tech',
          },
        ],
        copyright: `May the information provided on this site make your day easier.
        <br> Copyright © ${new Date().getFullYear()} Gregorius Bryan.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
