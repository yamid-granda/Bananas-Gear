export const generateKey = (): string => {
  let key = ''

  for (let index = 0; index < 5; index++)
    key += Math.random().toString(36).slice(-4)

  return key
}
