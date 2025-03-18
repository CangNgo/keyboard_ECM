export interface AddProduct {
    categoryId?: string; // UUID có thể là string trong TypeScript
    name: string; // Tên sản phẩm
    price: number; // Giá sản phẩm (BigDecimal -> number)
    shortDescription?: string; // Mô tả ngắn
    longDescription?: string; // Mô tả dài
    images: File[]; // Mảng các file ảnh
    color?: string; // Màu sản phẩm
    supplierId?: string; // UUID của nhà cung cấp (có thể là string trong TypeScript)
    quantityInStock: number; // Số lượng hiện có
    minimumInStock: number; // Số lượng tối thiểu
    maximumInStock: number; // Số lượng tối đa
    lastRestockDate?: string; // Ngày nhập kho lại (dạng string, có thể dùng Date nếu cần)
    statusInventory?: 'IN_STOCK' | 'OUT_STOCK'|'LOW_STOCK'; // Trạng thái tồn kho (giả sử có 2 trạng thái)
    size: string; // Kích thước sản phẩm
}