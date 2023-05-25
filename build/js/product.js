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

// product-details.js

async function fetchProductDetails(productId) {
	try {
		// Make a GET request to fetch the product details
		const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
		const productData = await res.json();

		// Update the UI with the product details
		document.getElementById('product-image').src = productData.image;
		document.getElementById('image-1').src = productData.image;
		document.getElementById('image-2').src = productData.image;
		document.getElementById('image-3').src = productData.image;
		document.getElementById('product-desc').innerText = productData.description;
		document.getElementById('product-title').innerText = productData.title;
		document.getElementById(
			'product-price'
		).innerText = `$${productData.price}`;
		// Update other elements with relevant product details

		// Fetch other related products
		const relatedProductsRes = await fetch(
			'https://fakestoreapi.com/products?limit=3'
		);
		const relatedProductsData = await relatedProductsRes.json();

		// Filter out the current product from the related products
		const relatedProducts = relatedProductsData.filter(
			(product) => product.id !== productId
		);

		// Display the related products on the page
		const relatedProductsContainer =
			document.getElementById('related-products');

		relatedProducts.forEach((product) => {
			const productElement = document.createElement('div');
			productElement.innerHTML = `
                                    <div class="flex flex-col justify-between group/item hover:bg-[#fcfcfc] duration-300 ease-in h-[19rem] px-4 py-4 rounded-2xl">
                                        <a href="product.html?id=${product.id}" class="product-link">
                                            <!-- image -->
                                            <div class="overflow-hidden rounded-2xl">
                                                <img src="${product.image}" alt="" />
                                            </div>
                                            <!-- text -->
                                            <p class="mt-2 text-xs">${product.title}</p>
                                            <div class="flex justify-between mt-3">
                                                <h1 class="mt-1 text-xl font-bold">$${product.price}</h1>
                                                <a href="" class="bg-black border-black border text-white rounded px-2 py-1 hover:bg-white hover:text-black invisible group-hover/item:visible duration-300 ease-in">Add</a>
                                            </div>
                                        </a>
									</div>
                                `;
			relatedProductsContainer.appendChild(productElement);
		});
	} catch (error) {
		console.error('Error:', error);
	}
}

// Retrieve the product ID from the URL query parameter
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Fetch and display the product details
fetchProductDetails(productId);

// add review

const addReviewButton = document.getElementById('add-review-btn');
const nameInput = document.getElementById('name-input');
const reviewInput = document.getElementById('review-input');
const reviewsContainer = document.getElementById('reviews-container');

// Function to display the reviews from localStorage
const displayReviews = () => {
	const existingReviews = localStorage.getItem('reviews');
	if (existingReviews) {
		const reviews = JSON.parse(existingReviews);
		reviews.forEach((review) => {
			const reviewHTML = createReviewHTML(review);
			reviewsContainer.insertAdjacentHTML('beforeend', reviewHTML);
		});
	}
};

// Function to create HTML for a review
const createReviewHTML = (review) => {
	const { stars, comment, name } = review;
	return `<div>
            <div class="flex items-center gap-20 mb-7">
				<!-- icons -->
				<div>
					${generateStarsHTML(stars)}
				</div>

				<!-- text -->
                <div class="grid gap-3"> 
                <p class="text-sm text-[#8C8C8C]">
					${comment}
				</p>
				<p class="">${name}</p>
                </div>
			</div>
            </div>
  `;
};

// Function to generate HTML for star rating
const generateStarsHTML = (numStars) => {
	const starIcon = '<i class="uil uil-star"></i>';
	const emptyStarIcon = '<i class="uil uil-star"></i>';
	let starsHTML = '';

	for (let i = 0; i < 5; i++) {
		if (i < numStars) {
			starsHTML += starIcon;
		} else {
			starsHTML += emptyStarIcon;
		}
	}

	return starsHTML;
};

// Function to save a review to localStorage
const saveReview = (productI, review) => {
	const existingReviews = localStorage.getItem('reviews');

	if (existingReviews) {
		const reviews = JSON.parse(existingReviews);
		reviews.push({ ...review, productI });
		localStorage.setItem('reviews', JSON.stringify(reviews));
	} else {
		const reviews = [{ ...review, productI }];
		localStorage.setItem('reviews', JSON.stringify(reviews));
	}
};

// Display existing reviews for a specific product on page load
const productI = params.get('id');
displayReviews(productI);

// Add review event listener
addReviewButton.addEventListener('click', () => {
	const name = nameInput.value;
	const review = reviewInput.value;

	if (review.trim() !== '') {
		const newReview = { stars: 5, comment: review, name };
		const existingReviews = localStorage.getItem('reviews');

		if (existingReviews) {
			const reviews = JSON.parse(existingReviews);
			reviews.push(newReview);
			localStorage.setItem('reviews', JSON.stringify(reviews));
		} else {
			const reviews = [newReview];
			localStorage.setItem('reviews', JSON.stringify(reviews));
		}

		const reviewHTML = createReviewHTML(newReview);
		reviewsContainer.insertAdjacentHTML('beforeend', reviewHTML);

		// Clear the input fields
		nameInput.value = '';
		reviewInput.value = '';
	}
});
