<?php
$admin_page_title = 'Marketing, Banners & CMS Settings';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="mb-6">
        <h1 class="text-xl font-bold text-slate-900">Marketing & CMS Governance</h1>
        <p class="text-xs text-slate-500 mt-1">Schedule Big Billion Day banners, flash sales, coupon vouchers and SuperCoins loyalty reward ratios.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        <!-- Banner Carousel Manager -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-panorama text-blue-600"></i> Homepage Promotional Banners
            </h2>
            <div class="space-y-3">
                <div class="flex items-center justify-between p-2.5 border rounded-lg">
                    <div>
                        <strong class="text-slate-800 block">Big Billion Day 5G Flagships</strong>
                        <span class="text-[11px] text-slate-500">Linked to: /product.php?cat=1</span>
                    </div>
                    <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                </div>
                <div class="flex items-center justify-between p-2.5 border rounded-lg">
                    <div>
                        <strong class="text-slate-800 block">Electronics Mega Sale (Up to 70% Off)</strong>
                        <span class="text-[11px] text-slate-500">Linked to: /product.php?cat=2</span>
                    </div>
                    <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
                </div>
            </div>
            <button onclick="alert('Add Banner Modal')" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-lg">
                <i class="fa-solid fa-plus mr-1"></i> Add Promotional Slide
            </button>
        </div>

        <!-- SuperCoins & Flash Sale Configuration -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-coins text-amber-500"></i> SuperCoin Loyalty Engine
            </h2>
            <form action="setting.php" method="POST" class="space-y-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">SuperCoins Earned Per ₹100 Spent</label>
                    <input type="number" value="4" class="w-full border rounded p-2" />
                    <span class="text-slate-400 text-[11px]">Flipkart Plus members earn 4 coins (max 100 coins per order)</span>
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">SuperCoin Redemption Value</label>
                    <input type="text" value="1 SuperCoin = ₹1.00 Discount" class="w-full border rounded p-2 bg-slate-50" readonly />
                </div>
                <button type="button" onclick="alert('SuperCoins engine updated!')" class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-lg shadow">
                    Save Loyalty Rules
                </button>
            </form>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
