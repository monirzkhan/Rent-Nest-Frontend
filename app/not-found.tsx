// app/not-found.tsx
import Card from '@/components/shared/404'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <div>
        <Card></Card>
      </div>
      <h1 className="text-6xl font-extrabold text-blue-600 tracking-tight">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">Page Not Found</h2>
      <p className="mt-4 text-base text-gray-600 max-w-md mx-auto">
        Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
      </p>
      <div className="mt-8">
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
