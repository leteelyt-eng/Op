<?php
require_once __DIR__ . '/../common/config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Payouts & Settlement Cycles</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 min-h-screen font-sans">
    <header class="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-3">
            <a href="dashboard.php" class="text-xl font-black italic text-blue-600">Flipkart</a>
            <span class="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">Financials & Settlements</span>
        </div>
        <button onclick="window.print()" class="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded flex items-center gap-1.5">
            <i class="fa-solid fa-download"></i> Download TDS & GST Statement
        </button>
    </header>

    <main class="max-w-6xl w-full mx-auto p-4 space-y-4">
        <!-- Settlement Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Upcoming Settlement (Oct 12)</span>
                <div class="text-2xl font-bold text-emerald-600 mt-1">₹68,400.00</div>
                <p class="text-[10px] text-slate-500 mt-1">Direct Bank NEFT to HDFC Bank ****56789</p>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Total Settled (Lifetime)</span>
                <div class="text-2xl font-bold text-slate-900 mt-1">₹14,92,100.00</div>
                <p class="text-[10px] text-slate-500 mt-1">Across 38 weekly settlement cycles</p>
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span class="text-[11px] font-bold text-slate-400 uppercase">Platform Fees & TDS Deducted</span>
                <div class="text-2xl font-bold text-slate-700 mt-1">₹5,410.00</div>
                <p class="text-[10px] text-slate-500 mt-1">Category Commission: 6.5% • TDS 1% (Section 194-O)</p>
            </div>
        </div>

        <!-- Payout History Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="p-4 border-b">
                <h2 class="text-sm font-bold text-slate-900">Recent Settlement Cycles</h2>
                <p class="text-xs text-slate-500">Every Tuesday automatic payout schedule directly to your verified bank account</p>
            </div>
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                    <tr>
                        <th class="p-3">Cycle Date</th>
                        <th class="p-3">Gross Sales</th>
                        <th class="p-3">Flipkart Fee</th>
                        <th class="p-3">TDS (1%)</th>
                        <th class="p-3">Net Payout</th>
                        <th class="p-3">UTR Reference</th>
                        <th class="p-3 text-right">Invoice</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="p-3 font-semibold text-slate-800">05 Oct 2026</td>
                        <td class="p-3">₹84,500.00</td>
                        <td class="p-3 text-red-600">- ₹5,492.50</td>
                        <td class="p-3 text-red-600">- ₹845.00</td>
                        <td class="p-3 font-bold text-emerald-600">₹78,162.50</td>
                        <td class="p-3 font-mono text-[11px] text-slate-600">HDFCR920261005910</td>
                        <td class="p-3 text-right">
                            <button class="text-blue-600 hover:underline"><i class="fa-solid fa-file-pdf"></i> PDF</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 font-semibold text-slate-800">28 Sep 2026</td>
                        <td class="p-3">₹92,100.00</td>
                        <td class="p-3 text-red-600">- ₹5,986.50</td>
                        <td class="p-3 text-red-600">- ₹921.00</td>
                        <td class="p-3 font-bold text-emerald-600">₹85,192.50</td>
                        <td class="p-3 font-mono text-[11px] text-slate-600">HDFCR920260928421</td>
                        <td class="p-3 text-right">
                            <button class="text-blue-600 hover:underline"><i class="fa-solid fa-file-pdf"></i> PDF</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</body>
</html>
