import Navbar from "@/components/auth/Navbar";
import Footer from "@/components/Footer";

export default function OpportunityDetailLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc]">
      <Navbar />

      <main className="flex-1 w-full pt-20 sm:pt-24 pb-24 md:pb-16 animate-pulse">
        {/* Top bar skeleton */}
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-28 bg-gray-200 rounded-full" />
              <div className="h-6 w-20 bg-gray-200 rounded-full hidden sm:block" />
            </div>
            <div className="h-8 w-24 bg-gray-200 rounded-xl" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Header */}
          <div className="space-y-3 mb-8">
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-3/4 max-w-xl bg-gray-200 rounded-lg" />
            <div className="h-4 w-1/2 max-w-md bg-gray-200 rounded" />
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Left */}
            <div className="space-y-6">
              <div className="h-64 sm:h-96 w-full bg-gray-200 rounded-2xl" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="h-20 bg-gray-200 rounded-xl" />
                <div className="h-20 bg-gray-200 rounded-xl" />
                <div className="h-20 bg-gray-200 rounded-xl" />
                <div className="h-20 bg-gray-200 rounded-xl" />
              </div>
              <div className="h-48 bg-gray-200 rounded-2xl" />
              <div className="h-36 bg-gray-200 rounded-2xl" />
            </div>

            {/* Right */}
            <div className="space-y-6">
              <div className="h-80 bg-gray-200 rounded-2xl" />
              <div className="h-60 bg-gray-200 rounded-2xl" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
