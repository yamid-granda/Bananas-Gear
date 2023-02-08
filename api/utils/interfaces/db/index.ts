interface SuccessDBRes<Result> {
  isSuccess: true
  result: Result
}

interface ErrorDBRes {
  isSuccess: false
  result: null
}

export type DBResponse<Result> = SuccessDBRes<Result> | ErrorDBRes
