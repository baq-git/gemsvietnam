import l from 'lodash'

export const JSONSerialized = (payload: any) => {
  payload = l.mapKeys(payload, function (_, key) {
    return l.snakeCase(key)
  })

  return JSON.stringify(payload)
}
