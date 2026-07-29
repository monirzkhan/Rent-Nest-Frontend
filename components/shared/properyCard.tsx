"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          {/* Back Side */}
          <div className="back">
            <div className="back-content">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Luxury Apartment"
                fill
                className="back-image"
              />
              <div className="back-overlay" />
              <strong>Hover Me</strong>
            </div>
          </div>

          {/* Front Side */}
          <div className="front">
            <div className="img">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                alt="Luxury Apartment"
                fill
                priority
                className="property-image"
              />

              <div className="overlay" />

              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>

            <div className="front-content">
              <small className="badge">FOR RENT</small>

              <div className="description">
                <div className="title">
                  <p>
                    <strong>Luxury Apartment</strong>
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

                <p className="location">📍 Banani, Dhaka</p>

                <p className="price">$650 / Month</p>

                <p className="card-footer">
                  🛏 3 Beds &nbsp; | &nbsp; 🚿 2 Baths &nbsp; | &nbsp; 📐
                  1400 sqft
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
    border-radius: 16px;
    overflow: hidden;
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
    object-fit: cover;
    z-index: 0;
  }

  .back-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 1;
  }

  .back-content strong {
    position: relative;
    z-index: 2;
  }

  /* ---------------- FRONT ---------------- */

  .front {
    transform: rotateY(180deg);
    color: white;
  }

  .img {
    position: absolute;
    inset: 0;
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

export default Card;