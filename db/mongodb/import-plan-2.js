db.products.createIndex({ id: 1 })
db.features.createIndex({ product_id: 1 })
db.related.createIndex({ current_product_id: 1 })
db.styles.createIndex({ id: 1 })
db.skus.createIndex({ styleId: 1}),
db.photos.createIndex({ styleId: 1})

// Test version:
db.products.aggregate([{
  $lookup: {
    from: "features",
    localField: "id",
    foreignField: "product_id",
    as: "features"
  }
}, {
  $unset: ["features._id", "features.id", "features.product_id"]
}])

db.products.aggregate([{
  $lookup: {
    from: "related",
    localField: "id",
    foreignField: "current_product_id",
    as: "related"
  }
}, {
  $map: {
    input: "$related",
    as: "related",
    in: "$$related.related_product_id"
  }
}])

db.products.aggregate([{
  $lookup: {
    from: "related",
    localField: "id",
    foreignField: "current_product_id",
    as: "related"
  }
}, {
  $unset: ["related._id", "related.current_product_id"]
}])

db.styles.aggregate([{
  $lookup: {
    from: "skus",
    localField: "id",
    foreignField: "styleId",
    as: "skus"
  }
}, {
  $unset: ["skus._id", "skus.id", "skus.styleId"]
}])

db.styles.aggregate([{
  $lookup: {
    from: "photos",
    localField: "id",
    foreignField: "styleId",
    as: "photos"
  }
}, {
  $unset: ["photos._id", "photos.id", "photos.styleId"]
}])


// Final version:
db.products.aggregate([{
  $lookup: {
    from: "features",
    localField: "id",
    foreignField: "product_id",
    as: "features"
  }
}, {
  $unset: ["features._id", "features.id", "features.product_id"]
}, {
  $merge: "products"
}])



// Merging styles into products... is it a good idea?
db.styles.createIndex({ productId: 1 })
db.products.aggregate([{
  $lookup: {
    from: "styles",
    localField: "id",
    foreignField: "productId",
    as: "styles"
  }
}, {
  $unset: ["styles._id", "styles.id", "styles.productId"]
}, {
  $merge: "products"
}])