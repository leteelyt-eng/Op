<?php
$admin_page_title = '3PL Logistics APIs & Tax Commission Engine';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="mb-6">
        <h1 class="text-xl font-bold text-slate-900">3PL API Integrations & Tax Rules</h1>
        <p class="text-xs text-slate-500 mt-1">Connect courier aggregators (Delhivery, Shiprocket, Ekart) and define platform commission rules.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 3PL Integration Config Card -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <h2 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-satellite-dish text-blue-600"></i> Carrier API Integrations
            </h2>

            <div class="space-y-3">
                <div class="border rounded-lg p-3">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-slate-800">Ekart Hyperlocal & Express</span>
                        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Connected</span>
                    </div>
                    <label class="block text-slate-500 text-[11px] mb-1">API Endpoint</label>
                    <input type="text" value="https://api.ekartlogistics.com/v2/shipments" class="w-full border rounded p-1.5 font-mono text-[11px] bg-slate-50" readonly />
                </div>

                <div class="border rounded-lg p-3">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-slate-800">Delhivery Express B2C</span>
                        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Connected</span>
                    </div>
                    <label class="block text-slate-500 text-[11px] mb-1">Client Token</label>
                    <input type="password" value="delhivery_live_sec_99182301" class="w-full border rounded p-1.5 font-mono text-[11px] bg-slate-50" readonly />
                </div>

                <div class="border rounded-lg p-3">
                    <div class="flex items-center justify-between mb-2">
                        <span class="font-bold text-slate-800">Shiprocket API</span>
                        <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">Standby Fallback</span>
                    </div>
                    <label class="block text-slate-500 text-[11px] mb-1">API Email / Token</label>
                    <input type="text" value="ops@flipkart-sellerhub.in" class="w-full border rounded p-1.5 font-mono text-[11px] bg-slate-50" readonly />
                </div>
            </div>
        </div>

        <!-- Commission & Tax Engine -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <h2 class="font-bold text-sm text-slate-900 flex items-center gap-2">
                <i class="fa-solid fa-file-invoice-dollar text-emerald-600"></i> Commission & Tax Engine
            </h2>

            <form action="logistics.php" method="POST" class="space-y-3">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">E-Commerce TDS Rate (Section 194-O)</label>
                    <div class="flex items-center gap-2">
                        <input type="text" value="1.00%" class="w-24 border rounded p-2 font-bold" />
                        <span class="text-slate-500 text-[11px]">Deducted automatically from gross seller payouts</span>
                    </div>
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">GST on Flipkart Marketplace Commission</label>
                    <div class="flex items-center gap-2">
                        <input type="text" value="18.00%" class="w-24 border rounded p-2 font-bold" />
                        <span class="text-slate-500 text-[11px]">Applied to platform fees (CGST 9% + SGST 9%)</span>
                    </div>
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Default Base Courier Fee</label>
                    <input type="text" value="₹40.00 base + ₹10 per 500g" class="w-full border rounded p-2" />
                </div>

                <button type="button" onclick="alert('Tax & Commission engine settings saved!')" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg shadow text-xs">
                    Save Commission & Tax Settings
                </button>
            </form>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
