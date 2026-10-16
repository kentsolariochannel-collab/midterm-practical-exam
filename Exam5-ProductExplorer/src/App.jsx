import React, { useState, useMemo, useCallback, useEffect } from 'react';
import './App.css';

// 1. Generate at least 500 product records locally
const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Sports'];
const INITIAL_PRODUCTS = Array.from({ length: 500 }, (_, index) => {
  const id = index + 1;
  const category = CATEGORIES[index % CATEGORIES.length];
  return {
    id,
    name: `Product ${id} (${category})`,
    price: Math.floor((id * 17) % 500) + 10,
    category,
  };
});

// 2. Memoized Child Component using React.memo
const ProductList = React.memo(({ products, onSelectProduct }) => {
  console.log('ProductList rendered!');
  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <p><strong>Showing {products.length} products (Memoized Child)</strong></p>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            onClick={() => onSelectProduct(product)}
            style={{
              padding: '6px 8px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{product.name}</span>
            <span>${product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Unrelated parent counter to test performance and prevent unnecessary child renders
  const [parentCount, setParentCount] = useState(0);

  // 3. Memoize the filtered and sorted product list using useMemo
  const filteredProducts = useMemo(() => {
    console.log('Calculating filtered and sorted products...');
    return INITIAL_PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  }, [searchQuery, selectedCategory, sortOrder]);

  // 4. Move analytics side effects out of useMemo and into useEffect
  useEffect(() => {
    console.log(`Analytics: Filtered products updated. Count: ${filteredProducts.length}`);
  }, [filteredProducts]);

  // 5. Memoize the item selection callback using useCallback
  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Product Explorer Performance Repair</h2>

      {/* Unrelated Parent Counter */}
      <div style={{ marginBottom: '15px', padding: '10px', background: '#eef', borderRadius: '4px' }}>
        <p>Parent Counter (Testing Unrelated State Updates): <strong>{parentCount}</strong></p>
        <button onClick={() => setParentCount((c) => c + 1)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Increment Parent Counter
        </button>
      </div>

      {/* Controls: Search, Category, Sort */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', flex: '1', minWidth: '150px' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: '8px' }}
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Selected Product Display */}
      {selectedProduct && (
        <div style={{ margin: '15px 0', padding: '10px', background: '#efe', borderRadius: '4px' }}>
          <strong>Selected Product:</strong> {selectedProduct.name} - ${selectedProduct.price}
        </div>
      )}

      {/* Product List Child Component */}
      <ProductList products={filteredProducts} onSelectProduct={handleSelectProduct} />
    </div>
  );
}

export default App;