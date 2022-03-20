export const pages = [
  {
    title: 'Dashboard',
    page: '/dashboard',
    permission: ['owner', 'admin']
  },
  {
    title: 'Resto Owners',
    page: '/owners',
    permission: ['admin']
  },
  {
    title: 'Customers',
    page: '/customers',
    permission: ['owner', 'admin']
  },
  {
    title: 'Resto Web Page',
    page: '/my-web-page',
    permission: ['owner']
  },
  {
    title: 'Products',
    page: '/products',
    permission: ['owner', 'admin']
  },
];

export const getPageWithPermission = (role: 'owner' | 'admin') => {
  return pages.filter((item) => item.permission.includes(role));
}