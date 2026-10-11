<?php
$admin_page_title = 'Category Tree Manager';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Category Hierarchy & Commissions</h1>
            <p class="text-xs text-slate-500 mt-1">Configure root departments, nested taxonomy and marketplace take-rates.</p>
        </div>
        <button id="addCatBtn" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow flex items-center gap-2">
            <i class="fa-solid fa-plus"></i> Add New Category
        </button>
    </div>

    <!-- Categories List Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                    <th class="p-3">Department Name</th>
                    <th class="p-3">Slug</th>
                    <th class="p-3">Marketplace Take-Rate</th>
                    <th class="p-3">Active SKU Count</th>
                    <th class="p-3">Status</th>
                    <th class="p-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="p-3 font-semibold text-slate-900 flex items-center gap-2">
                        <i class="fa-solid fa-mobile-screen text-blue-600"></i> Mobiles & Tablets
                    </td>
                    <td class="p-3 font-mono text-slate-500">mobiles</td>
                    <td class="p-3 font-bold text-slate-900">6.50%</td>
                    <td class="p-3 text-slate-600">142 products</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Active</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button class="text-blue-600 hover:underline">Edit</button>
                        <button class="text-red-500 hover:underline">Disable</button>
                    </td>
                </tr>
                <tr>
                    <td class="p-3 font-semibold text-slate-900 flex items-center gap-2">
                        <i class="fa-solid fa-laptop text-emerald-600"></i> Electronics
                    </td>
                    <td class="p-3 font-mono text-slate-500">electronics</td>
                    <td class="p-3 font-bold text-slate-900">8.00%</td>
                    <td class="p-3 text-slate-600">320 products</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Active</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button class="text-blue-600 hover:underline">Edit</button>
                        <button class="text-red-500 hover:underline">Disable</button>
                    </td>
                </tr>
                <tr>
                    <td class="p-3 font-semibold text-slate-900 flex items-center gap-2">
                        <i class="fa-solid fa-shirt text-pink-600"></i> Fashion & Apparel
                    </td>
                    <td class="p-3 font-mono text-slate-500">fashion</td>
                    <td class="p-3 font-bold text-slate-900">12.00%</td>
                    <td class="p-3 text-slate-600">890 products</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Active</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button class="text-blue-600 hover:underline">Edit</button>
                        <button class="text-red-500 hover:underline">Disable</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
