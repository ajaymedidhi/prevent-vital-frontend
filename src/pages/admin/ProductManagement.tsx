import React, { useState, useEffect } from 'react';
import { 
    Plus, Search, Edit2, Trash2, Globe, Eye, EyeOff, Loader, UploadCloud, 
    Check, X, FileText, ChevronRight, HelpCircle, Package, Layers, Tag
} from 'lucide-react';
import { 
    getProducts, getProduct, createProduct, updateProduct, deleteProduct, 
    updateProductStatus, uploadProductMediaDirect, getLocations 
} from '../../admin-shared/services/productService';
import { uploadToGCS, confirmUpload } from '../../admin-shared/services/mediaApi';
import { toast } from 'react-hot-toast';

const CATEGORIES = [
    { value: 'bp_monitor', label: 'BP Monitor' },
    { value: 'ecg_patch', label: 'ECG Patch' },
    { value: 'smart_watch', label: 'Smart Watch' },
    { value: 'accessory', label: 'Accessory' },
    { value: 'device', label: 'Device' },
    { value: 'supplement', label: 'Supplement' },
    { value: 'program', label: 'Program' }
];

export default function ProductManagement() {
    const [products, setProducts] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [modalTab, setModalTab] = useState<'basic' | 'details' | 'media' | 'delivery'>('basic');

    // Form fields
    const [formName, setFormName] = useState('');
    const [formSku, setFormSku] = useState('');
    const [formCategory, setFormCategory] = useState('device');
    const [formPrice, setFormPrice] = useState('');
    const [formDiscountedPrice, setFormDiscountedPrice] = useState('');
    const [formStock, setFormStock] = useState('0');
    const [formShortDesc, setFormShortDesc] = useState('');
    const [formDetailedDesc, setFormDetailedDesc] = useState('');
    const [formStatus, setFormStatus] = useState('draft');
    
    // Dynamic lists
    const [formTags, setFormTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');
    const [formBenefits, setFormBenefits] = useState<string[]>([]);
    const [newBenefit, setNewBenefit] = useState('');
    const [formIngredients, setFormIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState('');
    const [formInstructions, setFormInstructions] = useState<string[]>([]);
    const [newInstruction, setNewInstruction] = useState('');

    // Selected locations
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

    // Media states
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
    const [documents, setDocuments] = useState<Array<{ name: string; url: string }>>([]);
    const [uploadingMedia, setUploadingMedia] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchLocations();
    }, [search, category, status, page]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts({ search, category, status, page, limit: 10 });
            setProducts(res.data.products || []);
            setTotalPages(res.totalPages || 1);
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchLocations = async () => {
        try {
            const res = await getLocations({ limit: 100 });
            setLocations(res.data.locations || []);
        } catch (err) {
            console.error('Failed to fetch delivery locations', err);
        }
    };

    const handleOpenCreateModal = () => {
        setEditingProduct(null);
        setModalTab('basic');
        setFormName('');
        setFormSku('');
        setFormCategory('device');
        setFormPrice('');
        setFormDiscountedPrice('');
        setFormStock('0');
        setFormShortDesc('');
        setFormDetailedDesc('');
        setFormStatus('draft');
        setFormTags([]);
        setFormBenefits([]);
        setFormIngredients([]);
        setFormInstructions([]);
        setSelectedLocations([]);
        setThumbnailUrl('');
        setGalleryUrls([]);
        setDocuments([]);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = async (product: any) => {
        try {
            setLoading(true);
            const res = await getProduct(product._id);
            const p = res.data.product;
            setEditingProduct(p);
            setModalTab('basic');
            setFormName(p.name || '');
            setFormSku(p.sku || '');
            setFormCategory(p.category || 'device');
            setFormPrice(p.price?.toString() || '');
            setFormDiscountedPrice(p.discountedPrice?.toString() || '');
            setFormStock(p.stock?.toString() || '0');
            setFormShortDesc(p.shortDescription || '');
            setFormDetailedDesc(p.detailedDescription || '');
            setFormStatus(p.status || 'draft');
            setFormTags(p.tags || []);
            setFormBenefits(p.benefits || []);
            setFormIngredients(p.ingredients || []);
            setFormInstructions(p.usageInstructions || []);
            setSelectedLocations((p.deliveryLocations || []).map((l: any) => l._id || l));
            setThumbnailUrl(p.thumbnail || '');
            setGalleryUrls(p.gallery || []);
            setDocuments(p.documents || []);
            setIsModalOpen(true);
        } catch (err: any) {
            toast.error(err.message || 'Failed to fetch product details');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to soft delete this product? It will be archived.')) return;
        try {
            await deleteProduct(id);
            toast.success('Product soft deleted');
            fetchProducts();
        } catch (err: any) {
            toast.error(err.message || 'Failed to delete product');
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const nextStatus = currentStatus === 'active' ? 'inactive' : 'active';
        try {
            await updateProductStatus(id, nextStatus);
            toast.success(`Product status updated to ${nextStatus}`);
            fetchProducts();
        } catch (err: any) {
            toast.error(err.message || 'Failed to update status');
        }
    };

    const handleUploadMedia = async (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'gallery' | 'document') => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        setUploadingMedia(true);
        const prodId = editingProduct?._id || 'new_temp';

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                toast.loading(`Uploading ${file.name}...`, { id: 'uploading' });

                // Direct upload via backend proxy
                const res = await uploadProductMediaDirect(
                    prodId,
                    file,
                    type === 'document' ? 'documents' : type
                );

                const publicUrl = res.data.url;

                if (type === 'thumbnail') {
                    setThumbnailUrl(publicUrl);
                } else if (type === 'gallery') {
                    setGalleryUrls(prev => [...prev, publicUrl]);
                } else if (type === 'document') {
                    setDocuments(prev => [...prev, { name: file.name, url: publicUrl }]);
                }
                toast.success(`${file.name} uploaded successfully!`, { id: 'uploading' });
            }
        } catch (err: any) {
            toast.error(err.message || 'Upload failed', { id: 'uploading' });
        } finally {
            setUploadingMedia(false);
        }
    };

    const handleSave = async () => {
        if (!formName || !formPrice) {
            toast.error('Product Name and Price are required');
            return;
        }

        const payload = {
            name: formName,
            sku: formSku,
            category: formCategory,
            price: Number(formPrice),
            discountedPrice: formDiscountedPrice ? Number(formDiscountedPrice) : undefined,
            stock: Number(formStock),
            shortDescription: formShortDesc,
            detailedDescription: formDetailedDesc,
            status: formStatus,
            tags: formTags,
            benefits: formBenefits,
            ingredients: formIngredients,
            usageInstructions: formInstructions,
            deliveryLocations: selectedLocations,
            thumbnail: thumbnailUrl,
            gallery: galleryUrls,
            documents
        };

        try {
            setLoading(true);
            if (editingProduct) {
                await updateProduct(editingProduct._id, payload);
                toast.success('Product updated successfully');
            } else {
                await createProduct(payload);
                toast.success('Product created successfully');
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (err: any) {
            toast.error(err.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Product Catalog</h1>
                    <p className="text-slate-500 text-sm">Manage inventory, descriptions, and media uploads.</p>
                </div>
                <button
                    onClick={handleOpenCreateModal}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all duration-200 cursor-pointer"
                >
                    <Plus size={18} />
                    <span>Create Product</span>
                </button>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        placeholder="Search product name, SKU or tags..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-700"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-600"
                    >
                        <option value="">All Categories</option>
                        {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 text-slate-600"
                    >
                        <option value="">All Statuses</option>
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Products Table/Grid */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading && products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16">
                                        <Loader className="animate-spin text-blue-600 mx-auto mb-3" size={24} />
                                        <span className="text-slate-400">Loading products...</span>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16 text-slate-400">
                                        No products found matching filters.
                                    </td>
                                </tr>
                            ) : products.map((product) => (
                                <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200/50 overflow-hidden flex-shrink-0">
                                                {product.thumbnail ? (
                                                    <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Package className="text-slate-400" size={20} />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-800">{product.name}</div>
                                                <div className="text-xs text-slate-400">{product.shortDescription || 'No description'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono font-medium text-slate-600">{product.sku || 'N/A'}</td>
                                    <td className="px-6 py-4 text-slate-600 capitalize">{product.category?.replace('_', ' ')}</td>
                                    <td className="px-6 py-4">
                                        {product.discountedPrice ? (
                                            <div>
                                                <span className="font-bold text-slate-800">₹{product.discountedPrice}</span>
                                                <span className="text-xs line-through text-slate-400 ml-1.5">₹{product.price}</span>
                                            </div>
                                        ) : (
                                            <span className="font-bold text-slate-800">₹{product.price}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`font-semibold ${product.stock <= 5 ? 'text-rose-500 font-bold' : 'text-slate-600'}`}>
                                            {product.stock} units
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                                            product.status === 'active' ? 'bg-emerald-50 text-emerald-700' :
                                            product.status === 'draft' ? 'bg-amber-50 text-amber-700' :
                                            'bg-slate-50 text-slate-500'
                                        }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleToggleStatus(product._id, product.status)}
                                                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                                                title="Toggle Active Status"
                                            >
                                                {product.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                            <button
                                                onClick={() => handleOpenEditModal(product)}
                                                className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                                title="Edit Product"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            className="px-4 py-2 border rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-slate-500 text-sm">Page {page} of {totalPages}</span>
                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            className="px-4 py-2 border rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-2xl">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">
                                    {editingProduct ? `Edit Product: ${editingProduct.name}` : 'New Product Registration'}
                                </h2>
                                <p className="text-xs text-slate-500">Configure catalog properties, delivery parameters, and media assets.</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Tabs */}
                        <div className="flex border-b border-slate-100 px-6 bg-slate-50/50">
                            {[
                                { id: 'basic', label: 'Basic Info', icon: Package },
                                { id: 'details', label: 'Detailed Info', icon: Layers },
                                { id: 'media', label: 'Media Assets', icon: UploadCloud },
                                { id: 'delivery', label: 'Fulfillment', icon: Globe }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setModalTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                                        modalTab === tab.id
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-slate-500 hover:text-slate-700'
                                    }`}
                                >
                                    <tab.icon size={16} />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Modal Content Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {modalTab === 'basic' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Product Name *</label>
                                        <input
                                            value={formName}
                                            onChange={(e) => setFormName(e.target.value)}
                                            placeholder="e.g. Smart ECG Patch V2"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">SKU Code</label>
                                        <input
                                            value={formSku}
                                            onChange={(e) => setFormSku(e.target.value)}
                                            placeholder="e.g. PV-ECG-002"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Category *</label>
                                        <select
                                            value={formCategory}
                                            onChange={(e) => setFormCategory(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        >
                                            {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Initial Stock Quantity</label>
                                        <input
                                            type="number"
                                            value={formStock}
                                            disabled={!!editingProduct}
                                            onChange={(e) => setFormStock(e.target.value)}
                                            placeholder="0"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none bg-slate-50 disabled:text-slate-400"
                                        />
                                        {editingProduct && <p className="text-[11px] text-slate-400 mt-1">Stock quantity must be updated via the Inventory screen.</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Regular Price (INR) *</label>
                                        <input
                                            type="number"
                                            value={formPrice}
                                            onChange={(e) => setFormPrice(e.target.value)}
                                            placeholder="0"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Discounted Price (INR)</label>
                                        <input
                                            type="number"
                                            value={formDiscountedPrice}
                                            onChange={(e) => setFormDiscountedPrice(e.target.value)}
                                            placeholder="Leave empty if none"
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Short Description</label>
                                        <input
                                            value={formShortDesc}
                                            onChange={(e) => setFormShortDesc(e.target.value)}
                                            placeholder="Brief line about the product features..."
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Catalog Status</label>
                                        <select
                                            value={formStatus}
                                            onChange={(e) => setFormStatus(e.target.value)}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {modalTab === 'details' && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Detailed Description</label>
                                        <textarea
                                            value={formDetailedDesc}
                                            onChange={(e) => setFormDetailedDesc(e.target.value)}
                                            placeholder="Enter complete description and specifications..."
                                            rows={4}
                                            className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-500 outline-none"
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Search Tags</label>
                                        <div className="flex gap-2 mb-2">
                                            <input
                                                value={newTag}
                                                onChange={(e) => setNewTag(e.target.value)}
                                                placeholder="e.g. HeartRate"
                                                className="px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (newTag && !formTags.includes(newTag)) {
                                                        setFormTags([...formTags, newTag]);
                                                        setNewTag('');
                                                    }
                                                }}
                                                className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {formTags.map(t => (
                                                <span key={t} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                                                    {t}
                                                    <X size={12} className="cursor-pointer" onClick={() => setFormTags(formTags.filter(x => x !== t))} />
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Benefits & Instructions */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Product Benefits</label>
                                            <div className="flex gap-2 mb-2">
                                                <input
                                                    value={newBenefit}
                                                    onChange={(e) => setNewBenefit(e.target.value)}
                                                    placeholder="Add benefit..."
                                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (newBenefit) {
                                                            setFormBenefits([...formBenefits, newBenefit]);
                                                            setNewBenefit('');
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <ul className="space-y-1.5">
                                                {formBenefits.map((b, i) => (
                                                    <li key={i} className="flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg text-sm">
                                                        <span>{b}</span>
                                                        <X size={14} className="text-slate-400 hover:text-slate-600 cursor-pointer" onClick={() => setFormBenefits(formBenefits.filter((_, idx) => idx !== i))} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Usage Instructions</label>
                                            <div className="flex gap-2 mb-2">
                                                <input
                                                    value={newInstruction}
                                                    onChange={(e) => setNewInstruction(e.target.value)}
                                                    placeholder="Add instruction..."
                                                    className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (newInstruction) {
                                                            setFormInstructions([...formInstructions, newInstruction]);
                                                            setNewInstruction('');
                                                        }
                                                    }}
                                                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <ol className="space-y-1.5">
                                                {formInstructions.map((ins, i) => (
                                                    <li key={i} className="flex justify-between items-center bg-slate-50 px-3 py-1.5 rounded-lg text-sm">
                                                        <span>{i + 1}. {ins}</span>
                                                        <X size={14} className="text-slate-400 hover:text-slate-600 cursor-pointer" onClick={() => setFormInstructions(formInstructions.filter((_, idx) => idx !== i))} />
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {modalTab === 'media' && (
                                <div className="space-y-6">
                                    {/* Thumbnail upload */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Thumbnail Image</label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                                                {thumbnailUrl ? (
                                                    <img src={thumbnailUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <UploadCloud className="text-slate-400" size={24} />
                                                )}
                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    id="thumbnail-upload"
                                                    onChange={(e) => handleUploadMedia(e, 'thumbnail')}
                                                    className="hidden"
                                                />
                                                <label
                                                    htmlFor="thumbnail-upload"
                                                    className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-semibold bg-white cursor-pointer hover:bg-slate-50 transition-colors"
                                                >
                                                    Upload Photo
                                                </label>
                                                <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP. Max size 20 MB.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gallery uploads */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Gallery Images</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-3">
                                            {galleryUrls.map((url, i) => (
                                                <div key={i} className="relative w-full aspect-square rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden group">
                                                    <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setGalleryUrls(galleryUrls.filter(u => u !== url))}
                                                        className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full hover:bg-black"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            <label className="w-full aspect-square rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-500 cursor-pointer flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={(e) => handleUploadMedia(e, 'gallery')}
                                                    className="hidden"
                                                />
                                                <Plus size={20} className="text-slate-400" />
                                                <span className="text-xs text-slate-500 font-semibold mt-1">Add Image</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Documents upload */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5">Support Documents (PDFs / Manuals)</label>
                                        <ul className="space-y-2 mb-3">
                                            {documents.map((doc, i) => (
                                                <li key={i} className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 text-sm">
                                                    <div className="flex items-center gap-2 text-slate-600 font-medium">
                                                        <FileText size={16} />
                                                        <span>{doc.name}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => setDocuments(documents.filter((_, idx) => idx !== i))}
                                                        className="text-rose-500 hover:text-rose-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <label className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-semibold bg-white cursor-pointer hover:bg-slate-50 transition-colors">
                                            <input
                                                type="file"
                                                accept=".pdf,.doc,.docx"
                                                multiple
                                                onChange={(e) => handleUploadMedia(e, 'document')}
                                                className="hidden"
                                            />
                                            <UploadCloud size={16} className="text-slate-500" />
                                            <span>Upload Documents</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {modalTab === 'delivery' && (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold text-slate-700">Serviceable Delivery Locations</h3>
                                    <p className="text-xs text-slate-500">Toggle checkboxes to limit catalog serviceability to specific pincodes and cities.</p>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {locations.length === 0 ? (
                                            <div className="col-span-3 text-center py-6 text-slate-400">
                                                No delivery locations defined yet. Configure locations in Delivery section first.
                                            </div>
                                        ) : locations.map(loc => (
                                            <label
                                                key={loc._id}
                                                className={`flex items-center justify-between p-3.5 border rounded-xl cursor-pointer hover:bg-slate-50/50 transition-colors ${
                                                    selectedLocations.includes(loc._id)
                                                        ? 'border-blue-500 bg-blue-50/20'
                                                        : 'border-slate-200'
                                                }`}
                                            >
                                                <div>
                                                    <div className="text-sm font-bold text-slate-700">{loc.city}</div>
                                                    <div className="text-xs text-slate-400 font-mono">Pincode: {loc.pincode}</div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLocations.includes(loc._id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedLocations([...selectedLocations, loc._id]);
                                                        } else {
                                                            setSelectedLocations(selectedLocations.filter(id => id !== loc._id));
                                                        }
                                                    }}
                                                    className="w-4.5 h-4.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-2xl">
                            <span className="text-xs text-slate-400">Fields marked * are mandatory</span>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-sm font-semibold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-100 transition-colors"
                                >
                                    {editingProduct ? 'Save Changes' : 'Create Product'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
