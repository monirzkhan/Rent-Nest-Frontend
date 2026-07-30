"use client";

import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import RentRequestModal from "@/app/(publicGroup)/properties/[id]/_components/RentRequestModal";


const PropertyCard = ({ property }: any) => {
 
  return (
    <StyledWrapper>
      <div className="card" style={{ position: 'relative', width: '320px', height: '420px' }}>
        <div className="content" style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* Back Side */}
          <div className="back" style={{ position: 'absolute', inset: 0 }}>
            <div className="back-content" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={property.thumbnail}
                alt="Property"
                fill
                className="property-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="back-overlay" />
              <strong>{property.category.name}</strong>
            </div>
          </div>

          {/* Front Side */}
          <div className="front" style={{ position: 'absolute', inset: 0 }}>
            <div className="img" style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={property.thumbnail}
                alt="Property"
                fill
                className="property-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className="overlay" />

              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>

            <div className="front-content">
              <small className="badge">{property.status}</small>

              <div className="description space-y-3">
                <div className="title ">
                  <p>
                    <strong>{property.title}</strong>
                  </p>

                  <svg
                    fill="#20c997"
                    width="18"
                    height="18"
                    viewBox="0 0 32 32"
                  >
                    <path d="M25 27l-9-6.75L7 27V4h18z" />
                  </svg>

                </div>
                <div className="button-group">
                  <Link href={`/properties/${property.id}`} className="btn btn-primary">
                    View
                  </Link>

                  <Link href="/login" className="btn btn-secondary">
                    Rent Request
                  </Link>
                  
                </div>

                <p className="location">📍 {property.address}</p>
                <div className="flex items-center-safe">
                  <User></User>

                  <p>  {property.landlord.name}</p>
                </div>

                <p className="price">${property.rentAmount} / Month</p>

                <p className="card-footer">
                  🛏 {property.bedrooms} Beds &nbsp; | &nbsp; 🚿 {property.bathrooms} Baths &nbsp; | &nbsp; 📐
                  {property.areas} sqft
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
  position: relative;
  width: 320px;
  height: 420px;
  perspective: 1000px;
}

  .content {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    border-radius: 16px;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  .front,
  .back {
   position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 16px;
 
  backface-visibility: hidden;
  }

  /* ---------------- BACK ---------------- */

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #111;
  }

  .back-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    
  }

  .back-image {
  pointer-events: none;
    object-fit: cover;
    z-index: 0;
  }

  .back-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 1;
    pointer-events: none;
  }

  .back-content strong {
    position: relative;
    z-index: 2;
  }
    .back-info {
  
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
   position: relative;
  z-index: 100;
}

.button-group {
  display: flex;
  gap: 12px;
   position: relative;
  z-index: 101;
  pointer-events: auto;
}

.btn {
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
   position: relative;
  z-index: 101;
  pointer-events: auto;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

  /* ---------------- FRONT ---------------- */

  .front {
    transform: rotateY(180deg);
    color: white;
  }

  .img {
     position: relative;
    width: 100%;
     height: 100%;
    overflow: hidden;
  }

  .property-image {
    object-fit: cover;
    z-index: 0;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.25)
    );
    z-index: 1;
  }

  .circle {
    position: absolute;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.15);
    filter: blur(30px);
    border-radius: 50%;
    animation: float 5s infinite ease-in-out;
    z-index: 2;
  }

  #right {
    width: 60px;
    height: 60px;
    right: 20px;
    top: 40px;
    animation-delay: 1s;
  }

  #bottom {
    width: 180px;
    height: 180px;
    left: -40px;
    bottom: -50px;
    animation-delay: 2s;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }

    50% {
      transform: translateY(20px);
    }
  }

  .front-content {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px;
  }

  .badge {
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    background: #2563eb;
    font-weight: 600;
    font-size: 12px;
  }

  .description {
    backdrop-filter: blur(12px);
    background: rgba(0, 0, 0, 0.45);
    border-radius: 14px;
    padding: 16px;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title p {
    margin: 0;
    font-size: 20px;
  }

  .location {
    margin: 10px 0 4px;
    color: #e5e7eb;
    font-size: 14px;
  }

  .price {
    color: #22c55e;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .card-footer {
    color: #d1d5db;
    font-size: 14px;
  }
`;

export default PropertyCard;