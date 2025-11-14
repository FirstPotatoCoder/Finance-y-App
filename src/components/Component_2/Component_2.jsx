import './Component_2.css';

export default function Component_2({
    heading = "Placeholder Heading",
    items = [
        "This is a placeholder item 1",
        "This is a placeholder item 2",
        "This is a placeholder item 3",
    ],
}) {
    return (
        <div className="info-section">
            <h4>{heading}</h4>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}