<?php
$page_title = 'Flipkart Online Shopping App - Best Deals';
require_once __DIR__ . '/common/header.php';
?>

<!-- Categories Horizontal Scroll -->
<section class="bg-white py-3 border-b border-slate-200">
    <div class="flex items-center gap-4 overflow-x-auto px-3 hide-scrollbar text-center">
        <a href="product.php?cat=1" class="flex flex-col items-center shrink-0 w-16 group">
            <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-mobile-screen-button text-fkBlue text-lg"></i>
            </div>
            <span class="text-[11px] font-medium text-slate-800 mt-1 truncate w-full">Mobiles</span>
        </a>
        <a href="product.php?cat=2" class="flex flex-col items-center shrink-0 w-16 group">
            <div class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-laptop text-emerald-600 text-lg"></i>
            </div>
            <span class="text-[11px] font-medium text-slate-800 mt-1 truncate w-full">Electronics</span>
        </a>
        <a href="product.php?cat=3" class="flex flex-col items-center shrink-0 w-16 group">
            <div class="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-shirt text-pink-600 text-lg"></i>
            </div>
            <span class="text-[11px] font-medium text-slate-800 mt-1 truncate w-full">Fashion</span>
        </a>
        <a href="product.php?cat=4" class="flex flex-col items-center shrink-0 w-16 group">
            <div class="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-tv text-amber-600 text-lg"></i>
            </div>
            <span class="text-[11px] font-medium text-slate-800 mt-1 truncate w-full">Appliances</span>
        </a>
        <a href="product.php?cat=5" class="flex flex-col items-center shrink-0 w-16 group">
            <div class="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-couch text-purple-600 text-lg"></i>
            </div>
            <span class="text-[11px] font-medium text-slate-800 mt-1 truncate w-full">Home</span>
        </a>
        <a href="product.php?cat=6" class="flex flex-col items-center shrink-0 w-16 group">
            <div class="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                <i class="fa-solid fa-basket-shopping text-teal-600 text-lg"></i>
            </div>
            <span class="text-[11px] font-medium text-slate-800 mt-1 truncate w-full">Grocery</span>
        </a>
    </div>
</section>

<!-- Promotional Carousel Banner -->
<section class="my-2 px-2">
    <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white shadow-md">
        <div class="p-4 sm:p-6 flex items-center justify-between">
            <div class="max-w-[65%]">
                <span class="bg-fkYellow text-fkDark text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Big Billion Day Special</span>
                <h2 class="text-lg sm:text-2xl font-black mt-1 leading-tight">Flagship 5G Smartphones</h2>
                <p class="text-xs text-blue-100 mt-1">Starting from ₹19,999* | Up to 12 Months No Cost EMI</p>
                <a href="product.php?cat=1" class="inline-block mt-3 bg-white text-fkBlue text-xs font-bold px-4 py-1.5 rounded shadow hover:bg-slate-100">
                    Grab Offer <i class="fa-solid fa-arrow-right text-[10px] ml-1"></i>
                </a>
            </div>
            <div class="w-24 h-24 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
                <i class="fa-solid fa-mobile-screen text-6xl sm:text-7xl text-fkYellow/90 drop-shadow-lg"></i>
            </div>
        </div>
    </div>
</section>

<!-- SuperCoin Rewards & Flash Alert Strip -->
<div class="mx-2 mb-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-2.5 text-white flex items-center justify-between shadow-sm">
    <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-white text-amber-500 flex items-center justify-center font-bold text-xs shadow-inner">
            <i class="fa-solid fa-coins"></i>
        </div>
        <div>
            <p class="text-xs font-bold leading-none">SuperCoin Zone</p>
            <p class="text-[10px] text-amber-100">Earn 4 coins per ₹100 spent on all orders</p>
        </div>
    </div>
    <a href="product.php" class="text-[11px] font-bold bg-white text-amber-700 px-2.5 py-1 rounded shadow hover:bg-amber-50">
        Redeem
    </a>
</div>

<!-- Deal of the Day with Countdown -->
<section class="bg-white my-2 p-3 shadow-sm">
    <div class="flex items-center justify-between border-b pb-2 mb-3">
        <div>
            <div class="flex items-center gap-2">
                <h3 class="text-sm font-bold text-slate-900">Deals of the Day</h3>
                <span class="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-semibold flex items-center gap-1">
                    <i class="fa-solid fa-clock text-[9px]"></i> <span id="countdownTimer">16h 42m left</span>
                </span>
            </div>
            <p class="text-[11px] text-slate-500">Unbeatable prices on bestselling tech</p>
        </div>
        <a href="product.php" class="bg-fkBlue text-white text-xs font-semibold px-3 py-1 rounded">View All</a>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <!-- Item 1 -->
        <a href="product_detail.php?id=1" class="border border-slate-100 rounded-lg p-2.5 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div class="relative overflow-hidden rounded bg-slate-50 aspect-square flex items-center justify-center p-2 mb-2">
                <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80" alt="Nothing Phone" class="max-h-full object-contain group-hover:scale-105 transition-transform" />
                <span class="absolute top-1 left-1 bg-fkGreen text-white text-[9px] font-bold px-1 rounded">8% OFF</span>
            </div>
            <div>
                <h4 class="text-xs font-semibold text-slate-800 line-clamp-1">Nothing Phone (2a) 5G</h4>
                <div class="flex items-center gap-1.5 mt-1">
                    <span class="text-xs font-bold text-slate-900">₹23,999</span>
                    <span class="text-[10px] text-slate-400 line-through">₹25,999</span>
                </div>
                <div class="flex items-center gap-1 mt-1 text-[10px] text-fkGreen font-medium">
                    <i class="fa-solid fa-shield-check"></i> Assured
                </div>
            </div>
        </a>

        <!-- Item 2 -->
        <a href="product_detail.php?id=3" class="border border-slate-100 rounded-lg p-2.5 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div class="relative overflow-hidden rounded bg-slate-50 aspect-square flex items-center justify-center p-2 mb-2">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" alt="Sony Headphones" class="max-h-full object-contain group-hover:scale-105 transition-transform" />
                <span class="absolute top-1 left-1 bg-fkGreen text-white text-[9px] font-bold px-1 rounded">23% OFF</span>
            </div>
            <div>
                <h4 class="text-xs font-semibold text-slate-800 line-clamp-1">Sony WH-1000XM5 ANC</h4>
                <div class="flex items-center gap-1.5 mt-1">
                    <span class="text-xs font-bold text-slate-900">₹26,990</span>
                    <span class="text-[10px] text-slate-400 line-through">₹34,990</span>
                </div>
                <div class="flex items-center gap-1 mt-1 text-[10px] text-fkGreen font-medium">
                    <i class="fa-solid fa-shield-check"></i> Assured
                </div>
            </div>
        </a>

        <!-- Item 3 -->
        <a href="product_detail.php?id=4" class="border border-slate-100 rounded-lg p-2.5 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div class="relative overflow-hidden rounded bg-slate-50 aspect-square flex items-center justify-center p-2 mb-2">
                <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80" alt="Casual Shirt" class="max-h-full object-contain group-hover:scale-105 transition-transform" />
                <span class="absolute top-1 left-1 bg-fkGreen text-white text-[9px] font-bold px-1 rounded">64% OFF</span>
            </div>
            <div>
                <h4 class="text-xs font-semibold text-slate-800 line-clamp-1">Men Slim Fit Casual Shirt</h4>
                <div class="flex items-center gap-1.5 mt-1">
                    <span class="text-xs font-bold text-slate-900">₹899</span>
                    <span class="text-[10px] text-slate-400 line-through">₹2,499</span>
                </div>
                <div class="flex items-center gap-1 mt-1 text-[10px] text-fkGreen font-medium">
                    <i class="fa-solid fa-shield-check"></i> Assured
                </div>
            </div>
        </a>

        <!-- Item 4 -->
        <a href="product_detail.php?id=6" class="border border-slate-100 rounded-lg p-2.5 flex flex-col justify-between hover:shadow-md transition-shadow group">
            <div class="relative overflow-hidden rounded bg-slate-50 aspect-square flex items-center justify-center p-2 mb-2">
                <img src="https://images.unsplash.com/photo-1580481077113-e4d3db2694ec?w=400&q=80" alt="Office Chair" class="max-h-full object-contain group-hover:scale-105 transition-transform" />
                <span class="absolute top-1 left-1 bg-fkGreen text-white text-[9px] font-bold px-1 rounded">50% OFF</span>
            </div>
            <div>
                <h4 class="text-xs font-semibold text-slate-800 line-clamp-1">Ergonomic High Back Chair</h4>
                <div class="flex items-center gap-1.5 mt-1">
                    <span class="text-xs font-bold text-slate-900">₹7,499</span>
                    <span class="text-[10px] text-slate-400 line-through">₹14,999</span>
                </div>
                <div class="flex items-center gap-1 mt-1 text-[10px] text-fkGreen font-medium">
                    <i class="fa-solid fa-shield-check"></i> Assured
                </div>
            </div>
        </a>
    </div>
