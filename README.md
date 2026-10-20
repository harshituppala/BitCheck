# BitCheck

A small Express application that looks up a Bitcoin address through Blockstream's public API. It returns the confirmed balance in satoshis and BTC, together with the confirmed transaction count.

This is an address lookup exercise. It does not manage a wallet, request private keys, sign transactions or move funds.

## Run locally

```sh
npm ci
npm start
```

Open http://localhost:3000. The server also accepts `PORT`. `npm run dev` starts it with nodemon.

## API

`GET /api/balance/:address` requests Blockstream's address endpoint with an eight-second timeout. The balance is `chain_stats.funded_txo_sum - chain_stats.spent_txo_sum`; BTC is that value divided by 100,000,000.

Only confirmed chain statistics are used. Mempool activity is not included, so this is not a complete spendable-wallet balance. An address is not the same thing as a wallet, which may use many addresses.

## Limits

Availability depends on Blockstream. The server currently returns a generic 500 for lookup failures rather than distinguishing invalid input, upstream rejection and timeouts. Address validation and rate limiting need work before broader public use. No automated test suite is recorded in this repository.

Installed dependencies and editor files are excluded from the current tree; the lockfile remains. Previous hosted links are not claimed as verified by this documentation pass.

[Blockstream Esplora API](https://github.com/Blockstream/esplora/blob/master/API.md)
