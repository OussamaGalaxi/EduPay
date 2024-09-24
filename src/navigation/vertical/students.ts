export default [
  { heading: 'Student Management' },

  {
    title: 'Students',
    to: { name: 'student' },
    icon: { icon: 'tabler-school' },
    children: [{
      title: 'List',
      to: { name: 'student-list' },
      icon: { icon: 'tabler-users' },
      action: 'manage',
      subject: 'all',
    },
    {
      title: 'Add',
      to: { name: 'student-add' },
      icon: { icon: 'tabler-user-plus' },
      action: 'manage',
      subject: 'all',
    }]
  }
]
