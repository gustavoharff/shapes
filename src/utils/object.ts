type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`

/**
 * ```javascript
 * const people = {
 *   name: 'John Doe',
 *   address: {
 *      street: 'Fifth Avenue'
 *   }
 * }
 *
 * type PeopleObjectKeys = NestedObjectKeys<typeof people>
 * // 'name' | 'address.street'
 * ```
 */
export type NestedObjectKeys<T> = (
  T extends object // eslint-disable-line
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          NestedObjectKeys<T[K]>
        >}`
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never
