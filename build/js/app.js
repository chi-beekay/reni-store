const navMenu = document.getElementById('nav-menu');
const close = document.getElementById('nav-close');
const open = document.getElementById('nav-open');

open.addEventListener('click', () => {
	console.log('open');
	navMenu.classList.toggle('translate-x-0');
});

close.addEventListener('click', () => {
	console.log('close');
	navMenu.classList.toggle('translate-x-0');
});

// API CALLS
const productContainer1 = document.querySelector('.product-con1');
const productContainer2 = document.querySelector('.product-con2');

const fetchProducts = async (category, productContainer) => {
	try {
		// make a Get request to the api
		const res = await fetch(
			`https://fakestoreapi.com/products/category/${category}?limit=5`
		);

		const data = await res.json();

		console.log(data);

		// process the response data
		const products = data;

		// generate HTML structure for products
		let html = '';

		for (const product of products) {
			// console.log(product);
			html += `	<div class="flex flex-col justify-between group/item hover:bg-[#fcfcfc] duration-300 ease-in h-[19rem] px-4 py-4 rounded-2xl">
							<a href="product.html?id=${product.id}" class="product-link">
								<!-- image -->
								<div class="w-[8rem] mx-auto overflow-hidden rounded-2xl">
									<img class="" src="${product.image}" alt="" />
								</div>
								<!-- text -->
								<div>
									<p class="mt-2 text-xs">${product.title}</p>
									<div class="flex justify-between mt-3">
										<h1 class="mt-1 text-xl font-bold">$${product.price.toFixed(2)}</h1>
										<a href="" class="bg-black border-black border text-white rounded px-2 py-1 hover:bg-white hover:text-black invisible group-hover/item:visible duration-300 ease-in">Add</a>
									</div>
								</div>
							</a>
						</div>`;
		}

		// render the products HTML
		productContainer.innerHTML = html;
	} catch (error) {
		// handle error
		console.error('Error:', error);
	}
};

fetchProducts("men's clothing", productContainer1);

fetchProducts("women's clothing", productContainer2);
