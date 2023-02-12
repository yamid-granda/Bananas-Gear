import { PRODUCTION_API_URL, TEST_API_URL } from '@/app/configs'

interface SuccessApiRes<Result> {
  isOk: true
  result: Result
}

enum ErrorName {
  AbortError = 'AbortError',
  FetchRequestError = 'FetchRequestError',
  FetchEmptyResponse = 'FetchEmptyResponse',
  FetchErrorResponse = 'FetchErrorResponse',
}

interface ApiResError {
  message: string
  code?: string
  name: ErrorName
}

interface ErrorApiRes {
  isOk: false
  error: ApiResError
}

export type ApiRes<Result> = SuccessApiRes<Result> | ErrorApiRes

export interface CustomRequestInit extends RequestInit {
  searchParams?: any
  preventNotifications?: boolean
}

export const getApiUrl = (): string => {
  const host = window?.location?.host
  const hostSplit = host?.split('.') || []
  const hasSubdomain = hostSplit.length > 2
  const subdomain = hasSubdomain ? hostSplit[0] : null
  return subdomain === 'app' ? PRODUCTION_API_URL : TEST_API_URL
}

const defaultHeaders: HeadersInit = { 'Content-Type': 'application/json' }

async function httpRequest(path: string, config: CustomRequestInit): Promise<ApiRes<any>> {
  // const Authorization = auth.value.token ? `Bearer ${auth.value.token}/${loggedUser.value.type}/${loggedUser.value.id}` : ''

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...config.headers,
    // Authorization,
  }

  const apiUrl = getApiUrl()
  const url = `${apiUrl}${path}`

  try {
    const response = await fetch(url, { ...config, headers })

    if (!response) {
      return {
        isOk: false,
        error: {
          message: 'No response',
          name: ErrorName.FetchEmptyResponse,
        },
      }
    }

    const jsonResponse = await response.json().catch(() => null)

    if (!response.ok) {
      return {
        isOk: false,
        error: {
          message: jsonResponse?.message || jsonResponse?.errorMessage || jsonResponse,
          name: ErrorName.FetchErrorResponse,
        },
      }
    }

    return { isOk: true, result: jsonResponse }
  }
  catch (error) {
    const resError = error as ApiResError

    return {
      isOk: false,
      error: {
        message: resError?.message || 'fetch error',
        name: resError?.name || ErrorName.FetchRequestError,
      },
    }
  }

  // const json = { ok: false, response: null }

  // // if ([401, 403].includes(response.status))
  // //   clearSessionUser()

  // const jsonResponse = await response.json().catch(() => null)
  // if (response.ok) {
  //   json.ok = true
  //   json.response = jsonResponse.response || jsonResponse
  // }

  // // else {
  // // const responseMessage = jsonResponse?.message || jsonResponse?.errorMessage || jsonResponse

  // // if (responseMessage) {
  // // const allowsNotifications = !config.preventNotifications

  // // if (allowsNotifications) {
  // //   let pageNotifications: NotificationCreator[] = []

  // //   if (Array.isArray(responseMessage)) {
  // //     pageNotifications = responseMessage.map((message: string) => ({
  // //       message,
  // //       type: 'danger',
  // //     }))
  // //   }
  // //   else {
  // //     pageNotifications = [{ message: responseMessage, type: 'danger' }]
  // //   }

  // //   addNotifications(pageNotifications)
  // // }
  // // }

  // // if (jsonResponse?.statusCode === 403)
  // //   clearSessionUser()
  // // }
  // return { isOk: true, result: json.response }
}

function parseDicToSearchParams(params: object) {
  return Object.entries(params).map(([key, value]) => {
    if (typeof value === 'object')
      value = encodeURIComponent(JSON.stringify(value))

    const result = `${key}=${value}`

    return result
  }).join('&')
}

export async function httpGet<Res>(url: string, config: CustomRequestInit = {}): Promise<ApiRes<Res>> {
  let reqUrl = url

  if (config.searchParams)
    reqUrl = `${url}?${parseDicToSearchParams(config.searchParams)}`

  return httpRequest(reqUrl, { method: 'GET', ...config })
}

export async function httpPost<Res>(
  url: string,
  body?: any,
  config?: CustomRequestInit,
): Promise<ApiRes<Res>> {
  return httpRequest(url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...config,
  })
}

export async function httpPatch<Res>(
  url: string,
  body?: any,
  config?: CustomRequestInit,
): Promise<ApiRes<Res>> {
  return httpRequest(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
    ...config,
  })
}

export async function httpDelete<Res>(
  url: string,
  config?: CustomRequestInit,
): Promise<ApiRes<Res>> {
  return httpRequest(url, {
    method: 'DELETE',
    ...config,
  })
}
