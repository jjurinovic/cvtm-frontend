import { ITimeEntry } from 'src/app/features/time-tracking/models/time-entry.model';

export const testUser = {
  id: 999,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@test.com',
  role: 1,
  company_id: 1,
};

export const testAddress = {
  id: 999,
  address1: 'Teststr. 67',
  address2: 'Extra address',
  city: 'Legoland',
  postcode: '123456',
  county: 'BW',
  country: 'Germany',
};

export const testUserWithAddress = {
  ...testUser,
  address: testAddress,
};

export const userWithLocalParams = {
  ...testUser,
  returnUrl: '/test',
  myId: 1,
};

export const testUsersRequest = {
  companyId: 999,
  page: 1,
  size: 2,
  sort: 'asc',
  sortField: 'name',
  q: 'test',
};

export const testPageResponse = {
  results: [testUser],
  size: 10,
  page: 1,
  total: 1,
  sort: 'asc',
  sort_field: 'name',
  q: 'test',
};

export const testLinks = [
  { link: '/link-1', title: 'Link 1' },
  { link: '/link-2', title: 'Link 2', excludeRole: 2 },
  { link: '/link-3', title: 'Link 3', minRole: 0 },
];

export const testCompany = {
  name: 'Company Test',
  vat: '1234',
  address: testAddress,
  inactive: false,
};

export const testCompanyWithParams = {
  ...testCompany,
  returnUrl: '/test',
  myId: 1,
};

export const testCompanies = [
  {
    name: 'Company Test 1',
    vat: '1234',
    address: testAddress,
    inactive: false,
  },
  {
    name: 'Company Test 2',
    vat: '1234',
    address: testAddress,
    inactive: false,
  },
];

export const testError = { detail: 'test error' };

export const passChangeObj = {
  old_password: 'old',
  new_password: 'new',
};

export const testIdWithParams = {
  id: 999,
  returnUrl: '/test',
};

export const testAuthResponse = {
  access_token: 'test',
  user: testUser,
};

export const testPageFilter = {
  size: 10,
  page: 1,
  total: 10,
  sort: 'asc',
  q: 'test',
  sort_field: 'test',
};

export const testCompanyPageResponse = {
  page_filter: testPageFilter,
  results: testCompanies,
};

export const testDayRequest = {
  date: '2024-02-14',
  user_id: 999,
  company_id: 999,
  start: '2024-02-01',
  end: '2024-02-14',
};

export const testDayEntries = [
  {
    start_time: '10:00',
    end_time: '12:00',
    notes: 'test',
    pause: 30,
    day_id: 999,
    id: 999,
  },
  {
    start_time: '13:00',
    end_time: '17:00',
    notes: 'test',
    pause: 30,
    day_id: 999,
    id: 998,
  },
];

export const testTimeEntriesRequest = {
  date: '2024-02-14',
  user_id: 999,
  company_id: 999,
};

export const testProject = {
  start_date: '2024-02-14',
  end_date: '2024-04-14',
  estimated_date: undefined,
  company_id: 999,
  name: 'test project',
  description: 'test project description',
  id: 999,
  users: [],
  active: true,
  created_date: '2024-02-14',
};

export const testTimeEntry: ITimeEntry = {
  start_time: '10:00',
  end_time: '12:00',
  notes: 'test',
  title: 'test',
  color: 'red',
  pause: 30,
  user_id: 999,
  company_id: 999,
  id: 999,
  date: '2024-02-14',
  project_id: 999,
  project: testProject,
};

export const testDayEntry = {
  date: '2024-02-14',
  total: 2,
  entries: [
    {
      ...testTimeEntry,
      id: 998,
    },
    testTimeEntry,
  ],
};
