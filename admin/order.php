<?php
$admin_page_title = 'Orders & Fulfillment Lifecycle';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Orders & Fulfillment Lifecycle</h1>
            <p class="text-xs text-slate-500 mt-1">Track orders across all vendors, 3PL logistic carriers and delivery fleet statuses.</p>
        </div>
        <div class="flex gap-2 text-xs">
            <button class="bg-blue-600 text-white font-bold px-3 py-1.5 rounded-lg">All Orders (48,210)</button>
            <button class="bg-white border text-slate-700 px-3 py-1.5 rounded-lg">Out for Delivery (14)</button>
            <button class="bg-white border text-slate-700 px-3 py-1.5 rounded-lg">Returns / RTO (3)</button>
        </div>
    </div>

    <!-- Orders Master Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                    <th class="p-3">Order ID</th>
                    <th class="p-3">Customer Info</th>
                    <th class="p-3">Seller Entity</th>
                    <th class="p-3">Assigned Fleet</th>
                    <th class="p-3">Amount</th>
                    <th class="p-3">Order Status</th>
                    <th class="p-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="p-3 font-mono font-bold text-blue-600">OD4298174201</td>
                    <td class="p-3">
                        <span class="font-bold text-slate-900 block">Rahul Sharma</span>
                        <span class="text-[10px] text-slate-400">Noida 201301 • Phone: 9876543210</span>
                    </td>
                    <td class="p-3 text-slate-700 font-medium">TechGizmo Retailers</td>
                    <td class="p-3 text-slate-600">Vikram Singh (DL 4S CZ 9021)</td>
                    <td class="p-3 font-bold text-slate-900">₹23,999.00</td>
                    <td class="p-3"><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-[10px]">Out for Delivery</span></td>
                    <td class="p-3 text-right">
                        <a href="order_detail.php?id=1" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded font-semibold text-xs">
                            Audit Details
                        </a>
                    </td>
                </tr>
                <tr>
                    <td class="p-3 font-mono font-bold text-blue-600">OD4298174202</td>
                    <td class="p-3">
                        <span class="font-bold text-slate-900 block">Priya Patel</span>
                        <span class="text-[10px] text-slate-400">New Delhi 110016 • Phone: 9812345678</span>
                    </td>
                    <td class="p-3 text-slate-700 font-medium">Urban Trends Fashion</td>
                    <td class="p-3 text-slate-600">Amit Kumar (DL 3C AB 4455)</td>
                    <td class="p-3 font-bold text-slate-900">₹899.00</td>
                    <td class="p-3"><span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold text-[10px]">In Transit</span></td>
                    <td class="p-3 text-right">
                        <a href="order_detail.php?id=2" class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded font-semibold text-xs">
                            Audit Details
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
