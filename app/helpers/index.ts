import l from 'lodash'

export const JSONSnakeSerialized = (payload: any) => {
  payload = l.mapKeys(payload, function (_, key) {
    return l.snakeCase(key)
  })

  return JSON.stringify(payload)
}

export const valuesCamelSerialized = (values: any) => {
  values = l.mapKeys(values, function (_, key) {
    return l.camelCase(key)
  })

  return values
}
