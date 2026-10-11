<?php
$page_title = 'Order Tracking #OD4298174201 - Flipkart';
require_once __DIR__ . '/common/header.php';
?>

<div class="p-3 max-w-lg mx-auto pb-20">
    <!-- Success Badge -->
    <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-fkGreen text-white flex items-center justify-center text-sm shadow">
                <i class="fa-solid fa-check"></i>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-800">Order Placed Successfully!</p>
                <p class="text-[10px] text-slate-500">Order #OD4298174201 • Total: ₹23,999</p>
            </div>
        </div>
        <button onclick="window.print()" class="text-xs text-fkBlue font-semibold border border-fkBlue/30 px-2.5 py-1 rounded">
            <i class="fa-solid fa-file-invoice mr-1"></i> Invoice
        </button>
    </div>

    <!-- Open Box Delivery OTP Alert -->
    <div class="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg p-3 mb-3 shadow">
        <div class="flex items-center justify-between">
            <div>
                <span class="text-[10px] text-fkYellow font-bold tracking-wider uppercase block">Open Box Delivery</span>
                <p class="text-xs font-medium text-slate-200">Share this OTP with driver only after inspecting product inside package:</p>
            </div>
            <div class="bg-white text-fkDark font-mono font-black text-lg px-3 py-1 rounded shadow tracking-widest">
                4921
            </div>
        </div>
    </div>

    <!-- Product Summary Card -->
    <div class="bg-white rounded-lg p-3 border border-slate-200 mb-3 shadow-sm">
        <div class="flex gap-3">
            <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80" alt="Nothing Phone" class="w-16 h-16 object-contain p-1 rounded bg-slate-50" />
            <div class="flex-1">
                <h3 class="text-xs font-semibold text-slate-900 line-clamp-1">Nothing Phone (2a) 5G (Black, 128 GB)</h3>
                <p class="text-[11px] text-slate-500 mt-0.5">Seller: TechGizmo Retailers • Qty: 1</p>
                <p class="text-xs font-bold text-slate-900 mt-1">₹23,999 <span class="text-fkGreen text-[10px] font-normal">(Paid via UPI)</span></p>
            </div>
        </div>
    </div>

    <!-- Flipkart Order Tracking Vertical Timeline -->
    <div class="bg-white rounded-lg p-4 border border-slate-200 mb-3 shadow-sm">
        <h3 class="text-xs font-bold text-slate-800 uppercase mb-4">Delivery Timeline</h3>
        
        <div class="relative pl-6 space-y-6 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-fkGreen">
            <!-- Step 1: Placed -->
            <div class="relative">
                <span class="absolute -left-6 top-0 w-4 h-4 rounded-full bg-fkGreen text-white flex items-center justify-center text-[8px] ring-4 ring-white">
                    <i class="fa-solid fa-check"></i>
                </span>
                <p class="font-bold text-slate-800">Order Confirmed</p>
                <p class="text-[10px] text-slate-400">Wed, Oct 8 - 11:24 AM</p>
            </div>

            <!-- Step 2: Packed -->
            <div class="relative">
                <span class="absolute -left-6 top-0 w-4 h-4 rounded-full bg-fkGreen text-white flex items-center justify-center text-[8px] ring-4 ring-white">
                    <i class="fa-solid fa-check"></i>
                </span>
                <p class="font-bold text-slate-800">Item Packed & Sealed</p>
                <p class="text-[10px] text-slate-400">Wed, Oct 8 - 04:10 PM • Delhi Fulfilment Center</p>
            </div>

            <!-- Step 3: Shipped -->
            <div class="relative">
                <span class="absolute -left-6 top-0 w-4 h-4 rounded-full bg-fkGreen text-white flex items-center justify-center text-[8px] ring-4 ring-white">
                    <i class="fa-solid fa-check"></i>
                </span>
                <p class="font-bold text-slate-800">Shipped with Ekart Logistics</p>
                <p class="text-[10px] text-slate-400">Thu, Oct 9 - 02:40 AM • In transit to local hub</p>
            </div>

            <!-- Step 4: Out for Delivery (Active) -->
            <div class="relative">
                <span class="absolute -left-6 top-0 w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] ring-4 ring-white animate-pulse">
                    <i class="fa-solid fa-truck"></i>
                </span>
                <p class="font-bold text-fkBlue">Out for Delivery (Today)</p>
                <p class="text-[10px] text-slate-500">Thu, Oct 9 - 08:30 AM • Delivery Associate Vikram Singh is on his way</p>
            </div>

            <!-- Step 5: Delivered -->
            <div class="relative opacity-40">
                <span class="absolute -left-6 top-0 w-4 h-4 rounded-full bg-slate-300 text-white flex items-center justify-center text-[8px] ring-4 ring-white">
                    <i class="fa-solid fa-location-dot"></i>
                </span>
                <p class="font-bold text-slate-600">Delivered</p>
                <p class="text-[10px] text-slate-400">Expected by 09:00 PM</p>
            </div>
        </div>
    </div>

    <!-- Assigned Delivery Partner Card -->
    <div class="bg-white rounded-lg p-3 border border-slate-200 mb-3 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
                <i class="fa-solid fa-helmet-safety"></i>
            </div>
            <div>
                <p class="text-xs font-bold text-slate-800">Vikram Singh</p>
                <p class="text-[10px] text-slate-500">Ekart Fleet • DL 4S CZ 9021 • ★ 4.9</p>
            </div>
        </div>
        <a href="tel:9123456780" class="w-9 h-9 rounded-full bg-blue-50 text-fkBlue flex items-center justify-center text-sm hover:bg-blue-100">
            <i class="fa-solid fa-phone"></i>
        </a>
    </div>

    <!-- Self-Service Return / Replacement Actions -->
    <div class="bg-white rounded-lg p-3 border border-slate-200 shadow-sm space-y-2 text-xs">
        <h4 class="font-bold text-slate-800 mb-2">Need Help with this Order?</h4>
        <button onclick="alert('Return request window opens once order is marked delivered.')" class="w-full text-left py-2 px-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-between">
            <span><i class="fa-solid fa-rotate-left mr-2 text-fkBlue"></i> Request Return or Replacement</span>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
        </button>
        <button onclick="alert('Connecting you with 24x7 Flipkart Customer Support...')" class="w-full text-left py-2 px-2.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium flex items-center justify-between">
            <span><i class="fa-solid fa-headset mr-2 text-fkBlue"></i> 24x7 Help Center & Chat</span>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
        </button>
    </div>
</div>

<?php require_once __DIR__ . '/common/sidebar.php'; ?>
<?php require_once __DIR__ . '/common/bottom.php'; ?>
