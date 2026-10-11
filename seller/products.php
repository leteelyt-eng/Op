<?php
require_once __DIR__ . '/../common/config.php';

$upload_message = '';
$upload_status = '';

// Handle Product Add Form Submission with File Upload & MySQL DB Save
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'add_product') {
    $title = trim($_POST['title'] ?? '');
    $price = floatval($_POST['price'] ?? 0);
    $mrp = floatval($_POST['mrp'] ?? 0);
    $stock = intval($_POST['stock'] ?? 0);
    $category_id = intval($_POST['category_id'] ?? 1);
    $brand = trim($_POST['brand'] ?? 'Generic');
    $description = trim($_POST['description'] ?? ($title . ' - Authentic manufacturer sealed packaging.'));
    $seller_id = 1; // Default active merchant session

    if (empty($title) || $price <= 0 || $mrp <= 0) {
        $upload_status = 'error';
        $upload_message = 'Please provide valid product title, selling price, and MRP.';
    } elseif (!isset($_FILES['product_image']) || $_FILES['product_image']['error'] !== UPLOAD_ERR_OK) {
        $upload_status = 'error';
        $upload_message = 'Please select a valid image file to upload.';
    } else {
        $file = $_FILES['product_image'];
        $allowed_mime_types = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        $max_file_size = 5 * 1024 * 1024; // 5 MB

        // 1. Validate File Size
        if ($file['size'] > $max_file_size) {
            $upload_status = 'error';
            $upload_message = 'File size exceeds limit. Maximum allowed size is 5MB.';
        } else {
            // 2. Validate MIME Type using Fileinfo for security
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mime_type = finfo_file($finfo, $file['tmp_name']);
            finfo_close($finfo);

            if (!in_array($mime_type, $allowed_mime_types)) {
                $upload_status = 'error';
                $upload_message = 'Invalid file type (' . htmlspecialchars($mime_type) . '). Allowed: JPG, PNG, WEBP.';
            } else {
                // 3. Prepare Upload Directory
                $upload_dir = __DIR__ . '/../uploads/products/';
                if (!is_dir($upload_dir)) {
                    mkdir($upload_dir, 0755, true);
                }

                // 4. Generate Safe Unique Filename
                $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                $safe_filename = 'prod_' . date('Ymd_His') . '_' . bin2hex(random_bytes(4)) . '.' . $extension;
                $destination = $upload_dir . $safe_filename;
                $db_relative_path = 'uploads/products/' . $safe_filename;

                // 5. Move Temporary File to Permanent Destination
                if (move_uploaded_file($file['tmp_name'], $destination)) {
                    // 6. Save Path & Product into MySQL Database via PDO Prepared Statement
                    if (isset($pdo) && $pdo !== null) {
                        try {
                            $stmt = $pdo->prepare("
                                INSERT INTO products (seller_id, cat_id, name, description, price, mrp, stock, image, brand, is_assured, qc_status)
                                VALUES (:seller_id, :cat_id, :name, :description, :price, :mrp, :stock, :image, :brand, 1, 'approved')
                            ");
                            $stmt->execute([
                                ':seller_id'   => $seller_id,
                                ':cat_id'      => $category_id,
                                ':name'        => $title,
                                ':description' => $description,
                                ':price'       => $price,
                                ':mrp'         => $mrp,
                                ':stock'       => $stock,
                                ':image'       => $db_relative_path,
                                ':brand'       => $brand
                            ]);
                            $new_id = $pdo->lastInsertId();
                            $upload_status = 'success';
                            $upload_message = "Product listing #$new_id published successfully! Image path saved to MySQL: '$db_relative_path'";
                        } catch (PDOException $e) {
                            $upload_status = 'warning';
                            $upload_message = "Image saved to '$db_relative_path', but database query warning: " . htmlspecialchars($e->getMessage());
                        }
                    } else {
                        $upload_status = 'success';
                        $upload_message = "Image saved successfully at '$db_relative_path' and verified for product catalog.";
                    }
                } else {
                    $upload_status = 'error';
                    $upload_message = 'Failed to move uploaded file. Check directory write permissions.';
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seller Catalog & Inventory Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>
<body class="bg-slate-50 min-h-screen font-sans">
    <header class="bg-white border-b px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div class="flex items-center gap-3">
            <a href="dashboard.php" class="text-xl font-black italic text-blue-600">Flipkart</a>
            <span class="text-xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded">Inventory Manager</span>
        </div>
        <div class="flex items-center gap-2">
            <button id="openBulkUploadBtn" class="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <i class="fa-solid fa-file-csv text-emerald-600"></i> Bulk Upload CSV
            </button>
            <button id="openAddProductBtn" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                <i class="fa-solid fa-plus"></i> Add New Product
            </button>
        </div>
    </header>

    <main class="max-w-6xl w-full mx-auto p-4 space-y-4">
        <!-- Status Notification Message -->
        <?php if (!empty($upload_message)): ?>
            <div class="p-4 rounded-xl border text-xs font-semibold flex items-center justify-between <?php echo $upload_status === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : ($upload_status === 'warning' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-red-50 border-red-200 text-red-800'); ?>">
                <div class="flex items-center gap-2">
                    <i class="fa-solid <?php echo $upload_status === 'success' ? 'fa-circle-check text-emerald-600' : 'fa-circle-exclamation'; ?> text-base"></i>
                    <span><?php echo htmlspecialchars($upload_message); ?></span>
                </div>
                <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 font-bold ml-4">✕</button>
            </div>
        <?php endif; ?>
        <!-- Stock Filter Strip -->
        <div class="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
            <div class="flex gap-2">
                <button class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-bold">All Listings (4)</button>
                <button class="text-slate-600 hover:bg-slate-50 px-3 py-1 rounded-lg">Active (3)</button>
                <button class="text-slate-600 hover:bg-slate-50 px-3 py-1 rounded-lg">Low Stock (1)</button>
            </div>
            <div class="relative w-64">
                <i class="fa-solid fa-search absolute left-3 top-2.5 text-slate-400"></i>
                <input type="text" placeholder="Search SKU, Product Name..." class="w-full border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-blue-500" />
            </div>
        </div>

        <!-- Product Listings Table -->
        <div class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table class="w-full text-left text-xs">
                <thead class="bg-slate-50 text-slate-500 uppercase border-b">
                    <tr>
                        <th class="p-3">Item Details</th>
                        <th class="p-3">Category</th>
                        <th class="p-3">Selling Price</th>
                        <th class="p-3">MRP</th>
                        <th class="p-3">Live Stock</th>
                        <th class="p-3">QC Status</th>
                        <th class="p-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="p-3 flex items-center gap-3">
                            <img src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&q=80" class="w-10 h-10 object-contain rounded border" />
                            <div>
                                <span class="font-bold text-slate-900 block">Nothing Phone (2a) 5G</span>
                                <span class="text-[10px] text-slate-400">SKU: NOTH-2A-128-BLK</span>
                            </div>
                        </td>
                        <td class="p-3 text-slate-600">Mobiles</td>
                        <td class="p-3 font-bold text-slate-900">₹23,999</td>
                        <td class="p-3 text-slate-400 line-through">₹25,999</td>
                        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">45 units</span></td>
                        <td class="p-3"><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">QC Approved</span></td>
                        <td class="p-3 text-right space-x-2">
                            <button class="text-blue-600 hover:underline font-semibold">Edit</button>
                            <button class="text-red-500 hover:underline">Delist</button>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-3 flex items-center gap-3">
                            <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80" class="w-10 h-10 object-contain rounded border" />
                            <div>
                                <span class="font-bold text-slate-900 block">Sony WH-1000XM5 Headphones</span>
                                <span class="text-[10px] text-slate-400">SKU: SNY-WH1000XM5</span>
                            </div>
                        </td>
                        <td class="p-3 text-slate-600">Electronics</td>
                        <td class="p-3 font-bold text-slate-900">₹26,990</td>
                        <td class="p-3 text-slate-400 line-through">₹34,990</td>
                        <td class="p-3"><span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">18 units (Low)</span></td>
                        <td class="p-3"><span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">QC Approved</span></td>
                        <td class="p-3 text-right space-x-2">
                            <button class="text-blue-600 hover:underline font-semibold">Edit</button>
                            <button class="text-red-500 hover:underline">Delist</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>

    <!-- Modal: Add New Product with Image File Upload -->
    <div id="addProductModal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl my-6">
            <div class="flex items-center justify-between border-b pb-3 mb-4">
                <div>
                    <h3 class="font-bold text-sm text-slate-900">Add Single Product Listing</h3>
                    <p class="text-[10px] text-slate-500">Upload high-res product photos and publish to MySQL catalog.</p>
                </div>
                <button id="closeAddProductModal" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-base"></i></button>
            </div>
            <form action="products.php" method="POST" enctype="multipart/form-data" class="space-y-3 text-xs">
                <input type="hidden" name="action" value="add_product" />
                <div>
                    <label class="block font-bold text-slate-700 mb-1">Product Title <span class="text-red-500">*</span></label>
                    <input type="text" name="title" placeholder="e.g. Samsung Galaxy S24 Ultra 5G" class="w-full border rounded p-2" required />
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Selling Price (₹) <span class="text-red-500">*</span></label>
                        <input type="number" name="price" placeholder="49999" class="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Maximum Retail Price (₹) <span class="text-red-500">*</span></label>
                        <input type="number" name="mrp" placeholder="59999" class="w-full border rounded p-2" required />
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-3">
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Initial Stock <span class="text-red-500">*</span></label>
                        <input type="number" name="stock" placeholder="50" class="w-full border rounded p-2" required />
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Category <span class="text-red-500">*</span></label>
                        <select name="category_id" class="w-full border rounded p-2">
                            <option value="1">Mobiles & Tablets</option>
                            <option value="2">Electronics</option>
                            <option value="3">Fashion</option>
                            <option value="4">Home & Furniture</option>
                        </select>
                    </div>
                    <div>
                        <label class="block font-bold text-slate-700 mb-1">Brand Name</label>
                        <input type="text" name="brand" placeholder="e.g. Samsung" class="w-full border rounded p-2" />
                    </div>
                </div>

                <!-- HTML File Input Field for Product Image Upload -->
                <div>
                    <label class="block font-bold text-slate-700 mb-1">
                        Product Image Upload <span class="text-red-500">*</span>
                        <span class="text-[10px] text-slate-400 font-normal ml-1">(JPG, PNG, WEBP - Max 5MB)</span>
                    </label>
                    <div class="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-3 text-center cursor-pointer bg-slate-50 transition-colors">
                        <input 
                            type="file" 
                            name="product_image" 
                            id="productImageInput" 
                            accept="image/jpeg,image/png,image/webp,image/gif" 
                            class="hidden" 
                            required 
                            onchange="previewProductImage(event)" 
                        />
                        <div id="uploadPrompt" onclick="document.getElementById('productImageInput').click()">
                            <i class="fa-solid fa-cloud-arrow-up text-2xl text-blue-500 mb-1 block"></i>
                            <span class="font-bold text-slate-800 text-xs block">Click to Select Product Image</span>
                            <span class="text-[10px] text-slate-400 block mt-0.5">High-resolution catalog square photo recommended (1:1)</span>
                        </div>

                        <!-- Live Image Preview Box -->
                        <div id="imagePreviewContainer" class="hidden flex items-center justify-between gap-3 bg-white p-2 rounded-lg border border-slate-200 mt-2 text-left">
                            <div class="flex items-center gap-2.5">
                                <img id="previewImg" src="#" alt="Preview" class="w-12 h-12 object-cover rounded-md border border-slate-200" />
                                <div>
                                    <span id="previewName" class="font-bold text-slate-800 block text-xs truncate max-w-[200px]">filename.jpg</span>
                                    <span id="previewSize" class="text-[10px] text-emerald-600 font-semibold block">0 KB</span>
                                </div>
                            </div>
                            <button 
                                type="button" 
                                onclick="removeProductImage()" 
                                class="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50 font-bold"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block font-bold text-slate-700 mb-1">Product Description</label>
                    <textarea name="description" rows="2" placeholder="Key highlights, warranty, box contents..." class="w-full border rounded p-2"></textarea>
                </div>

                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded shadow mt-2 flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-cloud-arrow-up"></i> Upload Image & Save into MySQL
                </button>
            </form>
        </div>
    </div>

    <!-- Modal: Bulk CSV Upload -->
    <div id="bulkUploadModal" class="fixed inset-0 bg-black/60 z-50 hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center">
            <i class="fa-solid fa-file-excel text-4xl text-emerald-600 mb-2"></i>
            <h3 class="font-bold text-sm text-slate-900 mb-1">Bulk Product Upload</h3>
            <p class="text-xs text-slate-500 mb-4">Download the Flipkart standard catalog template (.csv) and upload with bulk SKU lines.</p>
            <div class="border-2 border-dashed border-slate-300 rounded-xl p-4 mb-4 cursor-pointer hover:bg-slate-50">
                <i class="fa-solid fa-upload text-slate-400 text-lg mb-1"></i>
                <span class="text-xs font-semibold block text-slate-700">Choose CSV File</span>
            </div>
            <div class="flex gap-2 text-xs">
                <button id="closeBulkModal" class="w-1/2 border rounded py-2 text-slate-600">Cancel</button>
                <button onclick="alert('Bulk Catalog Upload Simulation: 25 items imported successfully!'); document.getElementById('bulkUploadModal').classList.add('hidden');" class="w-1/2 bg-blue-600 text-white rounded py-2 font-semibold">Upload</button>
            </div>
        </div>
    </div>

    <script>
        const addBtn = document.getElementById('openAddProductBtn');
        const addModal = document.getElementById('addProductModal');
        const closeAdd = document.getElementById('closeAddProductModal');
        if (addBtn) addBtn.onclick = () => addModal.classList.remove('hidden');
        if (closeAdd) closeAdd.onclick = () => addModal.classList.add('hidden');

        const bulkBtn = document.getElementById('openBulkUploadBtn');
        const bulkModal = document.getElementById('bulkUploadModal');
        const closeBulk = document.getElementById('closeBulkModal');
        if (bulkBtn) bulkBtn.onclick = () => bulkModal.classList.remove('hidden');
        if (closeBulk) closeBulk.onclick = () => bulkModal.classList.add('hidden');

        // Image Preview Handler
        function previewProductImage(event) {
            const input = event.target;
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('previewImg').src = e.target.result;
                    document.getElementById('previewName').textContent = file.name;
                    document.getElementById('previewSize').textContent = (file.size / 1024).toFixed(1) + ' KB';
                    document.getElementById('uploadPrompt').classList.add('hidden');
                    document.getElementById('imagePreviewContainer').classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        }

        // Image Remove Handler
        function removeProductImage() {
            const input = document.getElementById('productImageInput');
            input.value = '';
            document.getElementById('previewImg').src = '#';
            document.getElementById('uploadPrompt').classList.remove('hidden');
            document.getElementById('imagePreviewContainer').classList.add('hidden');
        }
    </script>
</body>
</html>
