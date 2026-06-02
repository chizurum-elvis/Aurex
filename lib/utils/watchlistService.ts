export async function toggleWatchlistItem(commodityId: string) {
    try {
        const response = await fetch("/api/watchlist/toggle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ commodityId }),
        });

        return await response.json();
    } catch (error) {
        console.error("Network fault toggling watchlist asset:", error);
        return { success: false, error: "Network communication failure" };
    }
}