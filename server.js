import express from "express";

const app = express();
app.use(express.static("public"));

app.get("/api/gameid/:placeId", async (req, res) => {
    try {
        const placeId = req.params.placeId;

        const response = await fetch(
            `https://apis.roblox.com/universes/v1/places/${placeId}/universe`
        );

        if (!response.ok) {
            return res.status(400).json({ error: "Invalid Place ID" });
        }

        const data = await response.json();

        return res.json({
            universeId: data.universeId
        });

    } catch (err) {
        return res.status(500).json({ error: "Server error" });
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
