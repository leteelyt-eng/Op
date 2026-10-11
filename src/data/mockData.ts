export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  image: string;
  commission_rate: number;
}

export interface Product {
  id: number;
  seller_id: number;
  cat_id: number;
  name: string;
  description: string;
  price: number;
  mrp: number;
  stock: number;
  image: string;
  gallery: string[];
  brand: string;
  rating: number;
  reviews_count: number;
  is_assured: boolean;
  qc_status: 'approved' | 'pending' | 'rejected';
  colors: string[];
  variants: string[];
  specs: { [key: string]: string };
}

export interface BankAccountConfig {
  account_holder_name: string;
  account_number: string;
  ifsc_code: string;
  bank_name: string;
  branch: string;
  account_type: 'Current' | 'Savings' | 'Escrow Nodal';
  upi_vpa: string; // The primary UPI ID that receives funds directly (e.g. shoppingmystery@hdfcbank)
  merchant_code: string;
  settlement_mode: 'Instant IMPS' | 'Real-time UPI Auto-Credit' | 'RTGS Nodal';
  is_verified: boolean;
  total_received: number;
}

export interface UPITransaction {
  id: string;
  order_number: string;
  customer_vpa: string;
  destination_vpa: string;
  destination_bank: string;
  destination_account: string;
  destination_ifsc: string;
  amount: number;
  utr_number: string;
  timestamp: string;
  status: 'SUCCESS' | 'CREDITED_TO_BANK';
  reference_id: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id: number;
  customer_name: string;
  customer_phone: string;
  address: string;
  pincode: string;
  seller_name: string;
  delivery_partner: string;
  product: Product;
  quantity: number;
  total_amount: number;
  payment_method: 'upi' | 'card' | 'netbanking' | 'cod' | 'emi';
  payment_status: 'paid' | 'pending';
  status: 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  otp_code: string;
  created_at: string;
  upi_transaction?: UPITransaction;
  rating?: number;
  review?: string;
  rated_at?: string;
}

export interface Seller {
  id: number;
  name: string;
  business_name: string;
  gst_no: string;
  pan_no: string;
  email: string;
  phone: string;
  bank_details: string;
  status: 'approved' | 'pending' | 'suspended';
  rating: number;
}

