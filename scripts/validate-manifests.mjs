import { Validator } from "jsonschema"
import { readManifests } from "../utils/read-manifests.mjs"
import { fetchManifestSchemas } from "../utils/fetch-manifest-schemas.mjs"

const {
  collectionManifest,
  inscriptionManifest,
  inscriptionManifestContent,
  revealManifest,
  revealManifestContent,
} = readManifests()

const {
  collectionManifestSchema,
  inscriptionManifestSchema,
  inscriptionManifestContentSchema,
  revealManifestSchema,
  revealManifestContentSchema,
} = await fetchManifestSchemas()

const v = new Validator()

const validate = (manifest, schema) => v.validate(manifest, schema, { throwError: true })

try {
  if (collectionManifest) {
    console.log("Validating CollectionManifest.json...\n")
    validate(collectionManifest, collectionManifestSchema)
  }

  if (inscriptionManifest && inscriptionManifestContent) {
    console.log("Validating InscriptionManifest.json...\n")

    validate(inscriptionManifestContent, inscriptionManifestContentSchema)
    validate(inscriptionManifest, inscriptionManifestSchema)

    if (!collectionManifest)
      console.log("CollectionManifest.json not found. Cannot perform full InscriptionManifest validation.")

    // InscriptionManifest.protocol.version is equal to CollectionManifest.protocol.version
    if (inscriptionManifest.protocol.version !== collectionManifest?.protocol?.version)
      throw new Error(
        "InscriptionManifest protocol version does not match CollectionManifest protocol version"
      )

    // InscriptionManifest.content.collectionInscriptionId is equal to CollectionManifest's inscription id
    // if (inscriptionManifestContent.collectionInscriptionId !== collectionManifest.inscription.id)
    //   throw new Error(
    //     "InscriptionManifest content collectionInscriptionId does not match CollectionManifest inscription id"
    //   )

    // todo, there is not inscription id in the collection manifest

    // InscriptionManifest.contentSignature is verifiable with CollectionManifest.signerPublicKey and InscriptionManifest.content string

    // todo, how to verify this?

    // InscriptionManifest.contentSignature is verifiable with CollectionManifest.signerPublicKey and InscriptionManifest.content string

    // todo, how to verify this?

    // If InscriptionManifest.content.price exists and is greater than 0, the inscription transaction includes a spendable output(s) for CollectionManifest.paymentAddress with a total value more or equal to InscriptionManifest.content.price

    // todo, how to verify this?

    // If CollectionManifest.maxBlockHeight exists and is greater than 0, then InscriptionManifest's transaction block height is less or equal to the specified value

    // todo, how to verify this?

    // If CollectionManifest.maxSupply exists and is greater than 0, then InscriptionManifest number is less or equal to the specified value. The order of the transactions in the blocks defines the InscriptionManifest number.

    // todo, how to verify this?

    // If InscriptionManifest.content.initialOwnerAddress exists, then InscriptionManifest's first output is spendable by the same address to ensure that initialOwnerAddress is the initial recipient of the inscription

    // todo, how to verify this?

    // If CollectionManifest.maxPerAddress exists and is greater than 0, then the total number of verified InscriptionManifests is less or equal to CollectionManifest.maxPerAddress on a single address

    // todo, how to verify this?
  }

  if (revealManifest && revealManifestContent) {
    console.log("Validating RevealManifest.json...\n")

    validate(revealManifest, revealManifestSchema)
    validate(revealManifestContent, revealManifestContentSchema)

    // RevealManifest.protocol.version is equal to CollectionManifest.protocol.version

    if (!collectionManifest)
      console.log("CollectionManifest.json not found. Cannot perform full RevealManifest validation.")

    if (revealManifest.protocol.version !== collectionManifest?.protocol?.version)
      throw new Error("RevealManifest protocol version does not match CollectionManifest protocol version")

    // RevealManifest.contentSignature is verifiable with CollectionManifest.signerPublicKey and RevealManifest.content string

    // todo, how to verify this?

    // RevealManifest.content.collectionInscriptionId is equal to CollectionManifest's inscription id
    // if (revealManifest.collectionInscriptionId !== collectionManifest.inscription.id)
    //   throw new Error(
    //     "RevealManifest content collectionInscriptionId does not match CollectionManifest inscription id"
    //   )

    // todo, there is not inscription id in the collection manifest

    // The last RevealManifest inscription if more than one exists to update the metadata

    // todo, how to verify this?

    // RevealManifest.content.weight is greater than corresponding CollectionManifest's previous RevealManifest weight

    // todo, how to verify this?
  }

  console.log("All manifests are valid")
} catch (e) {
  console.log(e.stack)
}
