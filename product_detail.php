<?php
$page_title = 'Nothing Phone (2a) 5G - Flipkart';
require_once __DIR__ . '/common/header.php';

$product_id = isset($_GET['id']) ? (int)$_GET['id'] : 1;
?>

<!-- PDP Container -->
<div class="bg-white pb-24">
    <!-- Image Gallery & 360 View Switcher -->
    <div class="relative bg-white p-4 border-b border-slate-100 flex flex-col items-center">
        <!-- 360 View Badge & Zoom Button -->
        <div class="absolute top-3 left-3 flex gap-2">
            <button id="toggle360Btn" class="bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                <i class="fa-solid fa-arrows-rotate animate-spin"></i> 360° View
            </button>
            <span class="bg-fkGreen text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <i class="fa-solid fa-shield-check"></i> Assured
            </span>
        </div>

        <!-- Wishlist Button -->
        <button id="pdpWishlistBtn" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 shadow-sm">
            <i class="fa-regular fa-heart text-base"></i>
        </button>

        <!-- Main Product Image / 360 View Canvas -->
        <div id="standardImageView" class="w-full max-w-xs h-72 flex items-center justify-center p-2">
            <img id="mainPdpImage" src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80" 
                 alt="Nothing Phone 2a" class="max-h-full object-contain transition-transform duration-300 hover:scale-125 cursor-zoom-in" />
        </div>

        <!-- 360 Degree Interactive Simulator (Hidden by default) -->
        <div id="view360Container" class="hidden w-full max-w-xs h-72 flex flex-col items-center justify-center p-2 bg-slate-50 rounded-xl">
            <div class="text-center mb-2">
                <span class="text-xs font-bold text-slate-700">Drag to rotate 360°</span>
            </div>
            <div class="relative w-48 h-48 flex items-center justify-center">
                <i id="rotatableModelIcon" class="fa-solid fa-mobile-screen text-7xl text-fkBlue transition-transform duration-100"></i>
            </div>
            <input type="range" id="rotationSlider" min="0" max="360" value="0" class="w-48 mt-4 accent-fkBlue" />
        </div>

        <!-- Thumbnail Gallery -->
        <div class="flex gap-2 mt-3">
            <button class="w-12 h-12 border-2 border-fkBlue rounded p-1" onclick="changeImage('https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80')">
                <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&q=80" class="w-full h-full object-contain" />
            </button>
            <button class="w-12 h-12 border border-slate-200 rounded p-1" onclick="changeImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80')">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80" class="w-full h-full object-contain" />
            </button>
            <button class="w-12 h-12 border border-slate-200 rounded p-1" onclick="changeImage('https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80')">
                <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=100&q=80" class="w-full h-full object-contain" />
            </button>
        </div>
    </div>

    <!-- Product Title & Rating -->
    <div class="p-3 border-b border-slate-100">
        <h1 class="text-sm font-semibold text-slate-900 leading-snug">
            Nothing Phone (2a) 5G (Black, 128 GB) (8 GB RAM)
        </h1>
        <div class="flex items-center gap-2 mt-1.5">
            <span class="bg-fkGreen text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                4.4 <i class="fa-solid fa-star text-[8px]"></i>
            </span>
            <span class="text-xs text-slate-500 font-medium">1,420 Ratings & 186 Reviews</span>
        </div>

        <!-- Pricing Block -->
        <div class="flex items-baseline gap-2 mt-2">
            <span class="text-xl font-bold text-slate-900">₹23,999</span>
            <span class="text-xs text-slate-400 line-through">₹25,999</span>
            <span class="text-xs text-fkGreen font-bold">8% off</span>
        </div>
        <p class="text-[11px] text-slate-500 mt-1">Inclusive of all taxes</p>

        <!-- Offers Strip -->
        <div class="mt-2.5 space-y-1 text-[11px] text-slate-700">
            <div class="flex items-start gap-1.5">
                <i class="fa-solid fa-tag text-fkGreen mt-0.5"></i>
                <span><strong>Bank Offer:</strong> 10% instant discount on Axis Bank Cards up to ₹1,500</span>
            </div>
            <div class="flex items-start gap-1.5">
                <i class="fa-solid fa-coins text-amber-500 mt-0.5"></i>
                <span><strong>SuperCoins:</strong> Redeem up to 100 SuperCoins for extra ₹100 discount</span>
            </div>
        </div>
    </div>

    <!-- Variant Selector (Color & Storage) -->
    <div class="p-3 border-b border-slate-100 space-y-3">
        <div>
            <span class="text-xs font-bold text-slate-700 block mb-1.5">Color: <strong id="selectedColorName">Black</strong></span>
            <div class="flex gap-2">
                <button class="border-2 border-fkBlue rounded-lg px-3 py-1.5 text-xs font-semibold bg-blue-50/50">Black</button>
                <button class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400">White</button>
                <button class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400">Special Blue</button>
            </div>
        </div>
        <div>
            <span class="text-xs font-bold text-slate-700 block mb-1.5">Storage Variant:</span>
            <div class="flex gap-2">
                <button class="border-2 border-fkBlue rounded-lg px-3 py-1.5 text-xs font-semibold bg-blue-50/50">8 GB + 128 GB</button>
                <button class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400">8 GB + 256 GB</button>
                <button class="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400">12 GB + 256 GB</button>
            </div>
        </div>
    </div>

    <!-- Pincode Delivery Estimator -->
    <div class="p-3 border-b border-slate-100">
        <h3 class="text-xs font-bold text-slate-800 mb-2">Check Delivery Details</h3>
        <div class="flex gap-2">
            <input type="text" id="pdpPincodeInput" value="110016" placeholder="Enter PIN code" 
                   class="flex-1 border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-fkBlue" />
            <button id="pdpCheckPinBtn" class="bg-fkBlue text-white text-xs font-semibold px-4 py-1.5 rounded">Check</button>
        </div>
        <div id="pdpDeliveryResult" class="mt-2 text-xs text-slate-700 space-y-1">
            <p class="text-fkGreen font-medium flex items-center gap-1">
                <i class="fa-solid fa-truck-fast"></i> Delivery by Tomorrow, 9 PM | <span class="font-bold">FREE</span>
            </p>
            <p class="text-slate-600 flex items-center gap-1">
                <i class="fa-solid fa-money-bill-wave text-slate-400"></i> Cash on Delivery available
            </p>
            <p class="text-slate-600 flex items-center gap-1">
                <i class="fa-solid fa-box-open text-slate-400"></i> Open Box Delivery eligible (Verify via OTP before accepting)
            </p>
        </div>
    </div>

    <!-- Seller Information & Rating -->
    <div class="p-3 border-b border-slate-100 flex items-center justify-between">
        <div>
            <p class="text-[11px] text-slate-400">Seller</p>
            <p class="text-xs font-bold text-slate-900">TechGizmo Retailers Pvt Ltd</p>
            <p class="text-[10px] text-slate-500">7 Days Replacement Policy • GST Invoice available</p>
        </div>
        <span class="bg-fkBlue text-white text-xs font-bold px-2 py-0.5 rounded">
            4.7 <i class="fa-solid fa-star text-[9px]"></i>
        </span>
    </div>

    <!-- Customer Reviews & Rating Summary -->
    <div class="p-3 border-b border-slate-100">
        <div class="flex items-center justify-between mb-2">
            <h3 class="text-xs font-bold text-slate-900">Ratings & Reviews</h3>
            <span class="text-xs text-fkBlue font-medium">Rate Product</span>
        </div>
        <div class="space-y-3">
            <div class="border-b border-slate-100 pb-2">
                <div class="flex items-center gap-2">
                    <span class="bg-fkGreen text-white text-[10px] font-bold px-1 rounded">5★</span>
                    <span class="text-xs font-semibold text-slate-800">Mind blowing purchase!</span>
                </div>
                <p class="text-[11px] text-slate-600 mt-1">Display is ultra crisp and battery backup easily lasts 1.5 days. Glyph lights look amazing.</p>
                <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span>Aarav Mehta</span>
                    <span>• Verified Buyer • New Delhi</span>
                </div>
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <span class="bg-fkGreen text-white text-[10px] font-bold px-1 rounded">4★</span>
                    <span class="text-xs font-semibold text-slate-800">Value for money</span>
                </div>
                <p class="text-[11px] text-slate-600 mt-1">Camera performance in daylight is great. Fast charging works well with 45W adapter.</p>
                <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                    <span>Sunita Rao</span>
                    <span>• Verified Buyer • Bengaluru</span>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Sticky Bottom Add to Cart & Buy Now Bar -->
