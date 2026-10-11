<?php
// Flipkart Mobile Drawer Navigation Sidebar
?>
<!-- Overlay Backdrop -->
<div id="sidebarBackdrop" class="fixed inset-0 bg-black/60 z-50 hidden transition-opacity duration-300"></div>

<!-- Slide-out Sidebar Drawer -->
<aside id="mobileSidebar" class="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-50 transform -translate-x-full transition-transform duration-300 ease-in-out shadow-2xl overflow-y-auto">
    <!-- User Banner -->
    <div class="bg-fkBlue text-white p-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg text-white">
                <i class="fa-solid fa-user"></i>
            </div>
            <div>
                <p class="font-semibold text-sm">Hello, Shopper!</p>
                <div class="flex items-center gap-1 text-[11px] text-fkYellow">
                    <i class="fa-solid fa-coins"></i>
                    <span>120 SuperCoins</span>
                </div>
            </div>
        </div>
        <button id="closeSidebarBtn" class="text-white text-lg focus:outline-none" aria-label="Close menu">
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>

    <!-- Quick Links -->
    <div class="py-2 border-b border-slate-100">
        <a href="index.php" class="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 font-medium">
            <i class="fa-solid fa-house w-4 text-fkBlue"></i>
            <span>Home</span>
        </a>
        <a href="order_tracking.php" class="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 font-medium">
            <i class="fa-solid fa-box-open w-4 text-fkBlue"></i>
            <span>My Orders & Tracking</span>
        </a>
        <a href="cart.php" class="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 font-medium">
            <i class="fa-solid fa-cart-shopping w-4 text-fkBlue"></i>
            <span>My Cart</span>
        </a>
        <a href="wishlist.php" class="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 font-medium">
            <i class="fa-solid fa-heart w-4 text-fkBlue"></i>
            <span>My Wishlist</span>
        </a>
    </div>

    <!-- Categories Section -->
    <div class="py-2 border-b border-slate-100">
        <p class="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Top Categories</p>
        <a href="product.php?cat=1" class="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
            <span>Mobiles & Tablets</span>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
        </a>
        <a href="product.php?cat=2" class="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
            <span>Electronics</span>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
        </a>
        <a href="product.php?cat=3" class="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
            <span>Fashion & Lifestyle</span>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
        </a>
        <a href="product.php?cat=4" class="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
            <span>Appliances</span>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
        </a>
        <a href="product.php?cat=5" class="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50">
            <span>Home & Furniture</span>
            <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
        </a>
    </div>

    <!-- Administrative Portals -->
    <div class="py-2 border-b border-slate-100 bg-slate-50">
        <p class="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Administrative Portals</p>
        <a href="admin/index.php" class="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-800 hover:bg-slate-100 font-semibold">
            <i class="fa-solid fa-shield-halved w-4 text-purple-600 text-sm"></i>
            <div>
                <span class="block text-purple-700 font-bold">Dedicated Admin Panel</span>
                <span class="text-[10px] text-slate-500 font-normal">Executive analytics, QC & DB console</span>
            </div>
        </a>
        <a href="admin/seller_hub.php" class="flex items-center gap-3 px-4 py-2 text-xs text-slate-800 hover:bg-slate-100 font-medium">
            <i class="fa-solid fa-store w-4 text-amber-500"></i>
            <div>
                <span class="block">Integrated Seller Hub</span>
                <span class="text-[10px] text-slate-500 font-normal">Manage vendor listings, ads & payouts</span>
            </div>
        </a>
    </div>

    <!-- Settings & Legal -->
    <div class="py-2">
        <div class="px-4 py-2 flex items-center justify-between text-xs text-slate-600">
            <span>Language</span>
            <span class="font-semibold text-fkBlue">English / हिन्दी</span>
        </div>
        <div class="px-4 py-2 flex items-center justify-between text-xs text-slate-600">
            <span>Currency</span>
            <span class="font-semibold text-fkBlue">INR (₹)</span>
        </div>
        <a href="login.php" class="flex items-center gap-3 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-medium">
            <i class="fa-solid fa-right-from-bracket w-4"></i>
            <span>Log In / Sign Out</span>
        </a>
    </div>
</aside>

<script>
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');
    const sidebar = document.getElementById('mobileSidebar');
    const backdrop = document.getElementById('sidebarBackdrop');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
    }

    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
    }

    if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
    if (backdrop) backdrop.addEventListener('click', closeSidebar);
</script>
