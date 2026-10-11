<?php
$admin_page_title = 'Order Detail Audit #OD4298174201';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div>
            <div class="flex items-center gap-2">
                <a href="order.php" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-arrow-left"></i></a>
                <h1 class="text-xl font-bold text-slate-900">Order Deep Dive: OD4298174201</h1>
            </div>
            <p class="text-xs text-slate-500 mt-1">Full transaction ledger, 3PL courier telemetry and buyer-seller escrow breakdown.</p>
        </div>
        <button onclick="window.print()" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            <i class="fa-solid fa-print mr-1"></i> Print Tax Audit
        </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Order Summary -->
        <div class="lg:col-span-2 space-y-4">
            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                <h3 class="font-bold text-xs text-slate-800 uppercase border-b pb-2">Purchased Items</h3>
                <div class="flex gap-4">
                    <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&q=80" class="w-16 h-16 object-contain rounded border p-1" />
                    <div class="flex-1 text-xs">
                        <h4 class="font-bold text-slate-900">Nothing Phone (2a) 5G (Black, 128 GB)</h4>
                        <p class="text-slate-500 mt-0.5">SKU: NOTH-2A-128-BLK • HSN: 85171300 (18% GST)</p>
                        <div class="flex justify-between items-baseline mt-2">
                            <span>Quantity: 1</span>
                            <span class="font-bold text-slate-900 text-sm">₹23,999.00</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Escrow & Fee Breakdown -->
            <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
                <h3 class="font-bold text-slate-800 uppercase border-b pb-2">Financial Breakdown & Escrow</h3>
                <div class="space-y-1.5 text-slate-600">
                    <div class="flex justify-between">
                        <span>Customer Gross Payment</span>
                        <span class="font-bold text-slate-900">₹23,999.00</span>
                    </div>
                    <div class="flex justify-between text-blue-600">
                        <span>Flipkart Marketplace Fee (6.5%)</span>
                        <span>₹1,559.94</span>
                    </div>
                    <div class="flex justify-between text-slate-600">
                        <span>TDS Section 194-O (1%)</span>
                        <span>₹239.99</span>
                    </div>
                    <div class="flex justify-between text-slate-600">
                        <span>Logistics Fulfillment (Ekart Surface)</span>
                        <span>₹120.00</span>
                    </div>
                    <div class="border-t pt-2 flex justify-between font-bold text-emerald-600 text-sm">
                        <span>Net Payable to Seller (Settlement on Tuesday)</span>
                        <span>₹22,079.07</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Side: Logistics & Parties -->
        <div class="space-y-4">
            <!-- Customer Card -->
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-xs">
                <span class="text-[10px] text-slate-400 font-bold uppercase block mb-1">Customer Details</span>
                <p class="font-bold text-slate-900">Rahul Sharma</p>
                <p class="text-slate-500">Phone: 9876543210</p>
                <p class="text-slate-500">Email: rahul.sharma@example.com</p>
                <p class="text-slate-700 mt-2">Flat 402, Lotus Heights, Sector 62, Noida, UP - 201301</p>
            </div>

            <!-- Driver & OTP -->
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm text-xs">
                <span class="text-[10px] text-slate-400 font-bold uppercase block mb-1">Delivery Execution</span>
                <p class="font-bold text-slate-900">Vikram Singh (DL 4S CZ 9021)</p>
                <p class="text-slate-500">Carrier: Ekart Hyperlocal</p>
                <div class="mt-3 bg-slate-50 p-2.5 rounded-lg border text-center">
                    <span class="text-[10px] text-slate-400 uppercase font-bold block">Open Box Delivery OTP</span>
                    <span class="font-mono font-bold text-lg text-blue-600 tracking-widest">4921</span>
                </div>
            </div>
        </div>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
