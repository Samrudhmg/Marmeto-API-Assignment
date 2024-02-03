


  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return { categories: [] };
    }
  }

  async function showProducts(category) {
    const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
    const apiResponse = await fetchData(apiUrl);
    console.log(apiResponse)

    const selectedCategory = apiResponse.categories.find(cat => cat.category_name === category);

    if (selectedCategory) {
      const products = selectedCategory.category_products;

      document.querySelectorAll('.product-container').forEach(container => {
        container.style.display = 'none';
      });

      document.getElementById(`${category.toLowerCase()}-products`).style.display = 'flex';

      displayProducts(products, category.toLowerCase());
    } else {
      console.error('Category not found in API response');
    }
  }

  function displayProducts(products, category) {
    const container = document.getElementById(`${category}-products`);
    container.innerHTML = '';

    products.forEach(product => {
      const productCard = `
        <div class="product-card">
            <div class='newseason'>New Season</div>
          <img src="${product.image}" alt="${product.title}">
          <div class='title'>
            <h3>${product.title.slice(0,8)}..</h3>
          <p>•${product.vendor}</p></div>
          <div class='price'>
            <p class='rupee'>Rs${product.price}</p>
          <p class='compare'>\ ${product.compare_at_price}.00</p>
            <p class='fiftyoff'>50% off</p>
            <p class='line'></p>
            </div>
            
        
          <button class="add-to-cart-btn">Add to Cart</button>
        </div>
      `;

      container.innerHTML += productCard;
    });
  }

  showProducts('Men');


