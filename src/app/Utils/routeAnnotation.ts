import { Router } from 'express'
const router = Router()

function URI(uri:string, verb:string) {
  const root_uri = '/v1/film-fans'
  const final_uri = root_uri + uri

  return function (target, propertKey, descriptor) {
    router[verb.toLowerCase()](final_uri, target)
  }
}

export {
  URI,
  router
}
