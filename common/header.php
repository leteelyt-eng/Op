<?php
require_once __DIR__ . '/config.php';
$cart_count = isset($_SESSION['cart']) ? count($_SESSION['cart']) : 2;
$wishlist_count = isset($_SESSION['wishlist']) ? count($_SESSION['wishlist']) : 3;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title><?php echo isset($page_title) ? $page_title . ' - ' . SITE_NAME : 'Flipkart - Online Shopping App'; ?></title>
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        fkBlue: '#2874f0',
                        fkYellow: '#ffe11b',
                        fkOrange: '#fb641b',
                        fkGreen: '#388e3c',
                        fkDark: '#212121',
                        fkGray: '#878787',
                        fkLight: '#f1f3f6'
                    }
                }
            }
        }
    </script>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-fkLight text-fkDark font-sans antialiased pb-16 min-h-screen">

<!-- Top Mobile Header -->
<header class="sticky top-0 z-40 bg-fkBlue text-white shadow-md">
    <div class="px-3 py-2 flex items-center justify-between gap-3">
        <!-- Sidebar Toggle -->
        <button id="openSidebarBtn" class="text-white text-lg focus:outline-none" aria-label="Open Navigation Menu">
            <i class="fa-solid fa-bars"></i>
        </button>

        <!-- Flipkart Wordmark Logo -->
        <a href="index.php" class="flex flex-col items-start leading-none shrink-0">
            <span class="text-xl font-bold italic tracking-wide">Flipkart</span>
            <span class="text-[10px] text-fkYellow italic font-medium flex items-center gap-0.5">
                Explore <span class="text-white font-semibold">Plus</span>
                <i class="fa-solid fa-plus text-[8px] text-fkYellow"></i>
            </span>
        </a>

        <!-- Header Actions: Notifications, Wishlist, Cart -->
        <div class="flex items-center gap-4 text-white text-base">
            <a href="wishlist.php" class="relative" title="Wishlist">
                <i class="fa-regular fa-heart"></i>
                <span class="absolute -top-2 -right-2 bg-fkYellow text-fkDark font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    <?php echo $wishlist_count; ?>
                </span>
            </a>
            <a href="cart.php" class="relative" title="Cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <span id="cartCountBadge" class="absolute -top-2 -right-2 bg-fkYellow text-fkDark font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    <?php echo $cart_count; ?>
                </span>
            </a>
            <a href="login.php" class="text-xs bg-white text-fkBlue font-semibold px-2.5 py-1 rounded shadow-sm hover:bg-slate-100">
                Login
            </a>
        </div>
    </div>

    <!-- Search Bar with Voice and Visual Search -->
    <div class="px-3 pb-2.5">
        <form action="product.php" method="GET" class="relative flex items-center">
            <i class="fa-solid fa-magnifying-glass absolute left-3 text-fkGray text-sm"></i>
            <input type="text" name="q" id="searchInput" placeholder="Search for Products, Brands and More" 
                   class="w-full bg-white text-fkDark text-xs py-2 pl-9 pr-16 rounded-md shadow-inner focus:outline-none" />
            <div class="absolute right-2 flex items-center gap-2 text-fkBlue text-sm">
                <!-- Visual Search Button -->
                <button type="button" id="visualSearchBtn" title="Search with Camera" class="hover:text-fkOrange">
                    <i class="fa-solid fa-camera"></i>
                </button>
                <!-- Voice Search Button -->
                <button type="button" id="voiceSearchBtn" title="Voice Search" class="hover:text-fkOrange">
                    <i class="fa-solid fa-microphone"></i>
                </button>
            </div>
        </form>
    </div>

    <!-- Pincode / Location Detection Banner -->
    <div class="bg-[#1e5bc6] px-3 py-1 flex items-center justify-between text-[11px] text-white">
        <div class="flex items-center gap-1 truncate">
            <i class="fa-solid fa-location-dot text-fkYellow"></i>
            <span class="truncate">Deliver to <strong id="currentLocationText">Rahul - New Delhi 110016</strong></span>
        </div>
        <button id="changePincodeBtn" class="text-fkYellow underline font-semibold text-[10px] shrink-0">Change</button>
    </div>
</header>
