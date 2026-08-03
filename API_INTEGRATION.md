# API Integration Documentation

## Project
**RentNest** – Rental Property Management Platform

This document describes how the frontend integrates with the backend REST API and maps each frontend page/component to its corresponding API endpoints.

---

# Base URL

### Development
```text
http://localhost:3000/api
```

### Production
```text
https://rentnest-seven.vercel.app/api
```

---

# Authentication

Authentication is handled using **JWT Access Token** stored in **HTTP Only Cookies**.

Protected routes automatically include authentication cookies using:

```ts
credentials: "include"
```

Example:

```ts
fetch(`${BASE_URL}/properties`, {
  credentials: "include"
})
```

---

# API Integration Overview

| Frontend Page / Component | Method | Endpoint | Purpose |
|---------------------------|--------|----------|---------|
| Login Page | POST | `/auth/login` | User login |
| Register Page | POST | `/users/register` | Create tenant/landlord account |
| Logout Button | POST | `/auth/logout` | Logout current user |
| Profile Page | GET | `/auth/me` | Fetch logged-in user |
| Update Profile | PATCH | `/users/profile` | Update profile information |
| Dashboard | GET | `/dashboard/role` | Load authenticated user |

---

# Property Module

## Property Listing Page

Component

```
PropertyList
```

API

```
GET /properties
```

Purpose

- Load all available properties
- Supports pagination
- Supports filtering
- Supports searching

Example

```
GET /properties?page=1&limit=12
```

---

## Property Details

Component

```
PropertyDetails
```

API

```
GET /properties/:id
```

Purpose

Display complete property information.

---

## Create Property

Component

```
CreatePropertyForm
```

API

```
POST /properties
```

Role

- Landlord only

---

## Update Property

Component

```
UpdatePropertyModal
```

API

```
PATCH /properties/:id
```

Role

- Landlord

---

## Delete Property

Component

```
DeletePropertyButton
```

API

```
DELETE /properties/:id
```

Role

- Landlord

---

# Rental Request Module

## Send Rental Request

Component

```
RentRequestModal
```

API

```
POST /rentals
```

Role

Tenant

Purpose

Create rental request for a property.

---

## My Rental Requests

Component

```
MyRentalRequests
```

API

```
GET /rental-requests/my
```

---

## Landlord Requests

Component

```
LandlordRentalRequests
```

API

```
GET /landlord/request
```

Purpose

Display requests received for landlord properties.

---

## Approve Rental Request

Component

```
RentalStatusUpdateButton
```

API

```
PATCH /landlord/rentals/:id
```

Request

```json
{
  "status": "APPROVED"
}
```

---

## Reject Rental Request

Component

```
RentalStatusUpdateButton
```

API

```
PATCH /landlord/rentals/:id
```

Request

```json
{
  "status": "REJECTED"
}
```

---

# Payment Module

## Create Checkout Session

Component

```
CheckoutButton
```

API

```
POST /payments/create
```

Purpose

Create Stripe Checkout Session.

---

## Payment Confirmation

Backend

```
POST /payments/confirm
```

Purpose

Stripe Webhook verification.

Frontend

No direct frontend integration.

---

## Payment History

Component

```
PaymentHistory
```

API

```
GET /payments
```

---

# Review Module

## Submit Review

Component

```
ReviewForm
```

API

```
POST /reviews
```

Request

```json
{
  "propertyId": "...",
  "rating": 5,
  "comment": "Excellent property."
}
```

---

## Property Reviews

Component

```
ReviewSection
```

API

```
GET /reviews/property/:propertyId
```

---

# Admin Module

## Users List

Component

```
UsersTable
```

API

```
GET /users
```

---

## Update User Status

Component

```
UserActionDropdown
```

API

```
PATCH /users/:id
```

---

## Dashboard Statistics

Component

```
AdminDashboard
```

API

```
GET /dashboard/admin
```

---

# Search & Filtering

Property Search

```
GET /properties?search=dhaka
```

Filter by Category

```
GET /properties?category=Apartment
```

Filter by Bedrooms

```
GET /properties?bedrooms=3
```

Sorting

```
GET /properties?sortBy=rentAmount&sortOrder=asc
```

Pagination

```
GET /properties?page=2&limit=10
```

---

# Image Upload

If image upload is supported:

Component

```
PropertyImageUploader
```

API

```
POST /upload
```

Returns

```json
{
  "url": "https://..."
}
```

---

# Error Handling

All API responses follow a consistent response format.

Success

```json
{
  "success": true,
  "message": "Request successful.",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Something went wrong."
}
```

Frontend displays errors using toast notifications and handles loading states for improved user experience.

---

# Frontend Technologies Used

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React
- React Hook Form
- Zod Validation
- Sonner Toast
- Stripe Checkout
- Server Actions
- Fetch API

---

# Authentication Flow

```text
User Login
      │
      ▼
POST /auth/login
      │
HTTP Only Cookie
      │
      ▼
Authenticated Requests
(credentials: include)
      │
      ▼
Protected Backend Routes
```

---

# Data Flow

```text
Frontend Component
        │
        ▼
Server Action / Fetch API
        │
        ▼
Backend REST API
        │
        ▼
PostgreSQL Database
        │
        ▼
JSON Response
        │
        ▼
UI Update
```

---

# Summary

The RentNest frontend communicates with the backend using RESTful APIs secured by JWT authentication with HTTP-only cookies. Frontend components are organized by feature modules (Authentication, Properties, Rental Requests, Payments, Reviews, and Admin), ensuring a clean separation of concerns and maintainable integration with the backend services.