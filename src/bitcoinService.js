const axios = require("axios");

const BLOCKSTREAM_BASE_URL = "https://blockstream.info/api";

/**
 * Fetch basic information about a Bitcoin address from Blockstream.
 * Docs: https://blockstream.info/api/#address
 */

async function getAddressInfo(address) {
    const url = `${BLOCKSTREAM_BASE_URL}/address/${address}`;
    const response = await axios.get(url, { timeout: 8000 });
    const data = response.data;

    const funded = data.chain_stats.funded_txo_sum || 0;
    const spent = data.chain_stats.spent_txo_sum || 0;
    const balanceSats = funded - spent;
    const balanceBTC = balanceSats / 1e8;

    return {
        address,
        balanceSats,
        balanceBTC,
        totalTxs: data.chain_stats.tx_count || 0,
    };
}

module.exports = {
    getAddressInfo,
};