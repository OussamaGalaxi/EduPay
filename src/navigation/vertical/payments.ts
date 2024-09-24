export default [
  { heading: 'Payment Management' },

  {
    title: 'Payments',
    to: { name: 'payment' },
    icon: { icon: 'tabler-brand-cashapp' },
    children: [{
      title: 'List',
      to: { name: 'payment-list' },
      icon: { icon: 'tabler-smart-home' },
      action: 'manage',
      subject: 'all',
    }]
  }
]
