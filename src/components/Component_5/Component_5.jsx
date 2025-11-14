import './Component_5.css';

export default function Component_5({
    title = "Portfolio Performance Overview",
    description = "Track portfolio items, refresh market data, and monitor loading activity.",
    items = [],
    stats = { loadCount: 0 },
    isLoading = false,
    hasMore = false,
    resetData = () => {},
    labels = {
        totalAssets: "Total Assets:",
        loadCount: "Data Refresh Count:",
        marketStatus: "Market Status:"
    },
    statusIcons = {
        loading: "⏳ Updating...",
        active: "▲ Active",
        complete: "✓ Stable"
    }
}) {
    return (
        <>
            <h2>{title}</h2>
            <p className="description">{description}</p>

            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-label">{labels.totalAssets}</span>
                    <span className="stat-value">{items.length}</span>
                </div>

                <div className="stat">
                    <span className="stat-label">{labels.loadCount}</span>
                    <span className="stat-value">{stats.loadCount}</span>
                </div>

                <div className="stat">
                    <span className="stat-label">{labels.marketStatus}</span>
                    <span
                        className={`stat-value ${
                            isLoading ? 'loading' : hasMore ? 'active' : 'complete'
                        }`}
                    >
                        {isLoading
                            ? statusIcons.loading
                            : hasMore
                            ? statusIcons.active
                            : statusIcons.complete}
                    </span>
                </div>

                <button onClick={resetData} className="btn-reset">
                    🔄 Refresh Data
                </button>
            </div>
        </>
    );
}