// import type { NotificationCreator } from '../..'
// import { getApiUrl } from '../..'
// import { auth } from '../../../composables/useAuth'
// import { addNotifications } from '../../../composables/notifications'
// import { clearSessionUser, loggedUser } from '../../../composables/loggedUser'
import { PRODUCTION_API_URL, TEST_API_URL } from '@/app/configs'

export interface ApiRes<Res> {
  ok: boolean
  response: Res
}

export interface CustomRequestInit extends RequestInit {
  searchParams?: any
  preventNotifications?: boolean
}

export const getApiUrl = (): string => {
  const host = window?.location?.host
  const subdomain = host.split('.')[1] ? host.split('.')[0] : null
  return subdomain === 'app' ? PRODUCTION_API_URL : TEST_API_URL
}

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
}

async function httpClient(url: string, config: CustomRequestInit): Promise<ApiRes<any>> {
  // const Authorization = auth.value.token ? `Bearer ${auth.value.token}/${loggedUser.value.type}/${loggedUser.value.id}` : ''

  const headers: HeadersInit = {
    ...defaultHeaders,
    ...config.headers,
    // Authorization,
  }

  const response: Response | null = await fetch(`${getApiUrl()}${url}`,
    {
      ...config,
      headers,
    },
  ).catch((error) => {
    console.error(error)
    return null
  })

  const json = { ok: false, response: null }

  if (!response)
    return json

  // if ([401, 403].includes(response.status))
  //   clearSessionUser()

  const jsonResponse = await response.json().catch(() => null)
  if (response.ok) {
    json.ok = true
    json.response = jsonResponse.response || jsonResponse
  }

  // else {
  // const responseMessage = jsonResponse?.message || jsonResponse?.errorMessage || jsonResponse

  // if (responseMessage) {
  // const allowsNotifications = !config.preventNotifications

  // if (allowsNotifications) {
  //   let pageNotifications: NotificationCreator[] = []

  //   if (Array.isArray(responseMessage)) {
  //     pageNotifications = responseMessage.map((message: string) => ({
  //       message,
  //       type: 'danger',
  //     }))
  //   }
  //   else {
  //     pageNotifications = [{ message: responseMessage, type: 'danger' }]
  //   }

  //   addNotifications(pageNotifications)
  // }
  // }

  // if (jsonResponse?.statusCode === 403)
  //   clearSessionUser()
  // }
  return json
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

  return httpClient(reqUrl, { method: 'GET', ...config })
}

export async function httpPost<Res>(
  url: string,
  body?: any,
  config?: CustomRequestInit,
): Promise<ApiRes<Res>> {
  return httpClient(url, {
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
  return httpClient(url, {
    method: 'PATCH',
    body: JSON.stringify(body),
    ...config,
  })
}

export async function httpDelete<Res>(
  url: string,
  config?: CustomRequestInit,
): Promise<ApiRes<Res>> {
  return httpClient(url, {
    method: 'DELETE',
    ...config,
  })
}
