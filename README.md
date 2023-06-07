# BRC721 Generator

This is a repository for generating and managing a BRC721 collection

## WORK IN PROGRESS

Use at your own risk, still under development

## Features

- Generate Collection Manifest
- Generate Reveal Manifest
- Generate Inscription Manifest(s) // only one for now
- Validate Manifests
- Utility to convert private keys from base 58 encoded Compressed WIF to hex

## Usage

1. Fork repository
2. Add env variables
  - see [env variables](#env-variables) section
3. Install dependencies `npm i`
4. run scripts (as declared in `package.json`)
  
  
## convert-base58-encoded-compressed-WIF-to-hex
    
Converts a key, as exported from a wallet (ie. Electrum) from base-58 encoded compressed Wallet Import Format (WIF) to hex

## generate-collection-manifest
    
Generates a collection manifest file

## generate-reveal-manifest

Generates a reveal manifest. If one exists, it will increment `content.weight`

## generate-inscription-manifest
    
Generates an inscription manifest. Currently overwrites the existing one

## validate-manifests

Validates all existing manifest files, according to their respective schema. There are some additional rules that should be verifiable, but aren't current being validated, since they rely on transaction data, and this repo focuses exclusively on generating manifests.

## Inscribe your manifest to the BTC chain

Use a service like https://unisat.io/inscribe

## env variables

To use this project, relevant information must be set in a `.env` file

- create a `.env` file in the project root, see `.env.example`
- `.env` is .gitignored for safety reasons

### Needed for multiple types of manifest generation

- ## `BRC_721_VERSION`
- `BRC_721_PAYMENT_ADDRESS`
- `BRC_721_SIGNER_PUBLIC_KEY`
- `BRC_721_PRIVATE_KEY`
  - need to match `BRC_721_SIGNER_PUBLIC_KEY`

### Needed for generating a collection manifest

- `BRC_721_COLLECTION_INSCRIPTION_ID`
- `BRC_721_COLLECTION_NAME`
- `BRC_721_COLLECTION_SYMBOL`
- `BRC_721_MAX_SUPPLY`
- `BRC_721_MAX_PER_ADDRESS`

### Needed for reveal manifest

- `BRC_721_METADATA_URL`

### Needed for inscription manifest

- `BRC_721_INSCRIPTION_PRICE`

## Reference / Read more

- https://www.brc721.com/specification
- https://tutorial.brc721.com/

## LICENSE

MIT
