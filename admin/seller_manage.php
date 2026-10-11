<?php
$admin_page_title = 'Seller KYC Verification & Governance';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Seller Onboarding & KYC Governance</h1>
            <p class="text-xs text-slate-500 mt-1">Review legal business certificates (GSTIN, PAN) and verify escrow settlement accounts.</p>
        </div>
        <div class="flex gap-2 text-xs">
            <span class="bg-blue-100 text-blue-800 font-bold px-3 py-1.5 rounded-lg">2 Approved</span>
            <span class="bg-amber-100 text-amber-800 font-bold px-3 py-1.5 rounded-lg">1 Pending Audit</span>
        </div>
    </div>

    <!-- Seller KYC Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                    <th class="p-3">Business Entity</th>
                    <th class="p-3">GSTIN Number</th>
                    <th class="p-3">PAN Number</th>
                    <th class="p-3">Bank Settlement Account</th>
                    <th class="p-3">KYC Status</th>
                    <th class="p-3 text-right">Verification Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="p-3">
                        <span class="font-bold text-slate-900 block">TechGizmo Retailers Pvt Ltd</span>
                        <span class="text-[10px] text-slate-500">Contact: Ankit Verma (ankit@techgizmo.in)</span>
                    </td>
                    <td class="p-3 font-mono font-semibold text-slate-700">07AAAAA0000A1Z5</td>
                    <td class="p-3 font-mono font-semibold text-slate-700">ABCDE1234F</td>
                    <td class="p-3 text-slate-600">HDFC Bank (Acc: ****56789)</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">KYC Approved</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button onclick="alert('Seller suspended from listing products!')" class="text-red-500 hover:underline">Suspend</button>
                    </td>
                </tr>
                <tr>
                    <td class="p-3">
                        <span class="font-bold text-slate-900 block">Urban Trends Fashion Hub</span>
                        <span class="text-[10px] text-slate-500">Contact: Kavita Roy (kavita@urbantrends.in)</span>
                    </td>
                    <td class="p-3 font-mono font-semibold text-slate-700">27BBBBB1111B2Z6</td>
                    <td class="p-3 font-mono font-semibold text-slate-700">FGHIJ5678K</td>
                    <td class="p-3 text-slate-600">ICICI Bank (Acc: ****09876)</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">KYC Approved</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button onclick="alert('Seller suspended from listing products!')" class="text-red-500 hover:underline">Suspend</button>
                    </td>
                </tr>
                <tr>
                    <td class="p-3">
                        <span class="font-bold text-slate-900 block">Apex Electronics LLP</span>
                        <span class="text-[10px] text-slate-500">Contact: Rohit Sen (rohit@apexelectronics.in)</span>
                    </td>
                    <td class="p-3 font-mono font-semibold text-slate-700">06CCCCC2222C3Z7</td>
                    <td class="p-3 font-mono font-semibold text-slate-700">JKLMN9012P</td>
                    <td class="p-3 text-slate-600">Axis Bank (Acc: ****11223)</td>
                    <td class="p-3"><span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">Pending Documents</span></td>
                    <td class="p-3 text-right space-x-2">
                        <button onclick="alert('Seller KYC Approved and Account Activated!')" class="bg-blue-600 text-white px-2.5 py-1 rounded font-bold">Approve KYC</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