export interface DeliveryPartner {
  id: number;
  name: string;
  phone: string;
  vehicle_no: string;
  vehicle_type: string;
  status: 'active' | 'on_delivery' | 'offline';
  rating: number;
  current_location: string;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: 1, name: 'Mobiles & Tablets', slug: 'mobiles', icon: 'fa-mobile-screen-button', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80', commission_rate: 6.5 },
  { id: 2, name: 'Electronics', slug: 'electronics', icon: 'fa-laptop', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80', commission_rate: 8.0 },
  { id: 3, name: 'Fashion & Apparel', slug: 'fashion', icon: 'fa-shirt', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&q=80', commission_rate: 12.0 },
  { id: 4, name: 'Appliances', slug: 'appliances', icon: 'fa-tv', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80', commission_rate: 7.5 },
  { id: 5, name: 'Home & Furniture', slug: 'home', icon: 'fa-couch', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80', commission_rate: 10.0 },
  { id: 6, name: 'Grocery & Staples', slug: 'grocery', icon: 'fa-basket-shopping', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=300&q=80', commission_rate: 5.0 },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    seller_id: 1,
    cat_id: 1,
    name: 'Nothing Phone (2a) 5G (Black, 128 GB)',
    description: 'Custom Dimensity 7200 Pro Processor, 50 MP OIS + 50 MP Ultra-wide Camera, 120 Hz Flexible AMOLED Display, Glyph interface lights, 45W Fast Charging.',
    price: 23999,
    mrp: 25999,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
    ],
    brand: 'Nothing',
    rating: 4.4,
    reviews_count: 1420,
    is_assured: true,
    qc_status: 'approved',
    colors: ['Black', 'White', 'Special Blue'],
    variants: ['8 GB + 128 GB', '8 GB + 256 GB', '12 GB + 256 GB'],
    specs: {
      'Processor': 'MediaTek Dimensity 7200 Pro 5G',
      'Primary Camera': '50 MP (f/1.88, OIS) + 50 MP Ultra-Wide',
      'Front Camera': '32 MP Selfie Sensor',
      'Display': '6.7 inch FHD+ Flexible AMOLED 120Hz',
      'Battery': '5000 mAh with 45W fast charge support',
    }
  },
  {
    id: 2,
    seller_id: 1,
    cat_id: 1,
    name: 'Apple iPhone 15 (Blue, 128 GB)',
    description: 'Dynamic Island bubbles up alerts, 48MP Main camera with 2x Telephoto optical zoom, durable color-infused glass and aerospace-grade aluminum design, USB-C.',
    price: 65999,
    mrp: 79900,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    ],
    brand: 'Apple',
    rating: 4.7,
    reviews_count: 8950,
    is_assured: true,
    qc_status: 'approved',
    colors: ['Blue', 'Pink', 'Black', 'Green'],
    variants: ['128 GB', '256 GB', '512 GB'],
    specs: {
      'Chipset': 'A16 Bionic chip with 5-core GPU',
      'Display': 'Super Retina XDR display (6.1-inch OLED)',
      'Camera': '48MP Main + 12MP Ultra Wide with Photonic Engine',
      'Connector': 'USB-C with DisplayPort',
    }
  },
  {
    id: 3,
    seller_id: 1,
    cat_id: 2,
    name: 'Sony WH-1000XM5 Active Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation optimized automatically by Auto NC Optimizer. 8 microphones and 2 processors for unprecedented cancellation depth.',
    price: 26990,
    mrp: 34990,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'
    ],
    brand: 'Sony',
    rating: 4.6,
    reviews_count: 2410,
    is_assured: true,
    qc_status: 'approved',
    colors: ['Black', 'Silver', 'Midnight Blue'],
    variants: ['Standard ANC Edition'],
    specs: {
      'Battery Life': 'Up to 30 hours with ANC turned on',
      'Drivers': '30mm precision engineered carbon fiber',
      'Weight': '250 grams ultra-lightweight fit',
    }
  },
  {
    id: 4,
    seller_id: 2,
    cat_id: 3,
    name: 'Highlander Men Slim Fit Solid Cutaway Collar Shirt',
    description: 'Crafted with premium breathable 100% cotton yarn. Tailored cutaway collar with curved hemline and reinforced button placket for casual or semi-formal looks.',
    price: 899,
    mrp: 2499,
    stock: 120,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80'
    ],
    brand: 'Highlander',
    rating: 4.1,
    reviews_count: 840,
    is_assured: true,
    qc_status: 'approved',
    colors: ['Sky Blue', 'White', 'Navy Blue'],
    variants: ['S', 'M', 'L', 'XL', 'XXL'],
    specs: {
      'Fabric': '100% Pure Combed Cotton',
      'Fit': 'Slim Fit European Tailoring',
      'Wash Care': 'Machine wash cold with like colors',
    }
  },
  {
    id: 5,
    seller_id: 1,
    cat_id: 4,
    name: 'LG 8 Kg 5 Star Smart Inverter Front Load Washing Machine',
    description: 'AI DD Direct Drive detects fabric weight and softness to choose optimal wash motions. Steam Allergy Care removes 99.9% of dust mites and allergens.',
    price: 34990,
    mrp: 48990,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&q=80'
    ],
    brand: 'LG',
    rating: 4.5,
    reviews_count: 620,
    is_assured: true,
    qc_status: 'approved',
    colors: ['Platinum Silver', 'Dark Matte Gray'],
    variants: ['8 Kg Front Load'],
    specs: {
      'Capacity': '8 Kg suitable for families of 3-5 members',
      'Energy Rating': '5 Star BEE Certified 2026',
      'Motor': 'Inverter Direct Drive with 10-year warranty',
    }
  },
  {
    id: 6,
    seller_id: 2,
    cat_id: 5,
    name: 'Green Soul Ergonomic High Back Mesh Executive Office Chair',
    description: 'Heavy-duty breathable Korean mesh back with adjustable 2D lumbar pillow. 3D soft PU armrests and synchronous knee tilt recline up to 135 degrees with tilt lock.',
    price: 7499,
    mrp: 14999,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1580481077113-e4d3db2694ec?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580481077113-e4d3db2694ec?w=600&q=80'
    ],
    brand: 'Green Soul',
    rating: 4.3,
    reviews_count: 1150,
    is_assured: true,
    qc_status: 'approved',
    colors: ['Midnight Black', 'Slate Grey'],
    variants: ['Standard High Back'],
    specs: {
      'Max Weight Capacity': '135 Kg',
      'Recline Mechanism': '135° Any-angle Lock Mechanism',
      'Base': 'Heavy Duty Glass Nylon 60mm Caster Base',
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    order_number: 'OD4298174201',
    user_id: 1,
    customer_name: 'Rahul Sharma',
    customer_phone: '9876543210',
    address: 'Flat 402, Lotus Heights, Sector 62, Noida, Uttar Pradesh',
    pincode: '201301',
    seller_name: 'TechGizmo Retailers Pvt Ltd',
    delivery_partner: 'Vikram Singh (DL 4S CZ 9021)',
    product: INITIAL_PRODUCTS[0],
    quantity: 1,
    total_amount: 23999,
    payment_method: 'upi',
    payment_status: 'paid',
    status: 'out_for_delivery',
    otp_code: '4921',
    created_at: 'Oct 08, 2026, 11:24 AM'
  },
  {
    id: 2,
    order_number: 'OD4298174202',
    user_id: 2,
    customer_name: 'Priya Patel',
    customer_phone: '9812345678',
    address: 'B-12, Green Park Extension, New Delhi',
    pincode: '110016',
    seller_name: 'Urban Trends Fashion Hub',
    delivery_partner: 'Amit Kumar (DL 3C AB 4455)',
    product: INITIAL_PRODUCTS[3],
    quantity: 1,
    total_amount: 899,
    payment_method: 'cod',
    payment_status: 'pending',
    status: 'shipped',
    otp_code: '7734',
    created_at: 'Oct 09, 2026, 09:12 AM'
  }
];

