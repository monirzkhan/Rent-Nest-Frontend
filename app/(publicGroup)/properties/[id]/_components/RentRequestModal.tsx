'use client';

import React, { useState } from 'react';
import { Calendar1Icon, X } from 'lucide-react';
import { toast } from 'sonner';
import { createRentalRequest } from '../_actions/actions';
import { useRouter } from 'next/navigation';

export default function RentRequestModal({ propertyId, rentAmount, isLoggedIn }: { propertyId: string, rentAmount: number, isLoggedIn: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [durationMonths, setDurationMonths] = useState<number | ''>('');
    const [moveInDate, setMoveInDate] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const totalRent = typeof durationMonths === 'number' ? durationMonths * rentAmount : 0;

    const handleOpen = () => {
        if (!isLoggedIn) {
            toast.error('You must be logged in to request for rent.');
            // Optionally redirect to login
            return;
        }
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!durationMonths || !moveInDate) {
            toast.error('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        
        const data = {
            propertyId,
            durationMonths: Number(durationMonths),
            moveInDate: new Date(moveInDate).toISOString(),
            message,
        };

        const result = await createRentalRequest(data);
        
        setIsSubmitting(false);

        if (result.success) {
            toast.success('Rental request submitted successfully!');
            
            setIsOpen(false);
            // Optionally refresh or redirect
            router.push(`/dashboard/tenant/myRentals`);
        } else {
            toast.error(result.message || 'Failed to submit rental request');
        }
    };

    return (
        <>
            <button 
                onClick={handleOpen}
                className="flex items-center gap-1 justify-between bg-[#00C194] hover:bg-[#00a881] text-white font-medium py-2.5 px-4 rounded-lg transition text-sm text-center"
            >
                <Calendar1Icon /> Rent Now
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-bold text-slate-900">Request to Rent</h2>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                        
                        <div className="p-4 overflow-y-auto">
                            <form id="rent-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Move In Date *</label>
                                    <input 
                                        type="date" 
                                        required
                                        value={moveInDate}
                                        onChange={(e) => setMoveInDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Months) *</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="1"
                                        value={durationMonths}
                                        onChange={(e) => setDurationMonths(e.target.value ? parseInt(e.target.value) : '')}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none" 
                                        placeholder="e.g. 12"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                                    <textarea 
                                        rows={3}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none" 
                                        placeholder="Any specific requests?"
                                    />
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mt-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-gray-600">Rent per month:</span>
                                        <span className="font-medium">${rentAmount}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
                                        <span className="font-bold text-slate-900">Total Rent:</span>
                                        <span className="font-bold text-primary text-lg">${totalRent}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                            <button 
                                type="button" 
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                form="rent-form"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
