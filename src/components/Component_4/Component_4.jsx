import { useState } from 'react';
import './Component_4.css';

// Reusable DataList component using render props pattern
function DataList({ data, renderItem, renderEmpty }) {
    if (!data || data.length === 0) {
        return renderEmpty();
    }

    return (
        <div className="data-list">
            {data.map((item, index) => (
                <div key={index} className="data-item">
                    {renderItem(item, index)}
                </div>
            ))}
        </div>
    );
}

// Empty state component
function EmptyState({ message, icon = "📭" }) {
    return (
        <div className="empty-state">
            <div className="empty-icon">{icon}</div>
            <p>{message}</p>
        </div>
    );
}

// Main reusable component with props
export default function Component_4({
    title = "Items List",
    initialItems = [],
    addItemGenerator = () => ({
        name: `Item ${Math.floor(Math.random() * 1000)}`,
        price: (Math.random() * 100 + 10).toFixed(2),
        stock: Math.floor(Math.random() * 50)
    }),
    emptyMessage = "No items available. Add some items to display!",
    emptyIcon = "📦"
}) {
    const [items, setItems] = useState(initialItems);

    const addItem = () => {
        const newItem = addItemGenerator();
        setItems([...items, newItem]);
    };

    const clearItems = () => setItems([]);

    return (
        <>
            <div className="section-header">
                <h3>{title} ({items.length})</h3>
                <div className="button-group-inline">
                    <button onClick={addItem} className="btn-add">
                        + Add Item
                    </button>
                    {items.length > 0 && (
                        <button onClick={clearItems} className="btn-clear-small">
                            Clear
                        </button>
                    )}
                </div>
            </div>

            <DataList
                data={items}
                renderItem={(item, index) => (
                    <>
                        <div className="product-icon">📦</div>
                        <div className="item-content">
                            <h4>{item.name}</h4>
                            <p className="price">${item.price}</p>
                            <p className="stock">Stock: {item.stock} units</p>
                        </div>
                    </>
                )}
                renderEmpty={() => (
                    <EmptyState
                        message={emptyMessage}
                        icon={emptyIcon}
                    />
                )}
            />
        </>
    );
}