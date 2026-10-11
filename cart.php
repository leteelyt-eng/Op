<?php
$page_title = 'Flipkart - Shopping Cart';
require_once __DIR__ . '/common/header.php';
?>

<!-- Deliver to Address Bar -->
<div class="bg-white p-3 border-b border-slate-200 flex items-center justify-between text-xs">
    <div>
        <p class="text-slate-500">Deliver to: <span class="font-bold text-slate-800">Rahul Sharma, 110016</span></p>
        <p class="text-[11px] text-slate-400 truncate">Flat 402, Lotus Heights, New Delhi</p>
    </div>
    <button class="text-fkBlue font-semibold border border-fkBlue/30 px-3 py-1 rounded">Change</button>
</div>

<!-- Cart Items -->
<div class="divide-y divide-slate-100 bg-white my-2">
    <!-- Item 1 -->
    <div class="p-3">
        <div class="flex gap-3">
            <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80" alt="Nothing Phone" class="w-20 h-20 object-contain p-1 rounded bg-slate-50" />
            <div class="flex-1">
                <h3 class="text-xs font-semibold text-slate-900 line-clamp-1">Nothing Phone (2a) 5G (Black, 128 GB)</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">Seller: TechGizmo Retailers</p>
                <div class="flex items-baseline gap-2 mt-1.5">
                    <span class="text-sm font-bold text-slate-900">₹23,999</span>
                    <span class="text-xs text-slate-400 line-through">₹25,999</span>
                    <span class="text-xs text-fkGreen font-semibold">8% off</span>
                </div>
                <p class="text-[11px] text-fkGreen font-medium mt-1">Delivery by Tomorrow | Free</p>
            </div>
        </div>
        <!-- Actions: Quantity Control & Remove -->
        <div class="flex items-center justify-between border-t border-slate-50 mt-3 pt-2 text-xs">
            <div class="flex items-center border border-slate-200 rounded">
                <button class="px-2.5 py-0.5 text-slate-600 hover:bg-slate-100 font-bold">-</button>
                <span class="px-3 py-0.5 border-x border-slate-200 font-semibold text-slate-800">1</span>
                <button class="px-2.5 py-0.5 text-slate-600 hover:bg-slate-100 font-bold">+</button>
            </div>
            <div class="flex items-center gap-4 text-slate-600 font-medium">
                <button class="hover:text-fkBlue">Save for later</button>
                <button class="hover:text-red-600">Remove</button>
            </div>
        </div>
    </div>

    <!-- Item 2 -->
    <div class="p-3">
        <div class="flex gap-3">
            <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80" alt="Casual Shirt" class="w-20 h-20 object-contain p-1 rounded bg-slate-50" />
            <div class="flex-1">
                <h3 class="text-xs font-semibold text-slate-900 line-clamp-1">Highlander Men Casual Shirt (M)</h3>
                <p class="text-[11px] text-slate-400 mt-0.5">Seller: Urban Trends</p>
                <div class="flex items-baseline gap-2 mt-1.5">
                    <span class="text-sm font-bold text-slate-900">₹899</span>
                    <span class="text-xs text-slate-400 line-through">₹2,499</span>
                    <span class="text-xs text-fkGreen font-semibold">64% off</span>
                </div>
                <p class="text-[11px] text-fkGreen font-medium mt-1">Delivery by Tomorrow | Free</p>
            </div>
        </div>
        <div class="flex items-center justify-between border-t border-slate-50 mt-3 pt-2 text-xs">
            <div class="flex items-center border border-slate-200 rounded">
                <button class="px-2.5 py-0.5 text-slate-600 hover:bg-slate-100 font-bold">-</button>
                <span class="px-3 py-0.5 border-x border-slate-200 font-semibold text-slate-800">1</span>
                <button class="px-2.5 py-0.5 text-slate-600 hover:bg-slate-100 font-bold">+</button>
            </div>
            <div class="flex items-center gap-4 text-slate-600 font-medium">
                <button class="hover:text-fkBlue">Save for later</button>
                <button class="hover:text-red-600">Remove</button>
            </div>
        </div>
    </div>
</div>

<!-- SuperCoin loyalty redemption banner -->
<div class="bg-amber-50 border border-amber-200 rounded-lg mx-2 my-3 p-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
        <i class="fa-solid fa-coins text-amber-500 text-base"></i>
        <div>
            <p class="text-xs font-bold text-slate-800">Use 50 SuperCoins</p>
            <p class="text-[10px] text-slate-500">Save ₹50 on this order</p>
        </div>
    </div>
    <input type="checkbox" checked class="w-4 h-4 accent-amber-500 rounded" />
</div>

<!-- Price Details Breakdown Card -->
<div class="bg-white p-4 my-2 border-y border-slate-200 text-xs">
    <h3 class="font-bold text-slate-800 uppercase text-[11px] border-b pb-2 mb-3">Price Details (2 Items)</h3>
    <div class="space-y-2.5 text-slate-600">
        <div class="flex justify-between">
            <span>Total MRP</span>
            <span>₹28,498</span>
        </div>
        <div class="flex justify-between text-fkGreen">
            <span>Discount on MRP</span>
            <span>- ₹3,600</span>
        </div>
        <div class="flex justify-between text-fkGreen">
            <span>SuperCoins Discount</span>
            <span>- ₹50</span>
        </div>
        <div class="flex justify-between">
            <span>Delivery Fee</span>
            <span class="text-fkGreen"><span class="line-through text-slate-400">₹80</span> FREE</span>
        </div>
        <div class="flex justify-between">
            <span>Secured Packaging Fee</span>
            <span>₹49</span>
        </div>
        <div class="border-t pt-2.5 flex justify-between font-bold text-sm text-slate-900">
            <span>Total Amount</span>
            <span>₹24,897</span>
        </div>
    </div>
    <p class="text-fkGreen font-medium text-[11px] mt-3">You will save ₹3,650 on this order</p>
</div>

<!-- Sticky Bottom Place Order Bar -->
<div class="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center justify-between px-4 h-14 shadow-2xl max-w-md mx-auto sm:max-w-none">
    <div>
        <span class="text-xs text-slate-400 line-through">₹28,498</span>
        <div class="text-base font-bold text-slate-900 leading-none">₹24,897</div>
    </div>
    <a href="checkout.php" class="bg-fkOrange hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded shadow">
        PLACE ORDER
    </a>
</div>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
</body>
</html>
