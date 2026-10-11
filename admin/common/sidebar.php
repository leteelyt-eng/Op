<?php
// Super Admin Sidebar Navigation
?>
<aside class="w-64 bg-slate-900 text-slate-300 min-h-screen shrink-0 hidden md:flex flex-col justify-between">
    <div>
        <!-- Admin Brand Header -->
        <div class="p-4 border-b border-slate-800 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <span class="text-lg font-black tracking-tight text-white"><span class="text-amber-300">Mystery</span> <span class="text-purple-400 italic">Admin</span></span>
                <span class="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold px-1.5 py-0.5 rounded uppercase">Master Console</span>
            </div>
        </div>

        <!-- Navigation Links -->
        <nav class="p-2 space-y-1 text-xs font-medium">
            <a href="index.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-200 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-chart-line w-4 text-blue-400"></i>
                <span>Executive Dashboard</span>
            </a>
            <a href="seller_hub.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-amber-300 hover:bg-slate-800 hover:text-white transition-colors font-semibold">
                <i class="fa-solid fa-store w-4 text-amber-400"></i>
                <span>Integrated Seller Hub</span>
            </a>
            <a href="database.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-purple-300 hover:bg-slate-800 hover:text-white transition-colors font-semibold">
                <i class="fa-solid fa-database w-4 text-purple-400"></i>
                <span>MySQL Database Console</span>
            </a>
            <a href="category.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-sitemap w-4 text-emerald-400"></i>
                <span>Category Management</span>
            </a>
            <a href="product.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-boxes-packing w-4 text-amber-400"></i>
                <span>Catalog & QC Approvals</span>
            </a>
            <a href="order.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-truck-ramp-box w-4 text-sky-400"></i>
                <span>Orders & Fulfillment</span>
            </a>
            <a href="seller_manage.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-shop w-4 text-orange-400"></i>
                <span>Seller KYC Verification</span>
            </a>
            <a href="user.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-users w-4 text-indigo-400"></i>
                <span>Customer Directory</span>
            </a>
            <a href="logistics.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-calculator w-4 text-rose-400"></i>
                <span>3PL & Commission Engine</span>
            </a>
            <a href="setting.php" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <i class="fa-solid fa-sliders w-4 text-slate-400"></i>
                <span>Mystery Deals & CMS</span>
            </a>
        </nav>
    </div>

    <!-- Admin Footer -->
    <div class="p-4 border-t border-slate-800 text-xs">
        <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                SA
            </div>
            <div>
                <p class="font-bold text-white leading-none">Super Administrator</p>
                <p class="text-[10px] text-slate-500 mt-0.5">Root Security Privileges</p>
            </div>
        </div>
        <div class="flex justify-between text-xs pt-2">
            <a href="../index.php" class="text-blue-400 hover:underline">Customer Store</a>
            <a href="login.php" class="text-red-400 hover:underline">Log Out</a>
        </div>
    </div>
</aside>

<!-- Top Mobile Admin Bar (only on small viewports) -->
<div class="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white p-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
        <span class="font-black italic text-blue-400">Flipkart</span>
        <span class="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded">Admin</span>
    </div>
    <div class="flex gap-3 text-xs">
        <a href="index.php" class="text-slate-300"><i class="fa-solid fa-gauge"></i></a>
        <a href="order.php" class="text-slate-300"><i class="fa-solid fa-box"></i></a>
        <a href="seller_manage.php" class="text-slate-300"><i class="fa-solid fa-shop"></i></a>
        <a href="../index.php" class="text-blue-400"><i class="fa-solid fa-store"></i></a>
    </div>
</div>
