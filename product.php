<?php
$page_title = 'Products Catalog - Flipkart';
require_once __DIR__ . '/common/header.php';

$cat_id = isset($_GET['cat']) ? (int)$_GET['cat'] : 0;
$query = isset($_GET['q']) ? htmlspecialchars($_GET['q']) : '';
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'popular';
?>

<div class="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between text-xs">
    <div class="flex items-center gap-2">
        <span class="text-slate-500">Showing 6 items</span>
        <?php if (!empty($query)): ?>
            <span class="font-semibold text-slate-900">for "<?php echo $query; ?>"</span>
        <?php endif; ?>
    </div>
    <div class="flex items-center gap-3">
        <!-- Filter Modal Trigger -->
        <button id="openFilterBtn" class="flex items-center gap-1 font-semibold text-fkBlue border border-fkBlue/30 px-2.5 py-1 rounded">
            <i class="fa-solid fa-filter text-[11px]"></i> Filter
        </button>
        <!-- Sort Dropdown -->
        <select id="sortSelect" class="border border-slate-200 rounded px-2 py-1 text-xs focus:outline-none focus:border-fkBlue">
            <option value="popular">Popularity</option>
            <option value="price_asc">Price -- Low to High</option>
            <option value="price_desc">Price -- High to Low</option>
            <option value="rating">Customer Rating</option>
            <option value="newest">Newest First</option>
        </select>
    </div>
</div>

<!-- Product Listing Container -->
<div class="divide-y divide-slate-100 bg-white">
    <!-- Item 1 -->
    <div class="p-3 flex gap-3 hover:bg-slate-50/50 transition-colors">
        <a href="product_detail.php?id=1" class="w-28 h-28 shrink-0 bg-slate-50 rounded p-1 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80" alt="Nothing Phone" class="max-h-full object-contain" />
        </a>
        <div class="flex-1">
            <div class="flex items-start justify-between">
                <a href="product_detail.php?id=1" class="text-xs font-semibold text-slate-900 line-clamp-2 hover:text-fkBlue">
                    Nothing Phone (2a) 5G (Black, 128 GB)
                </a>
                <button class="text-slate-300 hover:text-red-500 text-sm ml-2"><i class="fa-solid fa-heart"></i></button>
            </div>
            <div class="flex items-center gap-2 mt-1">
                <span class="bg-fkGreen text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    4.4 <i class="fa-solid fa-star text-[8px]"></i>
                </span>
                <span class="text-[11px] text-slate-400">(1,420 ratings)</span>
                <span class="text-[10px] text-fkGreen font-medium flex items-center gap-0.5">
                    <i class="fa-solid fa-circle-check"></i> Assured
                </span>
            </div>
            <div class="flex items-baseline gap-2 mt-2">
                <span class="text-sm font-bold text-slate-900">₹23,999</span>
                <span class="text-xs text-slate-400 line-through">₹25,999</span>
                <span class="text-xs text-fkGreen font-semibold">8% off</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">Free delivery by Tomorrow, 9 PM</p>
        </div>
    </div>

    <!-- Item 2 -->
    <div class="p-3 flex gap-3 hover:bg-slate-50/50 transition-colors">
        <a href="product_detail.php?id=2" class="w-28 h-28 shrink-0 bg-slate-50 rounded p-1 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=300&q=80" alt="iPhone 15" class="max-h-full object-contain" />
        </a>
        <div class="flex-1">
            <div class="flex items-start justify-between">
                <a href="product_detail.php?id=2" class="text-xs font-semibold text-slate-900 line-clamp-2 hover:text-fkBlue">
                    Apple iPhone 15 (Blue, 128 GB)
                </a>
                <button class="text-red-500 text-sm ml-2"><i class="fa-solid fa-heart"></i></button>
            </div>
            <div class="flex items-center gap-2 mt-1">
                <span class="bg-fkGreen text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    4.7 <i class="fa-solid fa-star text-[8px]"></i>
                </span>
                <span class="text-[11px] text-slate-400">(8,950 ratings)</span>
                <span class="text-[10px] text-fkGreen font-medium flex items-center gap-0.5">
                    <i class="fa-solid fa-circle-check"></i> Assured
                </span>
            </div>
            <div class="flex items-baseline gap-2 mt-2">
                <span class="text-sm font-bold text-slate-900">₹65,999</span>
                <span class="text-xs text-slate-400 line-through">₹79,900</span>
                <span class="text-xs text-fkGreen font-semibold">17% off</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">Bank Offer: ₹4,000 off on HDFC Cards</p>
        </div>
    </div>

    <!-- Item 3 -->
    <div class="p-3 flex gap-3 hover:bg-slate-50/50 transition-colors">
        <a href="product_detail.php?id=3" class="w-28 h-28 shrink-0 bg-slate-50 rounded p-1 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" alt="Sony Headphones" class="max-h-full object-contain" />
        </a>
        <div class="flex-1">
            <div class="flex items-start justify-between">
                <a href="product_detail.php?id=3" class="text-xs font-semibold text-slate-900 line-clamp-2 hover:text-fkBlue">
                    Sony WH-1000XM5 Wireless Noise Cancelling Headphones
                </a>
                <button class="text-slate-300 hover:text-red-500 text-sm ml-2"><i class="fa-solid fa-heart"></i></button>
            </div>
            <div class="flex items-center gap-2 mt-1">
                <span class="bg-fkGreen text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    4.6 <i class="fa-solid fa-star text-[8px]"></i>
                </span>
                <span class="text-[11px] text-slate-400">(2,410 ratings)</span>
            </div>
            <div class="flex items-baseline gap-2 mt-2">
                <span class="text-sm font-bold text-slate-900">₹26,990</span>
                <span class="text-xs text-slate-400 line-through">₹34,990</span>
                <span class="text-xs text-fkGreen font-semibold">23% off</span>
            </div>
            <p class="text-[11px] text-slate-500 mt-0.5">SuperCoin Price: ₹25,990 + 1000 Coins</p>
        </div>
    </div>

    <!-- Item 4 -->
    <div class="p-3 flex gap-3 hover:bg-slate-50/50 transition-colors">
        <a href="product_detail.php?id=4" class="w-28 h-28 shrink-0 bg-slate-50 rounded p-1 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&q=80" alt="Shirt" class="max-h-full object-contain" />
        </a>
        <div class="flex-1">
            <div class="flex items-start justify-between">
                <a href="product_detail.php?id=4" class="text-xs font-semibold text-slate-900 line-clamp-2 hover:text-fkBlue">
                    Highlander Men Slim Fit Solid Casual Cotton Shirt
                </a>
                <button class="text-slate-300 hover:text-red-500 text-sm ml-2"><i class="fa-solid fa-heart"></i></button>
            </div>
            <div class="flex items-center gap-2 mt-1">
                <span class="bg-fkGreen text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    4.1 <i class="fa-solid fa-star text-[8px]"></i>
                </span>
                <span class="text-[11px] text-slate-400">(840 ratings)</span>
            </div>
            <div class="flex items-baseline gap-2 mt-2">
                <span class="text-sm font-bold text-slate-900">₹899</span>
                <span class="text-xs text-slate-400 line-through">₹2,499</span>
                <span class="text-xs text-fkGreen font-semibold">64% off</span>
            </div>
            <p class="text-[11px] text-emerald-600 mt-0.5">Special Price ends in 2 hrs</p>
        </div>
    </div>