export const INITIAL_SELLERS: Seller[] = [
  {
    id: 1,
    name: 'Ankit Verma',
    business_name: 'TechGizmo Retailers Pvt Ltd',
    gst_no: '07AAAAA0000A1Z5',
    pan_no: 'ABCDE1234F',
    email: 'ankit@techgizmo.in',
    phone: '9988776655',
    bank_details: 'HDFC Bank, Acc: 5010023456789, IFSC: HDFC0001234',
    status: 'approved',
    rating: 4.7
  },
  {
    id: 2,
    name: 'Kavita Roy',
    business_name: 'Urban Trends Fashion Hub',
    gst_no: '27BBBBB1111B2Z6',
    pan_no: 'FGHIJ5678K',
    email: 'kavita@urbantrends.in',
    phone: '9877112233',
    bank_details: 'ICICI Bank, Acc: 001105009876, IFSC: ICIC0000011',
    status: 'approved',
    rating: 4.4
  },
  {
    id: 3,
    name: 'Rohit Sen',
    business_name: 'Apex Electronics LLP',
    gst_no: '06CCCCC2222C3Z7',
    pan_no: 'JKLMN9012P',
    email: 'rohit@apexelectronics.in',
    phone: '9811445566',
    bank_details: 'Axis Bank, Acc: 919010045611223, IFSC: UTIB0000123',
    status: 'pending',
    rating: 4.1
  }
];

export const INITIAL_DELIVERY_PARTNERS: DeliveryPartner[] = [
  {
    id: 1,
    name: 'Vikram Singh',
    phone: '9123456780',
    vehicle_no: 'DL 4S CZ 9021',
    vehicle_type: 'Motorcycle (Hero Splendor)',
    status: 'on_delivery',
    rating: 4.9,
    current_location: 'Sector 62, Noida (28.5355, 77.3910)'
  },
  {
    id: 2,
    name: 'Amit Kumar',
    phone: '9198765432',
    vehicle_no: 'DL 3C AB 4455',
    vehicle_type: 'Scooter (Honda Activa)',
    status: 'active',
    rating: 4.75,
    current_location: 'Green Park, New Delhi (28.4595, 77.0266)'
  }
];

export const INITIAL_BANK_CONFIG: BankAccountConfig = {
  account_holder_name: 'SHOPPING MYSTERY COMMERCE PRIVATE LIMITED',
  account_number: '50200084920194',
  ifsc_code: 'HDFC0000128',
  bank_name: 'HDFC Bank Ltd',
  branch: 'Connaught Place Main Branch, New Delhi',
  account_type: 'Escrow Nodal',
  upi_vpa: 'shoppingmystery@hdfcbank',
  merchant_code: 'SM789410',
  settlement_mode: 'Real-time UPI Auto-Credit',
  is_verified: true,
  total_received: 248950
};

export const PRESET_BANK_OPTIONS = [
  {
    bank_name: 'HDFC Bank Ltd',
    account_holder_name: 'SHOPPING MYSTERY COMMERCE PRIVATE LIMITED',
    account_number: '50200084920194',
    ifsc_code: 'HDFC0000128',
    branch: 'Connaught Place Main Branch, New Delhi',
    account_type: 'Escrow Nodal' as const,
    upi_vpa: 'shoppingmystery@hdfcbank'
  },
  {
    bank_name: 'State Bank of India (SBI)',
    account_holder_name: 'SHOPPING MYSTERY PVT LTD CURRENT A/C',
    account_number: '389201140921',
    ifsc_code: 'SBIN0000691',
    branch: 'New Delhi Main Parliament Street',
    account_type: 'Current' as const,
    upi_vpa: 'shoppingmystery@sbi'
  },
  {
    bank_name: 'ICICI Bank Ltd',
    account_holder_name: 'SHOPPING MYSTERY DIGITAL SETTLEMENT',
    account_number: '001105028490',
    ifsc_code: 'ICIC0000011',
    branch: 'Sector 18 Cyber City, Noida',
    account_type: 'Current' as const,
    upi_vpa: 'shoppingmystery@icici'
  }
];
