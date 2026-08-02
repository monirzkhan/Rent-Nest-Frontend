'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Building2, ImageIcon, MapPin, PenIcon, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { CategoryOption, IProperty, PropertyFormState } from '@/lib/types';
import { updatePropertyAction } from '../_actions/updatePropertyAction';

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

export default function UpdatePropertyModal({ property, isLoggedIn }: { property: IProperty; isLoggedIn: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [formData, setFormData] = useState<PropertyFormState>(initialFormState);
    const router = useRouter();

    const buildFormState = (selectedProperty?: IProperty): PropertyFormState => ({
        title: selectedProperty?.title || '',
        description: selectedProperty?.description || '',
        rentAmount: selectedProperty?.rentAmount?.toString() || '',
        bedrooms: selectedProperty?.bedrooms?.toString() || '',
        bathrooms: selectedProperty?.bathrooms?.toString() || '',
        areas: selectedProperty?.areas?.toString() || '',
        address: selectedProperty?.address || '',
        thumbnail: selectedProperty?.thumbnail || '',
        images: selectedProperty?.images?.join(', ') || '',
        status: selectedProperty?.status || 'AVAILABLE',
        categoryId: selectedProperty?.categoryId || '',
    });

    useEffect(() => {
        if (!isOpen) return;

        setFormData(buildFormState(property));
    }, [isOpen, property]);

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
            toast.error('You must be logged in to update a property.');
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
            id: property.id,
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

        const result = await updatePropertyAction(payload);
        setIsSubmitting(false);

        if (result?.success) {
            toast.success('Property updated successfully!');
            setFormData(initialFormState);
            setIsOpen(false);
            router.push('/dashboard/landlord/properties');
        } else {
            toast.error(result?.message || 'Failed to update property.');
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="inline-flex items-center gap-2 rounded-lg bg-[#00C194] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#00a881]"
            >
                <PenIcon className="h-4 w-4" />
                Edit Property
            </button>

            {isOpen && typeof window !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/70 p-4">
                    <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-card text-card-foreground shadow-2xl">
                        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-4">
                            <div>
                                <p className="flex items-center gap-2 text-sm font-semibold text-[#00C194]">
                                    <Building2 className="h-4 w-4" />
                                    Edit Your Property
                                </p>
                                <h2 className="text-xl font-bold text-foreground">Property Details</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-full p-2 transition hover:bg-muted"
                            >
                                <X className="h-5 w-5 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-5">
                            <form id="property-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4 text-[#00C194]" />
                                        <h3 className="text-sm font-semibold text-foreground">Core Information</h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-foreground">Title *</label>
                                            <input
                                                required
                                                value={formData.title}
                                                onChange={(e) => updateField('title', e.target.value)}
                                                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Luxury Penthouse Suite"
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-foreground">Description *</label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={formData.description}
                                                onChange={(e) => updateField('description', e.target.value)}
                                                className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Describe the space, amenities, and nearby highlights."
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-foreground">Rent Amount *</label>
                                            <input
                                                required
                                                type="number"
                                                min="1"
                                                value={formData.rentAmount}
                                                onChange={(e) => updateField('rentAmount', e.target.value)}
                                                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="185000"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-foreground">Status</label>
                                            <select
                                                value={formData.status}
                                                onChange={(e) => updateField('status', e.target.value)}
                                                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                            >
                                                <option value="AVAILABLE">Available</option>
                                                <option value="RENTED">Rented</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-border bg-card p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-[#00C194]" />
                                        <h3 className="text-sm font-semibold text-foreground">Location & Space</h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-foreground">Address *</label>
                                            <input
                                                required
                                                value={formData.address}
                                                onChange={(e) => updateField('address', e.target.value)}
                                                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Gulshan Avenue, Dhaka, Bangladesh"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-foreground">Bedrooms *</label>
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
                                            <label className="mb-1 block text-sm font-medium text-foreground">Bathrooms *</label>
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
                                            <label className="mb-1 block text-sm font-medium text-foreground">Area (sqft) *</label>
                                            <input
                                                required
                                                type="number"
                                                min="500"
                                                value={formData.areas}
                                                onChange={(e) => updateField('areas', e.target.value)}
                                                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="3500"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-foreground">Category *</label>
                                            <select
                                                required
                                                value={formData.categoryId}
                                                onChange={(e) => updateField('categoryId', e.target.value)}
                                                disabled={isLoadingCategories}
                                                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20 disabled:cursor-not-allowed disabled:bg-muted"
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {isLoadingCategories && (
                                                <p className="mt-2 text-sm text-muted-foreground">Loading categories...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <div className="mb-3 flex items-center gap-2">
                                        <ImageIcon className="h-4 w-4 text-[#00C194]" />
                                        <h3 className="text-sm font-semibold text-foreground">Media</h3>
                                    </div>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-foreground">Thumbnail URL</label>
                                            <input
                                                value={formData.thumbnail}
                                                onChange={(e) => updateField('thumbnail', e.target.value)}
                                                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="https://images.unsplash.com/..."
                                            />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="mb-1 block text-sm font-medium text-foreground">Images (comma separated)</label>
                                            <textarea
                                                rows={3}
                                                value={formData.images}
                                                onChange={(e) => updateField('images', e.target.value)}
                                                className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-foreground outline-none transition focus:border-[#00C194] focus:ring-2 focus:ring-[#00C194]/20"
                                                placeholder="Paste image URLs separated by commas"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-border bg-muted/40 px-5 py-4">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg border border-border px-4 py-2 font-medium text-foreground transition hover:bg-muted"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="property-form"
                                disabled={isSubmitting}
                                className="rounded-lg bg-[#00C194] px-4 py-2 font-medium text-white transition hover:bg-[#00a881] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? 'Updating...' : 'Update Property'}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
