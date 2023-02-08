export enum ApiConfig {
  ID_MIN_LENGTH = 10,
  ID_MAX_LENGTH = 30,
}

export interface ApiRes<Res> {
  response: Res
}
