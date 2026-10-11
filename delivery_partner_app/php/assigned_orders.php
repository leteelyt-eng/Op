<?php
require_once __DIR__ . '/config.php';
requireDriverAuth();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Assigned Run Sheet - Delivery Partner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col max-w-md mx-auto font-sans pb-16">
    <header class="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between sticky top-0 z-40">
        <a href="dashboard.php" class="text-xs text-slate-300 flex items-center gap-1.5 font-bold">
            <i class="fa-solid fa-arrow-left"></i> Run Sheet (3 Orders)
        </a>
        <span class="text-[10px] text-sky-400 font-mono">Cluster: Noida Sec 62</span>
    </header>

    <main class="p-3 space-y-3 flex-1 overflow-y-auto">
        <!-- Order 1 -->
        <div class="bg-slate-900 border border-slate-700 rounded-2xl p-3.5 space-y-2">
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-xs font-mono font-black text-white">#OD4298174201</span>
                    <h3 class="text-xs font-bold text-slate-200">Rahul Sharma</h3>
                </div>
                <span class="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-black">
                    COD: ₹23,999
                </span>
            </div>
            <p class="text-xs text-slate-300">Flat 402, Lotus Heights, Sector 62, Noida</p>
            <p class="text-[10px] text-slate-400">Nothing Phone (2a) 5G • 1.4 km</p>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                <a href="tel:9876543210" class="bg-slate-800 text-slate-200 text-xs py-1.5 rounded-lg text-center font-bold">Call</a>
                <a href="navigation.php" class="bg-sky-600 text-white text-xs py-1.5 rounded-lg text-center font-bold">Nav</a>
                <a href="pod_verification.php" class="bg-emerald-600 text-white text-xs py-1.5 rounded-lg text-center font-bold">Deliver</a>
            </div>
        </div>

        <!-- Order 2 -->
        <div class="bg-slate-900 border border-slate-700 rounded-2xl p-3.5 space-y-2">
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-xs font-mono font-black text-white">#OD7719284102</span>
                    <h3 class="text-xs font-bold text-slate-200">Priya Kapoor</h3>
                </div>
                <span class="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded font-black">
                    PAID ONLINE
                </span>
            </div>
            <p class="text-xs text-slate-300">Villa 12, Palm Meadows, Indirapuram</p>
            <p class="text-[10px] text-slate-400">Sony WH-1000XM5 Headphones • 3.2 km</p>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                <a href="tel:9811223344" class="bg-slate-800 text-slate-200 text-xs py-1.5 rounded-lg text-center font-bold">Call</a>
                <a href="navigation.php" class="bg-sky-600 text-white text-xs py-1.5 rounded-lg text-center font-bold">Nav</a>
                <a href="pod_verification.php" class="bg-emerald-600 text-white text-xs py-1.5 rounded-lg text-center font-bold">Deliver</a>
            </div>
        </div>

        <!-- Order 3 -->
        <div class="bg-slate-900 border border-slate-700 rounded-2xl p-3.5 space-y-2">
            <div class="flex justify-between items-start">
                <div>
                    <span class="text-xs font-mono font-black text-white">#OD1029384756</span>
                    <h3 class="text-xs font-bold text-slate-200">Amit Verma</h3>
                </div>
                <span class="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-black">
                    COD: ₹899
                </span>
            </div>
            <p class="text-xs text-slate-300">Tower B, Flat 901, Shipra Sun City</p>
            <p class="text-[10px] text-slate-400">Highlander Men Slim Shirt • 4.5 km</p>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                <a href="tel:9988776655" class="bg-slate-800 text-slate-200 text-xs py-1.5 rounded-lg text-center font-bold">Call</a>
                <a href="navigation.php" class="bg-sky-600 text-white text-xs py-1.5 rounded-lg text-center font-bold">Nav</a>
                <a href="pod_verification.php" class="bg-emerald-600 text-white text-xs py-1.5 rounded-lg text-center font-bold">Deliver</a>
            </div>
        </div>
    </main>

    <!-- Bottom Nav -->
    <nav class="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-900 border-t border-slate-800 flex items-center justify-around py-2 text-[10px]">
        <a href="dashboard.php" class="text-slate-400 flex flex-col items-center">
            <i class="fa-solid fa-gauge text-base"></i>
            <span>Dashboard</span>
        </a>
        <a href="assigned_orders.php" class="text-sky-400 flex flex-col items-center font-bold">
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
