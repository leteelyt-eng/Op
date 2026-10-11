<?php
$admin_page_title = 'Executive Dashboard';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Executive Platform Dashboard</h1>
            <p class="text-xs text-slate-500 mt-1">Real-time marketplace health, GMV analytics, order lifecycle and partner metrics.</p>
        </div>
        <div class="flex items-center gap-3">
            <span class="text-xs text-slate-500 bg-white border px-3 py-1.5 rounded-lg shadow-sm">
                <i class="fa-solid fa-clock text-slate-400 mr-1"></i> Oct 09, 2026 (Live Engine)
            </span>
            <a href="seller_manage.php" class="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2">
                <i class="fa-solid fa-user-check"></i> Pending KYC (2)
            </a>
        </div>
    </div>

    <!-- Executive KPI Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase">Monthly GMV</span>
                <span class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm"><i class="fa-solid fa-indian-rupee-sign"></i></span>
            </div>
            <div class="text-2xl font-bold text-slate-900 mt-2">₹1,84,92,300</div>
            <p class="text-[11px] text-emerald-600 font-medium mt-1"><i class="fa-solid fa-arrow-trend-up"></i> +18.4% YoY Growth</p>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase">Orders Processed</span>
                <span class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm"><i class="fa-solid fa-box-open"></i></span>
            </div>
            <div class="text-2xl font-bold text-slate-900 mt-2">48,210</div>
            <p class="text-[11px] text-slate-500 mt-1">98.4% Delivered within SLA</p>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase">Active Sellers</span>
                <span class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-sm"><i class="fa-solid fa-store"></i></span>
            </div>
            <div class="text-2xl font-bold text-slate-900 mt-2">1,240</div>
            <p class="text-[11px] text-amber-600 font-medium mt-1">2 verification pending</p>
        </div>

        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-400 uppercase">Active Riders (Fleet)</span>
                <span class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm"><i class="fa-solid fa-motorcycle"></i></span>
            </div>
            <div class="text-2xl font-bold text-slate-900 mt-2">485</div>
            <p class="text-[11px] text-slate-500 mt-1">Ekart & 3PL Combined</p>
        </div>
    </div>

    <!-- Quick Navigation Hub -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <a href="category.php" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 transition-colors shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg"><i class="fa-solid fa-sitemap"></i></div>
            <div>
                <strong class="text-xs text-slate-900 block font-bold">Categories</strong>
                <span class="text-[10px] text-slate-500">6 root, 42 sub-nodes</span>
            </div>
        </a>
        <a href="product.php" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-amber-400 transition-colors shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-lg"><i class="fa-solid fa-clipboard-check"></i></div>
            <div>
                <strong class="text-xs text-slate-900 block font-bold">Catalog QC</strong>
                <span class="text-[10px] text-slate-500">Review seller listings</span>
            </div>
        </a>
        <a href="seller_manage.php" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-orange-400 transition-colors shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-lg"><i class="fa-solid fa-building-circle-check"></i></div>
            <div>
                <strong class="text-xs text-slate-900 block font-bold">Seller KYC</strong>
                <span class="text-[10px] text-slate-500">GSTIN / Bank audit</span>
            </div>
        </a>
        <a href="logistics.php" class="bg-white p-4 rounded-xl border border-slate-200 hover:border-rose-400 transition-colors shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-lg"><i class="fa-solid fa-percent"></i></div>
            <div>
                <strong class="text-xs text-slate-900 block font-bold">Commissions</strong>
                <span class="text-[10px] text-slate-500">3PL APIs & Tax Rules</span>
            </div>
        </a>
    </div>

    <!-- Recent Platform Activity Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-4 border-b flex items-center justify-between">
            <h2 class="text-sm font-bold text-slate-900">Recent Live Transactions</h2>
            <a href="order.php" class="text-xs text-blue-600 font-bold hover:underline">View All Orders</a>
        </div>
        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                    <th class="p-3">Order Number</th>
                    <th class="p-3">Customer</th>
                    <th class="p-3">Seller Entity</th>
                    <th class="p-3">Amount</th>
                    <th class="p-3">Method</th>
                    <th class="p-3">Status</th>
                    <th class="p-3 text-right">Inspect</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="p-3 font-mono font-bold text-blue-600">OD4298174201</td>
                    <td class="p-3 font-medium text-slate-900">Rahul Sharma (Noida)</td>
                    <td class="p-3 text-slate-600">TechGizmo Retailers</td>
                    <td class="p-3 font-bold text-slate-900">₹23,999.00</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Prepaid UPI</span></td>
                    <td class="p-3"><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-[10px]">Out for Delivery</span></td>
                    <td class="p-3 text-right">
                        <a href="order_detail.php?id=1" class="text-blue-600 hover:underline font-semibold">View Detail</a>
                    </td>
                </tr>
                <tr>
                    <td class="p-3 font-mono font-bold text-blue-600">OD4298174202</td>
                    <td class="p-3 font-medium text-slate-900">Priya Patel (Delhi)</td>
                    <td class="p-3 text-slate-600">Urban Trends Fashion</td>
                    <td class="p-3 font-bold text-slate-900">₹899.00</td>
                    <td class="p-3"><span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">Cash on Delivery</span></td>
                    <td class="p-3"><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold text-[10px]">In Transit</span></td>
                    <td class="p-3 text-right">
                        <a href="order_detail.php?id=2" class="text-blue-600 hover:underline font-semibold">View Detail</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
