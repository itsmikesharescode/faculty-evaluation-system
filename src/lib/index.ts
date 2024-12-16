export const adminPaths = [
  '/admin-dashboard',
  '/admin-questionnaire',
  '/admin-questionnaire/create',
  '/admin-records',
  '/admin-programs',
  '/admin-manage-accounts'
];

export const studentPaths = [
  '/student-dashboard',
  '/student-manage-account',
  '/student-dashboard/evaluation'
];

export const formatName = (fullname: string, suffix: string | null) => {
  if (fullname) {
    const formatter = fullname.split(',');
    const lastName = formatter[0];
    const firstName = formatter[1];
    const middleInitial = formatter[2];
    return `${lastName}, ${firstName} ${middleInitial} ${suffix ?? ''}`;
  }

  return '';
};

export const yearLevels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];

export const courseNames = [
  '(BTVTE) Bachelor in Technical Vocational Teacher Education',
  '(BSE) Bachelor of Science in Entrepreneurship',
  '(BSIS) Bachelor of Science in Information System',
  '(DOMT) Diploma in Office Management Technology',
  '(DICT) Diploma in Information Communications Technology'
];
