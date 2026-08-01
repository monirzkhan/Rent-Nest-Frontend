import React from 'react';
import { Phone, Mail, ChevronDown, ChevronLeft, ChevronRight, Tag, Target, Home, Calendar1Icon, InfoIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PropertyImageGallery from './_components/PropertyImageGallery';
import RentRequestModal from './_components/RentRequestModal';
import { cookies } from 'next/headers';
import { Breadcums } from '../../_components/breadcums';

const DynamicPropertyPage = async ({
    params,
}: {
    params: Promise<{ id: string }>
}) => {
    const { id } = await params
    const cookieStore = await cookies();
    const isLoggedIn = !!cookieStore.get('accessToken')?.value;

    const data = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${id}`, { cache: 'no-store' })
    const property = await data.json()
    const propData = property?.data || {};

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
            <div className='space-y-2'>
                <Breadcums></Breadcums>
            </div>
            <div className='my-5'>
                <div className="md:flex justify-between items-center mb-6">
                    <div className="space-y-2 ">
                        <div className="flex items-center mb-3 gap-3 ">
                            <span className="bg-primary text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 shadow-sm">
                                <Home className="w-4 h-4" fill="currentColor" /> {propData?.category?.name}
                            </span>
                            {
                                propData.status === "RENTED" ?
                                    <span className="bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 shadow-sm">
                                        <Tag className="w-4 h-4" fill="currentColor" /> {propData?.status}
                                    </span>
                                    :
                                    <span className="bg-green-600 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 shadow-sm">
                                        <Tag className="w-4 h-4" fill="currentColor" /> {propData?.status}
                                    </span>
                            }
                        </div>
                        <h1 className='text-2xl md:text-4xl font-bold text-primary'>{propData.title}</h1>
                        <h3 className='text-sm md:text-xl font-medium text-primary'>{propData.address}</h3>

                    </div>
                    <div className='flex gap-3 items-center my-3'>
                        {
                            propData.status === "RENTED" ?
                                <>
                                    {/* <div className="text-green-700 font-semibold text-xl  md:text-base">
                                        $ {propData.rentAmount}/ <span className='text-sm'>Month</span>
                                    </div> */}
                                    <button disabled className="flex items-center gap-1 justify-between bg-red-600 hover:bg-red-300 text-white font-medium py-2.5 px-4 rounded-lg transition text-sm text-center">
                                        <Calendar1Icon></Calendar1Icon> Rent Not Avaiable
                                    </button>
                                </>
                                :
                                <>
                                    <Card className='py-2.5 px-4 rounded-lg bg-amber-400'>
                                        <div className="text-primary font-semibold text-xl  md:text-base">
                                            $ {propData.rentAmount}/ <span className='text-sm'>Month</span>
                                        </div>
                                    </Card>
                                    <RentRequestModal 
                                        propertyId={id} 
                                        rentAmount={propData.rentAmount || 0} 
                                        isLoggedIn={isLoggedIn} 
                                    />
                                </>
                        }
                    </div>
                </div>


            </div>
            {/* Header / Badges */}
            <div className="md:flex justify-between items-center mb-6 space-y-4">
                <div className="flex gap-3">
                    <span className="bg-[#FF5A5F] text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 shadow-sm">
                        <Target className="w-4 h-4" /> Trending
                    </span>
                    <span className="bg-[#FFB000] text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1.5 shadow-sm">
                        <Tag className="w-4 h-4" fill="currentColor" /> Featured
                    </span>

                </div>
                <Card className='p-4 bg-secondary xs:hidden'>
                    <div className="text-gray-700 font-medium text-sm md:text-base">
                    Property ID: {id}
                </div>
                </Card>
            </div>


            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column */}
                <div className="lg:w-2/3">
                    {/* Main Image and Thumbnails */}
                    <PropertyImageGallery 
                        mainImage={propData.thumbnail} 
                        thumbnails={propData.images} 
                        title={propData.title} 
                    />

                    {/* Description Accordion */}
                    <div className="bg-white border border-gray-200 rounded-xl mb-6 shadow-sm">
                        <div className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50/50 transition rounded-xl">
                            <h2 className="text-[#0F172A] text-lg md:text-xl font-bold">Description</h2>
                            <ChevronDown className="w-5 h-5 text-[#0F172A]" />
                        </div>
                        {/* Dropdown content would go here if expanded */}
                        <div className='p-4 '>
                            <p>{propData.description}</p>
                            <Card className='my-4'>
                                <p className="flex gpa-3 p-4 items-center justify-center">
                                    🛏 {propData.bedrooms} Beds &nbsp; | &nbsp; 🚿 {propData.bathrooms}  Baths &nbsp; | &nbsp; 📐
                                    {propData.areas} sqft
                                </p>
                            </Card>

                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="lg:w-1/3 flex flex-col gap-6">
                    {/* Provider Details Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-[#0F172A] text-xl font-bold mb-6">Landlord Details</h2>

                        <div className="bg-[#F8FAFC] rounded-xl p-4 flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 shadow-sm border border-gray-100">
                                <img src="https://images.unsplash.com/photo-1575037631567-bb45cf5c5ae4?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Agent Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0F172A] text-[17px]">{propData.landlord?.name}</h3>
                                <p className="text-gray-500 text-sm mt-0.5">{propData.landlord?.role}</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                                <InfoIcon className="w-4 h-4 text-green-400" />
                                <span className=" text-xl font-bold text-green-600">{propData?.status}</span>
                            </div>
                            <div className="flex items-center gap-3 p-4">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 text-sm">Email : {propData.landlord?.email}</span>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center justify-center">
                            {
                                propData.status === "RENTED" ?
                                    <>
                                        {/* <div className="text-green-700 font-semibold text-xl  md:text-base">
                                        $ {propData.rentAmount}/ <span className='text-sm'>Month</span>
                                    </div> */}
                                        <button disabled className="flex items-center gap-1 justify-between bg-red-600 hover:bg-red-300 text-white font-medium py-2.5 px-4 rounded-lg transition text-sm text-center">
                                            <Calendar1Icon></Calendar1Icon> Rent Not Avaiable
                                        </button>
                                    </>
                                    :
                                    <>
                                        <Card className='py-2.5 px-4 rounded-lg bg-amber-400'>
                                            <div className="text-primary font-semibold text-xl  md:text-base">
                                                $ {propData.rentAmount}/ <span className='text-sm'>Month</span>
                                            </div>
                                        </Card>
                                        <RentRequestModal 
                                            propertyId={id} 
                                            rentAmount={propData.rentAmount || 0} 
                                            isLoggedIn={isLoggedIn} 
                                        />
                                    </>
                            }
                            {/* <button className="flex-1 bg-[#0F172A] hover:bg-[#1e293b] text-white font-medium py-2.5 px-4 rounded-lg transition text-sm text-center">
                                Chat Now
                            </button> */}
                        </div>
                    </div>

                    {/* Enquire Us Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-[#0F172A] text-xl font-bold mb-6">Enquire Us</h2>
                        <form className="flex flex-col gap-5">
                            <div>
                                <label className="block text-[#0F172A] font-bold text-sm mb-2">Name</label>
                                <input type="text" placeholder="Your Name" className="w-full bg-[#F8FAFC] border-none rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C194] text-gray-700 placeholder-gray-400" />
                            </div>
                            <div>
                                <label className="block text-[#0F172A] font-bold text-sm mb-2">Email</label>
                                <input type="email" placeholder="Your Email" className="w-full bg-[#F8FAFC] border-none rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C194] text-gray-700 placeholder-gray-400" />
                            </div>
                            <div>
                                <label className="block text-[#0F172A] font-bold text-sm mb-2">Phone</label>
                                <input type="tel" placeholder="Your Phone Number" className="w-full bg-[#F8FAFC] border-none rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C194] text-gray-700 placeholder-gray-400" />
                            </div>
                            <div>
                                <label className="block text-[#0F172A] font-bold text-sm mb-2">Description</label>
                                <textarea placeholder="Description" rows={3} className="w-full bg-[#F8FAFC] border-none rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C194] text-gray-700 placeholder-gray-400 resize-none"></textarea>
                            </div>
                            <div>
                                <Button type='submit'>
                                Send Enquiry
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicPropertyPage;