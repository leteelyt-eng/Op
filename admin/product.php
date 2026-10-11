<?php
$admin_page_title = 'Catalog Quality Control & Listing Approvals';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Catalog QC & Listing Approvals</h1>
            <p class="text-xs text-slate-500 mt-1">Review merchant product listings for trademark compliance, high-resolution imagery and accurate MRP.</p>
        </div>
        <div class="flex gap-2 text-xs">
            <span class="bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-lg">1 Pending Review</span>
            <span class="bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg">6 Approved</span>
        </div>
    </div>

    <!-- Product QC Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                    <th class="p-3">Product Name & Thumbnail</th>
                    <th class="p-3">Seller Name</th>
                    <th class="p-3">Category</th>
                    <th class="p-3">Price / MRP</th>
                    <th class="p-3">QC Status</th>
                    <th class="p-3 text-right">Review Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="p-3 flex items-center gap-3">
                        <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&q=80" class="w-10 h-10 object-contain rounded border" />
                        <div>
                            <span class="font-bold text-slate-900 block">Nothing Phone (2a) 5G (Black 128GB)</span>
                            <span class="text-[10px] text-slate-400">Dimensity 7200 Pro • Glyph Interface</span>
                        </div>
                    </td>
                    <td class="p-3 text-slate-700 font-medium">TechGizmo Retailers</td>
                    <td class="p-3 text-slate-600">Mobiles</td>
                    <td class="p-3 font-semibold text-slate-900">₹23,999 / ₹25,999</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Approved (Flipkart Assured)</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button onclick="alert('QC Approved Verified!')" class="text-emerald-600 hover:underline font-bold">Re-check</button>
                    </td>
                </tr>
                <tr>
                    <td class="p-3 flex items-center gap-3">
                        <img src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&q=80" class="w-10 h-10 object-contain rounded border" />
                        <div>
                            <span class="font-bold text-slate-900 block">Highlander Men Slim Fit Casual Shirt</span>
                            <span class="text-[10px] text-slate-400">100% Cotton • Size M</span>
                        </div>
                    </td>
                    <td class="p-3 text-slate-700 font-medium">Urban Trends Hub</td>
                    <td class="p-3 text-slate-600">Fashion</td>
                    <td class="p-3 font-semibold text-slate-900">₹899 / ₹2,499</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Approved</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button onclick="alert('Listing suspended due to QC copyright check.')" class="text-red-500 hover:underline">Suspend</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
