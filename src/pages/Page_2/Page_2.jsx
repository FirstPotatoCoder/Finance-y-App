import React, { useState } from 'react';
import Component_5 from '../../components/Component_5/Component_5';
import './Page_2.css';

export default function Page_4() {
    // Example: we can manage separate states for each portfolio
    const [portfolios, setPortfolios] = useState([
        { name: "Tech Portfolio", items: [], stats: { loadCount: 0 } },
        { name: "Energy Portfolio", items: [], stats: { loadCount: 0 } },
        { name: "Healthcare Portfolio", items: [], stats: { loadCount: 0 } },
        { name: "Crypto Portfolio", items: [], stats: { loadCount: 0 } },
        { name: "Commodities Portfolio", items: [], stats: { loadCount: 0 } },
        { name: "Real Estate Portfolio", items: [], stats: { loadCount: 0 } }
    ]);

    // Example resetData function per portfolio
    const resetPortfolioData = (index) => {
        const updated = [...portfolios];
        updated[index] = {
            ...updated[index],
            items: [],
            stats: { loadCount: updated[index].stats.loadCount + 1 }
        };
        setPortfolios(updated);
    };

    return (
        <div className="container">
            <h1>Multi-Portfolio Dashboard</h1>
            <p className="description">
                Monitor multiple portfolio performances simultaneously.
            </p>

            {/* Render multiple Component_5 instances */}
            {portfolios.map((portfolio, index) => (
                <div key={index} className="portfolio-section">
                    <Component_5
                        title={portfolio.name}
                        description={`Track ${portfolio.name.toLowerCase()} performance.`}
                        items={portfolio.items}
                        stats={portfolio.stats}
                        isLoading={Math.random() < 0.5} // example random loading state
                        hasMore={Math.random() < 0.5} // example random activity state
                        resetData={() => resetPortfolioData(index)}
                    />
                </div>
            ))}
        </div>
    );
}
