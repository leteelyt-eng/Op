<?php
require_once __DIR__ . '/config.php';
requireDriverAuth();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>GPS Turn-by-Turn - Delivery Partner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col max-w-md mx-auto font-sans pb-16">
    <!-- Top Nav Header -->
    <header class="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between sticky top-0 z-40">
        <a href="dashboard.php" class="text-xs text-slate-300 flex items-center gap-1.5 font-bold">
            <i class="fa-solid fa-arrow-left"></i> Live Route Guidance
        </a>
        <span class="text-[10px] bg-sky-950 text-sky-400 border border-sky-800 px-2 py-0.5 rounded font-mono">
            GPS LOCKED
        </span>
    </header>

    <main class="p-3 space-y-3 flex-1 overflow-y-auto">
        <!-- Turn Guidance Banner -->
        <div class="bg-gradient-to-r from-sky-950 to-indigo-950 border border-sky-500/40 rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-3" style="display: flex; align-items: center; gap: 0.75rem;">
                <div class="w-12 h-12 rounded-2xl bg-sky-500 text-slate-950 flex items-center justify-center text-xl font-black shrink-0">
                    <i class="fa-solid fa-arrow-turn-right"></i>
                </div>
                <div>
                    <span class="text-[10px] text-sky-400 font-mono uppercase tracking-wider block">In 200 meters</span>
                    <h2 class="text-sm font-bold text-white leading-tight">Turn right at Mother Dairy Marg junction</h2>
                </div>
            </div>
        </div>

        <!-- Simulated Route Map Canvas -->
        <div class="relative bg-slate-900 border border-slate-800 rounded-2xl h-64 overflow-hidden flex flex-col justify-between p-3">
            <div class="flex justify-between items-start z-10">
                <div class="bg-slate-950/80 px-2.5 py-1 rounded-lg text-xs font-mono text-sky-400 border border-slate-800">
                    Speed: 28 km/h
                </div>
                <div class="bg-slate-950/80 px-2.5 py-1 rounded-lg text-xs font-mono text-emerald-400 border border-slate-800">
                    ETA: 8 min (1.4 km)
                </div>
            </div>

            <!-- SVG Route -->
            <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 40 210 Q 120 180 160 120 T 320 60" fill="none" stroke="#0284c7" stroke-width="6" stroke-linecap="round" stroke-dasharray="8 4" />
                <circle cx="320" cy="60" r="10" fill="#ef4444" />
                <circle cx="160" cy="120" r="12" fill="#38bdf8" opacity="0.4" />
                <circle cx="160" cy="120" r="7" fill="#0284c7" />
            </svg>

            <!-- Bottom Destination Bar -->
            <div class="relative z-10 bg-slate-950/90 border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-xs">
                <div class="truncate mr-2">
                    <strong class="text-white block truncate">Rahul Sharma</strong>
                    <span class="text-[10px] text-slate-400 block truncate">Flat 402, Lotus Heights</span>
                </div>
                <a href="pod_verification.php" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg shrink-0">
                    Arrived at Door
                </a>
            </div>
        </div>

        <!-- Call & Actions -->
        <div class="grid grid-cols-2 gap-2">
            <a href="tel:9876543210" class="bg-slate-900 border border-slate-700 py-2.5 rounded-xl text-center text-xs font-bold text-white flex items-center justify-center gap-1.5">
                <i class="fa-solid fa-phone text-sky-400"></i> Call Customer
            </a>
            <a href="pod_verification.php" class="bg-emerald-600 py-2.5 rounded-xl text-center text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow">
                <i class="fa-solid fa-signature"></i> Open POD Form
            </a>
        </div>
    </main>

    <!-- Bottom Nav -->
    <nav class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900 border-t border-slate-800 flex items-center justify-around py-2 text-[10px]">
        <a href="dashboard.php" class="text-slate-400 flex flex-col items-center">
            <i class="fa-solid fa-gauge text-base"></i>
            <span>Dashboard</span>
        </a>
        <a href="assigned_orders.php" class="text-slate-400 flex flex-col items-center">
            <i class="fa-solid fa-box-open text-base"></i>
            <span>Orders</span>
        </a>
        <a href="navigation.php" class="text-sky-400 flex flex-col items-center font-bold">
            <i class="fa-solid fa-map text-base"></i>
            <span>Route</span>
        </a>
        <a href="pod_verification.php" class="text-slate-400 flex flex-col items-center">
            <i class="fa-solid fa-signature text-base"></i>
            <span>POD</span>
        </a>
    </nav>
</body>
</html>
