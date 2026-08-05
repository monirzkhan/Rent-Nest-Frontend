'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { isValidImageSrc } from '@/lib/utils';

const DEFAULT_PROPERTY_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

export default function PropertyImageGallery({ mainImage, thumbnails, title }: { mainImage: string, thumbnails: string[], title: string }) {
    const validImages = [mainImage, ...(thumbnails || [])].filter(isValidImageSrc);
    const [currentImage, setCurrentImage] = useState<string>(() => validImages[0] || DEFAULT_PROPERTY_IMAGE);
    const allImages = validImages.length > 0 ? validImages : [DEFAULT_PROPERTY_IMAGE];
    const uniqueImages = Array.from(new Set(allImages));

    const handlePrev = () => {
        const index = uniqueImages.indexOf(currentImage);
        if (index > 0) {
            setCurrentImage(uniqueImages[index - 1]);
        } else {
            setCurrentImage(uniqueImages[uniqueImages.length - 1]);
        }
    };

    const handleNext = () => {
        const index = uniqueImages.indexOf(currentImage);
        if (index < uniqueImages.length - 1) {
            setCurrentImage(uniqueImages[index + 1]);
        } else {
            setCurrentImage(uniqueImages[0]);
        }
    };

    return (
        <div>
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden mb-4 relative aspect-[16/9] shadow-sm">
                <Image
                    src={currentImage}
                    alt={title || "Property Main View"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {uniqueImages.length > 1 && (
                <div className="flex gap-4 mb-8 relative items-center">
                    <button onClick={handlePrev} className="absolute left-2 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white z-10 transition hidden sm:block">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="flex gap-4 overflow-x-auto w-full px-1 py-1 no-scrollbar scroll-smooth snap-x">
                        {uniqueImages.map((thumb, idx) => (
                            <div 
                                key={idx} 
                                onClick={() => setCurrentImage(thumb)}
                                className={`flex-shrink-0 w-28 md:w-40 rounded-lg overflow-hidden aspect-[4/3] cursor-pointer transition-transform hover:scale-[1.02] snap-start ${currentImage === thumb ? 'ring-2 ring-primary opacity-100' : 'opacity-70 hover:opacity-100'}`}
                            >
                                <div className="relative w-full h-full">
                                    <Image 
                                        src={thumb} 
                                        alt={`Thumbnail ${idx}`} 
                                        fill
                                        sizes="(max-width: 768px) 112px, 160px"
                                        className="object-cover" 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNext} className="absolute right-2 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white z-10 transition hidden sm:block">
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            )}
        </div>
    );
}