</section>

<!-- Sponsored Products / Seller Ads Banner -->
<section class="bg-white my-2 p-3 shadow-sm">
    <div class="flex items-center justify-between mb-2">
        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sponsored Brands & Products</span>
        <span class="text-[10px] text-slate-400">Ad</span>
    </div>
    <div class="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
        <div class="shrink-0 w-44 border border-blue-100 rounded-lg p-2 bg-blue-50/30">
            <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80" alt="Apple iPhone" class="h-28 w-full object-contain rounded mb-1" />
            <p class="text-xs font-bold text-slate-900 truncate">iPhone 15 (Blue 128GB)</p>
            <p class="text-[11px] text-fkBlue font-semibold">₹65,999 <span class="text-slate-400 line-through text-[9px]">₹79,900</span></p>
            <a href="product_detail.php?id=2" class="block text-center mt-2 bg-fkBlue text-white text-[11px] py-1 rounded font-medium">Shop Now</a>
        </div>
        <div class="shrink-0 w-44 border border-blue-100 rounded-lg p-2 bg-blue-50/30">
            <img src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=300&q=80" alt="Washing Machine" class="h-28 w-full object-contain rounded mb-1" />
            <p class="text-xs font-bold text-slate-900 truncate">LG 8 Kg Smart Inverter</p>
            <p class="text-[11px] text-fkBlue font-semibold">₹34,990 <span class="text-slate-400 line-through text-[9px]">₹48,990</span></p>
            <a href="product_detail.php?id=5" class="block text-center mt-2 bg-fkBlue text-white text-[11px] py-1 rounded font-medium">Shop Now</a>
        </div>
    </div>
</section>

<!-- Portal Fast Switch Banners -->
<section class="mx-2 my-3 grid grid-cols-2 gap-2 text-center text-xs">
    <a href="admin/seller_hub.php" class="bg-amber-50 border border-amber-200 rounded-lg p-2.5 hover:bg-amber-100">
        <i class="fa-solid fa-store text-fkOrange text-lg mb-1 block"></i>
        <span class="font-bold text-slate-800 text-[11px] block">Integrated Seller Hub</span>
        <span class="text-[9px] text-slate-500">Merchant listings, ads & payouts</span>
    </a>
    <a href="admin/index.php" class="bg-purple-50 border border-purple-200 rounded-lg p-2.5 hover:bg-purple-100">
        <i class="fa-solid fa-user-shield text-purple-600 text-lg mb-1 block"></i>
        <span class="font-bold text-slate-800 text-[11px] block">Dedicated Admin Panel</span>
        <span class="text-[9px] text-slate-500">Executive metrics & MySQL console</span>
    </a>
</section>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
<?php require_once __DIR__ . '/common/bottom.php'; ?>