<div class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex h-14 shadow-2xl max-w-md mx-auto sm:max-w-none">
    <button id="addToCartBtn" class="flex-1 bg-white text-fkDark hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-2 border-r border-slate-200 transition-colors">
        <i class="fa-solid fa-cart-plus text-base text-fkOrange"></i> ADD TO CART
    </button>
    <a href="checkout.php" class="flex-1 bg-fkOrange hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors">
        <i class="fa-solid fa-bolt text-base text-fkYellow"></i> BUY NOW
    </a>
</div>

<script>
    function changeImage(url) {
        document.getElementById('mainPdpImage').src = url;
    }

    // 360 Degree View Interactive Toggle
    const toggle360Btn = document.getElementById('toggle360Btn');
    const standardView = document.getElementById('standardImageView');
    const view360 = document.getElementById('view360Container');
    const slider = document.getElementById('rotationSlider');
    const icon = document.getElementById('rotatableModelIcon');

    let is360 = false;
    toggle360Btn.onclick = () => {
        is360 = !is360;
        if (is360) {
            standardView.classList.add('hidden');
            view360.classList.remove('hidden');
            toggle360Btn.innerHTML = '<i class="fa-solid fa-image"></i> Normal View';
        } else {
            standardView.classList.remove('hidden');
            view360.classList.add('hidden');
            toggle360Btn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> 360° View';
        }
    };

    if (slider && icon) {
        slider.oninput = (e) => {
            const deg = e.target.value;
            icon.style.transform = `rotateY(${deg}deg)`;
        };
    }

    // Add to Cart Alert & Badge Update
    document.getElementById('addToCartBtn').onclick = () => {
        const badge = document.getElementById('cartCountBadge');
        if (badge) {
            let count = parseInt(badge.textContent) || 0;
            badge.textContent = count + 1;
        }
        alert('Item added to your Flipkart cart successfully!');
    };

    // Pincode Check
    document.getElementById('pdpCheckPinBtn').onclick = () => {
        const pin = document.getElementById('pdpPincodeInput').value.trim();
        if (pin.length === 6) {
            document.getElementById('pdpDeliveryResult').innerHTML = `
                <p class="text-fkGreen font-medium flex items-center gap-1"><i class="fa-solid fa-truck-fast"></i> Delivery to ${pin} by Tomorrow, 9 PM | <span class="font-bold">FREE</span></p>
                <p class="text-slate-600 flex items-center gap-1"><i class="fa-solid fa-money-bill-wave text-slate-400"></i> Cash on Delivery available</p>
                <p class="text-slate-600 flex items-center gap-1"><i class="fa-solid fa-box-open text-slate-400"></i> Open Box Delivery eligible</p>
            `;
        } else {
            alert('Please enter a valid 6-digit Pincode');
        }
    };
</script>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
</body>
</html>
