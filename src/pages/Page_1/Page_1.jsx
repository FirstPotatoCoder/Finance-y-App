import React from 'react';
import Component_2 from '../../components/Component_2/Component_2';
import './Page_1.css';

export default function Page_1() {
    return (
        <div className="json-container">
            <h2>My Page 1</h2>

            <Component_2
                heading="First Section"
                items={["Item 1A", "Item 1B", "Item 1C"]}
            />

            <Component_2
                heading="Second Section"
                items={["Item 2A", "Item 2B"]}
            />

            <Component_2
                heading="Third Section"
                items={["Item 3A", "Item 3B", "Item 3C", "Item 3D"]}
            />
        </div>
    );
}
