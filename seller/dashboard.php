<?php
require_once __DIR__ . '/../common/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Dashboard - TechGizmo Retailers</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 min-h-screen flex flex-col font-sans">
    <!-- Seller Header -->
    <header class="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-3">
            <span class="text-xl font-black italic text-blue-600">Flipkart</span>
            <span class="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">Seller Hub</span>
            <span class="hidden sm:inline text-xs text-slate-400">|</span>
            <span class="hidden sm:inline text-xs font-bold text-slate-700">TechGizmo Retailers Pvt Ltd (Tier 1 Gold)</span>
        </div>
        <div class="flex items-center gap-4 text-xs">
            <a href="../index.php" class="text-slate-600 hover:text-blue-600"><i class="fa-solid fa-store mr-1"></i> View Store</a>
            <a href="login.php" class="text-red-600 font-medium"><i class="fa-solid fa-power-off mr-1"></i> Logout</a>
        </div>
    </header>

    <!-- Navigation Subbar -->
    <nav class="bg-white border-b px-4 flex gap-6 overflow-x-auto text-xs font-semibold text-slate-600">
        <a href="dashboard.php" class="py-3 text-blue-600 border-b-2 border-blue-600">Dashboard</a>
        <a href="products.php" class="py-3 hover:text-blue-600">Inventory & Listings</a>
        <a href="orders.php" class="py-3 hover:text-blue-600">Order Fulfillment (4)</a>
        <a href="ads.php" class="py-3 hover:text-blue-600">Flipkart Ads (Campaigns)</a>
        <a href="payouts.php" class="py-3 hover:text-blue-600">Payout Settlements</a>
    </nav>

    <main class="max-w-6xl w-full mx-auto p-4 space-y-6">
        <!-- KPI Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Gross Merchandise Value</span>
                <div class="text-xl font-bold text-slate-900 mt-1">₹4,82,540</div>
                <span class="text-[10px] text-emerald-600 font-medium"><i class="fa-solid fa-arrow-trend-up"></i> +14.2% vs last month</span>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Orders to Dispatch</span>
                <div class="text-xl font-bold text-blue-600 mt-1">14 Orders</div>
                <span class="text-[10px] text-amber-600 font-medium"><i class="fa-solid fa-clock"></i> 4 express dispatches</span>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Return Rate (RTO)</span>
                <div class="text-xl font-bold text-slate-900 mt-1">1.8%</div>
                <span class="text-[10px] text-emerald-600 font-medium">Within Flipkart SLA limit (&lt;4%)</span>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Next Payout Cycle</span>
                <div class="text-xl font-bold text-emerald-600 mt-1">₹68,400</div>
                <span class="text-[10px] text-slate-500">Crediting Oct 12 to HDFC Bank</span>
            </div>
        </div>

        <!-- Low Stock Alert Banner -->
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between text-xs">
            <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div>
                    <strong class="text-amber-900 font-bold">2 Listings are Running Low on Stock</strong>
                    <p class="text-[11px] text-amber-700">Sony WH-1000XM5 has only 18 units left. Replenish inventory to avoid listing suspension.</p>
                </div>
            </div>
            <a href="products.php" class="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded shadow text-xs">
                Update Stock
            </a>
        </div>

        <!-- Orders Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-4 border-b flex items-center justify-between">
                <div>
                    <h2 class="text-sm font-bold text-slate-900">Recent Customer Orders</h2>
                    <p class="text-xs text-slate-500">Orders ready for packing and shipping label generation</p>
                </div>
                <a href="orders.php" class="text-xs text-blue-600 font-bold hover:underline">View All Orders</a>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                    <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                        <tr>
                            <th class="p-3">Order ID</th>
                            <th class="p-3">Product Name</th>
                            <th class="p-3">Amount</th>
                            <th class="p-3">Payment</th>
                            <th class="p-3">Fulfillment Status</th>
                            <th class="p-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50/50">
                            <td class="p-3 font-mono font-semibold text-blue-600">OD4298174201</td>
                            <td class="p-3 font-medium text-slate-800">Nothing Phone (2a) 5G (Black 128GB)</td>
                            <td class="p-3 font-bold text-slate-900">₹23,999</td>
                            <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Prepaid UPI</span></td>
                            <td class="p-3"><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">Out for Delivery</span></td>
                            <td class="p-3 text-right">
                                <a href="orders.php" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded font-semibold text-xs">
                                    Manifest
                                </a>
                            </td>
                        </tr>
                        <tr class="hover:bg-slate-50/50">
                            <td class="p-3 font-mono font-semibold text-blue-600">OD4298174203</td>
                            <td class="p-3 font-medium text-slate-800">Apple iPhone 15 (Blue, 128 GB)</td>
                            <td class="p-3 font-bold text-slate-900">₹65,999</td>
                            <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">Prepaid Card</span></td>
                            <td class="p-3"><span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">Pending Packing</span></td>
                            <td class="p-3 text-right">
                                <a href="orders.php" class="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded font-semibold text-xs">
                                    Pack & Ship
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</body>
</html>
