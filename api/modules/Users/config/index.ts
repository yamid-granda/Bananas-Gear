export enum UsersConfig {
  MAX_QUANTITY_BY_COMPANY = 2_500,
}

export enum UsersApiPath {
  login = '/users/login',
  get = '/users/{userId}',
  edit = '/users/{userId}/edit',
  logout = '/users/{userId}/logout',
  inactivate = '/users/inactivate/{userId}/{companyId}',
  reactivate = '/users/reactivate/{userId}/{companyId}',
}
