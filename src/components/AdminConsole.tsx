import React, { useState } from 'react';
import { 
  TrendingUp, Users, ShoppingBag, Store, Database,
  CheckCircle, XCircle, Sliders, FileText, ArrowRight, 
  ShieldCheck, Percent, Clock, AlertTriangle, Plus,
  Upload, Barcode, DollarSign, Terminal, RefreshCw,
  HardDrive, Table, Play, Download, Search, Sparkles,
  Building2, SmartphoneNfc, Wallet, CheckCircle2, Copy, Eye, EyeOff, Check
} from 'lucide-react';
import { Product, Order, Seller, Category, BankAccountConfig, PRESET_BANK_OPTIONS } from '../data/mockData';

interface AdminConsoleProps {
  products: Product[];
  orders: Order[];
  sellers: Seller[];
  categories: Category[];
  bankConfig: BankAccountConfig;
  onUpdateBankConfig: (config: BankAccountConfig) => void;
  onApproveSeller: (id: number) => void;
  onAddProduct: (product: Partial<Product>) => void;
  onUpdateOrderStatus: (orderId: number, status: Order['status']) => void;
  onBackToCustomer: () => void;
}

export const AdminConsole: React.FC<AdminConsoleProps> = ({
  products,
  orders,
  sellers,
  categories,
  bankConfig,
  onUpdateBankConfig,
  onApproveSeller,
  onAddProduct,
  onUpdateOrderStatus,
  onBackToCustomer
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'seller_hub' | 'database' | 'catalog' | 'orders' | 'upi_banking' | 'logistics' | 'cms'>('overview');
  const [sellerSubTab, setSellerSubTab] = useState<'kyc' | 'inventory' | 'orders' | 'ads' | 'payouts'>('kyc');

  // Bank Account & UPI Gateway State
  const [isAccountUnmasked, setIsAccountUnmasked] = useState(false);
  const [showEditBankModal, setShowEditBankModal] = useState(false);
  const [editBankForm, setEditBankForm] = useState<BankAccountConfig>({ ...bankConfig });
  const [bankSuccessNotice, setBankSuccessNotice] = useState<string | null>(null);

  // Database Management State
  const [sqlQuery, setSqlQuery] = useState('SELECT id, name, price, stock, brand FROM products LIMIT 5;');
  const [queryResult, setQueryResult] = useState<any[]>([
    { id: 1, name: 'Nothing Phone (2a) 5G', price: 23999, stock: 45, brand: 'Nothing' },
    { id: 2, name: 'Apple iPhone 15 (Blue, 128 GB)', price: 65999, stock: 30, brand: 'Apple' },
    { id: 3, name: 'Sony WH-1000XM5 Headphones', price: 26990, stock: 18, brand: 'Sony' },
    { id: 4, name: 'Highlander Men Casual Shirt', price: 899, stock: 120, brand: 'Highlander' },
    { id: 5, name: 'LG 8 Kg Smart Inverter Washing Machine', price: 34990, stock: 12, brand: 'LG' }
  ]);
  const [queryStatus, setQueryStatus] = useState('Executed successfully (5 rows, 0.0012s)');

  // New Product Modal state in Seller Hub
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('19999');
  const [newMrp, setNewMrp] = useState('24999');
  const [newStock, setNewStock] = useState('35');
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [newImageName, setNewImageName] = useState<string>('');

  // Ad Campaign state
  const [cpcBid, setCpcBid] = useState(6.5);
  const [adBudget, setAdBudget] = useState(1500);

  // Database Table metadata
  const dbTables = [
    { name: 'users', rows: 1420, size: '128 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'admin', rows: 3, size: '16 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'sellers', rows: sellers.length, size: '48 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'categories', rows: categories.length, size: '24 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'products', rows: products.length, size: '512 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'wishlist', rows: 890, size: '64 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'orders', rows: orders.length, size: '384 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'order_items', rows: 2480, size: '256 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' },
    { name: 'seller_ads', rows: 34, size: '32 KB', engine: 'InnoDB', collation: 'utf8mb4_unicode_ci' }
  ];

  const handleExecuteSql = (e: React.FormEvent) => {
    e.preventDefault();
    const query = sqlQuery.trim().toLowerCase();
    if (query.includes('products')) {
      setQueryResult(products.slice(0, 5).map(p => ({ id: p.id, name: p.name, price: p.price, stock: p.stock, brand: p.brand })));
      setQueryStatus(`Returned ${Math.min(5, products.length)} records from products table (0.0011s)`);
    } else if (query.includes('orders')) {
      setQueryResult(orders.map(o => ({ id: o.id, order_number: o.order_number, total: o.total_amount, status: o.status, customer: o.customer_name })));
      setQueryStatus(`Returned ${orders.length} records from orders table (0.0009s)`);
    } else if (query.includes('sellers')) {
      setQueryResult(sellers.map(s => ({ id: s.id, business: s.business_name, gst: s.gst_no, status: s.status })));
      setQueryStatus(`Returned ${sellers.length} records from sellers table (0.0008s)`);
    } else {
      setQueryResult(dbTables.map(t => ({ table: t.name, rows: t.rows, size: t.size, engine: t.engine })));
      setQueryStatus(`SHOW TABLES result: 9 tables in flipkart_db (0.0006s)`);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    onAddProduct({
      name: newTitle,
      price: Number(newPrice),
      mrp: Number(newMrp),
      stock: Number(newStock),
      cat_id: 1,
      image: newImagePreview || 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
      brand: 'Shopping Mystery',
      rating: 4.6,
      reviews_count: 1,
      is_assured: true,
      qc_status: 'approved',
      colors: ['Default'],
      variants: ['Standard Edition'],
      specs: { 'Platform': 'Shopping Mystery Verified' }
    });
    setNewTitle('');
    setNewImagePreview(null);
    setNewImageName('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 font-sans pb-16">
      {/* Top Admin Header */}
      <header className="bg-slate-950 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-md border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-black text-lg tracking-tight">
            <span className="text-[#ffe11b]">Shopping</span>
            <span className="text-purple-400 italic">Mystery</span>
            <span className="text-xs bg-purple-900/60 border border-purple-700 text-purple-300 font-bold px-2 py-0.5 rounded ml-1">
              Admin & Database Console
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToCustomer} 
            className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-bold shadow transition-colors"
          >
            Launch Shopping Mystery App <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Primary Navigation Tabs */}
      <nav className="bg-white border-b px-6 flex gap-6 overflow-x-auto text-xs font-bold text-slate-600 no-scrollbar">
        <button 
          onClick={() => setActiveTab('overview')} 
          className={`py-3 flex items-center gap-1.5 ${activeTab === 'overview' ? 'text-purple-600 border-b-2 border-purple-600' : 'hover:text-purple-600'}`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Executive Overview</span>
        </button>

        {/* FULLY INTEGRATED SELLER HUB */}
        <button 
          onClick={() => setActiveTab('seller_hub')} 
          className={`py-3 flex items-center gap-1.5 ${activeTab === 'seller_hub' ? 'text-amber-600 border-b-2 border-amber-600' : 'hover:text-amber-600'}`}
        >
          <Store className="w-3.5 h-3.5 text-amber-500" />
          <span>Integrated Seller Hub ({sellers.length})</span>
        </button>

        {/* FULL PHP & MYSQL DATABASE MANAGEMENT */}
        <button 
          onClick={() => setActiveTab('database')} 
          className={`py-3 flex items-center gap-1.5 ${activeTab === 'database' ? 'text-blue-600 border-b-2 border-blue-600' : 'hover:text-blue-600'}`}
        >
          <Database className="w-3.5 h-3.5 text-blue-500" />
          <span>MySQL Database & PHP Engine</span>
        </button>

        <button 
          onClick={() => setActiveTab('catalog')} 
          className={`py-3 flex items-center gap-1.5 ${activeTab === 'catalog' ? 'text-purple-600 border-b-2 border-purple-600' : 'hover:text-purple-600'}`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Catalog & QC ({products.length})</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')} 
          className={`py-3 flex items-center gap-1.5 ${activeTab === 'orders' ? 'text-purple-600 border-b-2 border-purple-600' : 'hover:text-purple-600'}`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Order Escrow & Fulfilment ({orders.length})</span>
        </button>
        {/* REAL-TIME UPI & DIRECT BANK SETTLEMENT */}
        <button 
          onClick={() => setActiveTab('upi_banking')} 
          className={`py-3 flex items-center gap-1.5 transition-colors ${activeTab === 'upi_banking' ? 'text-emerald-600 border-b-2 border-emerald-600 font-bold' : 'hover:text-emerald-600'}`}
        >
          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>UPI Bank Gateway (₹{bankConfig.total_received.toLocaleString('en-IN')})</span>
        </button>
        <button 
          onClick={() => setActiveTab('logistics')} 
          className={`py-3 flex items-center gap-1.5 ${activeTab === 'logistics' ? 'text-purple-600 border-b-2 border-purple-600' : 'hover:text-purple-600'}`}
        >
          <Percent className="w-3.5 h-3.5" />
          <span>3PL & Tax Engine</span>
        </button>
        <button 
          onClick={() => setActiveTab('cms')} 
          className={`py-3 flex items-center gap-1.5 ${activeTab === 'cms' ? 'text-purple-600 border-b-2 border-purple-600' : 'hover:text-purple-600'}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Mystery Deals & Banners</span>
        </button>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* ========================================================
            TAB 1: EXECUTIVE OVERVIEW
        ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Monthly Marketplace GMV</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">₹1,84,92,300</div>
                <span className="text-xs text-emerald-600 font-semibold">+18.4% YoY Growth</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Orders Processed</span>
                <div className="text-2xl font-bold text-slate-900 mt-1">48,210</div>
                <span className="text-xs text-blue-600 font-semibold">98.4% SLA Compliance</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Registered Merchants</span>
                <div className="text-2xl font-bold text-amber-600 mt-1">{sellers.length} Vendors</div>
                <span className="text-xs text-amber-600 font-semibold">Integrated in Seller Hub</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">MySQL Database Status</span>
                <div className="text-2xl font-bold text-emerald-600 mt-1">9 Tables</div>
                <span className="text-xs text-slate-500 font-semibold font-mono">6,433 Rows • 1.4 MB</span>
              </div>
            </div>

            {/* Quick Access Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('seller_hub')}
                className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shadow">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Integrated Seller Hub Console</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Manage merchant onboarding KYC, inventory sync, ad bidding, and Tuesday bank disbursements.</p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('database')}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl shadow">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">MySQL Database & Query Console</h3>
                    <p className="text-xs text-slate-600 mt-0.5">Execute raw PDO queries, inspect table structures, optimize storage, and backup schema.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent High-Value Transactions */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 mb-3">Recent Platform Transactions</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase border-b">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Merchant Entity</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((o) => (
                      <tr key={o.id}>
                        <td className="p-3 font-mono font-bold text-blue-600">#{o.order_number}</td>
                        <td className="p-3 font-medium text-slate-900">{o.customer_name}</td>
                        <td className="p-3 text-slate-600">{o.seller_name}</td>
                        <td className="p-3 font-bold text-slate-900">₹{o.total_amount.toLocaleString('en-IN')}</td>
                        <td className="p-3">
                          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            {o.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: FULLY INTEGRATED SELLER HUB
        ======================================================== */}
        {activeTab === 'seller_hub' && (
          <div className="space-y-4">
            {/* Seller Hub Sub-tabs */}
            <div className="bg-white rounded-xl border border-slate-200 p-2 flex flex-wrap gap-2 text-xs font-bold">
              <button 
                onClick={() => setSellerSubTab('kyc')}
                className={`px-3 py-1.5 rounded-lg ${sellerSubTab === 'kyc' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                1. Merchant KYC & Verification ({sellers.length})
              </button>
              <button 
                onClick={() => setSellerSubTab('inventory')}
                className={`px-3 py-1.5 rounded-lg ${sellerSubTab === 'inventory' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                2. Merchant Catalog & Inventory ({products.length})
              </button>
              <button 
                onClick={() => setSellerSubTab('orders')}
                className={`px-3 py-1.5 rounded-lg ${sellerSubTab === 'orders' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                3. Order Fulfillment & Dispatch ({orders.length})
              </button>
              <button 
                onClick={() => setSellerSubTab('ads')}
                className={`px-3 py-1.5 rounded-lg ${sellerSubTab === 'ads' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                4. Sponsored Ads Bidding
              </button>
              <button 
                onClick={() => setSellerSubTab('payouts')}
                className={`px-3 py-1.5 rounded-lg ${sellerSubTab === 'payouts' ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                5. Weekly Settlements & TDS (1%)
              </button>
            </div>

            {/* Sub-view 1: KYC Verification */}
            {sellerSubTab === 'kyc' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Merchant Legal Verification (GSTIN & PAN)</h3>
                    <p className="text-slate-500">Authorize or suspend marketplace vendors based on compliance audit.</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded">
                    Tier 1 Verified
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase border-b text-[11px]">
                      <tr>
                        <th className="p-3">Business Entity</th>
                        <th className="p-3">GSTIN Number</th>
                        <th className="p-3">PAN Number</th>
                        <th className="p-3">Settlement Bank</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {sellers.map((s) => (
                        <tr key={s.id}>
                          <td className="p-3">
                            <strong className="text-slate-900 block">{s.business_name}</strong>
                            <span className="text-[10px] text-slate-500">{s.name} ({s.email})</span>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-700">{s.gst_no}</td>
                          <td className="p-3 font-mono font-bold text-slate-700">{s.pan_no}</td>
                          <td className="p-3 text-slate-600">{s.bank_details}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${s.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {s.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            {s.status === 'pending' ? (
                              <button 
                                onClick={() => onApproveSeller(s.id)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded"
                              >
                                Approve KYC
                              </button>
                            ) : (
                              <button 
                                onClick={() => alert(`Seller ${s.business_name} suspended!`)}
                                className="text-red-500 hover:underline font-semibold"
                              >
                                Suspend
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-view 2: Merchant Inventory & Add Product */}
            {sellerSubTab === 'inventory' && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Live Merchant Catalog & Inventory Manager</h3>
                    <p className="text-slate-500">Add products on behalf of sellers or upload bulk CSV catalogs.</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Listing
                    </button>
                    <button 
                      onClick={() => alert('Simulated Bulk CSV Upload: 15 SKUs imported into MySQL database.')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg border flex items-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5 text-emerald-600" /> Bulk CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 uppercase border-b text-[11px]">
                      <tr>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Selling Price</th>
                        <th className="p-3">MRP</th>
                        <th className="p-3">Live Stock</th>
                        <th className="p-3">QC Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td className="p-3 flex items-center gap-2.5">
                            <img src={p.image} alt={p.name} className="w-8 h-8 object-contain rounded border" />
                            <span className="font-semibold text-slate-900 truncate max-w-xs">{p.name}</span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</td>
                          <td className="p-3 text-slate-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded font-bold ${p.stock < 20 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">
                              Approved
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button onClick={() => alert(`Editing listing: ${p.name}`)} className="text-blue-600 hover:underline font-semibold">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Sub-view 3: Orders Fulfillment */}
            {sellerSubTab === 'orders' && (
              <div className="space-y-3">
                {orders.map((o) => (
                  <div key={o.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-blue-600">#{o.order_number}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          {o.payment_method.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-slate-400">• {o.created_at}</span>
                      </div>
                      <h4 className="font-bold text-slate-900">{o.product.name}</h4>
                      <p className="text-slate-500 mt-0.5">Customer: {o.customer_name} • {o.address}</p>
                      <p className="text-purple-700 font-bold mt-1">Open Box Delivery OTP: {o.otp_code}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => alert(`Generated Shipping Label & Barcode for ${o.order_number}`)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 border">
                        <Barcode className="w-3.5 h-3.5" /> Label
                      </button>
                      <button onClick={() => alert(`Generated Tax Invoice for ${o.order_number}`)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 border">
                        <FileText className="w-3.5 h-3.5" /> Invoice
                      </button>
                      <button onClick={() => onUpdateOrderStatus(o.id, 'delivered')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg shadow">
                        Mark Delivered
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-view 4: Sponsored Ads Bidding */}
            {sellerSubTab === 'ads' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
                <h3 className="font-bold text-sm text-slate-900">Merchant Sponsored Ad Bidding Oversight</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Cost Per Click (CPC) Maximum Bid: ₹{cpcBid.toFixed(2)}</label>
                    <input 
                      type="range" 
                      min="2" 
                      max="15" 
                      step="0.5" 
                      value={cpcBid} 
                      onChange={(e) => setCpcBid(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <span className="text-[10px] text-slate-400">Competitive auction rate: ₹5.50 - ₹9.00</span>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Daily Merchant Budget: ₹{adBudget}</label>
                    <input 
                      type="range" 
                      min="500" 
                      max="5000" 
                      step="250" 
                      value={adBudget} 
                      onChange={(e) => setAdBudget(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <strong className="block text-slate-900">Estimated Return on Ad Spend (ROAS)</strong>
                    <span className="text-slate-500">Electronics & Mobiles category benchmark</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600">8.4x ROAS</span>
                </div>
              </div>
            )}

            {/* Sub-view 5: Payout Settlements */}
            {sellerSubTab === 'payouts' && (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
                <h3 className="font-bold text-sm text-slate-900">Weekly Payout Settlements & TDS Statements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="border p-3 rounded-lg bg-emerald-50/50">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Upcoming Tuesday Payout</span>
                    <div className="text-xl font-bold text-emerald-700 mt-1">₹68,400.00</div>
                    <span className="text-[10px] text-slate-500">Auto NEFT Disbursement ON</span>
                  </div>
                  <div className="border p-3 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Platform Commission Retained</span>
                    <div className="text-xl font-bold text-slate-800 mt-1">₹5,410.00</div>
                    <span className="text-[10px] text-slate-500">Category rate 6.5% - 8.0%</span>
                  </div>
                  <div className="border p-3 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">TDS Section 194-O (1%)</span>
                    <div className="text-xl font-bold text-slate-800 mt-1">₹845.00</div>
                    <span className="text-[10px] text-slate-500">Filed with Tax Authority</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 3: FULL PHP & MYSQL DATABASE MANAGEMENT
        ======================================================== */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            {/* DB Health Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Connected Database</span>
                <div className="text-base font-bold text-slate-900 mt-1 font-mono">flipkart_db</div>
                <span className="text-[10px] text-emerald-600 font-semibold">MySQL 8.0 • utf8mb4</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Relational Tables</span>
                <div className="text-base font-bold text-blue-600 mt-1 font-mono">9 Tables</div>
                <span className="text-[10px] text-slate-500">InnoDB ACID Engine</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Row Records</span>
                <div className="text-base font-bold text-slate-900 mt-1 font-mono">6,433 Rows</div>
                <span className="text-[10px] text-slate-500">B-Tree Indexed</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">PHP PDO Driver</span>
                <div className="text-base font-bold text-emerald-600 mt-1 font-mono">pdo_mysql ACTIVE</div>
                <span className="text-[10px] text-slate-500">Prepared Statements</span>
              </div>
            </div>

            {/* Interactive SQL Query Console */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-600" /> Interactive SQL Query Executor
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSqlQuery('SELECT id, name, price, stock, brand FROM products LIMIT 5;')}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded text-slate-700"
                  >
                    SELECT products
                  </button>
                  <button 
                    onClick={() => setSqlQuery('SELECT id, order_number, total_amount, status FROM orders;')}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded text-slate-700"
                  >
                    SELECT orders
                  </button>
                  <button 
                    onClick={() => setSqlQuery('SELECT id, business_name, gst_no, status FROM sellers;')}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded text-slate-700"
                  >
                    SELECT sellers
                  </button>
                </div>
              </div>

              <form onSubmit={handleExecuteSql} className="space-y-3">
                <textarea 
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  rows={3}
                  className="w-full font-mono text-xs p-3 bg-slate-900 text-emerald-400 rounded-lg border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-600 mr-1" />
                    PHP PDO parameterized query runner with SQL injection defense
                  </span>
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Run SQL Query
                  </button>
                </div>
              </form>

              {/* Live Query Results Table */}
              <div className="border rounded-lg overflow-hidden mt-4">
                <div className="bg-slate-100 px-3 py-2 border-b flex justify-between items-center">
                  <span className="font-mono text-slate-700 font-bold">{queryStatus}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    HTTP 200 OK
                  </span>
                </div>
                <div className="overflow-x-auto max-h-60 bg-white">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-50 text-slate-600 border-b">
                      <tr>
                        {queryResult.length > 0 && Object.keys(queryResult[0]).map((col) => (
                          <th key={col} className="p-2.5 font-bold uppercase text-[10px]">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {queryResult.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          {Object.values(row).map((val: any, cIdx) => (
                            <td key={cIdx} className="p-2.5 text-slate-800">
                              {typeof val === 'number' ? val.toLocaleString() : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Table Directory Inspector */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Database Schema & Table Storage Metrics</h3>
                  <p className="text-slate-400">Inspecting all 9 tables in flipkart_db</p>
                </div>
                <a 
                  href="/database.sql" 
                  download 
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded border flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download database.sql
                </a>
              </div>
              <table className="w-full text-left font-mono">
                <thead className="bg-slate-50 text-slate-500 uppercase border-b text-[11px]">
                  <tr>
                    <th className="p-3">Table Name</th>
                    <th className="p-3">Storage Engine</th>
                    <th className="p-3">Total Rows</th>
                    <th className="p-3">Disk Size</th>
                    <th className="p-3">Collation</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {dbTables.map((tbl) => (
                    <tr key={tbl.name} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-blue-700 flex items-center gap-2">
                        <Table className="w-3.5 h-3.5 text-slate-400" />
                        <span>{tbl.name}</span>
                      </td>
                      <td className="p-3 text-slate-600">{tbl.engine}</td>
                      <td className="p-3 font-bold text-slate-900">{tbl.rows.toLocaleString()}</td>
                      <td className="p-3 text-slate-600">{tbl.size}</td>
                      <td className="p-3 text-slate-400 text-[11px]">{tbl.collation}</td>
                      <td className="p-3 text-right space-x-2">
                        <button 
                          onClick={() => {
                            setSqlQuery(`SELECT * FROM ${tbl.name} LIMIT 10;`);
                            setActiveTab('database');
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Browse
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: CATALOG & QC
        ======================================================== */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900">Catalog Quality Control & Listing Approvals</h3>
            <div className="divide-y divide-slate-100">
              {products.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-contain rounded border p-1" />
                    <div>
                      <h4 className="font-bold text-slate-900">{p.name}</h4>
                      <p className="text-slate-500">Brand: {p.brand} • Price: ₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      QC Approved
                    </span>
                    <button onClick={() => alert(`Product ${p.name} re-verified.`)} className="border px-2.5 py-1 rounded hover:bg-slate-50">
                      Re-audit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: ORDERS
        ======================================================== */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-900">Orders Escrow & Fulfilment Audit</h3>
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="border rounded-xl p-3.5 bg-slate-50/50 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-blue-600">#{o.order_number}</span>
                    <p className="font-bold text-slate-800">{o.product.name}</p>
                    <p className="text-slate-500">Customer: {o.customer_name} • Address: {o.address}</p>
                    <p className="text-purple-700 font-bold mt-1">Open Box Delivery OTP: {o.otp_code}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900 block">₹{o.total_amount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded inline-block mt-1">
                      {o.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5.5: REAL-TIME UPI & DIRECT BANK SETTLEMENT GATEWAY
        ======================================================== */}
        {activeTab === 'upi_banking' && (
          <div className="space-y-6">
            {/* Bank Gateway Notification Notice */}
            {bankSuccessNotice && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold">{bankSuccessNotice}</span>
                </div>
                <button onClick={() => setBankSuccessNotice(null)} className="text-emerald-700 hover:text-emerald-900 font-bold ml-2">×</button>
              </div>
            )}

            {/* Top Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Total Received via UPI</span>
                <div className="text-xl font-black text-emerald-700 mt-1 flex items-baseline gap-1">
                  <span>₹{bankConfig.total_received.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono font-bold">LIVE SYNC</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Direct bank auto-credits</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Configured Bank</span>
                <div className="text-base font-bold text-slate-900 mt-1 line-clamp-1">{bankConfig.bank_name}</div>
                <span className="text-[10px] text-emerald-600 font-medium font-mono">A/C: ••••{bankConfig.account_number.slice(-4)} ({bankConfig.account_type})</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Receiving UPI ID</span>
                <div className="text-sm font-bold text-blue-600 font-mono mt-1 line-clamp-1">{bankConfig.upi_vpa}</div>
                <span className="text-[10px] text-slate-500 font-mono">Merchant Code: {bankConfig.merchant_code}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Gateway Commission Cut</span>
                <div className="text-xl font-black text-slate-900 mt-1 font-mono">₹0.00 (0.0%)</div>
                <span className="text-[10px] text-emerald-600 font-semibold">100% Direct IMPS Settlement</span>
              </div>
            </div>

            {/* Configured Receiving Bank Account Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <span>Configured Receiving Bank Account</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        ✓ Real-Time Auto-Credit Active
                      </span>
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Customer UPI payments transfer directly into this configured bank account via NPCI IMPS without intermediary withholding.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditBankForm({ ...bankConfig });
                      setShowEditBankModal(true);
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#ffe11b]" />
                    <span>Configure Bank Details</span>
                  </button>
                </div>
              </div>

              {/* Bank Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Account Holder Legal Entity</span>
                  <div className="font-bold text-slate-900 text-xs">{bankConfig.account_holder_name}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold flex items-center justify-between">
                    <span>Account Number</span>
                    <button 
                      onClick={() => setIsAccountUnmasked(!isAccountUnmasked)} 
                      className="text-[#2874f0] hover:underline text-[10px] flex items-center gap-0.5"
                    >
                      {isAccountUnmasked ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3 text-[#2874f0]" />}
                      <span>{isAccountUnmasked ? 'Mask' : 'Reveal'}</span>
                    </button>
                  </span>
                  <div className="font-mono font-bold text-slate-900 text-xs">
                    {isAccountUnmasked ? bankConfig.account_number : `•••• •••• •••• ${bankConfig.account_number.slice(-4)}`}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Bank Name & Branch</span>
                  <div className="font-bold text-slate-900 text-xs">{bankConfig.bank_name}</div>
                  <div className="text-[10px] text-slate-500">{bankConfig.branch}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">IFSC Code</span>
                  <div className="font-mono font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <span>{bankConfig.ifsc_code}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded font-sans">Verified</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Account Type</span>
                  <div className="font-bold text-slate-900 text-xs">{bankConfig.account_type} Account</div>
                </div>
                <div className="space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Primary Receiving UPI ID</span>
                  <div className="font-mono font-bold text-blue-600 text-xs">{bankConfig.upi_vpa}</div>
                </div>
              </div>

              {/* 1-Click Preset Corporate Bank Switcher */}
              <div className="border-t pt-3 space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">Switch to Verified Corporate Bank Presets:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {PRESET_BANK_OPTIONS.map((preset, idx) => {
                    const isSelected = bankConfig.bank_name === preset.bank_name && bankConfig.account_number === preset.account_number;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          onUpdateBankConfig({
                            ...bankConfig,
                            bank_name: preset.bank_name,
                            account_holder_name: preset.account_holder_name,
                            account_number: preset.account_number,
                            ifsc_code: preset.ifsc_code,
                            branch: preset.branch,
                            account_type: preset.account_type,
                            upi_vpa: preset.upi_vpa
                          });
                          setBankSuccessNotice(`Receiving Bank Account switched to ${preset.bank_name}! All future customer UPI payments will transfer here directly.`);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${isSelected ? 'border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/30' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{preset.bank_name}</span>
                          {isSelected && <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">Active</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-mono">••••{preset.account_number.slice(-4)} • {preset.ifsc_code}</p>
                        <p className="text-[10px] text-blue-600 font-mono mt-0.5 truncate">{preset.upi_vpa}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Live UPI Direct Settlement Ledger / Passbook */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <SmartphoneNfc className="w-4 h-4 text-emerald-600" />
                    <span>Real-Time UPI Bank Passbook & Settlement Ledger</span>
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    Live audit log of all customer payments directly credited to {bankConfig.bank_name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    alert(`Bank Statement CSV generated for ${bankConfig.bank_name} (A/C ••••${bankConfig.account_number.slice(-4)}) - Total Settled: ₹${bankConfig.total_received.toLocaleString('en-IN')}`);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Bank CSV</span>
                </button>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b">
                    <tr>
                      <th className="p-2.5">Date & Time</th>
                      <th className="p-2.5">Order No</th>
                      <th className="p-2.5">Customer & VPA</th>
                      <th className="p-2.5">Credited Bank Account</th>
                      <th className="p-2.5">NPCI UTR / RRN</th>
                      <th className="p-2.5 text-right">Amount (₹)</th>
                      <th className="p-2.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {orders.filter(o => o.payment_method === 'upi').map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50/80">
                        <td className="p-2.5 text-[11px] text-slate-500">
                          {o.upi_transaction ? o.upi_transaction.timestamp : o.created_at}
                        </td>
                        <td className="p-2.5 font-mono font-bold text-blue-600">
                          {o.order_number}
                        </td>
                        <td className="p-2.5">
                          <span className="font-bold text-slate-800 block">{o.customer_name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{o.upi_transaction ? o.upi_transaction.customer_vpa : 'rahulsharma@okhdfcbank'}</span>
                        </td>
                        <td className="p-2.5">
                          <span className="font-bold text-slate-800 block text-[11px]">
                            {o.upi_transaction ? o.upi_transaction.destination_bank : bankConfig.bank_name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            A/C ••••{o.upi_transaction ? o.upi_transaction.destination_account.slice(-4) : bankConfig.account_number.slice(-4)}
                          </span>
                        </td>
                        <td className="p-2.5 font-mono text-[11px] text-slate-800">
                          {o.upi_transaction ? o.upi_transaction.utr_number : `428198${Math.floor(100000 + o.id * 12345)}`}
                        </td>
                        <td className="p-2.5 text-right font-bold text-slate-900 font-mono text-xs">
                          ₹{o.total_amount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-2.5 text-center">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                            <Check className="w-2.5 h-2.5" /> CREDITED TO BANK
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Custom Bank Account Configuration Modal */}
            {showEditBankModal && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl text-xs space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                      <h3 className="font-bold text-sm text-slate-900">Configure Receiving Bank Account</h3>
                    </div>
                    <button onClick={() => setShowEditBankModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-base">×</button>
                  </div>

                  <p className="text-slate-500 text-[11px]">
                    Specify the bank account details where customer UPI transactions will be directly credited in real-time.
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Account Holder Legal Entity Name:</label>
                      <input 
                        type="text" 
                        value={editBankForm.account_holder_name}
                        onChange={(e) => setEditBankForm({ ...editBankForm, account_holder_name: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Bank Name:</label>
                        <input 
                          type="text" 
                          value={editBankForm.bank_name}
                          onChange={(e) => setEditBankForm({ ...editBankForm, bank_name: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Account Number:</label>
                        <input 
                          type="text" 
                          value={editBankForm.account_number}
                          onChange={(e) => setEditBankForm({ ...editBankForm, account_number: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">IFSC Code:</label>
                        <input 
                          type="text" 
                          value={editBankForm.ifsc_code}
                          onChange={(e) => setEditBankForm({ ...editBankForm, ifsc_code: e.target.value.toUpperCase() })}
                          className="w-full border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Account Type:</label>
                        <select 
                          value={editBankForm.account_type}
                          onChange={(e) => setEditBankForm({ ...editBankForm, account_type: e.target.value as any })}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                        >
                          <option value="Current">Current Account</option>
                          <option value="Escrow Nodal">Escrow Nodal Account</option>
                          <option value="Savings">Savings Account</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Branch Name & City:</label>
                        <input 
                          type="text" 
                          value={editBankForm.branch}
                          onChange={(e) => setEditBankForm({ ...editBankForm, branch: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Primary Receiving UPI VPA:</label>
                        <input 
                          type="text" 
                          value={editBankForm.upi_vpa}
                          onChange={(e) => setEditBankForm({ ...editBankForm, upi_vpa: e.target.value })}
                          className="w-full border rounded-lg px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t">
                    <button 
                      type="button"
                      onClick={() => setShowEditBankModal(false)}
                      className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        onUpdateBankConfig(editBankForm);
                        setShowEditBankModal(false);
                        setBankSuccessNotice(`Receiving Bank Account successfully updated to ${editBankForm.bank_name} (A/C ${editBankForm.account_number})!`);
                      }}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md"
                    >
                      Save & Apply Bank Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            TAB 6: LOGISTICS & TAX ENGINE
        ======================================================== */}
        {activeTab === 'logistics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-white rounded-xl border p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900">3PL Carrier API Gateways</h3>
              <div className="border p-2.5 rounded-lg">
                <span className="font-bold text-slate-800 block">Ekart Logistics API</span>
                <span className="text-[10px] text-emerald-700 font-mono">STATUS: CONNECTED (Port 443 SSL)</span>
              </div>
              <div className="border p-2.5 rounded-lg">
                <span className="font-bold text-slate-800 block">Delhivery B2C Express</span>
                <span className="text-[10px] text-emerald-700 font-mono">STATUS: CONNECTED</span>
              </div>
              <div className="border p-2.5 rounded-lg">
                <span className="font-bold text-slate-800 block">Shiprocket Standard</span>
                <span className="text-[10px] text-slate-500 font-mono">STATUS: STANDBY FALLBACK</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-900">Tax & Commission Rules</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b pb-1">
                  <span>TDS Section 194-O:</span>
                  <span className="font-bold text-slate-900">1.00%</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>GST on Marketplace Commission:</span>
                  <span className="font-bold text-slate-900">18.00%</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Mobiles Commission Take-Rate:</span>
                  <span className="font-bold text-slate-900">6.50%</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span>Fashion Commission Take-Rate:</span>
                  <span className="font-bold text-slate-900">12.00%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: MYSTERY CMS & DEALS
        ======================================================== */}
        {activeTab === 'cms' && (
          <div className="bg-white rounded-xl border p-5 shadow-sm text-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900">Mystery Deals & Promotional Banners</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border p-3 rounded-lg">
                <strong className="block text-slate-800 mb-1">🎁 Mystery Box Event Rules</strong>
                <p className="text-slate-500">Mystery surprise coupon code: MYSTERY1500 (₹1,500 Instant Discount).</p>
                <span className="font-mono font-bold text-emerald-600 block mt-2">Active on Customer Homepage</span>
              </div>
              <div className="border p-3 rounded-lg">
                <strong className="block text-slate-800 mb-1">SuperCoins Reward Ratio</strong>
                <p className="text-slate-500">4 Coins earned per ₹100 spent by Shopping Mystery Plus shoppers.</p>
                <span className="font-mono font-bold text-purple-600 block mt-2">1 Coin = ₹1.00 Value</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Product Modal for Integrated Seller Hub */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="font-bold text-sm text-slate-900">Add Merchant Product Listing</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="e.g. OnePlus 12R 5G (Cool Blue, 128 GB)" 
                  required 
                  className="w-full border rounded p-2" 
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Selling Price (₹)</label>
                  <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className="w-full border rounded p-2" required />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">MRP (₹)</label>
                  <input type="number" value={newMrp} onChange={(e) => setNewMrp(e.target.value)} className="w-full border rounded p-2" required />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stock Units</label>
                <input type="number" value={newStock} onChange={(e) => setNewStock(e.target.value)} className="w-full border rounded p-2" required />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Product Image File Upload <span className="text-slate-400 font-normal">(JPG, PNG, WEBP)</span>
                </label>
                <div className="border border-dashed border-slate-300 rounded-lg p-2.5 bg-slate-50 text-center">
                  <input 
                    type="file" 
                    id="adminProductFileInput"
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setNewImageName(file.name);
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setNewImagePreview(ev.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }} 
                  />
                  {newImagePreview ? (
                    <div className="flex items-center justify-between gap-2 bg-white p-2 rounded border text-left">
                      <div className="flex items-center gap-2">
                        <img src={newImagePreview} alt="Preview" className="w-10 h-10 object-cover rounded border" />
                        <div>
                          <span className="font-bold text-slate-800 text-[11px] block truncate max-w-[180px]">{newImageName}</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">Image Ready for Upload</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => { setNewImagePreview(null); setNewImageName(''); }}
                        className="text-red-500 hover:text-red-700 text-xs font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button 
                      type="button" 
                      onClick={() => document.getElementById('adminProductFileInput')?.click()}
                      className="text-blue-600 hover:underline flex items-center justify-center gap-1.5 w-full py-1 font-semibold text-xs"
                    >
                      <Upload className="w-3.5 h-3.5 text-blue-500" />
                      <span>Select Image from Computer</span>
                    </button>
                  )}
                </div>
              </div>
              <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded shadow mt-2">
                Save & Insert into MySQL DB
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
