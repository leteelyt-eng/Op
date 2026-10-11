<?php
require_once __DIR__ . '/config.php';
requireDriverAuth();

$success = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $otp = $_POST['otp'] ?? '';
    if ($otp === '4921') {
        $success = true;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Proof of Delivery (POD) - Delivery Partner</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col max-w-md mx-auto font-sans pb-16">
    <header class="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between sticky top-0 z-40">
        <a href="dashboard.php" class="text-xs text-slate-300 flex items-center gap-1.5 font-bold">
            <i class="fa-solid fa-arrow-left"></i> Proof of Delivery (POD)
        </a>
        <span class="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
            VERIFICATION
        </span>
    </header>

    <main class="p-3 space-y-3 flex-1 overflow-y-auto">
        <?php if ($success): ?>
            <div class="bg-emerald-950 border border-emerald-500 rounded-2xl p-5 text-center space-y-2">
                <div class="w-12 h-12 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                    <i class="fa-solid fa-check"></i>
                </div>
                <h2 class="text-base font-bold text-white">Delivery Confirmed!</h2>
                <p class="text-xs text-slate-300">Order #OD4298174201 successfully verified & delivered.</p>
                <div class="pt-2">
                    <a href="dashboard.php" class="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl inline-block">Return to Dashboard</a>
                </div>
            </div>
        <?php else: ?>
            <!-- Order Header -->
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex justify-between items-start">
                <div>
                    <h3 class="text-xs font-bold text-white">Rahul Sharma</h3>
                    <p class="text-[10px] text-slate-400">Flat 402, Lotus Heights, Sector 62</p>
                </div>
                <span class="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-black font-mono">
                    COD: ₹23,999
                </span>
            </div>

            <!-- Form -->
            <form method="POST" class="space-y-3">
                <!-- Step 1: OTP -->
                <div class="bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-2">
                    <label class="block text-xs font-bold text-sky-400 uppercase">1. Customer 4-Digit OTP</label>
                    <p class="text-[11px] text-slate-400">Ask the customer for the code received via SMS/app (Demo: 4921):</p>
                    <input type="text" name="otp" value="4921" maxlength="4" required class="w-full bg-slate-950 border border-slate-700 text-center font-mono font-black text-xl py-2 rounded-xl tracking-widest text-white focus:outline-none focus:border-sky-500">
                </div>

                <!-- Step 2: Signature -->
                <div class="bg-slate-900 border border-slate-700 rounded-2xl p-4 space-y-2">
                    <div class="flex justify-between items-center">
                        <label class="text-xs font-bold text-sky-400 uppercase">2. Customer Signature</label>
                        <button type="button" onclick="clearCanvas()" class="text-[10px] text-slate-400 hover:text-amber-400">Clear</button>
                    </div>
                    <div class="border border-slate-700 rounded-xl bg-slate-950 overflow-hidden">
                        <canvas id="signPad" width="340" height="100" class="w-full bg-slate-950 touch-none"></canvas>
                    </div>
                </div>

                <!-- Step 3: Photo -->
                <div class="bg-slate-900 border border-slate-700 rounded-2xl p-4 text-center space-y-1">
                    <label class="block text-xs font-bold text-sky-400 uppercase text-left">3. Package Photo Proof</label>
                    <div class="border border-dashed border-slate-700 py-3 rounded-xl text-slate-400 text-xs">
                        <i class="fa-solid fa-camera text-sky-400 text-lg mb-1 block"></i>
                        <span>Photo Geotagged: GPS 28.6280° N, 77.3649° E</span>
                    </div>
                </div>

                <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-black py-3 rounded-2xl shadow-xl text-xs uppercase tracking-wider transition-transform">
                    Confirm & Complete Handover
                </button>
            </form>
        <?php endif; ?>
    </main>

    <script>
        const canvas = document.getElementById('signPad');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let drawing = false;
            canvas.addEventListener('mousedown', () => drawing = true);
            canvas.addEventListener('mouseup', () => drawing = false);
            canvas.addEventListener('mousemove', (e) => {
                if (!drawing) return;
                const rect = canvas.getBoundingClientRect();
                ctx.lineWidth = 2.5;
                ctx.strokeStyle = '#38bdf8';
                ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                ctx.stroke();
            });
            function clearCanvas() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
            }
        }
    </script>
</body>
</html>
