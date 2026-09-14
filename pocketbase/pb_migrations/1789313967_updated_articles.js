/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.roles ?= \"ADMIN\"",
    "deleteRule": "@request.auth.roles ?= \"ADMIN\"",
    "listRule": "public = true || owner.id = @request.auth.id || @request.auth.roles ?= \"ADMIN\"",
    "updateRule": "owner.id = @request.auth.id || @request.auth.roles ?= \"ADMIN\"",
    "viewRule": "public = true || owner.id = @request.auth.id || @request.auth.roles ?= \"ADMIN\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4287850865")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
