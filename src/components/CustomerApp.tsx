import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Mic, Camera, MapPin, Heart, ShoppingCart, User, 
  ChevronRight, Star, ShieldCheck, ArrowRight, Clock, 
  Tag, Coins, Check, RotateCcw, Phone, FileText, ArrowLeft,
  X, Crosshair, Sparkles, Filter, ChevronDown, CheckCircle2,
  Share2, ShieldAlert, Building2, QrCode, SmartphoneNfc, Wallet, Copy, CheckCircle,
  Zap, ScanLine, Maximize2, UploadCloud, RefreshCw, AlertCircle, ExternalLink, Info,
  Lock, Unlock, AlertTriangle, CreditCard, Truck, Package, PackageCheck, Send,
  Home, Briefcase, Plus, Edit2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, Category, Order, BankAccountConfig, INITIAL_BANK_CONFIG, UPITransaction } from '../data/mockData';

export type PaymentAuthStatus = 'idle' | 'awaiting_auth' | 'verifying' | 'authorized' | 'declined' | 'cancelled';

export interface AddressDetails {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  locality: string; // Road name, Area, Colony
  houseNumber: string; // House Number, Building Name, Flat No.
  city: string; // City / District / Town
  state: string; // State
  landmark?: string; // Landmark (Optional)
  alternatePhone?: string; // Alternate Phone (Optional)
  addressType: 'HOME' | 'WORK'; // Home (All day delivery) or Work (10 AM - 5 PM)
  isDefault?: boolean;
}

export interface PendingCheckoutOrder {
  orderNumber: string;
  purchaseProduct: Product;
  purchaseQty: number;
  purchaseTotal: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod' | 'emi';
  isDirect: boolean;
  upiMode?: 'phonepe' | 'qr' | 'vpa';
  initiatedAt: string;
  addressDetails?: AddressDetails;
}

interface CustomerAppProps {
  products: Product[];
  categories: Category[];
  orders: Order[];
  bankConfig?: BankAccountConfig;
  onPlaceOrder: (order: Order) => void;
  onUpdateOrderStatus?: (orderId: number, status: Order['status']) => void;
  onNavigateToAdmin: () => void;
}

const PROMO_BANNERS = [
  {
    id: 1,
    tag: 'MYSTERY TECH SPOTLIGHT',
    tagColor: 'bg-[#ffe11b] text-slate-950',
    title: 'Flagship 5G Smartphones',
    subtitle: 'Nothing (2a), iPhone 15 & Pixel | Starting ₹19,999*',
    badge: 'Extra ₹2,500 Exchange Bonus',
    bgGradient: 'from-blue-700 via-indigo-700 to-blue-900',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    productId: 1,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&q=80',
    cta: 'Grab Offer'
  },
  {
    id: 2,
    tag: 'STUDIO SOUND CARNIVAL',
    tagColor: 'bg-emerald-400 text-slate-950',
    title: 'Sony XM5 & Hi-Res Audio',
    subtitle: 'Active Noise Cancelling & 40h Battery Life',
    badge: 'Flat 45% Off + 30 SuperCoins',
    bgGradient: 'from-emerald-800 via-teal-800 to-slate-900',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    productId: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    cta: 'Explore Audio'
  },
  {
    id: 3,
    tag: 'APPLE MEGA DROPS',
    tagColor: 'bg-purple-300 text-purple-950',
    title: 'Apple iPhone 15 Super Sale',
    subtitle: 'Dynamic Island, 48MP Camera & USB-C Fast Charge',
    badge: 'Instant Bank ₹5,000 Off',
    bgGradient: 'from-purple-900 via-indigo-900 to-slate-950',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    productId: 2,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80',
    cta: 'Claim Deal'
  },
  {
    id: 4,
    tag: 'TRENDING FASHION DROP',
    tagColor: 'bg-rose-400 text-slate-950',
    title: 'Premium Streetwear & Fits',
    subtitle: 'Min 60% Off | 100% Combed Cotton Mystery Drops',
    badge: 'Buy 2 Get Extra 15% Off',
    bgGradient: 'from-rose-800 via-red-900 to-slate-950',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    productId: 4,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80',
    cta: 'View Styles'
  }
];

