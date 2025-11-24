// server.js
const express = require("express");
const path = require("path");
const bitcoinService = require("./src/bitcoinService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/balance/:address", async (req, res) => {
    const { address } = req.params;

    if (!address) {
        return res.status(400).json({ error: "Bitcoin address is required." });
    }

    try {
        const data = await bitcoinService.getAddressInfo(address);
        return res.json(data);
    } catch (err) {
        console.error("Error fetching balance:", err.message);

        // Basic error response (you can improve this later)
        return res.status(500).json({
            error: "Unable to fetch balance for this address. Please check the address and try again.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`BitCheck server running on http://localhost:${PORT}`);
});