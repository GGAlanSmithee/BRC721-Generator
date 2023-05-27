import fetch from "node-fetch"

const fetchManifestSchema = async (path) => {
  const res = await fetch(path)
  return await res.json()
}

export const fetchManifestSchemas = async () => {
  const [
    collectionManifestSchema,
    inscriptionManifestSchema,
    inscriptionManifestContentSchema,
    revealManifestSchema,
    revealManifestContentSchema,
  ] = await Promise.all([
    fetchManifestSchema("https://www.brc721.com/schemas/CollectionManifest.schema.json"),
    fetchManifestSchema("https://www.brc721.com/schemas/InscriptionManifest.schema.json"),
    fetchManifestSchema("https://www.brc721.com/schemas/InscriptionManifest.content.schema.json"),
    fetchManifestSchema("https://www.brc721.com/schemas/RevealManifest.schema.json"),
    fetchManifestSchema("https://www.brc721.com/schemas/RevealManifest.content.schema.json"),
  ])

  return {
    collectionManifestSchema,
    inscriptionManifestSchema,
    inscriptionManifestContentSchema,
    revealManifestSchema,
    revealManifestContentSchema,
  }
}
