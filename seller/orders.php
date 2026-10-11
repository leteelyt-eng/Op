<?php
require_once __DIR__ . '/../common/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Orders & Fulfillment Workflow</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 min-h-screen font-sans">
    <header class="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-3">
            <a href="dashboard.php" class="text-xl font-black italic text-blue-600">Flipkart</a>
            <span class="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">Order Fulfillment Hub</span>
        </div>
        <button onclick="window.print()" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
            <i class="fa-solid fa-print"></i> Print Courier Manifest
        </button>
    </header>

    <main class="max-w-6xl w-full mx-auto p-4 space-y-4">
        <!-- Fulfillment Stage Tabs -->
        <div class="flex gap-2 border-b border-slate-200 text-xs font-semibold pb-2">
            <button class="bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow">Pending Dispatch (2)</button>
            <button class="text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg">Ready for Handover (1)</button>
            <button class="text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg">In Transit (8)</button>
            <button class="text-slate-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg">Delivered (142)</button>
        </div>

        <!-- Orders Cards -->
        <div class="space-y-3">
            <!-- Order 1 -->
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="font-mono font-bold text-blue-600 text-sm">#OD4298174201</span>
                        <span class="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Prepaid UPI</span>
                        <span class="text-[11px] text-slate-400">• Oct 8, 11:24 AM</span>
                    </div>
                    <h3 class="text-xs font-bold text-slate-800">Nothing Phone (2a) 5G (Black, 128 GB)</h3>
                    <p class="text-[11px] text-slate-500 mt-0.5">Customer: Rahul Sharma, Sector 62, Noida, 201301</p>
                    <p class="text-[11px] text-slate-700 font-semibold mt-1">Item Value: ₹23,999 • Ekart Tracking: FMPC98234190</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="alert('Shipping Label Generated & Ready to Print!')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg">
                        <i class="fa-solid fa-barcode mr-1"></i> Print Label
                    </button>
                    <button onclick="alert('Tax Invoice Generated!')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg">
                        <i class="fa-solid fa-file-invoice mr-1"></i> Invoice
                    </button>
                    <button onclick="alert('Order marked Handed Over to Ekart Courier!')" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow">
                        Handover Courier
                    </button>
                </div>
            </div>

            <!-- Order 2 -->
            <div class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="font-mono font-bold text-blue-600 text-sm">#OD4298174203</span>
                        <span class="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">Cash on Delivery</span>
                        <span class="text-[11px] text-slate-400">• Oct 9, 09:12 AM</span>
                    </div>
                    <h3 class="text-xs font-bold text-slate-800">Apple iPhone 15 (Blue, 128 GB)</h3>
                    <p class="text-[11px] text-slate-500 mt-0.5">Customer: Priya Patel, Green Park, New Delhi, 110016</p>
                    <p class="text-[11px] text-slate-700 font-semibold mt-1">Item Value: ₹65,999 • SLA Target: Dispatch within 4 hours</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="alert('Packing slip generated!')" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg">
                        <i class="fa-solid fa-box mr-1"></i> Pack Item
                    </button>
                    <button onclick="alert('Order accepted & dispatched!')" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow">
                        Accept & Pack
                    </button>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
