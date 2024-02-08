export const testUser = {
  id: 999,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@test.com',
  role: 1,
  company_id: 1,
};

export const testAddress = {
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
};

export const testCompanies = [
  {
    name: 'Company Test 1',
    vat: '1234',
    address: testAddress,
  },
  {
    name: 'Company Test 2',
    vat: '1234',
    address: testAddress,
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
