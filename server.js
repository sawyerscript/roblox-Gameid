const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

// PlaceId -> UniverseId (GameId)
app.get("/api/get-gameid/:placeId", async (req, res) => {
    const { placeId } = req.params;

    try {
        const universeRes = await fetch(
            `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
        );

        if (!universeRes.ok) {
            return res.status(400).json({ error: "Invalid PlaceId or Roblox API failed" });
        }

        const universeData = await universeRes.json();
        const universeId = universeData.universeId;

        if (!universeId) {
            return res.status(404).json({ error: "UniverseId not found" });
        }

        // Optional: get game info too
        const gameRes = await fetch(
            `https://games.roblox.com/v1/games?universeIds=${universeId}`
        );

        const gameData = await gameRes.json();
        const game = gameData.data?.[0];

        res.json({
            placeId,
            universeId,
            name: game?.name || "Unknown",
            visits: game?.visits || 0
        });

    } catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