export const CustomerApp: React.FC<CustomerAppProps> = ({
  products,
  categories,
  orders,
  bankConfig,
  onPlaceOrder,
  onUpdateOrderStatus,
  onNavigateToAdmin
}) => {
  // Configured destination bank account (fallback to INITIAL_BANK_CONFIG if undefined)
  const targetBank: BankAccountConfig = bankConfig || INITIAL_BANK_CONFIG;

  // Navigation View State
  const [currentView, setCurrentView] = useState<'home' | 'catalog' | 'pdp' | 'cart' | 'wishlist' | 'checkout' | 'tracking'>('home');
  const [selectedProductId, setSelectedProductId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

  // Payment Method State: Single payment option Cash on Delivery (COD)
  const [paymentMethod, setPaymentMethod] = useState<'cod'>('cod');
  const [upiMode, setUpiMode] = useState<'phonepe' | 'qr' | 'vpa'>('phonepe');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'phonepe'>('phonepe');
  const [customerUpiVpa, setCustomerUpiVpa] = useState('rahulsharma@okhdfcbank');
  const [isVerifyingVpa, setIsVerifyingVpa] = useState(false);
  const [isVpaVerified, setIsVpaVerified] = useState(true);
  const [isUpiProcessing, setIsUpiProcessing] = useState(false);
  const [upiProcessingStep, setUpiProcessingStep] = useState(0);
  const [copiedBankInfo, setCopiedBankInfo] = useState(false);
  const [lastIntentUrl, setLastIntentUrl] = useState<string>('');
  const [lastStandardUpiUrl, setLastStandardUpiUrl] = useState<string>('');
  const [lastIntentOrderId, setLastIntentOrderId] = useState<string>('');
  const [showIntentDetails, setShowIntentDetails] = useState<boolean>(false);

  // Payment Authorization Workflow States (Prevents any order confirmation or delivery status change before payment completes)
  const [paymentAuthStatus, setPaymentAuthStatus] = useState<PaymentAuthStatus>('idle');
  const [pendingOrder, setPendingOrder] = useState<PendingCheckoutOrder | null>(null);
  const [cardOtpInput, setCardOtpInput] = useState<string>('849201');
  const [cardOtpError, setCardOtpError] = useState<string>('');
  const [authFailureReason, setAuthFailureReason] = useState<string>('');
  const [codAddressConfirmed, setCodAddressConfirmed] = useState<boolean>(true);

  // Detailed Flipkart-Style Delivery Address States
  const INITIAL_ADDRESSES: AddressDetails[] = [
    {
      id: 'addr-1',
      name: 'Rahul Sharma',
      phone: '9876543210',
      pincode: '201301',
      houseNumber: 'Flat 402, Lotus Heights',
      locality: 'Sector 62, Near Electronic City',
      city: 'Noida',
      state: 'Uttar Pradesh',
      landmark: 'Near Electronic City Metro Station',
      alternatePhone: '9811223344',
      addressType: 'HOME',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'Rahul Sharma',
      phone: '9876543210',
      pincode: '110016',
      houseNumber: 'Plot 14, 3rd Floor, Tech Hub',
      locality: 'Hauz Khas Commercial Enclave',
      city: 'New Delhi',
      state: 'Delhi',
      landmark: 'Opposite Metro Station Gate 2',
      alternatePhone: '',
      addressType: 'WORK',
      isDefault: false
    }
  ];

  const [addresses, setAddresses] = useState<AddressDetails[]>(INITIAL_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr-1');
  const [isManagingAddress, setIsManagingAddress] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(false);
  const [addressFormErrors, setAddressFormErrors] = useState<Record<string, string>>({});
  const [addressFormData, setAddressFormData] = useState<AddressDetails>({
    id: '',
    name: 'Rahul Sharma',
    phone: '9876543210',
    pincode: '201301',
    houseNumber: 'Flat 402, Lotus Heights',
    locality: 'Sector 62, Near Electronic City',
    city: 'Noida',
    state: 'Uttar Pradesh',
    landmark: 'Near Electronic City Metro Station',
    alternatePhone: '',
    addressType: 'HOME'
  });

  const activeAddress: AddressDetails = addresses.find(a => a.id === selectedAddressId) || addresses[0] || INITIAL_ADDRESSES[0];

  const INDIAN_STATES = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
    'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim',
    'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  // Auto-fill city and state based on Indian PIN codes
  const handlePincodeChange = (rawPin: string) => {
    const cleanPin = rawPin.replace(/\D/g, '').slice(0, 6);
    let updatedCity = addressFormData.city;
    let updatedState = addressFormData.state;
    let updatedLocality = addressFormData.locality;

    const pinMap: Record<string, { city: string; state: string; locality?: string }> = {
      '201301': { city: 'Noida', state: 'Uttar Pradesh', locality: 'Sector 62' },
      '110001': { city: 'New Delhi', state: 'Delhi', locality: 'Connaught Place' },
      '110016': { city: 'New Delhi', state: 'Delhi', locality: 'Hauz Khas' },
      '560001': { city: 'Bengaluru', state: 'Karnataka', locality: 'MG Road' },
      '400001': { city: 'Mumbai', state: 'Maharashtra', locality: 'Fort' },
      '700001': { city: 'Kolkata', state: 'West Bengal', locality: 'BBD Bagh' },
      '600001': { city: 'Chennai', state: 'Tamil Nadu', locality: 'George Town' },
      '500001': { city: 'Hyderabad', state: 'Telangana', locality: 'Abids' },
      '380001': { city: 'Ahmedabad', state: 'Gujarat', locality: 'Bhadra' },
      '302001': { city: 'Jaipur', state: 'Rajasthan', locality: 'MI Road' },
      '122001': { city: 'Gurugram', state: 'Haryana', locality: 'DLF Phase 1' },
      '411001': { city: 'Pune', state: 'Maharashtra', locality: 'Shivajinagar' }
    };

    if (cleanPin.length === 6 && pinMap[cleanPin]) {
      updatedCity = pinMap[cleanPin].city;
      updatedState = pinMap[cleanPin].state;
      if (!updatedLocality && pinMap[cleanPin].locality) {
        updatedLocality = pinMap[cleanPin].locality;
      }
    }

    setAddressFormData(prev => ({
      ...prev,
      pincode: cleanPin,
      city: updatedCity,
      state: updatedState,
      locality: updatedLocality
    }));

    if (addressFormErrors.pincode) {
      setAddressFormErrors(prev => ({ ...prev, pincode: '' }));
    }
  };

  const handleStartAddAddress = () => {
    setAddressFormData({
      id: '',
      name: activeAddress.name || 'Rahul Sharma',
      phone: activeAddress.phone || '9876543210',
      pincode: '',
      houseNumber: '',
      locality: '',
      city: '',
      state: 'Uttar Pradesh',
      landmark: '',
      alternatePhone: '',
      addressType: 'HOME'
    });
    setAddressFormErrors({});
    setIsAddingNewAddress(true);
    setEditingAddressId(null);
  };

  const handleStartEditAddress = (addr: AddressDetails) => {
    setAddressFormData({ ...addr });
    setAddressFormErrors({});
    setEditingAddressId(addr.id);
    setIsAddingNewAddress(false);
  };

  const handleSaveAddress = () => {
    const errors: Record<string, string> = {};
    if (!addressFormData.name.trim()) errors.name = 'Please enter your full name';
    if (!addressFormData.phone.trim() || addressFormData.phone.replace(/\D/g, '').length !== 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!addressFormData.pincode.trim() || addressFormData.pincode.replace(/\D/g, '').length !== 6) {
      errors.pincode = 'Please enter a 6-digit pin code';
    }
    if (!addressFormData.houseNumber.trim()) {
      errors.houseNumber = 'Please enter House Number / Building Name';
    }
    if (!addressFormData.locality.trim()) {
      errors.locality = 'Please enter Road Name / Area / Colony';
    }
    if (!addressFormData.city.trim()) {
      errors.city = 'Please enter City / District / Town';
    }
    if (!addressFormData.state.trim()) {
      errors.state = 'Please select your State';
    }

    if (Object.keys(errors).length > 0) {
      setAddressFormErrors(errors);
      showToast('Incomplete Address ⚠️', 'Please fill all required address fields highlighted in red');
      return;
    }

    setAddressFormErrors({});

    if (editingAddressId) {
      // Update existing address
      setAddresses(prev => prev.map(a => a.id === editingAddressId ? { ...addressFormData, id: editingAddressId } : a));
      setSelectedAddressId(editingAddressId);
      setPincode(addressFormData.pincode);
      showToast('Address Updated! 📍', `${addressFormData.houseNumber}, ${addressFormData.city}`);
    } else {
      // Add new address
      const newId = `addr-${Date.now()}`;
      const newAddress: AddressDetails = {
        ...addressFormData,
        id: newId
      };
      setAddresses(prev => [newAddress, ...prev]);
      setSelectedAddressId(newId);
      setPincode(newAddress.pincode);
      showToast('New Address Saved! 📍', `${newAddress.houseNumber}, ${newAddress.city}`);
    }

    setIsAddingNewAddress(false);
    setEditingAddressId(null);
    setIsManagingAddress(false);
  };

  // Cart & Wishlist state
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([
    { product: products[0], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState<number[]>([2, 3]);

  // Direct Buy Now state (Enables immediate purchase, skipping cart)
  const [directBuyItem, setDirectBuyItem] = useState<{
    product: Product;
    quantity: number;
    color: string;
    variant: string;
  } | null>(null);

  // Dynamic Animations & Carousel States
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isBannerPaused, setIsBannerPaused] = useState(false);
  const [countdown, setCountdown] = useState({ hours: 15, minutes: 42, seconds: 28 });
  const [recentlyToggledWishlistId, setRecentlyToggledWishlistId] = useState<number | null>(null);
  const [activeNavAnim, setActiveNavAnim] = useState<string | null>(null);
  const [quickToast, setQuickToast] = useState<{ message: string; sub?: string; visible: boolean }>({ message: '', visible: false });
  const [showMysteryModal, setShowMysteryModal] = useState(false);
  const [unboxedReward, setUnboxedReward] = useState<{ title: string; code: string; discount: string } | null>(null);

  // Auto-advance banner carousel every 4.2 seconds
  useEffect(() => {
    if (isBannerPaused) return;
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % PROMO_BANNERS.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isBannerPaused]);

  // Live countdown timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // PDP States
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedVariant, setSelectedVariant] = useState('8 GB + 128 GB');
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [pincode, setPincode] = useState('110016');
  const [pincodeChecked, setPincodeChecked] = useState(true);

  // Modals
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showVisualModal, setShowVisualModal] = useState(false);
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // SuperCoins
  const [supercoins, setSupercoins] = useState(120);
  const [useSupercoins, setUseSupercoins] = useState(true);

  // Active tracking order
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order>(orders[0]);

  // Keep activeTrackingOrder in sync if orders array is updated
  useEffect(() => {
    if (orders.length > 0 && activeTrackingOrder) {
      const updated = orders.find(o => o.id === activeTrackingOrder.id || o.order_number === activeTrackingOrder.order_number);
      if (updated && (updated.status !== activeTrackingOrder.status || updated.payment_status !== activeTrackingOrder.payment_status)) {
        setActiveTrackingOrder(updated);
      }
    }
  }, [orders, activeTrackingOrder]);

  // Selected Product helper
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.mrp * item.quantity), 0);
  const cartDiscount = cart.reduce((sum, item) => sum + ((item.product.mrp - item.product.price) * item.quantity), 0);
  const coinsDeduction = useSupercoins ? Math.min(supercoins, 50) : 0;
  const platformFee = 49;
  const cartTotal = cartSubtotal - cartDiscount - coinsDeduction + platformFee;

  // Direct Buy Calculations (Immediate Purchase, Bypasses Cart)
  const directSubtotal = directBuyItem ? (directBuyItem.product.mrp * directBuyItem.quantity) : 0;
  const directDiscount = directBuyItem ? ((directBuyItem.product.mrp - directBuyItem.product.price) * directBuyItem.quantity) : 0;
  const directCoinsDeduction = useSupercoins ? Math.min(supercoins, 50) : 0;
  const directTotal = directBuyItem ? (directBuyItem.product.price * directBuyItem.quantity - directCoinsDeduction + platformFee) : 0;
  const activePayableAmount = directBuyItem ? directTotal : cartTotal;

  const showToast = (message: string, sub?: string) => {
    setQuickToast({ message, sub, visible: true });
    setTimeout(() => {
      setQuickToast(prev => ({ ...prev, visible: false }));
    }, 2400);
  };

  const toggleWishlist = (id: number) => {
    setRecentlyToggledWishlistId(id);
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
      showToast('Removed from Wishlist', 'Item removed from saved list');
    } else {
      setWishlist([...wishlist, id]);
      showToast('Added to Wishlist! ❤️', 'Saved to your personal collection');
    }
    setTimeout(() => setRecentlyToggledWishlistId(null), 800);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    showToast(`Added ${product.name.slice(0, 20)}... to Cart! 🛍️`, 'Ready for checkout');
    setCurrentView('cart');
  };

  // Direct Buy Now: Skips the Cart completely & enters immediate checkout!
  const handleBuyNow = (product: Product) => {
    setDirectBuyItem({
      product,
      quantity: 1,
      color: selectedColor,
      variant: selectedVariant
    });
    showToast(`Instant Purchase Activated ⚡`, `Direct purchase for ${product.name.slice(0, 20)}...`);
    setCurrentView('checkout');
  };

  const quickAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    showToast(`Added to Cart! 🛍️`, `${product.name.slice(0, 24)}...`);
  };

  const handleNavClick = (view: 'home' | 'catalog' | 'tracking' | 'wishlist' | 'cart') => {
    setActiveNavAnim(view);
    setCurrentView(view);
    setTimeout(() => setActiveNavAnim(null), 600);
  };

  const handleOpenMysteryBox = (tier: string) => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    const rewards: Record<string, { title: string; code: string; discount: string }> = {
      'diamond': { title: 'Diamond Mystery Jackpots!', code: 'MYSTERY2500', discount: '₹2,500 Instant Discount on Orders > ₹15k' },
      'gold': { title: 'Golden Surprise Drop!', code: 'MYSTERY1500', discount: 'Flat ₹1,500 Off on Flagship Electronics' },
      'silver': { title: 'Silver Flash Perk!', code: 'MYSTERY800', discount: 'Extra ₹800 Off + Free Express Shipping' }
    };
    setUnboxedReward(rewards[tier] || rewards['gold']);
    setShowMysteryModal(true);
  };

  // Generate standard NPCI & PhonePe UPI Intent URIs with validated deep link parameters
  const getUpiIntentUrls = (amount: number, orderId: string) => {
    // 1. Payee VPA (pa): Trimmed, default fallback if not configured
    const rawVpa = (targetBank.upi_vpa || 'shoppingmystery@hdfcbank').trim();
    const pa = rawVpa.length > 0 ? rawVpa : 'shoppingmystery@hdfcbank';

    // 2. Payee Name (pn): Trimmed, max 99 chars according to NPCI specs
    const rawPn = (targetBank.account_holder_name || 'Shopping Mystery').trim();
    const pn = rawPn.length > 0 ? rawPn.slice(0, 99) : 'Shopping Mystery';

    // 3. Merchant Category Code (mc): Standard 4-digit MCC (5411 = Grocery/Department Stores)
    const rawMc = (targetBank.merchant_code || '5411').trim();
    const mc = rawMc.length === 4 ? rawMc : '5411';

    // 4. Transaction Reference ID (tr): Strictly alphanumeric, max 35 characters for strict UPI compatibility
    const cleanOrderId = orderId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 35);
    const tr = cleanOrderId || `OD${Date.now()}`;

    // 5. Terminal / Transaction ID (tid): NPCI / PhonePe merchant terminal identifier
    const tid = tr;

    // 6. Transaction Note (tn): Short transaction description (max 80 chars)
    const tn = `Pay Order ${tr}`.slice(0, 80);

    // 7. Amount (am): Exact 2 decimal places, positive number, strictly unlocalized (no commas)
    const validAmount = Math.max(1, Number(amount) || 1);
    const am = validAmount.toFixed(2);

    // 8. Currency (cu): INR
    const cu = 'INR';

    // Strict RFC 3986 parameter encoding (spaces encoded as %20, safe across mobile intent filters)
    const encodedParams = [
      `pa=${encodeURIComponent(pa)}`,
      `pn=${encodeURIComponent(pn)}`,
      `mc=${encodeURIComponent(mc)}`,
      `tid=${encodeURIComponent(tid)}`,
      `tr=${encodeURIComponent(tr)}`,
      `tn=${encodeURIComponent(tn)}`,
      `am=${encodeURIComponent(am)}`,
      `cu=${cu}`,
      `mode=02`,
      `purpose=00`
    ].join('&');

    // 1. PhonePe Custom Deep Link Scheme (opens PhonePe native app on Android & iOS)
    const phonepeScheme = `phonepe://pay?${encodedParams}`;

    // 2. Standard Universal NPCI UPI Intent URI (interoperable across all UPI apps)
    const standardUpi = `upi://pay?${encodedParams}`;

    // 3. Android Intent URI targeting PhonePe package com.phonepe.app with Play Store fallback
    const playStoreFallback = encodeURIComponent('https://play.google.com/store/apps/details?id=com.phonepe.app');
    const androidPhonePe = `intent://pay?${encodedParams}#Intent;scheme=upi;package=com.phonepe.app;S.browser_fallback_url=${playStoreFallback};end`;

    // 4. Android Intent URI targeting phonepe scheme
    const androidPhonePeCustom = `intent://pay?${encodedParams}#Intent;scheme=phonepe;package=com.phonepe.app;S.browser_fallback_url=${playStoreFallback};end`;

    return { 
      phonepeScheme, 
      standardUpi, 
      androidPhonePe, 
      androidPhonePeCustom,
      params: { pa, pn, mc, tid, tr, tn, am, cu, mode: '02', purpose: '00' }
    };
  };

  const launchPhonePeApp = (amount: number, orderId: string) => {
    const { phonepeScheme, standardUpi, androidPhonePe } = getUpiIntentUrls(amount, orderId);
    setLastIntentUrl(phonepeScheme);
    setLastStandardUpiUrl(standardUpi);
    setLastIntentOrderId(orderId);

    const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);
    const isIOS = typeof navigator !== 'undefined' && /iphone|ipad|ipod/i.test(navigator.userAgent);

    // On Android browsers, the intent:// URL scheme directly targets com.phonepe.app with fallback
    const targetUrl = isAndroid ? androidPhonePe : phonepeScheme;

    // Trigger 1: Programmatic anchor dispatch
    try {
      const intentLink = document.createElement('a');
      intentLink.href = targetUrl;
      intentLink.target = '_self';
      intentLink.rel = 'noopener noreferrer';
      document.body.appendChild(intentLink);
      intentLink.click();
      document.body.removeChild(intentLink);
    } catch {
      // Ignored
    }

    // Trigger 2: Window location navigation fallback
    setTimeout(() => {
      try {
        window.location.href = isAndroid ? phonepeScheme : targetUrl;
      } catch {
        // Ignored in desktop preview environments
      }
    }, 150);
  };

  // INITIATE PAYMENT: Locks order placement and requires successful payment authorization
  const handleInitiatePayment = () => {
    const isDirect = Boolean(directBuyItem);
    const purchaseProduct = directBuyItem ? directBuyItem.product : (cart[0]?.product || selectedProduct);
    const purchaseQty = directBuyItem ? directBuyItem.quantity : (cart[0]?.quantity || 1);
    const purchaseTotal = isDirect ? directTotal : cartTotal;
    const orderNumber = `OD${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const pending: PendingCheckoutOrder = {
      orderNumber,
      purchaseProduct,
      purchaseQty,
      purchaseTotal,
      paymentMethod: 'cod',
      isDirect,
      initiatedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ', ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      addressDetails: activeAddress
    };

    setPendingOrder(pending);
    setPaymentAuthStatus('awaiting_auth');
    setAuthFailureReason('');
    setCardOtpError('');
    setIsUpiProcessing(false);
    showToast('COD Order Authorization 📦', `Delivering to ${activeAddress.houseNumber}, ${activeAddress.city}`);

    // STRICT SYSTEM GUARANTEE:
    // Order confirmation and delivery status updates will NOT trigger until payment authorization is received.
    // Cart is preserved and remains intact.
  };

  // Backwards compatibility alias
  const handleCompleteCheckout = handleInitiatePayment;

  // RECEIVE SUCCESSFUL PAYMENT AUTHORIZATION:
  // Order confirmation & delivery status updates ONLY trigger here upon verified authorization
  const handleReceiveSuccessfulAuthorization = () => {
    if (!pendingOrder) return;

    setPaymentAuthStatus('verifying');
    setUpiProcessingStep(2);

    setTimeout(() => {
      setPaymentAuthStatus('authorized');
      setUpiProcessingStep(3);

      const utrNumber = `${Math.floor(400000000000 + Math.random() * 599999999999)}`;
      const timestampStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }) + ', ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

      const upiTxn: UPITransaction | undefined = pendingOrder.paymentMethod === 'upi' ? {
        id: `UPI-${Date.now()}`,
        order_number: pendingOrder.orderNumber,
        customer_vpa: pendingOrder.upiMode === 'vpa' ? customerUpiVpa : (pendingOrder.upiMode === 'qr' ? 'phonepe.qr.payer@ybl' : 'phonepe.user@ybl'),
        destination_vpa: targetBank.upi_vpa,
        destination_bank: targetBank.bank_name,
        destination_account: targetBank.account_number,
        destination_ifsc: targetBank.ifsc_code,
        amount: pendingOrder.purchaseTotal,
        utr_number: utrNumber,
        timestamp: timestampStr,
        status: 'CREDITED_TO_BANK',
        reference_id: `NPCI-REF-${Math.floor(10000000 + Math.random() * 90000000)}`
      } : undefined;

      const orderAddr = pendingOrder.addressDetails || activeAddress;
      const formattedAddress = `${orderAddr.houseNumber}, ${orderAddr.locality}, ${orderAddr.city}, ${orderAddr.state}`;

      const confirmedOrder: Order = {
        id: orders.length + 1,
        order_number: pendingOrder.orderNumber,
        user_id: 1,
        customer_name: orderAddr.name,
        customer_phone: orderAddr.phone,
        address: formattedAddress,
        pincode: orderAddr.pincode,
        seller_name: pendingOrder.purchaseProduct.brand + ' Official Retail',
        delivery_partner: 'Vikram Singh (DL 4S CZ 9021)',
        product: pendingOrder.purchaseProduct,
        quantity: pendingOrder.purchaseQty,
        total_amount: pendingOrder.purchaseTotal,
        payment_method: pendingOrder.paymentMethod,
        payment_status: pendingOrder.paymentMethod === 'cod' ? 'pending' : 'paid',
        status: 'placed', // Confirmed initial delivery milestone!
        otp_code: `${Math.floor(1000 + Math.random() * 9000)}`,
        created_at: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        upi_transaction: upiTxn
      };

      // Confetti & Celebration
      confetti({
        particleCount: 95,
        spread: 75,
        origin: { y: 0.6 }
      });

      // TRIGGER ORDER CONFIRMATION & INITIALIZE DELIVERY FULFILLMENT STATUS
      onPlaceOrder(confirmedOrder);
      setActiveTrackingOrder(confirmedOrder);

      // Clear purchased items only after payment authorization succeeds
      if (pendingOrder.isDirect) {
        setDirectBuyItem(null);
      } else {
        setCart([]);
      }

      showToast('Payment Authorized! 🎉', `Order #${confirmedOrder.order_number} confirmed. Delivery updates active.`);

      // Transition smoothly to tracking view
      setTimeout(() => {
        setIsUpiProcessing(false);
        setUpiProcessingStep(0);
        setPaymentAuthStatus('idle');
        setPendingOrder(null);
        setCurrentView('tracking');
      }, 750);
    }, 600);
  };

  // DECLINE PAYMENT AUTHORIZATION (Simulates user/bank rejection)
  const handleDeclinePayment = (reason?: string) => {
    setPaymentAuthStatus('declined');
    setAuthFailureReason(reason || 'Payment authorization declined by user or bank (Error: NPCI Auth 403 / Declined).');
    setIsUpiProcessing(false);
    showToast('Payment Authorization Declined ❌', 'No money deducted. Order was not confirmed.');
    // Zero status change! Cart stays intact, no order placed.
  };

  // CANCEL AUTHORIZATION & RETURN TO CHECKOUT
  const handleCancelAuthorization = () => {
    setPaymentAuthStatus('idle');
    setPendingOrder(null);
    setIsUpiProcessing(false);
    setUpiProcessingStep(0);
    setAuthFailureReason('');
    showToast('Payment Cancelled 🛑', 'Returned to checkout. Your cart items are preserved.');
  };

  // ADVANCE DELIVERY MILESTONE (Demonstrates live delivery status progression after payment authorization)
  const handleAdvanceDeliveryMilestone = (orderId: number, currentStatus: Order['status']) => {
    const statusCycle: Record<Order['status'], Order['status']> = {
      'placed': 'packed',
      'packed': 'shipped',
      'shipped': 'out_for_delivery',
      'out_for_delivery': 'delivered',
      'delivered': 'delivered'
    };
    const nextStatus = statusCycle[currentStatus];
    if (nextStatus === currentStatus) {
      showToast('Order Already Delivered! 🏁', 'Package handed over and verified via OTP');
      return;
    }

    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, nextStatus);
    }
    setActiveTrackingOrder(prev => prev.id === orderId ? { ...prev, status: nextStatus } : prev);
    showToast('Delivery Status Updated! 🚚', `Status advanced to: ${nextStatus.replace('_', ' ').toUpperCase()}`);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-100 text-slate-900 pb-16 font-sans relative">
      {/* 1. TOP MOBILE FLIPKART HEADER */}
      <header className="sticky top-0 z-40 bg-[#2874f0] text-white shadow-md">
        <div className="px-3 py-2 flex items-center justify-between gap-3">
          {/* Drawer Trigger or Back Button */}
          {currentView !== 'home' ? (
            <button 
              onClick={() => setCurrentView('home')} 
              className="text-white text-base hover:opacity-80 p-1"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={() => setShowDrawer(true)} 
              className="text-white text-lg hover:opacity-80 p-1"
              title="Open Navigation Menu"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          )}

          {/* Shopping Mystery Brand Wordmark */}
          <button 
            onClick={() => setCurrentView('home')} 
            className="flex flex-col items-start leading-none text-left"
          >
            <span className="text-lg font-black tracking-tight flex items-center gap-1 text-white">
              <span className="text-[#ffe11b]">Mystery</span>
              <span className="font-extrabold italic">Shopping</span>
            </span>
            <span className="text-[10px] text-amber-200 font-semibold flex items-center gap-1">
              <i className="fa-solid fa-gift text-[9px] text-[#ffe11b]"></i>
              Surprise Deals & Boxes
            </span>
          </button>

          {/* Header Actions */}
          <div className="flex items-center gap-3.5 text-white">
            <button 
              onClick={() => setCurrentView('wishlist')} 
              className="relative p-1"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 text-white" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ffe11b] text-slate-900 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setCurrentView('cart')} 
              className="relative p-1"
              title="My Cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ffe11b] text-slate-900 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setCurrentView('tracking')}
              className="text-[11px] bg-white text-[#2874f0] font-bold px-2 py-0.5 rounded shadow-sm hover:bg-slate-50"
            >
              Orders
            </button>
          </div>
        </div>

        {/* Search Bar with Camera Visual & Voice Recognition simulation */}
        <div className="px-3 pb-2.5">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for Phones, Electronics, Fashion..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setCurrentView('catalog');
              }}
              className="w-full bg-white text-slate-900 text-xs py-2 pl-9 pr-16 rounded-md shadow-inner focus:outline-none"
            />
            <div className="absolute right-2 flex items-center gap-1.5 text-[#2874f0]">
              <button 
                type="button" 
                onClick={() => setShowVisualModal(true)} 
                title="AI Camera Lens Search"
                className="hover:text-amber-500 p-0.5"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button 
                type="button" 
                onClick={() => setShowVoiceModal(true)} 
                title="Voice Search"
                className="hover:text-amber-500 p-0.5"
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Deliver to Pincode Strip */}
        <div className="bg-[#1e5bc6] px-3 py-1 flex items-center justify-between text-[11px] text-white">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-[#ffe11b] shrink-0" />
            <span className="truncate">Deliver to Rahul - <strong>New Delhi {pincode}</strong></span>
          </div>
          <button 
            onClick={() => setShowPincodeModal(true)} 
            className="text-[#ffe11b] underline font-bold text-[10px] shrink-0 hover:text-white"
          >
            Change
          </button>
        </div>
      </header>

      {/* 2. SIDEBAR DRAWER OVERLAY */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setShowDrawer(false)}
          />
          <div className="relative w-[280px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div>
              {/* User Profile Header */}
              <div className="bg-[#2874f0] text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg text-white font-bold">
                    RS
                  </div>
                  <div>
                    <p className="font-bold text-sm">Rahul Sharma</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#ffe11b] font-medium">
                      <Coins className="w-3 h-3" />
                      <span>{supercoins} SuperCoins</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="py-2 border-b border-slate-100 text-xs">
                <button 
                  onClick={() => { setCurrentView('home'); setShowDrawer(false); }} 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium text-left"
                >
                  <i className="fa-solid fa-house w-4 text-[#2874f0]"></i>
                  <span>Shopping Mystery Home</span>
                </button>
                <button 
                  onClick={() => { setCurrentView('tracking'); setShowDrawer(false); }} 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium text-left"
                >
                  <i className="fa-solid fa-box-open w-4 text-[#2874f0]"></i>
                  <span>My Orders & Tracking</span>
                </button>
                <button 
                  onClick={() => { setCurrentView('wishlist'); setShowDrawer(false); }} 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium text-left"
                >
                  <i className="fa-solid fa-heart w-4 text-[#2874f0]"></i>
                  <span>My Wishlist ({wishlist.length})</span>
                </button>
                <button 
                  onClick={() => { setCurrentView('cart'); setShowDrawer(false); }} 
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-slate-50 font-medium text-left"
                >
                  <i className="fa-solid fa-cart-shopping w-4 text-[#2874f0]"></i>
                  <span>My Cart ({cart.length})</span>
                </button>
              </div>

              {/* Administrative Portals Navigation */}
              <div className="py-2 bg-slate-50 border-b border-slate-100">
                <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Administrative Portals</p>
                <button 
                  onClick={() => { setShowDrawer(false); onNavigateToAdmin(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-slate-800 hover:bg-slate-100 font-semibold text-left"
                >
                  <i className="fa-solid fa-shield-halved w-4 text-purple-600"></i>
                  <div>
                    <span className="block font-bold text-purple-700">Dedicated Admin Panel</span>
                    <span className="text-[10px] text-slate-400 font-normal">Executive console & DB tools</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setShowDrawer(false); onNavigateToAdmin(); }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs text-slate-800 hover:bg-slate-100 font-semibold text-left"
                >
                  <i className="fa-solid fa-store w-4 text-amber-500"></i>
                  <div>
                    <span className="block font-bold text-slate-700">Integrated Seller Hub</span>
                    <span className="text-[10px] text-slate-400 font-normal">Merchant catalog, ads & payouts</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Close Drawer Button */}
            <div className="p-4 border-t border-slate-100 text-xs">
              <button 
                onClick={() => setShowDrawer(false)}
                className="w-full py-2 bg-slate-100 rounded text-slate-600 font-semibold"
              >
                Close Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT ROUTER */}
      <main className="flex-1">
        {/* VIEW A: HOMEPAGE */}
        {currentView === 'home' && (
          <div className="space-y-2">
            {/* Horizontal Category Icons */}
            <section className="bg-white py-2.5 border-b border-slate-200">
              <div className="flex items-center gap-4 overflow-x-auto px-3 no-scrollbar text-center">
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => { setSelectedCatId(cat.id); setCurrentView('catalog'); }}
                    className="flex flex-col items-center shrink-0 w-16 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-50/70 border border-blue-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                      <i className={`fa-solid ${cat.icon} text-[#2874f0] text-lg`}></i>
                    </div>
                    <span className="text-[11px] font-medium text-slate-800 mt-1 truncate w-full">{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Interactive Shopping Mystery Box Feature */}
            <section className="px-2">
              <div className="bg-gradient-to-r from-purple-950 via-indigo-900 to-slate-950 rounded-2xl p-4 text-white shadow-xl border border-purple-500/40 relative overflow-hidden group">
                {/* Decorative background glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="bg-[#ffe11b] text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-purple-900 animate-spin" /> Live Mystery Box Event
                      </span>
                      <h2 className="text-base font-black mt-1.5 leading-tight text-white flex items-center gap-1.5">
                        <span>Unbox Secret Deals Up To 70% Off</span>
                      </h2>
                      <p className="text-[11px] text-purple-200 mt-1">
                        Select a tier below to crack open instant coupons & mystery price drops!
                      </p>
                    </div>

                    {/* Floating 3D Gift Box Animation */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 flex flex-col items-center justify-center font-bold text-[10px] shadow-2xl shrink-0 border-2 border-white/80 animate-float-slow">
                      <i className="fa-solid fa-gift text-2xl text-purple-950"></i>
                      <span className="text-[9px] uppercase tracking-wider mt-0.5 font-black">MYSTERY</span>
                    </div>
                  </div>

                  {/* 3 Interactive Mystery Tiers */}
                  <div className="grid grid-cols-3 gap-2 mt-3.5">
                    <button 
                      onClick={() => handleOpenMysteryBox('silver')}
                      className="bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-xl p-2 text-center transition-all duration-200 group/tier"
                    >
                      <div className="text-base mb-0.5">🥈</div>
                      <div className="text-[11px] font-bold text-slate-200">Silver Box</div>
                      <div className="text-[9px] text-[#ffe11b] font-semibold">Min ₹800 Off</div>
                    </button>

                    <button 
                      onClick={() => handleOpenMysteryBox('gold')}
                      className="bg-amber-500/20 hover:bg-amber-500/30 active:scale-95 border border-amber-400/40 rounded-xl p-2 text-center transition-all duration-200 relative overflow-hidden group/tier ring-1 ring-amber-400/30"
                    >
                      <span className="absolute -top-1 right-1 text-[8px] bg-amber-400 text-slate-950 px-1 rounded font-black">HOT</span>
                      <div className="text-base mb-0.5">👑</div>
                      <div className="text-[11px] font-bold text-amber-200">Gold Box</div>
                      <div className="text-[9px] text-[#ffe11b] font-semibold">Flat ₹1,500 Off</div>
                    </button>

                    <button 
                      onClick={() => handleOpenMysteryBox('diamond')}
                      className="bg-purple-500/20 hover:bg-purple-500/30 active:scale-95 border border-purple-400/40 rounded-xl p-2 text-center transition-all duration-200 group/tier"
                    >
                      <div className="text-base mb-0.5">💎</div>
                      <div className="text-[11px] font-bold text-purple-200">Diamond</div>
                      <div className="text-[9px] text-[#ffe11b] font-semibold">Mega ₹2,500 Off</div>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Dynamic Animated Promotional Banner Carousel */}
            <section 
              className="px-2"
              onMouseEnter={() => setIsBannerPaused(true)}
              onMouseLeave={() => setIsBannerPaused(false)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg border border-slate-200/50">
                {/* Active Banner Slide */}
                {PROMO_BANNERS.map((banner, idx) => {
                  if (idx !== currentBanner) return null;
                  return (
                    <div 
                      key={banner.id}
                      className={`bg-gradient-to-r ${banner.bgGradient} text-white p-4 min-h-[175px] flex flex-col justify-between transition-all duration-500 relative overflow-hidden`}
                    >
                      {/* Animated light shine effect */}
                      <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-banner-shine pointer-events-none"></div>

                      {/* Top Row: Tag, Auto Indicator & Prev/Next Arrows */}
                      <div className="flex items-center justify-between gap-2 relative z-10">
                        <span className={`${banner.tagColor} text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-sm`}>
                          <Sparkles className="w-3 h-3 animate-spin" /> {banner.tag}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentBanner((prev) => (prev - 1 + PROMO_BANNERS.length) % PROMO_BANNERS.length);
                            }}
                            className="w-6 h-6 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-[10px] transition-transform active:scale-90"
                            title="Previous Banner"
                          >
                            <i className="fa-solid fa-chevron-left"></i>
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentBanner((prev) => (prev + 1) % PROMO_BANNERS.length);
                            }}
                            className="w-6 h-6 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center text-[10px] transition-transform active:scale-90"
                            title="Next Banner"
                          >
                            <i className="fa-solid fa-chevron-right"></i>
                          </button>
                        </div>
                      </div>

                      {/* Middle: Title & Subtitle */}
                      <div className="relative z-10 my-2">
                        <h2 className="text-xl font-black leading-tight tracking-tight drop-shadow-sm">
                          {banner.title}
                        </h2>
                        <p className="text-xs text-slate-100/90 mt-1 font-medium">
                          {banner.subtitle}
                        </p>
                      </div>

                      {/* Bottom: Accent Badge & CTA Action Button */}
                      <div className="flex items-center justify-between gap-2 relative z-10 pt-1">
                        <span className="text-[10px] bg-white/20 backdrop-blur-xs text-white px-2 py-0.5 rounded-md font-semibold border border-white/20">
                          {banner.badge}
                        </span>

                        <button 
                          onClick={() => { setSelectedProductId(banner.productId); setCurrentView('pdp'); }}
                          className="bg-white text-slate-900 hover:bg-[#ffe11b] active:scale-95 text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 transition-all duration-200"
                        >
                          <span>{banner.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Carousel Indicator Dots with Active Progress */}
                <div className="absolute bottom-2 left-4 z-20 flex items-center gap-1.5">
                  {PROMO_BANNERS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentBanner(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === currentBanner ? 'w-6 bg-[#ffe11b] shadow-sm' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                      title={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* SuperCoin Zone Strip */}
            <div className="mx-2 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-xl p-2.5 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white text-amber-500 flex items-center justify-center font-bold text-xs shadow-inner animate-pulse-glow">
                  <Coins className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-bold leading-none flex items-center gap-1">
                    SuperCoin Loyalty Zone <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded font-mono">120 COINS</span>
                  </p>
                  <p className="text-[10px] text-amber-100 mt-0.5">Use coins for instant mystery discounts at checkout</p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentView('catalog')}
                className="text-[11px] font-bold bg-white text-amber-800 hover:bg-amber-50 active:scale-95 px-3 py-1 rounded-lg shadow-sm transition-transform"
              >
                Redeem
              </button>
            </div>

            {/* Deal of the Day Grid with Live Animated Countdown */}
            <section className="bg-white p-3 shadow-xs rounded-xl mx-2 border border-slate-100">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                      Deals of the Day
                    </h3>
                    {/* Live Animated Ticking Countdown */}
                    <div className="flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shadow-xs">
                      <Clock className="w-3 h-3 text-red-600 shrink-0" />
                      <span>{String(countdown.hours).padStart(2, '0')}h</span>
                      <span>:</span>
                      <span>{String(countdown.minutes).padStart(2, '0')}m</span>
                      <span>:</span>
                      <span className="text-red-600 font-black">{String(countdown.seconds).padStart(2, '0')}s</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Special limited-stock flash pricing</p>
                </div>
                <button 
                  onClick={() => setCurrentView('catalog')} 
                  className="bg-[#2874f0] hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-transform"
                >
                  View All
                </button>
              </div>

              {/* Animated Product Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {products.slice(0, 4).map((prod) => (
                  <div 
                    key={prod.id} 
                    onClick={() => { setSelectedProductId(prod.id); setCurrentView('pdp'); }}
                    className="group bg-white rounded-xl border border-slate-100 p-2.5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer relative overflow-hidden"
                  >
                    {/* Image Container with Smooth Zoom on Hover */}
                    <div className="relative overflow-hidden rounded-lg bg-slate-50 aspect-square flex items-center justify-center p-2 mb-2">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out" 
                      />

                      {/* Animated Shimmering Discount Badge */}
                      <span className="absolute top-1.5 left-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% OFF
                      </span>

                      {/* Interactive Heart Wishlist Button with Heartbeat Animation */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(prod.id);
                        }}
                        className={`absolute top-1.5 right-1.5 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-90 ${recentlyToggledWishlistId === prod.id ? 'animate-heartbeat' : ''}`}
                        title="Save to Wishlist"
                      >
                        <Heart 
                          className={`w-3.5 h-3.5 transition-colors ${wishlist.includes(prod.id) ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-500'}`} 
                        />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 group-hover:text-[#2874f0] transition-colors">
                        {prod.name}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xs font-bold text-slate-900">₹{prod.price.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-400 line-through">₹{prod.mrp.toLocaleString('en-IN')}</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-1 mt-1.5 pt-1.5 border-t border-slate-50">
                        <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Assured</span>
                        </div>

                        {/* Quick 1-Tap Add to Cart */}
                        <button
                          onClick={(e) => quickAddToCart(prod, e)}
                          className="bg-blue-50 hover:bg-[#2874f0] text-[#2874f0] hover:text-white text-[10px] font-bold px-2 py-0.5 rounded transition-all duration-200 active:scale-90 shadow-2xs"
                          title="Quick Add to Cart"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sponsored Products / Seller Ads Banner */}
            <section className="bg-white p-3 shadow-xs rounded-xl mx-2 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Sponsored Seller Products
                </span>
                <span className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.2 rounded">Ad</span>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
                {products.slice(1, 4).map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => { setSelectedProductId(p.id); setCurrentView('pdp'); }}
                    className="group shrink-0 w-44 border border-blue-100 rounded-xl p-2.5 bg-gradient-to-b from-blue-50/30 to-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative overflow-hidden rounded-lg aspect-4/3 flex items-center justify-center p-1 bg-white mb-1.5">
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                      <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#2874f0] transition-colors">{p.name}</p>
                      <p className="text-[11px] text-[#2874f0] font-semibold mt-0.5">
                        ₹{p.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex gap-1.5 mt-2">
                      <button 
                        onClick={(e) => quickAddToCart(p, e)}
                        className="flex-1 bg-[#2874f0] hover:bg-blue-700 active:scale-95 text-white text-[10px] py-1.5 rounded-lg font-semibold shadow-xs transition-transform"
                      >
                        + Cart
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                        className={`w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center transition-transform active:scale-90 ${wishlist.includes(p.id) ? 'bg-red-50 text-red-500 border-red-200' : 'text-slate-400 hover:text-red-500'}`}
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW B: CATALOG / SEARCH RESULTS */}
        {currentView === 'catalog' && (
          <div className="bg-white min-h-screen">
            <div className="bg-slate-50 border-b border-slate-200 px-3 py-2 flex items-center justify-between text-xs">
              <span className="text-slate-600">Showing {products.length} products</span>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 border rounded px-2.5 py-1 text-slate-700 text-xs bg-white">
                  <Filter className="w-3 h-3" /> Filters
                </button>
              </div>
            </div>

            <div className="divide-y divide-slate-100 p-2 space-y-2">
              {products.map((prod) => (
                <div 
                  key={prod.id} 
                  className="group p-3 flex gap-3 hover:bg-blue-50/40 transition-all duration-300 cursor-pointer rounded-xl border border-transparent hover:border-blue-100 hover:shadow-md bg-white"
                  onClick={() => { setSelectedProductId(prod.id); setCurrentView('pdp'); }}
                >
                  <div className="w-24 h-24 shrink-0 bg-slate-50 rounded-lg p-1.5 flex items-center justify-center relative overflow-hidden">
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="max-h-full object-contain group-hover:scale-108 transition-transform duration-300" 
                    />
                    <span className="absolute bottom-1 left-1 bg-emerald-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded">
                      {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}%
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 group-hover:text-[#2874f0] transition-colors">{prod.name}</h3>
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleWishlist(prod.id); }}
                          className={`text-slate-300 hover:text-red-500 ml-2 p-1 transition-transform active:scale-90 ${recentlyToggledWishlistId === prod.id ? 'animate-heartbeat' : ''}`}
                          title="Save to Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${wishlist.includes(prod.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          {prod.rating} <Star className="w-2.5 h-2.5 fill-white text-white" />
                        </span>
                        <span className="text-[10px] text-slate-400">({prod.reviews_count.toLocaleString()})</span>
                        <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Assured
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between mt-2 pt-1">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-slate-900">₹{prod.price.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-slate-400 line-through">₹{prod.mrp.toLocaleString('en-IN')}</span>
                          <span className="text-xs text-emerald-600 font-bold">
                            {Math.round(((prod.mrp - prod.price) / prod.mrp) * 100)}% off
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500">Free delivery by Tomorrow</p>
                      </div>

                      <button 
                        onClick={(e) => quickAddToCart(prod, e)}
                        className="bg-blue-50 hover:bg-[#2874f0] text-[#2874f0] hover:text-white text-[11px] font-bold px-3 py-1 rounded-lg transition-all duration-200 active:scale-90 shadow-2xs"
                        title="Add to Cart"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW C: PRODUCT DETAIL PAGE (PDP) WITH 360 ROTATION */}
        {currentView === 'pdp' && (
          <div className="bg-white pb-20">
            {/* Gallery / 360 View Switcher */}
            <div className="relative bg-white p-4 border-b border-slate-100 flex flex-col items-center">
              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                <button 
                  onClick={() => setIs360Mode(!is360Mode)}
                  className="bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow"
                >
                  <RotateCcw className="w-3 h-3 animate-spin" /> {is360Mode ? '2D View' : '360° View'}
                </button>
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Assured
                </span>
              </div>

              {/* Wishlist Button */}
              <button 
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shadow-sm"
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(selectedProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
              </button>

              {/* Image or 360 Model */}
              {!is360Mode ? (
                <div className="w-full max-w-xs h-64 flex items-center justify-center p-2">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="max-h-full object-contain transition-transform duration-300 hover:scale-110 cursor-zoom-in"
                  />
                </div>
              ) : (
                <div className="w-full max-w-xs h-64 flex flex-col items-center justify-center p-2 bg-slate-50 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-600 mb-2">Drag slider to rotate 360°</span>
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <img 
                      src={selectedProduct.image} 
                      alt="360 view" 
                      style={{ transform: `rotateY(${rotationAngle}deg)` }}
                      className="max-h-full object-contain transition-transform duration-75"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="w-48 mt-3 accent-[#2874f0]"
                  />
                </div>
              )}

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 mt-3">
                {selectedProduct.gallery.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setIs360Mode(false)}
                    className="w-12 h-12 border-2 border-[#2874f0] rounded p-1"
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Meta */}
            <div className="p-3 border-b border-slate-100">
              <h1 className="text-sm font-semibold text-slate-900 leading-snug">
                {selectedProduct.name}
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                  {selectedProduct.rating} <Star className="w-2.5 h-2.5 fill-white text-white" />
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedProduct.reviews_count.toLocaleString()} Ratings & Reviews
                </span>
              </div>

              {/* Price Details */}
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xl font-bold text-slate-900">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                <span className="text-xs text-slate-400 line-through">₹{selectedProduct.mrp.toLocaleString('en-IN')}</span>
                <span className="text-xs text-emerald-600 font-bold">
                  {Math.round(((selectedProduct.mrp - selectedProduct.price) / selectedProduct.mrp) * 100)}% off
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Inclusive of all taxes</p>

              {/* Instant Purchase Direct Action Banner */}
              <div className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#fb641b] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <i className="fa-solid fa-bolt text-[#ffe11b] text-sm animate-pulse"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-slate-900">Express Direct Checkout</span>
                      <span className="text-[9px] font-extrabold uppercase bg-orange-500 text-white px-1.5 py-0.2 rounded-full">
                        Instant
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600">Skip cart entirely & complete payment in 1 step</p>
                  </div>
                </div>
                <button
                  onClick={() => handleBuyNow(selectedProduct)}
                  className="bg-[#fb641b] hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs px-3.5 py-2 rounded-lg shadow-md flex items-center gap-1.5 shrink-0 transition-all cursor-pointer whitespace-nowrap"
                >
                  <i className="fa-solid fa-bolt text-[#ffe11b] text-[11px]"></i>
                  Buy Now
                </button>
              </div>

              {/* Offers Strip */}
              <div className="mt-2.5 space-y-1 text-[11px] text-slate-700">
                <div className="flex items-start gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Bank Offer:</strong> 10% instant discount on Axis Bank & HDFC Cards up to ₹1,500</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>SuperCoins:</strong> Use 50 SuperCoins to save extra ₹50 instantly</span>
                </div>
              </div>
            </div>

            {/* Variant Selector */}
            <div className="p-3 border-b border-slate-100 space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Color: {selectedColor}</span>
                <div className="flex gap-2">
                  {selectedProduct.colors.map((c) => (
                    <button 
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-semibold border ${selectedColor === c ? 'border-[#2874f0] bg-blue-50/50 text-[#2874f0]' : 'border-slate-200 text-slate-700'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1.5">Variant:</span>
                <div className="flex gap-2">
                  {selectedProduct.variants.map((v) => (
                    <button 
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 text-xs rounded-lg font-semibold border ${selectedVariant === v ? 'border-[#2874f0] bg-blue-50/50 text-[#2874f0]' : 'border-slate-200 text-slate-700'}`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pincode & Delivery Estimator */}
            <div className="p-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 mb-2">Check Delivery & Services</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode" 
                  className="flex-1 border border-slate-300 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#2874f0]"
                />
                <button 
                  onClick={() => setPincodeChecked(true)} 
                  className="bg-[#2874f0] text-white text-xs font-semibold px-4 py-1.5 rounded"
                >
                  Check
                </button>
              </div>
              {pincodeChecked && (
                <div className="mt-2 text-xs text-slate-700 space-y-1">
                  <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Delivery to {pincode} by Tomorrow, 9 PM | <span className="font-bold">FREE</span>
                  </p>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <i className="fa-solid fa-money-bill-wave text-slate-400"></i> Cash on Delivery available
                  </p>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Open Box Delivery Eligible (OTP verification before opening)
                  </p>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="p-3 border-b border-slate-100 text-xs">
              <h3 className="font-bold text-slate-900 mb-2">Specifications</h3>
              <div className="divide-y divide-slate-100">
                {Object.entries(selectedProduct.specs).map(([key, val]) => (
                  <div key={key} className="py-1.5 flex justify-between">
                    <span className="text-slate-500 w-1/3">{key}</span>
                    <span className="text-slate-800 font-medium w-2/3">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky PDP Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex h-14 shadow-2xl max-w-md mx-auto sm:max-w-none">
              <button 
                onClick={() => addToCart(selectedProduct)}
                className="flex-1 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 border-r border-slate-200 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 text-[#fb641b]" /> ADD TO CART
              </button>
              <button 
                onClick={() => handleBuyNow(selectedProduct)}
                className="flex-1 bg-[#fb641b] hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <i className="fa-solid fa-bolt text-[#ffe11b] group-hover:scale-125 transition-transform"></i> BUY NOW
              </button>
            </div>
          </div>
        )}

        {/* VIEW D: CART */}
        {currentView === 'cart' && (
          <div className="bg-white min-h-screen pb-20">
            <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
              <div>
                <p className="text-slate-500">Deliver to: <strong className="text-slate-800">{activeAddress.name}, {activeAddress.pincode}</strong> <span className="bg-slate-200 text-slate-700 text-[9px] px-1.5 py-0.2 rounded font-semibold ml-1">{activeAddress.addressType}</span></p>
                <p className="text-[10px] text-slate-500 truncate max-w-[260px] sm:max-w-md">{activeAddress.houseNumber}, {activeAddress.locality}, {activeAddress.city}</p>
              </div>
              <button 
                onClick={() => {
                  setCurrentView('checkout');
                  setIsManagingAddress(true);
                }} 
                className="text-[#2874f0] font-bold border border-[#2874f0]/30 hover:border-[#2874f0] hover:bg-blue-50 px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <ShoppingCart className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-bold text-slate-700">Your Flipkart Cart is Empty</p>
                <button onClick={() => setCurrentView('catalog')} className="mt-4 bg-[#2874f0] text-white text-xs font-bold px-4 py-2 rounded">
                  Shop Now
                </button>
              </div>
            ) : (
              <div>
                {/* Cart Items */}
                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={item.product.id} className="p-3">
                      <div className="flex gap-3">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-contain p-1 rounded bg-slate-50" />
                        <div className="flex-1">
                          <h3 className="text-xs font-semibold text-slate-900 line-clamp-1">{item.product.name}</h3>
                          <p className="text-[11px] text-slate-400 mt-0.5">Seller: TechGizmo Retailers</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-sm font-bold text-slate-900">₹{item.product.price.toLocaleString('en-IN')}</span>
                            <span className="text-xs text-slate-400 line-through">₹{item.product.mrp.toLocaleString('en-IN')}</span>
                          </div>
                          <p className="text-[10px] text-emerald-600 font-medium mt-1">Free Delivery by Tomorrow</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-50 mt-3 pt-2 text-xs">
                        <div className="flex items-center border border-slate-200 rounded">
                          <button 
                            onClick={() => {
                              if (item.quantity > 1) {
                                setCart(cart.map(i => i.product.id === item.product.id ? { ...i, quantity: i.quantity - 1 } : i));
                              } else {
                                setCart(cart.filter(i => i.product.id !== item.product.id));
                              }
                            }}
                            className="px-2.5 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                          >-</button>
                          <span className="px-3 py-0.5 border-x border-slate-200 font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => setCart(cart.map(i => i.product.id === item.product.id ? { ...i, quantity: i.quantity + 1 } : i))}
                            className="px-2.5 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                          >+</button>
                        </div>
                        <div className="flex gap-3 text-slate-600 font-medium">
                          <button onClick={() => setCart(cart.filter(i => i.product.id !== item.product.id))} className="hover:text-red-600">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SuperCoins Loyalty Checkbox */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg mx-3 my-2 p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-500" />
                    <div>
                      <p className="font-bold text-slate-800">Redeem SuperCoins</p>
                      <p className="text-[10px] text-slate-500">Save ₹{coinsDeduction} using your coin balance</p>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={useSupercoins} 
                    onChange={(e) => setUseSupercoins(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 rounded"
                  />
                </div>

                {/* Price Breakdown */}
                <div className="p-4 border-t border-slate-200 text-xs space-y-2">
                  <h4 className="font-bold text-slate-800 uppercase text-[10px] mb-2">Price Details ({cart.length} Items)</h4>
                  <div className="flex justify-between text-slate-600">
                    <span>Total MRP</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount on MRP</span>
                    <span>- ₹{cartDiscount.toLocaleString('en-IN')}</span>
                  </div>
                  {useSupercoins && (
                    <div className="flex justify-between text-emerald-600">
                      <span>SuperCoins Discount</span>
                      <span>- ₹{coinsDeduction}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Secured Packaging & Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-sm text-slate-900">
                    <span>Total Amount</span>
                    <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Sticky Bottom Place Order Bar */}
                <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 flex items-center justify-between px-4 h-14 shadow-2xl max-w-md mx-auto sm:max-w-none">
                  <div>
                    <span className="text-[10px] text-slate-400 block leading-none">Total Amount</span>
                    <span className="text-base font-bold text-slate-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <button 
                    onClick={() => setCurrentView('checkout')}
                    className="bg-[#fb641b] hover:bg-orange-600 text-white font-bold text-xs px-6 py-2.5 rounded shadow"
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW E: WISHLIST */}
        {currentView === 'wishlist' && (
          <div className="bg-white min-h-screen">
            <div className="p-3 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-xs font-bold text-slate-800 uppercase">My Wishlist ({wishlist.length} Items)</h2>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                Price Drop Alerts: ON
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {wishlist.map((id) => {
                const prod = products.find(p => p.id === id);
                if (!prod) return null;
                return (
                  <div key={prod.id} className="p-3 flex gap-3">
                    <img src={prod.image} alt={prod.name} className="w-20 h-20 object-contain p-1 rounded bg-slate-50 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xs font-semibold text-slate-900 line-clamp-1">{prod.name}</h3>
                        <button onClick={() => toggleWishlist(prod.id)} className="text-slate-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-bold text-slate-900">₹{prod.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-slate-400 line-through">₹{prod.mrp.toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1 font-semibold">
                        <i className="fa-solid fa-arrow-trend-down mr-1"></i> Price dropped by ₹2,000 recently!
                      </p>
                      <div className="mt-2 flex gap-2">
                        <button 
                          onClick={() => { addToCart(prod); toggleWishlist(prod.id); }}
                          className="bg-[#2874f0] text-white text-xs font-semibold px-3 py-1 rounded"
                        >
                          Move to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW F: CHECKOUT */}
        {currentView === 'checkout' && (
          <div className="p-3 max-w-lg mx-auto pb-20 space-y-3">
            {/* Direct Buy Now Indicator Banner */}
            {directBuyItem ? (
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg p-3 text-white shadow-md flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                    <i className="fa-solid fa-bolt text-[#ffe11b]"></i>
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-wider uppercase bg-white/20 px-2 py-0.5 rounded-full inline-block mb-0.5">
                      Direct Buy Now Active
                    </span>
                    <p className="text-xs font-bold leading-tight">Instant Checkout — Skipped Cart</p>
                    <p className="text-[10px] text-orange-100">Your existing cart items remain safely preserved</p>
                  </div>
                </div>
                <button
                  onClick={() => { setDirectBuyItem(null); setCurrentView('pdp'); }}
                  className="text-[11px] font-semibold bg-white text-orange-600 px-2.5 py-1 rounded shadow-xs hover:bg-orange-50"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-[#2874f0]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-semibold">100% Safe & Secure Payments (256-Bit SSL)</span>
                </div>
              </div>
            )}

            {/* Direct Buy Purchased Item Card Summary */}
            {directBuyItem && (
              <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm text-xs flex gap-3 items-center">
                <img 
                  src={directBuyItem.product.image} 
                  alt={directBuyItem.product.name} 
                  className="w-16 h-16 object-contain p-1 rounded bg-slate-50 border border-slate-100 shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold inline-block mb-1">
                    Direct Buy Item
                  </span>
                  <h4 className="font-bold text-slate-900 line-clamp-1">{directBuyItem.product.name}</h4>
                  <p className="text-[11px] text-slate-500">
                    Qty: {directBuyItem.quantity} | {directBuyItem.color} | {directBuyItem.variant}
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-extrabold text-slate-900">₹{(directBuyItem.product.price * directBuyItem.quantity).toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-400 line-through">₹{(directBuyItem.product.mrp * directBuyItem.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Trust badge */}
            {directBuyItem && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 flex items-center justify-between text-xs text-[#2874f0]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-semibold">100% Safe & Secure Payments (256-Bit SSL)</span>
                </div>
              </div>
            )}

            {/* 1. DELIVERY ADDRESS (Flipkart-Style Detailed Address Experience) */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm text-xs overflow-hidden">
              {/* Header */}
              <div className="bg-slate-50/80 px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2874f0] text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                    1
                  </span>
                  <span className="font-bold text-slate-900 uppercase tracking-wide text-xs">
                    Delivery Address
                  </span>
                  <span className="text-[10px] bg-blue-50 text-[#2874f0] font-semibold px-2 py-0.2 rounded-full border border-blue-200 hidden sm:inline-block">
                    Flipkart Express
                  </span>
                </div>
                {!isManagingAddress && (
                  <button 
                    type="button"
                    onClick={() => {
                      setIsManagingAddress(true);
                      setIsAddingNewAddress(false);
                      setEditingAddressId(null);
                    }} 
                    className="text-[#2874f0] hover:text-blue-800 font-bold text-xs uppercase tracking-wide border border-[#2874f0]/30 hover:border-[#2874f0] hover:bg-blue-50 px-2.5 py-1 rounded-md transition-all cursor-pointer"
                  >
                    Change
                  </button>
                )}
                {isManagingAddress && !isAddingNewAddress && !editingAddressId && (
                  <button 
                    type="button"
                    onClick={() => setIsManagingAddress(false)} 
                    className="text-slate-600 hover:text-slate-900 font-bold text-xs uppercase tracking-wide border border-slate-300 px-2.5 py-1 rounded-md transition-all cursor-pointer"
                  >
                    Close
                  </button>
                )}
              </div>

              {/* COLLAPSED VIEW: Active Selected Address Card */}
              {!isManagingAddress && (
                <div className="p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-slate-900 text-sm">{activeAddress.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider ${
                        activeAddress.addressType === 'HOME' ? 'bg-slate-100 text-slate-700' : 'bg-blue-50 text-[#2874f0] border border-blue-200'
                      }`}>
                        {activeAddress.addressType}
                      </span>
                    </div>
                    <span className="text-slate-600 font-bold font-mono text-xs">
                      {activeAddress.phone}
                    </span>
                  </div>

                  {/* Detailed Address Grid / Breakdown */}
                  <div className="bg-slate-50/70 rounded-lg p-2.5 border border-slate-200/80 text-[11.5px] space-y-1 text-slate-700">
                    <p className="font-semibold text-slate-900 flex items-start gap-1.5">
                      <Home className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>{activeAddress.houseNumber}, {activeAddress.locality}</span>
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-600 pl-5">
                      <span>{activeAddress.city}, {activeAddress.state}</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-bold text-slate-900 font-mono">PIN: {activeAddress.pincode}</span>
                    </p>
                    {activeAddress.landmark && (
                      <p className="text-[10.5px] text-slate-500 pl-5">
                        Landmark: <span className="text-slate-700 font-medium">{activeAddress.landmark}</span>
                      </p>
                    )}
                    {activeAddress.alternatePhone && (
                      <p className="text-[10.5px] text-slate-500 pl-5">
                        Alt Phone: <span className="text-slate-700 font-mono">{activeAddress.alternatePhone}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Open-box delivery available at this address</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        handleStartEditAddress(activeAddress);
                        setIsManagingAddress(true);
                      }}
                      className="text-[#2874f0] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                  </div>
                </div>
              )}

              {/* EXPANDED VIEW: Address Selection List & Form */}
              {isManagingAddress && (
                <div className="p-3.5 space-y-3 animate-pop">
                  {/* State 1: Viewing Saved Addresses list */}
                  {!isAddingNewAddress && !editingAddressId && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-1">
                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                          Select Delivery Address ({addresses.length})
                        </span>
                        <button
                          type="button"
                          onClick={handleStartAddAddress}
                          className="bg-[#2874f0] hover:bg-blue-600 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Address</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        {addresses.map((addr) => {
                          const isSelected = addr.id === selectedAddressId;
                          return (
                            <div 
                              key={addr.id}
                              onClick={() => setSelectedAddressId(addr.id)}
                              className={`border rounded-xl p-3 transition-all cursor-pointer ${
                                isSelected 
                                  ? 'border-[#2874f0] bg-blue-50/20 ring-1 ring-[#2874f0]/40 shadow-xs' 
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className="flex items-start gap-2.5">
                                <input 
                                  type="radio" 
                                  name="selected_delivery_addr" 
                                  checked={isSelected}
                                  onChange={() => setSelectedAddressId(addr.id)}
                                  className="mt-1 accent-[#2874f0] cursor-pointer"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-slate-900 text-xs">{addr.name}</span>
                                      <span className="text-[9px] bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded uppercase">
                                        {addr.addressType}
                                      </span>
                                      {addr.isDefault && (
                                        <span className="text-[9px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                                          DEFAULT
                                        </span>
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartEditAddress(addr);
                                      }}
                                      className="text-[#2874f0] hover:text-blue-800 text-[11px] font-bold uppercase tracking-wider flex items-center gap-0.5 cursor-pointer ml-2"
                                    >
                                      <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                  </div>

                                  <div className="text-[11px] text-slate-600 mt-1 space-y-0.5">
                                    <p className="font-medium text-slate-800">
                                      {addr.houseNumber}, {addr.locality}
                                    </p>
                                    <p>
                                      {addr.city}, {addr.state} - <span className="font-bold font-mono text-slate-900">{addr.pincode}</span>
                                    </p>
                                    <p className="font-mono text-slate-500 text-[10px]">
                                      Phone: {addr.phone} {addr.alternatePhone ? `| Alt: ${addr.alternatePhone}` : ''}
                                    </p>
                                  </div>

                                  {isSelected && (
                                    <div className="mt-2.5 pt-2 border-t border-blue-200/60 flex items-center justify-between">
                                      <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Deliver to this address
                                      </span>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setPincode(addr.pincode);
                                          setIsManagingAddress(false);
                                          showToast('Delivering to ' + addr.houseNumber, addr.city + ', ' + addr.state);
                                        }}
                                        className="bg-[#fb641b] hover:bg-[#e85b17] active:scale-95 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer uppercase tracking-wider"
                                      >
                                        Deliver Here
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={handleStartAddAddress}
                        className="w-full py-2.5 border-2 border-dashed border-[#2874f0]/40 hover:border-[#2874f0] bg-blue-50/40 hover:bg-blue-50/70 text-[#2874f0] rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Add A New Delivery Address</span>
                      </button>
                    </div>
                  )}

                  {/* State 2: Full Detailed Flipkart Address Input Form */}
                  {(isAddingNewAddress || editingAddressId) && (
                    <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-3.5 space-y-3 text-left">
                      <div className="flex items-center justify-between border-b pb-2 border-slate-200">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#2874f0]" />
                          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wide">
                            {editingAddressId ? 'Edit Delivery Address' : 'Add A New Address'}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingNewAddress(false);
                            setEditingAddressId(null);
                          }}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* GPS Autofill Quick Action */}
                      <button
                        type="button"
                        onClick={() => {
                          handlePincodeChange('201301');
                          showToast('GPS Location Detected 📍', 'Sector 62, Noida, Uttar Pradesh (201301)');
                        }}
                        className="w-full py-2 px-3 bg-white hover:bg-blue-50 text-[#2874f0] font-bold text-[11px] rounded-lg border border-[#2874f0]/30 flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                      >
                        <Crosshair className="w-3.5 h-3.5 text-[#2874f0]" />
                        <span>Use My Current Location (Autofill State & City)</span>
                      </button>

                      {/* Input Grid */}
                      <div className="space-y-2.5 text-xs">
                        {/* Row 1: Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-700 block mb-1">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressFormData.name}
                              onChange={(e) => {
                                setAddressFormData(prev => ({ ...prev, name: e.target.value }));
                                if (addressFormErrors.name) setAddressFormErrors(prev => ({ ...prev, name: '' }));
                              }}
                              placeholder="e.g. Rahul Sharma"
                              className={`w-full bg-white border rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0] ${
                                addressFormErrors.name ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-300'
                              }`}
                            />
                            {addressFormErrors.name && (
                              <p className="text-[10px] text-red-500 mt-0.5">{addressFormErrors.name}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-700 block mb-1">
                              10-digit Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                              <span className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg px-2 py-2 text-[11px] font-bold text-slate-600">
                                +91
                              </span>
                              <input
                                type="tel"
                                maxLength={10}
                                value={addressFormData.phone}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                  setAddressFormData(prev => ({ ...prev, phone: val }));
                                  if (addressFormErrors.phone) setAddressFormErrors(prev => ({ ...prev, phone: '' }));
                                }}
                                placeholder="e.g. 9876543210"
                                className={`w-full bg-white border rounded-r-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0] ${
                                  addressFormErrors.phone ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-300'
                                }`}
                              />
                            </div>
                            {addressFormErrors.phone && (
                              <p className="text-[10px] text-red-500 mt-0.5">{addressFormErrors.phone}</p>
                            )}
                          </div>
                        </div>

                        {/* Row 2: Pin Code & Locality */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[10px] font-bold text-slate-700">
                                Pin Code <span className="text-red-500">*</span>
                              </label>
                              <span className="text-[9px] text-[#2874f0]">Auto-detects City</span>
                            </div>
                            <input
                              type="text"
                              maxLength={6}
                              value={addressFormData.pincode}
                              onChange={(e) => handlePincodeChange(e.target.value)}
                              placeholder="6 digits [0-9] (e.g. 201301)"
                              className={`w-full bg-white border rounded-lg px-2.5 py-2 text-xs font-mono focus:outline-none focus:border-[#2874f0] ${
                                addressFormErrors.pincode ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-300'
                              }`}
                            />
                            {addressFormErrors.pincode && (
                              <p className="text-[10px] text-red-500 mt-0.5">{addressFormErrors.pincode}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-700 block mb-1">
                              Locality / Area / Colony <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressFormData.locality}
                              onChange={(e) => {
                                setAddressFormData(prev => ({ ...prev, locality: e.target.value }));
                                if (addressFormErrors.locality) setAddressFormErrors(prev => ({ ...prev, locality: '' }));
                              }}
                              placeholder="e.g. Sector 62, Near IT Park"
                              className={`w-full bg-white border rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0] ${
                                addressFormErrors.locality ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-300'
                              }`}
                            />
                            {addressFormErrors.locality && (
                              <p className="text-[10px] text-red-500 mt-0.5">{addressFormErrors.locality}</p>
                            )}
                          </div>
                        </div>

                        {/* Row 3: House Number / Building Name */}
                        <div>
                          <label className="text-[10px] font-bold text-slate-700 block mb-1">
                            House Number, Flat No., Building Name, Apartment <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={addressFormData.houseNumber}
                            onChange={(e) => {
                              setAddressFormData(prev => ({ ...prev, houseNumber: e.target.value }));
                              if (addressFormErrors.houseNumber) setAddressFormErrors(prev => ({ ...prev, houseNumber: '' }));
                            }}
                            placeholder="e.g. Flat 402, Lotus Heights / House No. 24-B"
                            className={`w-full bg-white border rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0] ${
                              addressFormErrors.houseNumber ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-300'
                            }`}
                          />
                          {addressFormErrors.houseNumber && (
                            <p className="text-[10px] text-red-500 mt-0.5">{addressFormErrors.houseNumber}</p>
                          )}
                        </div>

                        {/* Row 4: City & State */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-700 block mb-1">
                              City / District / Town <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={addressFormData.city}
                              onChange={(e) => {
                                setAddressFormData(prev => ({ ...prev, city: e.target.value }));
                                if (addressFormErrors.city) setAddressFormErrors(prev => ({ ...prev, city: '' }));
                              }}
                              placeholder="e.g. Noida / New Delhi"
                              className={`w-full bg-white border rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0] ${
                                addressFormErrors.city ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-300'
                              }`}
                            />
                            {addressFormErrors.city && (
                              <p className="text-[10px] text-red-500 mt-0.5">{addressFormErrors.city}</p>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-700 block mb-1">
                              State <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={addressFormData.state}
                              onChange={(e) => {
                                setAddressFormData(prev => ({ ...prev, state: e.target.value }));
                                if (addressFormErrors.state) setAddressFormErrors(prev => ({ ...prev, state: '' }));
                              }}
                              className={`w-full bg-white border rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0] ${
                                addressFormErrors.state ? 'border-red-400 ring-1 ring-red-300' : 'border-slate-300'
                              }`}
                            >
                              <option value="">Select State</option>
                              {INDIAN_STATES.map((st) => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                            {addressFormErrors.state && (
                              <p className="text-[10px] text-red-500 mt-0.5">{addressFormErrors.state}</p>
                            )}
                          </div>
                        </div>

                        {/* Row 5: Landmark (Optional) & Alternate Phone (Optional) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] font-bold text-slate-700 block mb-1">
                              Landmark (Optional)
                            </label>
                            <input
                              type="text"
                              value={addressFormData.landmark || ''}
                              onChange={(e) => setAddressFormData(prev => ({ ...prev, landmark: e.target.value }))}
                              placeholder="e.g. Near Metro Station / Behind Mall"
                              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-slate-700 block mb-1">
                              Alternate Phone (Optional)
                            </label>
                            <input
                              type="tel"
                              maxLength={10}
                              value={addressFormData.alternatePhone || ''}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                setAddressFormData(prev => ({ ...prev, alternatePhone: val }));
                              }}
                              placeholder="e.g. 9811223344"
                              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
                            />
                          </div>
                        </div>

                        {/* Row 6: Address Type Radio Selection */}
                        <div className="pt-1">
                          <label className="text-[10px] font-bold text-slate-700 block mb-1.5">
                            Type of Address
                          </label>
                          <div className="flex gap-2">
                            <label className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border cursor-pointer transition-all ${
                              addressFormData.addressType === 'HOME'
                                ? 'bg-blue-50 border-[#2874f0] text-[#2874f0] font-bold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}>
                              <input
                                type="radio"
                                name="formAddressType"
                                checked={addressFormData.addressType === 'HOME'}
                                onChange={() => setAddressFormData(prev => ({ ...prev, addressType: 'HOME' }))}
                                className="sr-only"
                              />
                              <Home className="w-3.5 h-3.5" />
                              <span className="text-xs">Home (All Day Delivery)</span>
                            </label>

                            <label className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border cursor-pointer transition-all ${
                              addressFormData.addressType === 'WORK'
                                ? 'bg-blue-50 border-[#2874f0] text-[#2874f0] font-bold shadow-2xs'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}>
                              <input
                                type="radio"
                                name="formAddressType"
                                checked={addressFormData.addressType === 'WORK'}
                                onChange={() => setAddressFormData(prev => ({ ...prev, addressType: 'WORK' }))}
                                className="sr-only"
                              />
                              <Briefcase className="w-3.5 h-3.5" />
                              <span className="text-xs">Work (10 AM - 5 PM)</span>
                            </label>
                          </div>
                        </div>

                        {/* Form Buttons */}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSaveAddress}
                            className="flex-1 py-2.5 px-4 bg-[#fb641b] hover:bg-[#e85b17] active:scale-95 text-white font-extrabold rounded-xl shadow-md text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>Save and Deliver Here</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingNewAddress(false);
                              setEditingAddressId(null);
                            }}
                            className="py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-300 text-xs transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment Options - Cash on Delivery COD Only */}
            <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm text-xs space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-bold text-slate-800 uppercase tracking-wide">2. Payment Method</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Safe Doorstep Payment
                </span>
              </div>
              
              {/* Single Available Payment Method: Cash on Delivery (COD) */}
              <div className="border-2 border-emerald-500 bg-emerald-50/25 rounded-xl p-3.5 space-y-3 shadow-xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">Cash on Delivery (COD)</span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full border border-emerald-300">
                          AVAILABLE
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Pay cash or UPI QR upon delivery at your doorstep
                      </p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>

                <div className="bg-white rounded-lg p-2.5 border border-emerald-200/80 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Open-Box Delivery & Verification Included</span>
                  </div>
                  <p className="text-[10.5px] text-slate-500 leading-relaxed">
                    Check your package before paying the delivery agent. No online pre-payment required.
                  </p>
                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Amount Due at Doorstep:</span>
                    <span className="font-extrabold text-slate-900 font-mono text-xs">
                      ₹{activePayableAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Details - Flipkart Style */}
            <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm text-xs">
              <span className="font-bold text-slate-800 uppercase block border-b pb-2 mb-2 text-[11px] tracking-wide">
                Price Details {directBuyItem ? '(1 Item)' : `(${cart.length} ${cart.length === 1 ? 'Item' : 'Items'})`}
              </span>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Price ({directBuyItem ? '1 item' : `${cart.length} items`})</span>
                  <span>₹{(directBuyItem ? directSubtotal : cartSubtotal).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>- ₹{(directBuyItem ? directDiscount : cartDiscount).toLocaleString('en-IN')}</span>
                </div>
                {useSupercoins && (
                  <div className="flex justify-between text-emerald-600">
                    <span>SuperCoins Applied</span>
                    <span>- ₹{(directBuyItem ? directCoinsDeduction : coinsDeduction).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-emerald-600 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Secured Packaging Fee</span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-extrabold text-slate-900 text-sm">
                  <span>Total Amount Payable</span>
                  <span className="text-[#2874f0]">₹{activePayableAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>You will save ₹{((directBuyItem ? directDiscount + (useSupercoins ? directCoinsDeduction : 0) : cartDiscount + (useSupercoins ? coinsDeduction : 0))).toLocaleString('en-IN')} on this order</span>
              </div>
            </div>

            {/* Standard Bottom Order Placement Button */}
            <div className="space-y-2 pt-1">
              <button 
                onClick={handleCompleteCheckout}
                disabled={paymentAuthStatus !== 'idle'}
                className="w-full py-3.5 px-4 rounded-xl shadow-lg active:scale-[0.99] text-white text-sm font-extrabold flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group bg-[#fb641b] hover:bg-[#e85b17]"
              >
                {paymentAuthStatus === 'awaiting_auth' || paymentAuthStatus === 'verifying' ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-white text-base"></i>
                    <span>CONFIRMING COD ORDER...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-bag-shopping text-[#ffe11b] text-base group-hover:scale-110 transition-transform"></i>
                    <span className="tracking-wide uppercase">PLACE ORDER (CASH ON DELIVERY)</span>
                    <span className="text-orange-200 font-normal">|</span>
                    <span className="font-extrabold">₹{activePayableAmount.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>

              <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-slate-500 font-medium text-center">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cash on Delivery • Pay at Doorstep upon Delivery</span>
                </div>
                <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                  Order confirmation & delivery updates only trigger after receiving order authorization
                </span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW G: POST-PURCHASE ORDER TRACKING & TIMELINE */}
        {currentView === 'tracking' && (
          <div className="p-3 max-w-lg mx-auto pb-20 space-y-3">
            {/* Multiple Orders Selector Bar */}
            {orders.length > 1 && (
              <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs space-y-1">
                <div className="flex items-center justify-between px-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Your Placed Orders ({orders.length})</span>
                  <span className="text-[9px] text-[#2874f0] font-semibold">Select to track</span>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {orders.map((ord) => (
                    <button
                      key={ord.id}
                      type="button"
                      onClick={() => setActiveTrackingOrder(ord)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeTrackingOrder.id === ord.id
                          ? 'bg-[#2874f0] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span>#{ord.order_number.slice(-6)}</span>
                      <span className={`text-[8.5px] px-1 py-0.2 rounded font-extrabold uppercase ${
                        activeTrackingOrder.id === ord.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {ord.status.replace('_', ' ')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* PAYMENT PENDING GUARD: If payment authorization was not completed */}
            {activeTrackingOrder.payment_status === 'pending' && activeTrackingOrder.payment_method !== 'cod' ? (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3.5 space-y-2.5 shadow-sm text-left">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-amber-950">Payment Authorization Pending</h4>
                    <p className="text-[10px] text-amber-800 leading-relaxed mt-0.5">
                      Order confirmation and delivery status updates are <strong>strictly on hold</strong> until successful payment authorization is received.
                    </p>
                  </div>
                </div>

                <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-[10px] flex items-center justify-between text-amber-900">
                  <span className="font-mono">Order #{activeTrackingOrder.order_number}</span>
                  <span className="font-bold">₹{activeTrackingOrder.total_amount.toLocaleString('en-IN')}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPendingOrder({
                      orderNumber: activeTrackingOrder.order_number,
                      purchaseProduct: activeTrackingOrder.product,
                      purchaseQty: activeTrackingOrder.quantity,
                      purchaseTotal: activeTrackingOrder.total_amount,
                      paymentMethod: activeTrackingOrder.payment_method,
                      isDirect: false,
                      initiatedAt: activeTrackingOrder.created_at
                    });
                    setPaymentAuthStatus('awaiting_auth');
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Authorize Payment Now to Start Delivery</span>
                </button>
              </div>
            ) : (
              /* Success Confirmed Box */
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm shadow">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-slate-800">Order Confirmed!</p>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.2 rounded border border-emerald-300">
                        {activeTrackingOrder.payment_method === 'cod' ? 'COD AUTHORIZED' : 'PAYMENT AUTHORIZED'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500">Order #{activeTrackingOrder.order_number} • {activeTrackingOrder.created_at}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInvoiceModal(true)} 
                  className="text-xs text-[#2874f0] font-semibold border border-[#2874f0]/30 px-2.5 py-1 rounded flex items-center gap-1 bg-white hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Invoice
                </button>
              </div>
            )}

            {/* Direct UPI Bank Transfer Settlement Receipt */}
            {activeTrackingOrder.payment_method === 'upi' && activeTrackingOrder.upi_transaction && (
              <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-xl p-3.5 border border-emerald-500/40 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        Direct Bank Transfer Confirmed
                        <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded border border-emerald-500/30">NPCI 200 OK</span>
                      </h4>
                      <p className="text-[10px] text-emerald-400/90 font-medium">Funds transferred directly to configured bank account</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-[#ffe11b]">
                    ₹{activeTrackingOrder.total_amount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] bg-black/25 p-2 rounded-lg border border-emerald-500/20">
                  <div>
                    <span className="text-slate-400 block text-[9px]">Destination Bank:</span>
                    <span className="font-bold text-white line-clamp-1">{activeTrackingOrder.upi_transaction.destination_bank}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Credited Account:</span>
                    <span className="font-mono font-bold text-white">••••{activeTrackingOrder.upi_transaction.destination_account.slice(-4)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">IFSC Code:</span>
                    <span className="font-mono text-slate-200">{activeTrackingOrder.upi_transaction.destination_ifsc}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">Settlement Mode:</span>
                    <span className="text-emerald-300 font-medium">Real-time Auto Credit</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] bg-emerald-500/10 px-2.5 py-1.5 rounded-lg border border-emerald-500/20">
                  <div className="font-mono">
                    <span className="text-slate-400 text-[9px] block">12-Digit NPCI UTR / RRN:</span>
                    <span className="font-bold text-emerald-200 tracking-wider">{activeTrackingOrder.upi_transaction.utr_number}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(activeTrackingOrder.upi_transaction?.utr_number || '');
                      showToast('UTR Copied! 📋', activeTrackingOrder.upi_transaction?.utr_number);
                    }}
                    className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-[10px] px-2 py-1 rounded transition-colors cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-[#ffe11b]" />
                    <span>Copy UTR</span>
                  </button>
                </div>
              </div>
            )}

            {/* Open Box Delivery OTP */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-lg p-3 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#ffe11b] font-bold tracking-wider uppercase block">Open Box Delivery</span>
                  <p className="text-xs text-slate-200">Share this secret OTP with driver only after opening box:</p>
                </div>
                <div className="bg-white text-slate-900 font-mono font-black text-xl px-3 py-1 rounded shadow tracking-widest">
                  {activeTrackingOrder.otp_code}
                </div>
              </div>
            </div>

            {/* Product Snapshot */}
            <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm flex gap-3">
              <img src={activeTrackingOrder.product.image} alt={activeTrackingOrder.product.name} className="w-16 h-16 object-contain p-1 rounded bg-slate-50" />
              <div className="flex-1 text-xs">
                <h3 className="font-semibold text-slate-900 line-clamp-1">{activeTrackingOrder.product.name}</h3>
                <p className="text-slate-500 mt-0.5">Total: ₹{activeTrackingOrder.total_amount.toLocaleString('en-IN')}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-block bg-blue-50 text-[#2874f0] font-semibold px-2 py-0.5 rounded text-[10px]">
                    Status: {activeTrackingOrder.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${
                    activeTrackingOrder.payment_status === 'paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {activeTrackingOrder.payment_status === 'paid' ? 'Payment Verified' : 'Payment Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* LIVE DELIVERY UPDATES PROGRESSION CONTROLLER */}
            <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#2874f0]">
                    Live Delivery Updates Pipeline
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-800 mt-0.5">
                  Current Stage: <span className="text-[#2874f0] uppercase">{activeTrackingOrder.status.replace('_', ' ')}</span>
                </p>
                <span className="text-[9.5px] text-slate-500 block">
                  Delivery updates triggered only after successful payment authorization
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleAdvanceDeliveryMilestone(activeTrackingOrder.id, activeTrackingOrder.status)}
                disabled={activeTrackingOrder.status === 'delivered'}
                className="bg-[#2874f0] hover:bg-blue-600 active:scale-95 text-white text-[10.5px] font-bold py-1.5 px-3 rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>{activeTrackingOrder.status === 'delivered' ? 'Delivery Completed ✓' : 'Advance Delivery Milestone ❯'}</span>
              </button>
            </div>

            {/* DYNAMIC DELIVERY TIMELINE (Strictly reflecting active status) */}
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase">Delivery Timeline</h3>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {activeTrackingOrder.status === 'delivered' ? 'All Milestones Complete' : 'Fulfillment Active'}
                </span>
              </div>

              {(() => {
                const isPaidOrCod = activeTrackingOrder.payment_status === 'paid' || activeTrackingOrder.payment_method === 'cod';
                const statusOrder: Order['status'][] = ['placed', 'packed', 'shipped', 'out_for_delivery', 'delivered'];
                const currentIndex = statusOrder.indexOf(activeTrackingOrder.status);

                return (
                  <div className="relative pl-6 space-y-5 text-xs before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-600">
                    
                    {/* Step 1: Order Confirmed & Payment Authorized */}
                    <div className="relative">
                      <span className={`absolute -left-6 top-0 w-4 h-4 rounded-full text-white flex items-center justify-center text-[8px] ring-4 ring-white ${
                        isPaidOrCod ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}>
                        {isPaidOrCod ? <Check className="w-2.5 h-2.5" /> : <Lock className="w-2 h-2" />}
                      </span>
                      <p className="font-bold text-slate-800">Order Confirmed & Payment Authorized</p>
                      <p className="text-[10px] text-slate-400">
                        {activeTrackingOrder.created_at || 'Payment authorized via gateway'} • {activeTrackingOrder.payment_method.toUpperCase()}
                      </p>
                    </div>

                    {/* Step 2: Item Packed & Sealed */}
                    <div className={`relative ${currentIndex >= 1 ? '' : 'opacity-40'}`}>
                      <span className={`absolute -left-6 top-0 w-4 h-4 rounded-full text-white flex items-center justify-center text-[8px] ring-4 ring-white ${
                        currentIndex >= 1 ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}>
                        {currentIndex >= 1 ? <Check className="w-2.5 h-2.5" /> : <Package className="w-2.5 h-2.5 text-slate-600" />}
                      </span>
                      <p className={`font-bold ${currentIndex >= 1 ? 'text-slate-800' : 'text-slate-600'}`}>
                        Item Packed & Sealed
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {currentIndex >= 1 ? `Fulfilled by ${activeTrackingOrder.seller_name} • QC Passed` : 'Pending packaging verification'}
                      </p>
                    </div>

                    {/* Step 3: Shipped & In Transit */}
                    <div className={`relative ${currentIndex >= 2 ? '' : 'opacity-40'}`}>
                      <span className={`absolute -left-6 top-0 w-4 h-4 rounded-full text-white flex items-center justify-center text-[8px] ring-4 ring-white ${
                        currentIndex >= 2 ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}>
                        {currentIndex >= 2 ? <Check className="w-2.5 h-2.5" /> : <Send className="w-2.5 h-2.5 text-slate-600" />}
                      </span>
                      <p className={`font-bold ${currentIndex >= 2 ? 'text-slate-800' : 'text-slate-600'}`}>
                        Shipped & In Transit
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {currentIndex >= 2 ? `Ekart Logistics Hub • Manifest #EK-${activeTrackingOrder.order_number.slice(-6)}` : 'Waiting for shipment dispatch'}
                      </p>
                    </div>

                    {/* Step 4: Out for Delivery */}
                    <div className={`relative ${currentIndex >= 3 ? '' : 'opacity-40'}`}>
                      <span className={`absolute -left-6 top-0 w-4 h-4 rounded-full text-white flex items-center justify-center text-[8px] ring-4 ring-white ${
                        currentIndex === 3 ? 'bg-[#2874f0] animate-pulse' : currentIndex > 3 ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}>
                        {currentIndex > 3 ? <Check className="w-2.5 h-2.5" /> : <i className="fa-solid fa-truck text-[7px]"></i>}
                      </span>
                      <p className={`font-bold ${currentIndex === 3 ? 'text-[#2874f0]' : currentIndex > 3 ? 'text-slate-800' : 'text-slate-600'}`}>
                        Out for Delivery {currentIndex === 3 ? '(In Progress)' : ''}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {currentIndex >= 3 ? `Rider ${activeTrackingOrder.delivery_partner} is on route` : 'Assigned to nearest hub'}
                      </p>
                    </div>

                    {/* Step 5: Delivered */}
                    <div className={`relative ${currentIndex >= 4 ? '' : 'opacity-40'}`}>
                      <span className={`absolute -left-6 top-0 w-4 h-4 rounded-full text-white flex items-center justify-center text-[8px] ring-4 ring-white ${
                        currentIndex >= 4 ? 'bg-emerald-600 ring-emerald-200' : 'bg-slate-300'
                      }`}>
                        {currentIndex >= 4 ? <Check className="w-2.5 h-2.5" /> : <MapPin className="w-2.5 h-2.5" />}
                      </span>
                      <p className={`font-bold ${currentIndex >= 4 ? 'text-emerald-700' : 'text-slate-600'}`}>
                        Delivered & Verified
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {currentIndex >= 4 ? `Doorstep delivery verified with OTP ${activeTrackingOrder.otp_code}` : 'Expected by 09:00 PM'}
                      </p>
                    </div>

                  </div>
                );
              })()}
            </div>

            {/* Delivery Partner */}
            <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg">
                  <i className="fa-solid fa-helmet-safety"></i>
                </div>
                <div>
                  <p className="font-bold text-slate-800">{activeTrackingOrder.delivery_partner}</p>
                  <p className="text-[10px] text-slate-500">Ekart Fleet • DL 4S CZ 9021 • ★ 4.9</p>
                </div>
              </div>
              <a href="tel:9123456780" className="w-8 h-8 rounded-full bg-blue-50 text-[#2874f0] flex items-center justify-center hover:bg-blue-100 transition-colors">
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Delivery Address Summary Card */}
            <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-sm text-xs space-y-1.5">
              <div className="flex items-center justify-between border-b pb-1.5 border-slate-100">
                <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2874f0]" /> Delivery Address
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">
                  PIN: {activeTrackingOrder.pincode}
                </span>
              </div>
              <p className="font-bold text-slate-900 text-xs">
                {activeTrackingOrder.customer_name} • <span className="font-mono font-normal text-slate-600">{activeTrackingOrder.customer_phone}</span>
              </p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {activeTrackingOrder.address}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* 4. STYLISH INTERACTIVE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-[0_-4px_25px_rgba(0,0,0,0.07)] px-2 py-1 max-w-md mx-auto sm:max-w-none transition-all">
        <div className="grid grid-cols-4 items-center gap-1 max-w-md mx-auto">
          {/* Tab 1: Home */}
          <button 
            onClick={() => handleNavClick('home')} 
            className={`group relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-85 ${currentView === 'home' ? 'text-[#2874f0]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {/* Active Pill Glow */}
            {currentView === 'home' && (
              <span className="absolute inset-0 bg-blue-50/90 rounded-xl ring-1 ring-blue-100 -z-10 animate-pop"></span>
            )}
            <div className="relative">
              <i className={`fa-solid fa-house text-lg transition-transform duration-300 ${currentView === 'home' ? 'scale-115 -translate-y-0.5' : 'group-hover:scale-105'} ${activeNavAnim === 'home' ? 'animate-pop' : ''}`}></i>
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${currentView === 'home' ? 'font-bold' : 'font-medium'}`}>
              Home
            </span>
          </button>

          {/* Tab 2: Categories */}
          <button 
            onClick={() => handleNavClick('catalog')} 
            className={`group relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-85 ${currentView === 'catalog' ? 'text-[#2874f0]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {currentView === 'catalog' && (
              <span className="absolute inset-0 bg-blue-50/90 rounded-xl ring-1 ring-blue-100 -z-10 animate-pop"></span>
            )}
            <div className="relative">
              <i className={`fa-solid fa-shapes text-lg transition-transform duration-300 ${currentView === 'catalog' ? 'scale-115 -translate-y-0.5 rotate-12 text-[#2874f0]' : 'group-hover:scale-105'}`}></i>
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${currentView === 'catalog' ? 'font-bold' : 'font-medium'}`}>
              Categories
            </span>
          </button>

          {/* Tab 3: Orders / Tracking */}
          <button 
            onClick={() => handleNavClick('tracking')} 
            className={`group relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-85 ${currentView === 'tracking' ? 'text-[#2874f0]' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {currentView === 'tracking' && (
              <span className="absolute inset-0 bg-blue-50/90 rounded-xl ring-1 ring-blue-100 -z-10 animate-pop"></span>
            )}
            <div className="relative">
              <i className={`fa-solid fa-bell text-lg transition-transform duration-300 ${currentView === 'tracking' || activeNavAnim === 'tracking' ? 'animate-bell-wiggle text-[#2874f0] scale-115 -translate-y-0.5' : 'group-hover:scale-105'}`}></i>
              {/* Order live indicator badge */}
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse"></span>
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${currentView === 'tracking' ? 'font-bold' : 'font-medium'}`}>
              Orders
            </span>
          </button>

          {/* Tab 4: Wishlist */}
          <button 
            onClick={() => handleNavClick('wishlist')} 
            className={`group relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 active:scale-85 ${currentView === 'wishlist' ? 'text-red-500' : 'text-slate-500 hover:text-slate-800'}`}
          >
            {currentView === 'wishlist' && (
              <span className="absolute inset-0 bg-rose-50/90 rounded-xl ring-1 ring-rose-100 -z-10 animate-pop"></span>
            )}
            <div className="relative">
              <i className={`fa-solid fa-heart text-lg transition-transform duration-300 ${currentView === 'wishlist' || activeNavAnim === 'wishlist' ? 'animate-heartbeat text-red-500 scale-115 -translate-y-0.5' : 'group-hover:scale-105'}`}></i>
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white font-black text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-pop">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${currentView === 'wishlist' ? 'font-bold text-red-600' : 'font-medium'}`}>
              Wishlist
            </span>
          </button>
        </div>
      </nav>

      {/* FLOATING QUICK ACTION TOAST NOTIFICATION */}
      {quickToast.visible && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-pop max-w-xs w-full px-4 pointer-events-none">
          <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-slate-700/80">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <div>
                <p className="font-bold text-white text-xs leading-none">{quickToast.message}</p>
                {quickToast.sub && (
                  <p className="text-[10px] text-slate-300 mt-0.5">{quickToast.sub}</p>
                )}
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#ffe11b] bg-amber-500/20 px-2 py-0.5 rounded font-bold">
              Shopping Mystery
            </span>
          </div>
        </div>
      )}

      {/* MYSTERY BOX UNBOXING REWARD MODAL */}
      {showMysteryModal && unboxedReward && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-pop">
          <div className="bg-gradient-to-b from-purple-950 via-slate-900 to-slate-950 border-2 border-amber-400/80 rounded-3xl p-6 text-center max-w-sm w-full shadow-2xl text-white relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>

            <button 
              onClick={() => setShowMysteryModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Floating Golden Gift Icon */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center mx-auto mb-3 shadow-2xl border-2 border-white animate-float-slow">
              <i className="fa-solid fa-gift text-4xl text-purple-950"></i>
            </div>

            <span className="bg-[#ffe11b] text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider inline-block">
              🎉 MYSTERY UNBOXED!
            </span>

            <h3 className="text-xl font-black mt-2 text-white">
              {unboxedReward.title}
            </h3>

            <p className="text-xs text-purple-200 mt-1">
              {unboxedReward.discount}
            </p>

            {/* Voucher Coupon Box */}
            <div className="bg-slate-800/80 border border-dashed border-amber-400/80 rounded-xl p-3 my-4 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block font-mono">YOUR MYSTERY COUPON</span>
                <span className="font-mono font-black text-amber-300 text-base tracking-wider">{unboxedReward.code}</span>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard?.writeText(unboxedReward.code);
                  showToast('Coupon Copied! 📋', unboxedReward.code);
                  setShowMysteryModal(false);
                }}
                className="bg-[#ffe11b] hover:bg-yellow-400 active:scale-95 text-slate-950 text-xs font-black px-3 py-1.5 rounded-lg transition-transform"
              >
                Copy & Apply
              </button>
            </div>

            <button 
              onClick={() => {
                setShowMysteryModal(false);
                setCurrentView('catalog');
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl shadow-lg text-xs"
            >
              Start Shopping Mystery Deals Now
            </button>
          </div>
        </div>
      )}

      {/* 5. GLOBAL MODALS (VOICE, VISUAL, PINCODE, INVOICE) */}
      {/* Voice Search Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 text-center max-w-xs w-full shadow-2xl">
            <div className="w-16 h-16 bg-blue-50 text-[#2874f0] rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse text-2xl">
              <Mic className="w-8 h-8" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Listening to voice...</h4>
            <p className="text-xs text-slate-500 mb-4 mt-1">Try saying "Nothing Phone", "Headphones", "T-shirt"</p>
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => { setSearchQuery('Nothing Phone'); setCurrentView('catalog'); setShowVoiceModal(false); }}
                className="bg-[#2874f0] text-white text-xs px-3 py-1.5 rounded-lg"
              >
                Say "Nothing Phone"
              </button>
              <button 
                onClick={() => setShowVoiceModal(false)}
                className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visual Camera Lens Search Modal */}
      {showVisualModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2 mb-3">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#2874f0]" /> Shopping Mystery AI Lens
              </h4>
              <button onClick={() => setShowVisualModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 cursor-pointer mb-3">
              <Sparkles className="w-8 h-8 text-[#2874f0] mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-800">Point Camera at Product</p>
              <p className="text-[10px] text-slate-400">AI Computer Vision will identify brand and SKU</p>
            </div>
            <button 
              onClick={() => { setSearchQuery('iPhone'); setCurrentView('catalog'); setShowVisualModal(false); }}
              className="w-full bg-[#2874f0] text-white text-xs font-semibold py-2 rounded-lg"
            >
              Simulate Match: Apple iPhone 15
            </button>
          </div>
        </div>
      )}

      {/* Pincode / GPS Location Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3 mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#2874f0]" /> Choose Delivery Location
              </h3>
              <button onClick={() => setShowPincodeModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 mb-3">
              <input 
                type="text" 
                value={pincode} 
                onChange={(e) => setPincode(e.target.value)} 
                maxLength={6} 
                placeholder="6-digit Pincode"
                className="flex-1 border rounded px-3 py-2 text-xs focus:outline-none focus:border-[#2874f0]"
              />
              <button 
                onClick={() => { setPincodeChecked(true); setShowPincodeModal(false); }}
                className="bg-[#2874f0] text-white text-xs font-semibold px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
            <button 
              onClick={() => { setPincode('201301'); setShowPincodeModal(false); }}
              className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-[#2874f0] border border-[#2874f0]/30 rounded py-2 hover:bg-blue-50"
            >
              <Crosshair className="w-3.5 h-3.5" /> Detect my current location (GPS)
            </button>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs space-y-3">
            <div className="flex justify-between items-start border-b pb-3">
              <div>
                <span className="text-xl font-black italic text-[#2874f0]">Shopping Mystery</span>
                <p className="text-[10px] text-slate-400">TAX INVOICE / BILL OF SUPPLY</p>
              </div>
              <button onClick={() => setShowInvoiceModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between">
              <div>
                <strong className="block text-slate-900">Sold By:</strong>
                <p className="text-slate-500">Shopping Mystery Retailers Pvt Ltd</p>
                <p className="text-slate-500 font-mono">GSTIN: 07AAAAA0000A1Z5</p>
              </div>
              <div className="text-right">
                <strong className="block text-slate-900">Invoice No:</strong>
                <p className="font-mono text-slate-500">INV-SM-2026-9921</p>
                <p className="text-slate-500">Date: {activeTrackingOrder.created_at}</p>
              </div>
            </div>

            {/* Delivery Address Details in Invoice */}
            <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Billed & Delivered To:</span>
              <p className="font-bold text-slate-900">{activeTrackingOrder.customer_name} • <span className="font-mono text-slate-600">{activeTrackingOrder.customer_phone}</span></p>
              <p className="text-slate-600 leading-tight">{activeTrackingOrder.address}</p>
              <p className="text-slate-500 font-mono text-[10px]">PIN Code: {activeTrackingOrder.pincode}</p>
            </div>

            {/* Payment Method in Invoice */}
            <div className="bg-slate-50 p-2 rounded border border-slate-200 flex justify-between items-center text-[11px]">
              <div>
                <span className="text-slate-400 text-[10px] block">Payment Method:</span>
                <span className="font-bold text-slate-800">
                  {activeTrackingOrder.payment_method === 'upi' ? '⚡ UPI Instant Direct Bank Transfer' : activeTrackingOrder.payment_method.toUpperCase()}
                </span>
                {activeTrackingOrder.upi_transaction && (
                  <p className="text-[10px] text-emerald-700 font-mono mt-0.5">
                    UTR: {activeTrackingOrder.upi_transaction.utr_number} • Transferred to {activeTrackingOrder.upi_transaction.destination_bank}
                  </p>
                )}
              </div>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                PAID
              </span>
            </div>

            <div className="border rounded p-2 bg-slate-50">
              <div className="flex justify-between font-bold text-slate-800">
                <span>{activeTrackingOrder.product.name}</span>
                <span>₹{activeTrackingOrder.total_amount.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[10px] text-slate-500">HSN: 85171300 • IGST: 18% Included</p>
            </div>
            <button 
              onClick={() => { window.print(); setShowInvoiceModal(false); }}
              className="w-full bg-[#2874f0] text-white py-2.5 rounded font-bold"
            >
              Print / Save PDF Invoice
            </button>
          </div>
        </div>
      )}

      {/* 4.5 PAYMENT AUTHORIZATION GATE MODAL (Locks order confirmation & delivery updates until authorized) */}
      {(paymentAuthStatus !== 'idle' || isUpiProcessing) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-pop">
          <div className="bg-slate-900 border border-slate-700 text-white rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-3.5 text-center">
            
            {/* VIEW 1: DECLINED / FAILED AUTHORIZATION STATE */}
            {paymentAuthStatus === 'declined' ? (
              <div className="space-y-3 py-2">
                <div className="w-14 h-14 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto border border-red-500/40">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Payment Authorization Declined</h3>
                  <p className="text-xs text-red-400 mt-1">{authFailureReason || 'Authorization declined by user or bank.'}</p>
                </div>

                {/* STRICT STATUS PROTECTION NOTICE */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-left space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>STATUS: ZERO CHANGES APPLIED</span>
                  </div>
                  <ul className="text-[10.5px] text-slate-300 space-y-1 list-disc list-inside">
                    <li>No money was debited from your account.</li>
                    <li>Order was <strong>NOT confirmed or created</strong>.</li>
                    <li>Delivery updates were <strong>NOT initiated</strong>.</li>
                    <li>Your cart items and saved choices are 100% preserved.</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleCancelAuthorization}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white text-xs font-bold transition-all cursor-pointer border border-slate-700 shadow-sm"
                >
                  Return to Checkout (Cart Intact)
                </button>
              </div>
            ) : (
              /* VIEW 2: ACTIVE AUTHORIZATION GATE (CASH ON DELIVERY) */
              <>
                {/* Method Header */}
                <div className="relative mx-auto w-14 h-14 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full border-4 ${
                    paymentAuthStatus === 'verifying'
                      ? 'border-emerald-500/30 border-t-emerald-400 animate-spin'
                      : 'border-orange-500/30 border-t-orange-400 animate-spin'
                  }`}></div>
                  
                  <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-md">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
                    Doorstep COD Order Authorization
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {paymentAuthStatus === 'verifying'
                      ? 'Verifying order & dispatching to delivery hub...'
                      : paymentAuthStatus === 'authorized'
                      ? 'Order authorized! Initializing live delivery tracking...'
                      : `Awaiting authorization for ₹${(pendingOrder?.purchaseTotal || activePayableAmount).toLocaleString('en-IN')}`}
                  </p>
                </div>

                {/* CRITICAL SECURITY LOCK NOTICE */}
                <div className="bg-amber-950/60 border border-amber-500/40 rounded-xl p-2.5 text-left text-[10px] space-y-0.5">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                    <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Order Confirmation & Delivery Updates Locked</span>
                  </div>
                  <p className="text-amber-200/80 leading-tight">
                    Order confirmation and delivery status updates will strictly trigger <strong>only after receiving verified order authorization</strong>.
                  </p>
                </div>

                {/* CASH ON DELIVERY AUTHORIZATION DETAILS */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left space-y-2.5 text-xs">
                  <div className="text-[11px] text-slate-300 border-b border-slate-800 pb-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px]">Payment Method:</span>
                      <span className="bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded text-[10px] border border-orange-500/30">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[10px]">Deliver To:</span>
                      <span className="font-bold text-white text-[10.5px]">
                        {(pendingOrder?.addressDetails || activeAddress).name} • {(pendingOrder?.addressDetails || activeAddress).phone}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-300 space-y-0.5">
                      <p className="font-medium text-slate-200 truncate">
                        {(pendingOrder?.addressDetails || activeAddress).houseNumber}, {(pendingOrder?.addressDetails || activeAddress).locality}
                      </p>
                      <p className="text-slate-400">
                        {(pendingOrder?.addressDetails || activeAddress).city}, {(pendingOrder?.addressDetails || activeAddress).state} - <span className="font-mono text-white font-bold">PIN: {(pendingOrder?.addressDetails || activeAddress).pincode}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 rounded-lg p-2 border border-slate-800 space-y-1 text-[10.5px]">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <PackageCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>Open-Box Delivery Verification Active</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Payment of <strong>₹{(pendingOrder?.purchaseTotal || activePayableAmount).toLocaleString('en-IN')}</strong> will be collected at your doorstep via cash or dynamic UPI QR.
                    </p>
                  </div>

                  <div className="pt-1 space-y-2">
                    <button
                      type="button"
                      onClick={handleReceiveSuccessfulAuthorization}
                      disabled={paymentAuthStatus === 'verifying' || paymentAuthStatus === 'authorized'}
                      className="w-full py-2.5 px-3 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-60"
                    >
                      {paymentAuthStatus === 'verifying' ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Authorizing Order with Hub...</span>
                        </>
                      ) : paymentAuthStatus === 'authorized' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Order Authorized! Starting Delivery...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Authorize & Place COD Order (₹{(pendingOrder?.purchaseTotal || activePayableAmount).toLocaleString('en-IN')})</span>
                        </>
                      )}
                    </button>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeclinePayment('COD order placement was cancelled by customer')}
                        disabled={paymentAuthStatus === 'verifying' || paymentAuthStatus === 'authorized'}
                        className="flex-1 py-1.5 px-2 bg-slate-800 hover:bg-red-950 hover:text-red-300 text-slate-400 rounded-lg text-[10px] font-semibold border border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        Decline Order
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelAuthorization}
                        className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[10px] font-semibold border border-slate-700 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Footer with Security Assurance */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    Doorstep Collection: ₹{(pendingOrder?.purchaseTotal || activePayableAmount).toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={handleCancelAuthorization}
                    className="text-slate-500 hover:text-slate-300 text-[9.5px] cursor-pointer"
                  >
                    Cancel / Keep Cart
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
