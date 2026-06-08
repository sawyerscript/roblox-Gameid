async function convert() {
    const placeId = document.getElementById("placeId").value;
    const result = document.getElementById("result");
    const loading = document.getElementById("loading");

    result.classList.add("hidden");
    loading.classList.remove("hidden");
    loading.innerText = "Fetching game data";

    try {
        const res = await fetch(`/api/get-gameid/${placeId}`);
        const data = await res.json();

        loading.classList.add("hidden");

        if (data.error) {
            result.classList.remove("hidden");
            result.innerHTML = `<b>Error:</b> ${data.error}`;
            return;
        }

        result.classList.remove("hidden");

        result.innerHTML = `
            <div><b>🎮 Game Name:</b> ${data.name}</div>
            <div><b>🆔 Universe ID:</b> <span id="uid">${data.universeId}</span></div>
            <div><b>👀 Visits:</b> ${data.visits}</div>

            <button class="copy-btn" onclick="copyId()">Copy Universe ID</button>
        `;

    } catch (err) {
        loading.classList.add("hidden");
        result.classList.remove("hidden");
        result.innerHTML = "Request failed.";
    }
}

function copyId() {
    const id = document.getElementById("uid").innerText;
    navigator.clipboard.writeText(id);

    alert("Copied Universe ID!");
}