</div>

<!-- Filter Slide Modal -->
<div id="filterModal" class="fixed inset-0 bg-black/60 z-50 hidden flex justify-end">
    <div class="bg-white w-5/6 max-w-sm h-full flex flex-col justify-between p-4 shadow-2xl">
        <div>
            <div class="flex items-center justify-between border-b pb-3 mb-4">
                <h3 class="font-bold text-sm text-slate-900">Filters</h3>
                <button id="closeFilterBtn" class="text-slate-400 text-sm"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <!-- Filter Options -->
            <div class="space-y-4 text-xs">
                <div>
                    <label class="font-bold text-slate-700 block mb-1">Price Range</label>
                    <div class="flex items-center gap-2">
                        <input type="number" placeholder="Min" class="w-1/2 border rounded p-1.5 text-xs" value="0" />
                        <span class="text-slate-400">to</span>
                        <input type="number" placeholder="Max" class="w-1/2 border rounded p-1.5 text-xs" value="50000" />
                    </div>
                </div>
                <div>
                    <label class="font-bold text-slate-700 block mb-1">Customer Ratings</label>
                    <label class="flex items-center gap-2 py-0.5"><input type="checkbox" checked /> 4★ & above</label>
                    <label class="flex items-center gap-2 py-0.5"><input type="checkbox" /> 3★ & above</label>
                </div>
                <div>
                    <label class="font-bold text-slate-700 block mb-1">Discount</label>
                    <label class="flex items-center gap-2 py-0.5"><input type="checkbox" /> 50% or more</label>
                    <label class="flex items-center gap-2 py-0.5"><input type="checkbox" /> 30% or more</label>
                </div>
                <div>
                    <label class="font-bold text-slate-700 block mb-1">Availability</label>
                    <label class="flex items-center gap-2"><input type="checkbox" checked /> Include Out of Stock</label>
                </div>
            </div>
        </div>
        <div class="pt-4 border-t flex gap-2">
            <button id="clearFiltersBtn" class="w-1/2 border border-slate-300 text-slate-700 text-xs py-2 rounded">Clear All</button>
            <button id="applyFiltersBtn" class="w-1/2 bg-fkBlue text-white text-xs font-semibold py-2 rounded">Apply</button>
        </div>
    </div>
</div>

<script>
    const filterBtn = document.getElementById('openFilterBtn');
    const filterModal = document.getElementById('filterModal');
    const closeFilterBtn = document.getElementById('closeFilterBtn');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');

    if (filterBtn) filterBtn.onclick = () => filterModal.classList.remove('hidden');
    if (closeFilterBtn) closeFilterBtn.onclick = () => filterModal.classList.add('hidden');
    if (applyFiltersBtn) applyFiltersBtn.onclick = () => filterModal.classList.add('hidden');
</script>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
<?php require_once __DIR__ . '/common/bottom.php'; ?>
