import React from 'react';
import Component_4 from '../../components/Component_4/Component_4';
import './Page_3.css';

export default function Page_3() {
    return (
        <div className="page-container">
            <h1>Inventory Dashboard</h1>
            <p className="description">
                Manage and track your product inventory dynamically.
            </p>

            {/* Stock Items */}
            <Component_4
                title="Stock Items"
                initialItems={[
                    { name: "Apple", price: "2.50", stock: 100 },
                    { name: "Banana", price: "1.20", stock: 150 },
                ]}
                emptyMessage="No stock items available. Add some!"
                emptyIcon="🍎"
            />

            {/* Electronics */}
            <Component_4
                title="Electronics"
                initialItems={[
                    { name: "Laptop", price: "1200", stock: 15 },
                    { name: "Smartphone", price: "800", stock: 30 },
                ]}
                emptyMessage="No electronics in inventory!"
                emptyIcon="💻"
            />

            {/* Office Supplies */}
            <Component_4
                title="Office Supplies"
                initialItems={[
                    { name: "Pens", price: "0.50", stock: 500 },
                    { name: "Notebooks", price: "3.00", stock: 200 },
                ]}
                emptyMessage="No office supplies available."
                emptyIcon="📝"
            />

            {/* Miscellaneous */}
            <Component_4
                title="Miscellaneous Items"
                addItemGenerator={() => ({
                    name: `Item ${Math.floor(Math.random() * 1000)}`,
                    price: (Math.random() * 50 + 5).toFixed(2),
                    stock: Math.floor(Math.random() * 20) + 1
                })}
                emptyMessage="Nothing here yet. Add items!"
                emptyIcon="🎁"
            />
        </div>
    );
}