import React, { useState } from 'react';
import SearchComponent from './searchComponent';

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
const searchComponent = new SearchComponent(items);

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = searchComponent.search(query);
    setFilteredItems(results);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        placeholder="Search items..."
        onChange={handleSearch}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
