<?php
require_once __DIR__ . '/../common/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flipkart Sponsored Ads - Seller Ad Campaigns</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 min-h-screen font-sans">
    <header class="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-3">
            <a href="dashboard.php" class="text-xl font-black italic text-blue-600">Flipkart</a>
            <span class="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">Ad Campaign Manager</span>
        </div>
        <button id="createAdBtn" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <i class="fa-solid fa-plus"></i> Launch Sponsored Ad
        </button>
    </header>

    <main class="max-w-6xl w-full mx-auto p-4 space-y-4">
        <!-- Ad Analytics Strip -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Ad Impressions</span>
                <div class="text-xl font-bold text-slate-900 mt-1">23,100</div>
                <span class="text-[10px] text-emerald-600">+28% top banner placements</span>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Total Clicks</span>
                <div class="text-xl font-bold text-blue-600 mt-1">1,410</div>
                <span class="text-[10px] text-slate-500">Avg CTR: 6.1%</span>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Total Ad Spend</span>
                <div class="text-xl font-bold text-slate-900 mt-1">₹8,460</div>
                <span class="text-[10px] text-slate-500">Avg CPC: ₹6.00</span>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Return on Ad Spend (ROAS)</span>
                <div class="text-xl font-bold text-emerald-600 mt-1">8.4x</div>
                <span class="text-[10px] text-emerald-600 font-medium">₹71,064 generated</span>
            </div>
        </div>

        <!-- Active Campaigns Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-4 border-b">
                <h2 class="text-sm font-bold text-slate-900">Sponsored Product Campaigns</h2>
                <p class="text-xs text-slate-500">Target high-intent shoppers on category and search results pages</p>
            </div>
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                    <tr>
                        <th class="p-3">Product Name</th>
                        <th class="p-3">Bid Per Click</th>
                        <th class="p-3">Impressions</th>
                        <th class="p-3">Clicks</th>
                        <th class="p-3">Campaign Status</th>
                        <th class="p-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="p-3 font-semibold text-slate-900">Nothing Phone (2a) 5G (Black 128GB)</td>
                        <td class="p-3 font-bold text-blue-600">₹8.50</td>
                        <td class="p-3">14,200</td>
                        <td class="p-3">980</td>
                        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Active & Bidding</span></td>
                        <td class="p-3 text-right">
                            <button onclick="alert('Campaign Paused!')" class="text-amber-600 hover:underline font-semibold">Pause</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 font-semibold text-slate-900">Sony WH-1000XM5 ANC Headphones</td>
                        <td class="p-3 font-bold text-blue-600">₹5.00</td>
                        <td class="p-3">8,900</td>
                        <td class="p-3">430</td>
                        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Active & Bidding</span></td>
                        <td class="p-3 text-right">
                            <button onclick="alert('Campaign Paused!')" class="text-amber-600 hover:underline font-semibold">Pause</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>

    <!-- Create Campaign Modal -->
    <div id="adModal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div class="flex items-center justify-between border-b pb-3 mb-4">
                <h3 class="font-bold text-sm text-slate-900">Launch Flipkart Sponsored Campaign</h3>
                <button id="closeAdModal" class="text-slate-400"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form action="ads.php" method="POST" class="space-y-3 text-xs">
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Select Product to Advertise</label>
                    <select class="w-full border rounded p-2">
                        <option>Nothing Phone (2a) 5G</option>
                        <option>Apple iPhone 15</option>
                        <option>Sony WH-1000XM5</option>
                    </select>
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Maximum Bid Amount Per Click (₹)</label>
                    <input type="number" step="0.5" value="6.50" class="w-full border rounded p-2" required />
                    <p class="text-[10px] text-slate-400 mt-1">Recommended competitive bid: ₹5.50 - ₹9.00</p>
                </div>
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Daily Budget Limit (₹)</label>
                    <input type="number" value="1000" class="w-full border rounded p-2" required />
                </div>
                <button type="submit" onclick="alert('Campaign created and sent for review!');" class="w-full bg-blue-600 text-white font-bold py-2.5 rounded mt-2">
                    Start Bidding Campaign
                </button>
            </form>
        </div>
    </div>

    <script>
        const adBtn = document.getElementById('createAdBtn');
        const adModal = document.getElementById('adModal');
        const closeAd = document.getElementById('closeAdModal');
        if (adBtn) adBtn.onclick = () => adModal.classList.remove('hidden');
        if (closeAd) closeAd.onclick = () => adModal.classList.add('hidden');
    </script>
</body>
</html>
