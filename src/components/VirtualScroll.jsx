import { useState, useEffect, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import { faker } from '@faker-js/faker';
import '../VirtualScroll.css';

// Generate fake user data
const generateUsers = (count) => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        company: faker.company.name(),
        jobTitle: faker.person.jobTitle(),
        phone: faker.phone.number(),
        address: `${faker.location.city()}, ${faker.location.country()}`
    }));
};

// Row component for each item in the list
const Row = ({ index, style, data }) => {
    const user = data[index];

    return (
        <div style={style} className="user-row">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <div className="user-info">
                <h4>{user.name}</h4>
                <p className="user-email">{user.email}</p>
                <p className="user-details">
                    {user.jobTitle} at {user.company}
                </p>
                <p className="user-meta">
                    📍 {user.address} | 📞 {user.phone}
                </p>
            </div>
            <div className="user-id">#{user.id}</div>
        </div>
    );
};

export default function VirtualScrollComponent() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [stats, setStats] = useState({
        totalLoaded: 0,
        loadCount: 0
    });

    // Initial load
    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = () => {
        const initialUsers = generateUsers(50);
        setItems(initialUsers);
        setStats({ totalLoaded: 50, loadCount: 1 });
    };

    // Simulate loading more data
    const loadMoreData = useCallback(() => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        console.log('Loading more data...');

        // Simulate API delay
        setTimeout(() => {
            const newUsers = generateUsers(20);
            setItems(prev => [...prev, ...newUsers]);
            setStats(prev => ({
                totalLoaded: prev.totalLoaded + 20,
                loadCount: prev.loadCount + 1
            }));
            setIsLoading(false);

            // Stop loading after 200 items
            if (items.length >= 200) {
                setHasMore(false);
                console.log('Reached maximum items');
            }
        }, 1000);
    }, [isLoading, hasMore, items.length]);

    const resetData = () => {
        loadInitialData();
        setHasMore(true);
        setIsLoading(false);
    };

    return (
        <div className="virtual-scroll-container">
            <h2>Virtual Scrolling with React-Window</h2>
            <p className="description">
                Efficiently render large lists by only rendering visible items
            </p>

            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-label">Total Items:</span>
                    <span className="stat-value">{items.length}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Load Count:</span>
                    <span className="stat-value">{stats.loadCount}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Status:</span>
                    <span className={`stat-value ${isLoading ? 'loading' : hasMore ? 'active' : 'complete'}`}>
                        {isLoading ? '⏳ Loading...' : hasMore ? '✓ Ready' : '✓ Complete'}
                    </span>
                </div>
                <button onClick={resetData} className="btn-reset">
                    🔄 Reset
                </button>
            </div>

            <div className="list-container">
                <List
                    height={600}
                    itemCount={items.length}
                    itemSize={100}
                    width="100%"
                    onItemsRendered={({ visibleStopIndex }) => {
                        // Check if we're near the end
                        const threshold = Math.floor(items.length * 0.8);
                        if (visibleStopIndex >= threshold && !isLoading && hasMore) {
                            loadMoreData();
                        }
                    }}
                    itemData={items}
                >
                    {Row}
                </List>
                
                {isLoading && (
                    <div className="loading-more">
                        <div className="loading-spinner">⏳</div>
                        <p>Loading more data...</p>
                    </div>
                )}
            </div>

            {!hasMore && (
                <div className="end-message">
                    🎉 You've reached the end! All {items.length} items loaded.
                </div>
            )}

            <div className="info-section">
                <h4>🚀 Virtual Scrolling Benefits:</h4>
                <ul>
                    <li><strong>Performance:</strong> Only renders visible items (saves memory & CPU)</li>
                    <li><strong>Infinite Scroll:</strong> Loads more data when scrolling near bottom</li>
                    <li><strong>Large Datasets:</strong> Can handle thousands of items smoothly</li>
                    <li><strong>React-Window:</strong> Lightweight virtualization library</li>
                </ul>

                <h4>📊 How it works:</h4>
                <ul>
                    <li>Initial load: 50 items</li>
                    <li>Scroll detection: Triggers at 80% scroll position</li>
                    <li>Batch loading: 20 items per load</li>
                    <li>Maximum: 200 items (configurable)</li>
                    <li>Each item is 100px tall</li>
                </ul>

                <h4>💡 Try it:</h4>
                <ul>
                    <li>Scroll down to trigger automatic loading</li>
                    <li>Watch the stats bar update</li>
                    <li>Notice smooth performance even with many items</li>
                    <li>Check console for load events</li>
                </ul>
            </div>
        </div>
    );
}
