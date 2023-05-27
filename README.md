# BRC721 Generator

This is a repository for generating and managing a BRC721 collection

## WORK IN PROGRESS

Use at your own risk, still under development

## Features

- Generate Collection Manifest
- Generate Reveal Manifest
- Generate Inscription Manifest(s) // only one for now
- Validate Manifests

## Usage

- Fork repository
- Add env variables (see below)
- `npm i`
- run scripts (as declared in `package.json`)

## ENV variables

To use this project, relevant information must be set in a `.env` file

- create a `.env` file in the project root, see `.env.example`
- `.env` is .gitignored for safety reasons

### Needed for multiple types of manifest generation

- BRC_721_VERSION
- BRC_721_PAYMENT_ADDRESS
- BRC_721_SIGNER_PUBLIC_KEY
- BRC_721_PRIVATE_KEY - found in your wallet

### Needed for generating a collection manifest

- BRC_721_COLLECTION_INSCRIPTION_ID
- BRC_721_COLLECTION_NAME
- BRC_721_COLLECTION_SYMBOL
- BRC_721_MAX_SUPPLY
- BRC_721_MAX_PER_ADDRESS

### Needed for reveal manifest

- BRC_721_METADATA_URL

### Needed for inscription manifest

- BRC_721_INSCRIPTION_PRICE

## Reference / Read more

See https://www.brc721.com/specification (and other pages on that site)

## LICENSE

MIT
