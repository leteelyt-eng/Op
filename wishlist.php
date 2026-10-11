<?php
$page_title = 'My Wishlist (3) - Flipkart';
require_once __DIR__ . '/common/header.php';
?>

<div class="bg-white border-b border-slate-200 px-3 py-2.5 flex items-center justify-between">
    <h2 class="text-xs font-bold text-slate-800 uppercase">My Wishlist (3 Items)</h2>
    <span class="text-[11px] text-slate-500">Price Drop Alerts: <strong class="text-fkGreen">ON</strong></span>
</div>

<div class="divide-y divide-slate-100 bg-white">
    <!-- Wishlist Item 1 -->
    <div class="p-3 flex gap-3">
        <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80" alt="Apple iPhone 15" class="w-20 h-20 object-contain p-1 rounded bg-slate-50 shrink-0" />
        <div class="flex-1">
            <div class="flex items-start justify-between">
                <h3 class="text-xs font-semibold text-slate-900 line-clamp-1">Apple iPhone 15 (Blue, 128 GB)</h3>
                <button class="text-slate-400 hover:text-red-500 text-xs"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="flex items-baseline gap-2 mt-1">
                <span class="text-sm font-bold text-slate-900">₹65,999</span>
                <span class="text-xs text-slate-400 line-through">₹79,900</span>
                <span class="text-xs text-fkGreen font-semibold">17% off</span>
            </div>
            <!-- Price Drop Alert Notification Tag -->
            <p class="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                <i class="fa-solid fa-arrow-trend-down"></i> Price dropped by ₹2,000 recently!
            </p>
            <div class="mt-2.5 flex gap-2">
                <button onclick="window.location.href='cart.php'" class="bg-fkBlue text-white text-xs font-semibold px-4 py-1.5 rounded hover:bg-blue-700">
                    <i class="fa-solid fa-cart-shopping mr-1"></i> Move to Cart
                </button>
            </div>
        </div>
    </div>

    <!-- Wishlist Item 2 -->
    <div class="p-3 flex gap-3">
        <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" alt="Sony Headphones" class="w-20 h-20 object-contain p-1 rounded bg-slate-50 shrink-0" />
        <div class="flex-1">
            <div class="flex items-start justify-between">
                <h3 class="text-xs font-semibold text-slate-900 line-clamp-1">Sony WH-1000XM5 Active Noise Cancelling</h3>
                <button class="text-slate-400 hover:text-red-500 text-xs"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="flex items-baseline gap-2 mt-1">
                <span class="text-sm font-bold text-slate-900">₹26,990</span>
                <span class="text-xs text-slate-400 line-through">₹34,990</span>
                <span class="text-xs text-fkGreen font-semibold">23% off</span>
            </div>
            <p class="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-block mt-1">
                Only 2 units left in stock
            </p>
            <div class="mt-2.5 flex gap-2">
                <button onclick="window.location.href='cart.php'" class="bg-fkBlue text-white text-xs font-semibold px-4 py-1.5 rounded hover:bg-blue-700">
                    <i class="fa-solid fa-cart-shopping mr-1"></i> Move to Cart
                </button>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
<?php require_once __DIR__ . '/common/bottom.php'; ?>
