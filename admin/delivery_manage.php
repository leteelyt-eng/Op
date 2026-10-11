<?php
$admin_page_title = 'Delivery Fleet & Logistics Partners';
require_once __DIR__ . '/common/header.php';
require_once __DIR__ . '/common/sidebar.php';
?>

<main class="flex-1 p-6 md:p-8 overflow-y-auto">
    <div class="flex items-center justify-between mb-6">
        <div>
            <h1 class="text-xl font-bold text-slate-900">Ekart & 3PL Rider Fleet Management</h1>
            <p class="text-xs text-slate-500 mt-1">Monitor delivery partner duty shifts, vehicle registrations, and real-time GPS telemetry.</p>
        </div>
        <button onclick="alert('Add Rider Modal')" class="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow">
            <i class="fa-solid fa-plus mr-1"></i> Register New Rider
        </button>
    </div>

    <!-- Fleet Table -->
    <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                <tr>
                    <th class="p-3">Rider Name</th>
                    <th class="p-3">Phone</th>
                    <th class="p-3">Vehicle Plate & Type</th>
                    <th class="p-3">Live Status</th>
                    <th class="p-3">Rating</th>
                    <th class="p-3">Current Territory</th>
                    <th class="p-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                <tr>
                    <td class="p-3 font-bold text-slate-900">Vikram Singh</td>
                    <td class="p-3 text-slate-600">9123456780</td>
                    <td class="p-3 font-mono font-semibold text-slate-800">DL 4S CZ 9021 (Bike)</td>
                    <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">On Active Run</span></td>
                    <td class="p-3 font-semibold text-amber-600">★ 4.90</td>
                    <td class="p-3 text-slate-500">Noida Sector 62</td>
                    <td class="p-3 text-right">
                        <button onclick="alert('Viewing GPS Coordinates: 28.5355, 77.3910')" class="text-blue-600 hover:underline font-semibold">Track GPS</button>
                    </td>
                </tr>
                <tr>
                    <td class="p-3 font-bold text-slate-900">Amit Kumar</td>
                    <td class="p-3 text-slate-600">9198765432</td>
                    <td class="p-3 font-mono font-semibold text-slate-800">DL 3C AB 4455 (Scooter)</td>
                    <td class="p-3"><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold text-[10px]">On Active Run</span></td>
                    <td class="p-3 font-semibold text-amber-600">★ 4.75</td>
                    <td class="p-3 text-slate-500">South Delhi Hub</td>
                    <td class="p-3 text-right">
                        <button onclick="alert('Viewing GPS Coordinates: 28.4595, 77.0266')" class="text-blue-600 hover:underline font-semibold">Track GPS</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</main>

<?php require_once __DIR__ . '/common/bottom.php'; ?>
