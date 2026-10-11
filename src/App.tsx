import React, { useState } from 'react';
import { 
  Smartphone, Monitor, ShoppingBag, Store, Database,
  ShieldCheck, FileCode, Check, Info, Bell, Sparkles,
  SplitSquareVertical, ArrowRight, Bike, FolderDown
} from 'lucide-react';
import { 
  INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS, 
  INITIAL_SELLERS, INITIAL_BANK_CONFIG, Product, Order, Seller, BankAccountConfig 
} from './data/mockData';
import { CustomerApp } from './components/CustomerApp';
import { AdminConsole } from './components/AdminConsole';
import { CodeExplorer } from './components/CodeExplorer';
import DeliveryPartnerStandaloneApp from '../delivery_partner_app/src/App';

export default function App() {
  // Clear Separation: Shopping Mystery App vs Admin Panel vs Standalone Delivery App (plus Dual Live View & Code Explorer)
  const [currentModule, setCurrentModule] = useState<'app' | 'admin' | 'delivery_standalone' | 'dual' | 'code'>('app');
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  // Shared Global State across ecosystems
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [sellers, setSellers] = useState<Seller[]>(INITIAL_SELLERS);
  const [categories] = useState(INITIAL_CATEGORIES);
  const [bankConfig, setBankConfig] = useState<BankAccountConfig>(INITIAL_BANK_CONFIG);

  // Global Handlers
  const handlePlaceOrder = (newOrder: Order) => {
    // If paid via UPI, directly add to the bank account's total_received balance
    if (newOrder.payment_method === 'upi') {
      setBankConfig(prev => ({
        ...prev,
        total_received: prev.total_received + newOrder.total_amount
      }));
    }
    setOrders([newOrder, ...orders]);
  };

  const handleUpdateBankConfig = (newConfig: BankAccountConfig) => {
    setBankConfig(newConfig);
  };

  const handleAddProduct = (newProd: Partial<Product>) => {
    const fullProduct: Product = {
      id: products.length + 1,
      seller_id: 1,
      cat_id: newProd.cat_id || 1,
      name: newProd.name || 'New Listing',
      description: newProd.description || 'Quality assured product',
      price: newProd.price || 19999,
      mrp: newProd.mrp || 24999,
      stock: newProd.stock || 20,
      image: newProd.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
      gallery: [newProd.image || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80'],
      brand: newProd.brand || 'Shopping Mystery',
      rating: 4.5,
      reviews_count: 1,
      is_assured: true,
      qc_status: 'approved',
      colors: ['Standard'],
      variants: ['Default'],
      specs: { 'Status': 'Verified Mystery Listing' }
    };
    setProducts([fullProduct, ...products]);
  };

  const handleUpdateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const handleApproveSeller = (sellerId: number) => {
    setSellers(sellers.map(s => s.id === sellerId ? { ...s, status: 'approved' } : s));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* SEPARATION CONTROLLER TOP BAR */}
      <nav className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
        {/* Left: Brand & Primary Separation Tabs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-black text-lg tracking-tight text-white mr-2">
            <span className="text-[#ffe11b]">Shopping</span>
            <span className="text-purple-400 italic">Mystery</span>
          </div>

          {/* Primary View Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-bold gap-1 shadow-inner">
            {/* 1. Dedicated Customer Shopping App */}
            <button 
              onClick={() => setCurrentModule('app')}
              className={`px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all ${currentModule === 'app' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <ShoppingBag className="w-4 h-4 text-[#ffe11b]" />
              <span>📱 Shopping Mystery App</span>
            </button>

            {/* 2. Dedicated Admin Panel (With Integrated Seller Hub & MySQL DB) */}
            <button 
              onClick={() => setCurrentModule('admin')}
              className={`px-4 py-1.5 rounded-lg flex items-center gap-2 transition-all ${currentModule === 'admin' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <ShieldCheck className="w-4 h-4 text-purple-300" />
              <span>🖥️ Admin Panel (Seller Hub & DB)</span>
            </button>

            {/* 3. Exported Standalone Delivery Partner App */}
            <button 
              onClick={() => setCurrentModule('delivery_standalone')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all ${currentModule === 'delivery_standalone' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              title="Independent Mobile App for Delivery Drivers"
            >
              <Bike className="w-4 h-4 text-emerald-300" />
              <span>🛵 Delivery App (Standalone)</span>
            </button>

            {/* 4. Dual Split Screen (Simultaneous Testing) */}
            <button 
              onClick={() => setCurrentModule('dual')}
              className={`hidden lg:flex px-3 py-1.5 rounded-lg items-center gap-1.5 transition-all ${currentModule === 'dual' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              title="View App & Admin Side-by-Side"
            >
              <SplitSquareVertical className="w-3.5 h-3.5 text-amber-300" />
              <span>Dual Live View</span>
            </button>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2 text-xs">
          {/* PHP/MySQL Codebase Inspector Button */}
          <button 
            onClick={() => setCurrentModule('code')}
            className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 font-semibold transition-colors ${currentModule === 'code' ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'}`}
          >
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>PHP / MySQL Source</span>
          </button>

          {/* Viewport Frame Toggle (Only active when in App view) */}
          {currentModule === 'app' && (
            <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 ml-1">
              <button 
                onClick={() => setIsMobileFrame(true)} 
                title="Mobile Phone Frame"
                className={`px-2.5 py-1 rounded flex items-center gap-1 text-[11px] ${isMobileFrame ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Phone Frame</span>
              </button>
              <button 
                onClick={() => setIsMobileFrame(false)} 
                title="Full Responsive View"
                className={`px-2.5 py-1 rounded flex items-center gap-1 text-[11px] ${!isMobileFrame ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Full View</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* RENDER MODULE 1: DEDICATED SEPARATE CUSTOMER SHOPPING MYSTERY APP */}
      {currentModule === 'app' && (
        <div className={`flex-1 flex justify-center ${isMobileFrame ? 'p-3 sm:p-6 bg-slate-950/90' : 'p-0 bg-slate-100'}`}>
          {isMobileFrame ? (
            /* Dedicated Smartphone Frame */
            <div className="w-full max-w-[420px] h-[860px] bg-slate-900 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-700 relative flex flex-col overflow-hidden ring-1 ring-slate-800">
              {/* Phone Speaker & Notch */}
              <div className="h-5 bg-slate-900 shrink-0 flex items-center justify-between px-6 text-[11px] font-semibold text-slate-300 select-none z-50">
                <span>9:41</span>
                <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-slate-800"></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <i className="fa-solid fa-wifi text-[10px]"></i>
                  <i className="fa-solid fa-battery-full text-[11px] text-emerald-400"></i>
                </div>
              </div>

              {/* Shopping Mystery App Body */}
              <div className="flex-1 bg-slate-100 rounded-[32px] overflow-y-auto no-scrollbar relative flex flex-col">
                <CustomerApp 
                  products={products}
                  categories={categories}
                  orders={orders}
                  bankConfig={bankConfig}
                  onPlaceOrder={handlePlaceOrder}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onNavigateToAdmin={() => setCurrentModule('admin')}
                />
              </div>

              {/* Bottom Home Indicator */}
              <div className="h-3 shrink-0 flex items-center justify-center pt-1">
                <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
              </div>
            </div>
          ) : (
            /* Full Width View of Customer App */
            <div className="w-full max-w-2xl mx-auto shadow-2xl bg-white min-h-screen">
              <CustomerApp 
                products={products}
                categories={categories}
                orders={orders}
                bankConfig={bankConfig}
                onPlaceOrder={handlePlaceOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onNavigateToAdmin={() => setCurrentModule('admin')}
              />
            </div>
          )}
        </div>
      )}

      {/* RENDER MODULE 2: DEDICATED SEPARATE ADMIN CONTROL PANEL */}
      {currentModule === 'admin' && (
        <div className="flex-1 w-full bg-slate-100 text-slate-900">
          <AdminConsole 
            products={products}
            orders={orders}
            sellers={sellers}
            categories={categories}
            bankConfig={bankConfig}
            onUpdateBankConfig={handleUpdateBankConfig}
            onApproveSeller={handleApproveSeller}
            onAddProduct={handleAddProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onBackToCustomer={() => setCurrentModule('app')}
          />
        </div>
      )}

      {/* RENDER MODULE 3: DUAL LIVE VIEW (SIDE-BY-SIDE APP & ADMIN CONSOLE) */}
      {currentModule === 'dual' && (
        <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-800 bg-slate-950 p-4 gap-4">
          {/* Left: Mobile App View */}
          <div className="w-full lg:w-[440px] shrink-0 flex flex-col items-center">
            <div className="bg-slate-900 px-4 py-2 rounded-t-xl w-full max-w-[420px] flex items-center justify-between border-t border-x border-slate-700">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-[#ffe11b]" /> Shopping Mystery Mobile App
              </span>
              <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">Live Order Sync</span>
            </div>
            <div className="w-full max-w-[420px] h-[780px] bg-slate-900 rounded-b-[36px] p-2.5 shadow-2xl border-4 border-slate-700 flex flex-col overflow-hidden">
              <div className="flex-1 bg-slate-100 rounded-[24px] overflow-y-auto no-scrollbar">
                <CustomerApp 
                  products={products}
                  categories={categories}
                  orders={orders}
                  bankConfig={bankConfig}
                  onPlaceOrder={handlePlaceOrder}
                  onUpdateOrderStatus={handleUpdateOrderStatus}
                  onNavigateToAdmin={() => setCurrentModule('admin')}
                />
              </div>
            </div>
          </div>

          {/* Right: Full Admin Console with Integrated Seller Hub & DB */}
          <div className="flex-1 bg-slate-100 rounded-2xl overflow-y-auto max-h-[820px] border border-slate-300 shadow-2xl">
            <AdminConsole 
              products={products}
              orders={orders}
              sellers={sellers}
              categories={categories}
              bankConfig={bankConfig}
              onUpdateBankConfig={handleUpdateBankConfig}
              onApproveSeller={handleApproveSeller}
              onAddProduct={handleAddProduct}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onBackToCustomer={() => setCurrentModule('app')}
            />
          </div>
        </div>
      )}

      {/* RENDER MODULE 3.5: EXPORTED STANDALONE DELIVERY PARTNER APP */}
      {currentModule === 'delivery_standalone' && (
        <div className="flex-1 flex flex-col items-center p-3 sm:p-6 bg-slate-950/95 overflow-y-auto">
          {/* Informational Workspace Export Header Banner */}
          <div className="w-full max-w-xl bg-slate-900 border border-emerald-500/40 rounded-2xl p-4 mb-4 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-lg shrink-0">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Exported Delivery Partner Mobile App</span>
                    <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-1.5 py-0.2 rounded font-mono">STANDALONE</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Isolated project workspace generated in <code className="text-emerald-300 font-mono">/delivery_partner_app/</code>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentModule('code')}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-sky-400 px-3 py-1.5 rounded-lg border border-slate-700 font-medium flex items-center gap-1.5 shrink-0"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>View Workspace Files</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Standalone Vite & React</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>PWA Manifest Included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Turn-by-Turn GPS Nav</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>OTP + Digital POD Sign</span>
              </div>
            </div>
          </div>

          {/* Standalone Mobile Device View */}
          <div className="w-full max-w-[420px] bg-slate-900 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-700 relative overflow-hidden">
            {/* Phone Notch */}
            <div className="h-5 bg-slate-900 shrink-0 flex items-center justify-between px-6 text-[11px] font-semibold text-slate-300 select-none z-50">
              <span>9:41</span>
              <div className="w-20 h-4 bg-slate-950 rounded-full mx-auto flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-800"></span>
              </div>
              <div className="flex items-center gap-1.5">
                <i className="fa-solid fa-wifi text-[10px]"></i>
                <i className="fa-solid fa-battery-full text-[11px] text-emerald-400"></i>
              </div>
            </div>

            {/* Standalone App Execution Body */}
            <div className="h-[740px] rounded-[32px] overflow-hidden relative">
              <DeliveryPartnerStandaloneApp />
            </div>

            {/* Bottom Indicator */}
            <div className="h-3 shrink-0 flex items-center justify-center pt-1">
              <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER MODULE 4: SOURCE CODEBASE EXPLORER */}
      {currentModule === 'code' && (
        <div className="flex-1 w-full bg-slate-950">
          <CodeExplorer 
            onBackToCustomer={() => setCurrentModule('app')}
          />
        </div>
      )}
    </div>
  );
}
