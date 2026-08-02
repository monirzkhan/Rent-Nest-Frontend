'use client';

import React, { useEffect, useState } from 'react';
import { Building2, Home, ImageIcon, MapPin, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { postPropertyAction } from '../_actions/postPropertyAction';
import { CategoryOption, PropertyFormState } from '@/lib/types';



const initialFormState: PropertyFormState = {
    title: '',
    description: '',
    rentAmount: '',
    bedrooms: '',
    bathrooms: '',
    areas: '',
    address: '',
    thumbnail: '',
    images: '',
    status: 'AVAILABLE',
    categoryId: '',
};

export default function PostPropertyModal({ isLoggedIn }: { isLoggedIn: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [formData, setFormData] = useState<PropertyFormState>(initialFormState);
    const router = useRouter();

    useEffect(() => {
        if (!isOpen) return;

        const loadCategories = async () => {
            try {
                setIsLoadingCategories(true);
                const response = await fetch('/api/categories', { cache: 'no-store' });
                const result = await response.json();

                if (result?.success) {
                    const fetchedCategories = result.data || [];
                    setCategories(fetchedCategories);

                    if (!formData.categoryId && fetchedCategories.length > 0) {
                        setFormData((prev) => ({ ...prev, categoryId: fetchedCategories[0].id }));
                    }
                } else {
                    toast.error(result?.message || 'Failed to load categories');
                }
            } catch {
                toast.error('Failed to load categories. Please try again later.');
            } finally {
                setIsLoadingCategories(false);
            }
        };

        loadCategories();
    }, [isOpen]);

    const handleOpen = () => {
        if (!isLoggedIn) {
            toast.error('You must be logged in to post a property.');
            return;
        }
        setIsOpen(true);
    };

    const updateField = (field: keyof PropertyFormState, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requiredFields = [
            formData.title,
            formData.description,
            formData.rentAmount,
            formData.bedrooms,
            formData.bathrooms,
            formData.areas,
            formData.address,
            formData.categoryId,
        ];

        if (requiredFields.some((value) => !String(value).trim())) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            rentAmount: Number(formData.rentAmount),
            bedrooms: Number(formData.bedrooms),
            bathrooms: Number(formData.bathrooms),
            areas: Number(formData.areas),
            address: formData.address.trim(),
            thumbnail: formData.thumbnail.trim() || undefined,
            images: formData.images
                .split(',')
                .map((image) => image.trim())
                .filter(Boolean),
            status: formData.status,
            categoryId: formData.categoryId.trim(),
        };

        const result = await postPropertyAction(payload);
        setIsSubmitting(false);

        if (result?.success) {
            toast.success('Property posted successfully!');
            setFormData(initialFormState);
            setIsOpen(false);
            router.push('/dashboard/landlord/myProperties');
        } else {
            toast.error(result?.message || 'Failed to post property.');
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="inline-flex items-center gap-2 rounded-lg bg-[#00C194] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#00a881]"
            >
                <Home className="h-4 w-4" />
                Post Property
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
                    <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                            <div>
                                <p className="flex items-center gap-2 text-sm font-semibold text-[#00C194]">
                                    <Building2 className="h-4 w-4" />
                                    Add a New Listing
                                </p>
                                <h2 className="text-xl font-bold text-slate-900">Property Details</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-2 transition hover:bg-slate-200"
                            >
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-5">
                            <form id="property-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-[#00C194]" />
                                        <h3 className="text-sm font-semibold text-slate-800">Core Information</h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
                                            <input
                                                required
                                                value={formData.title}
                                                onChange={(e) => updateField('title', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Luxury Penthouse Suite"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Description *</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.description}
                                                onChange={(e) => updateField('description', e.target.value)}
                                                className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Describe the space, amenities, and nearby highlights."
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Rent Amount *</label>
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                value={formData.rentAmount}
                                                onChange={(e) => updateField('rentAmount', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="185000"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => updateField('status', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                            >
                                                <option value="AVAILABLE">Available</option>
                                                <option value="RENTED">Rented</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-[#00C194]" />
                                        <h3 className="text-sm font-semibold text-slate-800">Location & Space</h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Address *</label>
                                            <input
                                                required
                                                value={formData.address}
                                                onChange={(e) => updateField('address', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Gulshan Avenue, Dhaka, Bangladesh"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Bedrooms *</label>
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                value={formData.bedrooms}
                                                onChange={(e) => updateField('bedrooms', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="4"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Bathrooms *</label>
                                            <input
                                                required
                                                type="number"
                                                min="0"
                                                value={formData.bathrooms}
                                                onChange={(e) => updateField('bathrooms', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="4"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Area (sqft) *</label>
                                            <input
                                                required
                                                type="number"
                                                min="500"
                                                value={formData.areas}
                                                onChange={(e) => updateField('areas', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="3500"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Category *</label>
                                            <select
                                                required
                                                value={formData.categoryId}
                                                onChange={(e) => updateField('categoryId', e.target.value)}
                                                disabled={isLoadingCategories}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20 disabled:cursor-not-allowed disabled:bg-slate-100"
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {isLoadingCategories && (
                                                <p className="mt-2 text-sm text-slate-500">Loading categories...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-[#00C194]" />
                                        <h3 className="text-sm font-semibold text-slate-800">Media</h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Thumbnail URL</label>
                                            <input
                                                value={formData.thumbnail}
                                                onChange={(e) => updateField('thumbnail', e.target.value)}
                                                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-slate-700">Images (comma separated)</label>
                                            <textarea
                                                rows={3}
                                                value={formData.images}
                                                onChange={(e) => updateField('images', e.target.value)}
                                                className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Paste image URLs separated by commas"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-5 py-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="property-form"
                                disabled={isSubmitting}
                                className="rounded-lg bg-[#00C194] px-4 py-2 font-medium text-white transition hover:bg-[#00a881] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? 'Posting...' : 'Publish Property'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
