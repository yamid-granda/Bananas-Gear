export * from './dynamoDB'

/**
 * Remove index signature (`[x: string]: unknown`) using mapped types.
 * This prevents `object.myUnknownKey` no type checker error.
 * check this to more info https://stackoverflow.com/questions/51465182/how-to-remove-index-signature-using-mapped-types
*/
export type RemoveIndex<T> = {
  [ K in keyof T as string extends K ? never : number extends K ? never : K ]: T[K]
}
