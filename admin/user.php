<?php
$admin_page_title = 'Customer Directory & Accounts';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Customer Accounts & Wallets</h1>
            <p class="text-xs text-slate-500 mt-1">Manage registered buyers, order histories and SuperCoin loyalty points.</p>
        </div>
        <div class="relative w-64 text-xs">
            <input type="text" placeholder="Search phone or email..." class="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500" />
        </div>
    </div>

    <!-- Customer Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                    <th class="p-3">Customer Name</th>
                    <th class="p-3">Phone</th>
                    <th class="p-3">Email ID</th>
                    <th class="p-3">SuperCoins</th>
                    <th class="p-3">Orders Count</th>
                    <th class="p-3">Status</th>
                    <th class="p-3 text-right">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="p-3 font-bold text-slate-900">Rahul Sharma</td>
                    <td class="p-3 text-slate-600">9876543210</td>
                    <td class="p-3 text-slate-600">rahul.sharma@example.com</td>
                    <td class="p-3 font-semibold text-amber-600"><i class="fa-solid fa-coins mr-1"></i> 120 Coins</td>
                    <td class="p-3 font-semibold text-blue-600">14 orders</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Active</span></td>
                    <td class="p-3 text-right">
                        <button onclick="alert('Viewing customer audit')" class="text-blue-600 hover:underline font-semibold">Inspect</button>
                    </td>
                </tr>
                <tr>
                    <td class="p-3 font-bold text-slate-900">Priya Patel</td>
                    <td class="p-3 text-slate-600">9812345678</td>
                    <td class="p-3 text-slate-600">priya.patel@example.com</td>
                    <td class="p-3 font-semibold text-amber-600"><i class="fa-solid fa-coins mr-1"></i> 45 Coins</td>
                    <td class="p-3 font-semibold text-blue-600">3 orders</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Active</span></td>
                    <td class="p-3 text-right">
                        <button onclick="alert('Viewing customer audit')" class="text-blue-600 hover:underline font-semibold">Inspect</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
