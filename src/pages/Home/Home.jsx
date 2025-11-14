import './Home.css';
import Component_0 from '../../components/Component_0/Component_0';

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Your Dashboard</h1>
        <p>Explore tools and features available to you</p>
      </header>

      <div className="cards-grid">
        <Component_0
          to="/page_1"
          icon="🔹"
          title="Feature 1"
          description="Description for Feature 1 will go here."
          items={['Point 1', 'Point 2', 'Point 3']}
        />

        <Component_0
          to="/page_2"
          icon="🔹"
          title="Feature 2"
          description="Description for Feature 2 will go here."
          items={['Point 1', 'Point 2', 'Point 3']}
        />

        <Component_0
          to="/page_3"
          icon="🔹"
          title="Feature 3"
          description="Description for Feature 3 will go here."
          items={['Point 1', 'Point 2', 'Point 3']}
        />

        <Component_0
          to="/page_4"
          icon="🔹"
          title="Feature 4"
          description="Description for Feature 4 will go here."
          items={['Point 1', 'Point 2', 'Point 3']}
        />
      </div>
    </div>
  );
}
