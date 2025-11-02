import { useState } from 'react';
import '../RenderProps.css';

// Reusable DataList component using render props pattern
function DataList({ data, renderItem, renderEmpty }) {
    // If no data, render the empty state component
    if (!data || data.length === 0) {
        return renderEmpty();
    }

    // If data exists, render each item using the renderItem function
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

// Main component
export default function RenderPropsComponent() {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const addUser = () => {
        const newUser = {
            name: `User ${users.length + 1}`,
            email: `user${users.length + 1}@example.com`,
            role: ['Admin', 'User', 'Guest'][Math.floor(Math.random() * 3)]
        };
        setUsers([...users, newUser]);
    };

    const addProduct = () => {
        const newProduct = {
            name: `Product ${products.length + 1}`,
            price: (Math.random() * 100 + 10).toFixed(2),
            stock: Math.floor(Math.random() * 50)
        };
        setProducts([...products, newProduct]);
    };

    const clearUsers = () => setUsers([]);
    const clearProducts = () => setProducts([]);

    return (
        <div className="render-props-container">
            <h2>Render Props Pattern</h2>
            <p className="description">
                Reusable DataList component that accepts render functions as props
            </p>

            <div className="sections">
                {/* Users Section */}
                <div className="section">
                    <div className="section-header">
                        <h3>Users List ({users.length})</h3>
                        <div className="button-group-inline">
                            <button onClick={addUser} className="btn-add">
                                + Add User
                            </button>
                            {users.length > 0 && (
                                <button onClick={clearUsers} className="btn-clear-small">
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <DataList
                        data={users}
                        renderItem={(user, index) => (
                            <>
                                <div className="item-number">#{index + 1}</div>
                                <div className="item-content">
                                    <h4>{user.name}</h4>
                                    <p>{user.email}</p>
                                    <span className="badge">{user.role}</span>
                                </div>
                            </>
                        )}
                        renderEmpty={() => (
                            <EmptyState 
                                message="No users available. Add some users to see them here!"
                                icon="👥"
                            />
                        )}
                    />
                </div>

                {/* Products Section */}
                <div className="section">
                    <div className="section-header">
                        <h3>Products List ({products.length})</h3>
                        <div className="button-group-inline">
                            <button onClick={addProduct} className="btn-add">
                                + Add Product
                            </button>
                            {products.length > 0 && (
                                <button onClick={clearProducts} className="btn-clear-small">
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    <DataList
                        data={products}
                        renderItem={(product, index) => (
                            <>
                                <div className="product-icon">📦</div>
                                <div className="item-content">
                                    <h4>{product.name}</h4>
                                    <p className="price">${product.price}</p>
                                    <p className="stock">Stock: {product.stock} units</p>
                                </div>
                            </>
                        )}
                        renderEmpty={() => (
                            <EmptyState 
                                message="No products available. Add some products to display!"
                                icon="🛒"
                            />
                        )}
                    />
                </div>
            </div>

            <div className="info-section">
                <h4>📝 Render Props Pattern:</h4>
                <ul>
                    <li><strong>Reusability:</strong> DataList component can render any type of data</li>
                    <li><strong>Flexibility:</strong> Parent controls how items are rendered via <code>renderItem</code></li>
                    <li><strong>Conditional Rendering:</strong> Shows empty state when no data exists</li>
                    <li><strong>Separation of Concerns:</strong> Logic separated from presentation</li>
                </ul>

                <h4>🔧 How it works:</h4>
                <pre>{`<DataList
  data={items}
  renderItem={(item) => <div>{item.name}</div>}
  renderEmpty={() => <p>No data</p>}
/>`}</pre>

                <ul>
                    <li><code>data</code> - Array of items to render</li>
                    <li><code>renderItem</code> - Function that returns JSX for each item</li>
                    <li><code>renderEmpty</code> - Function that returns JSX when data is empty</li>
                </ul>
            </div>
        </div>
    );
}
