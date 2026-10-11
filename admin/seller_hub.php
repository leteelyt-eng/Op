<?php
/**
 * Shopping Mystery - Super Admin Integrated Seller Hub
 * Centralized Vendor Management, Inventory, Ad Bidding & Payouts Console
 */
$admin_page_title = 'Integrated Seller Hub Console';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-store text-amber-500 text-xl"></i>
                <h1 class="text-xl font-bold text-slate-900">Integrated Seller Hub & Merchant Operations</h1>
            </div>
            <p class="text-xs text-slate-500 mt-1">Full vendor administration: KYC verification, catalog inventory, ad campaigns and payout settlements.</p>
        </div>
        <div class="flex gap-2 text-xs">
            <button onclick="alert('Exporting Merchant Performance Report (CSV)...')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-2 rounded-lg border">
                <i class="fa-solid fa-file-csv text-emerald-600 mr-1"></i> Merchant Report
            </button>
            <a href="product.php" class="bg-purple-600 hover:bg-purple-700 text-white font-bold px-3 py-2 rounded-lg shadow">
                <i class="fa-solid fa-plus mr-1"></i> Add Seller Product
            </a>
        </div>
    </div>

    <!-- Seller KPI Strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-xs">
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Total Merchant GMV</span>
            <div class="text-xl font-bold text-slate-900 mt-1">₹4,82,540.00</div>
            <span class="text-[10px] text-emerald-600 font-semibold">+14.2% Growth</span>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Active Sellers</span>
            <div class="text-xl font-bold text-blue-600 mt-1">48 Approved</div>
            <span class="text-[10px] text-amber-600 font-semibold">1 Pending KYC Audit</span>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Active Sponsored Ads</span>
            <div class="text-xl font-bold text-purple-600 mt-1">34 Campaigns</div>
            <span class="text-[10px] text-slate-500">Avg ROAS: 8.4x</span>
        </div>
        <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span class="text-[10px] font-bold text-slate-400 uppercase">Upcoming Payout Settlement</span>
            <div class="text-xl font-bold text-emerald-600 mt-1">₹68,400.00</div>
            <span class="text-[10px] text-slate-500">Scheduled for Tuesday</span>
        </div>
    </div>

    <!-- Integrated Sections Grid -->
    <div class="space-y-6">
        <!-- 1. Active Merchants & KYC Directory -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
            <div class="p-4 border-b flex items-center justify-between">
                <div>
                    <h2 class="font-bold text-sm text-slate-900">Verified Marketplace Vendors</h2>
                    <p class="text-[11px] text-slate-400">Merchant GSTIN certificates, banking details and rating scores</p>
                </div>
                <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">All Verified</span>
            </div>
            <table class="w-full text-left">
                <thead class="bg-slate-50 text-slate-500 uppercase border-b text-[11px]">
                    <tr>
                        <th class="p-3">Merchant Entity</th>
                        <th class="p-3">GSTIN & PAN</th>
                        <th class="p-3">Settlement Bank</th>
                        <th class="p-3">Status</th>
                        <th class="p-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="p-3">
                            <strong class="text-slate-900 block">TechGizmo Retailers Pvt Ltd</strong>
                            <span class="text-[10px] text-slate-500">Ankit Verma • ankit@techgizmo.in</span>
                        </td>
                        <td class="p-3 font-mono text-[11px] text-slate-700">07AAAAA0000A1Z5 / ABCDE1234F</td>
                        <td class="p-3 text-slate-600">HDFC Bank (Acc: ****56789)</td>
                        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Tier 1 Gold</span></td>
                        <td class="p-3 text-right">
                            <button onclick="alert('Viewing TechGizmo full merchant ledger')" class="text-blue-600 hover:underline font-semibold">Ledger</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3">
                            <strong class="text-slate-900 block">Urban Trends Fashion Hub</strong>
                            <span class="text-[10px] text-slate-500">Kavita Roy • kavita@urbantrends.in</span>
                        </td>
                        <td class="p-3 font-mono text-[11px] text-slate-700">27BBBBB1111B2Z6 / FGHIJ5678K</td>
                        <td class="p-3 text-slate-600">ICICI Bank (Acc: ****09876)</td>
                        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Tier 2 Verified</span></td>
                        <td class="p-3 text-right">
                            <button onclick="alert('Viewing Urban Trends full merchant ledger')" class="text-blue-600 hover:underline font-semibold">Ledger</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- 2. Integrated Ad Campaign Oversight & Settlement Cycles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <i class="fa-solid fa-bullhorn text-purple-600"></i> Merchant Sponsored Ad Campaigns
                </h3>
                <div class="border p-2.5 rounded-lg flex justify-between items-center">
                    <div>
                        <strong class="block text-slate-800">Nothing Phone (2a) Bidding</strong>
                        <span class="text-[10px] text-slate-500">Max Bid: ₹8.50/click • 14,200 Impressions</span>
                    </div>
                    <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Active</span>
                </div>
                <div class="border p-2.5 rounded-lg flex justify-between items-center">
                    <div>
                        <strong class="block text-slate-800">Sony WH-1000XM5 Bidding</strong>
                        <span class="text-[10px] text-slate-500">Max Bid: ₹5.00/click • 8,900 Impressions</span>
                    </div>
                    <span class="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">Active</span>
                </div>
            </div>

            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
                <h3 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <i class="fa-solid fa-building-columns text-emerald-600"></i> Payout Settlements & TDS
                </h3>
                <div class="space-y-1.5 text-slate-600">
                    <div class="flex justify-between">
                        <span>Upcoming Cycle Disbursement:</span>
                        <span class="font-bold text-emerald-600">₹68,400.00</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Platform Commission Retained:</span>
                        <span class="font-bold text-blue-600">₹5,410.00</span>
                    </div>
                    <div class="flex justify-between">
                        <span>TDS Section 194-O (1%):</span>
                        <span class="font-bold text-slate-800">₹845.00</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Payment Gateway Status:</span>
                        <span class="text-emerald-700 font-bold">NEFT / RTGS Auto-Disburse ON</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
