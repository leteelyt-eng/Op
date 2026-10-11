<?php
require_once __DIR__ . '/config.php';
requireDriverAuth();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Delivery Partner - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col max-w-md mx-auto font-sans pb-16">
    <!-- Top Bar -->
    <header class="bg-slate-900 border-b border-slate-800 p-3 sticky top-0 z-40">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white text-sm">
                    <i class="fa-solid fa-helmet-safety"></i>
                </div>
                <div>
                    <h1 class="text-xs font-bold text-white"><?php echo htmlspecialchars($_SESSION['driver_name']); ?></h1>
                    <p class="text-[10px] text-slate-400 font-mono"><?php echo htmlspecialchars($_SESSION['vehicle_no']); ?></p>
                </div>
            </div>
            <span class="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> ONLINE
            </span>
        </div>
    </header>

    <!-- Main Content -->
    <main class="p-3 space-y-3 flex-1 overflow-y-auto">
        <!-- Shift Summary KPI -->
        <div class="grid grid-cols-3 gap-2">
            <div class="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span class="text-[10px] text-slate-400 block uppercase">Assigned</span>
                <span class="text-lg font-black text-white">3</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span class="text-[10px] text-slate-400 block uppercase">Delivered</span>
                <span class="text-lg font-black text-emerald-400">8</span>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-center">
                <span class="text-[10px] text-slate-400 block uppercase">COD Cash</span>
                <span class="text-lg font-black text-amber-400">₹24,898</span>
            </div>
        </div>

        <!-- Active Delivery Card -->
        <div class="bg-slate-900 border border-slate-700 rounded-2xl p-4 shadow-lg space-y-2.5">
            <div class="flex justify-between items-start">
                <span class="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded font-black font-mono">
                    COD: ₹23,999
                </span>
                <span class="text-[10px] text-sky-400 font-mono">1.4 km • 8 min</span>
            </div>

            <div>
                <h3 class="text-sm font-bold text-white">Rahul Sharma</h3>
                <p class="text-xs text-slate-300">Flat 402, Lotus Heights, Sector 62, Noida</p>
                <p class="text-[10px] text-slate-400">Order #OD4298174201 • Nothing Phone (2a) 5G</p>
            </div>

            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <a href="navigation.php" class="bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1.5 shadow">
                    <i class="fa-solid fa-location-arrow"></i> GPS Nav
                </a>
                <a href="pod_verification.php" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl text-center flex items-center justify-center gap-1.5 shadow">
                    <i class="fa-solid fa-circle-check"></i> Deliver & OTP
                </a>
            </div>
        </div>

        <!-- Pending Order List Link -->
        <a href="assigned_orders.php" class="block bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-between">
            <span>View Full Run Sheet (3 Orders)</span>
            <i class="fa-solid fa-chevron-right text-slate-500"></i>
        </a>
    </main>

    <!-- Bottom Nav -->
    <nav class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900 border-t border-slate-800 flex items-center justify-around py-2 text-[10px]">
        <a href="dashboard.php" class="text-sky-400 flex flex-col items-center font-bold">
            <i class="fa-solid fa-gauge text-base"></i>
            <span>Dashboard</span>
        </a>
        <a href="assigned_orders.php" class="text-slate-400 flex flex-col items-center">
            <i class="fa-solid fa-box-open text-base"></i>
            <span>Orders</span>
        </a>
        <a href="navigation.php" class="text-slate-400 flex flex-col items-center">
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
