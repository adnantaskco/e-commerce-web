"use client";

export default function NeedHelpSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-between animate-pulse">
      <div className="max-w-6xl mx-auto space-y-10 w-full">
        
        {/* HERO HEADER SKELETON */}
        <div className="text-center space-y-4 flex flex-col items-center">
          {/* Logo Placeholder */}
          <div className="h-12 w-44 bg-gray-200 rounded-md mb-2" />

          {/* Badge Placeholder */}
          <div className="h-8 w-52 bg-gray-200 rounded-full" />

          {/* Title Placeholder */}
          <div className="h-10 sm:h-12 w-3/4 max-w-xl bg-gray-200 rounded-lg" />

          {/* Subtitle Placeholder */}
          <div className="h-5 w-full max-w-md bg-gray-200 rounded-md" />

          {/* Metadata Badges Placeholder */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <div className="h-7 w-28 bg-gray-200 rounded-md" />
            <div className="h-7 w-24 bg-gray-200 rounded-md" />
            <div className="h-7 w-32 bg-gray-200 rounded-md" />
            <div className="h-7 w-36 bg-gray-200 rounded-md" />
          </div>
        </div>

        {/* CONTACT INFO CARDS SKELETON */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-3 w-32 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* FEATURED CATEGORIES & QUICK LINKS STRIP SKELETON */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categories Placeholder */}
          <div className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-7 w-20 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Quick Links Placeholder */}
          <div className="space-y-3">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-7 w-20 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* MAIN SECTION: FAQS & CONTACT FORM SKELETON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* FAQ ACCORDION SKELETON */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-2">
              <div className="h-7 w-60 bg-gray-200 rounded-md" />
              <div className="h-4 w-72 bg-gray-200 rounded" />
            </div>

            {/* Filter Pills Placeholder */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-7 w-16 bg-gray-200 rounded-full shrink-0" />
              ))}
            </div>

            {/* Accordion Items Placeholder */}
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-14 bg-gray-100 rounded-xl border border-gray-100" />
              ))}
            </div>
          </div>

          {/* CONTACT FORM SKELETON */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-2">
              <div className="h-7 w-48 bg-gray-200 rounded-md" />
              <div className="h-4 w-64 bg-gray-200 rounded" />
            </div>

            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-10 w-full bg-gray-100 rounded-xl" />
                </div>
              ))}

              <div className="space-y-1.5">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-28 w-full bg-gray-100 rounded-xl" />
              </div>

              <div className="h-12 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>

        </div>

      </div>

      {/* FOOTER SKELETON */}
      <footer className="mt-16 border-t border-gray-200 pt-8 pb-4 text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-9 w-9 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="h-3 w-40 bg-gray-200 rounded mx-auto" />
      </footer>
    </div>
  );
}