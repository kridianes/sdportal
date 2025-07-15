import Link from 'next/link'

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900">Team Portal</span>
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/roadmap" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Roadmap
              </Link>
              <Link href="/updates" className="text-blue-600 px-3 py-2 text-sm font-medium">
                Updates
              </Link>
              <Link href="/resources" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Resources
              </Link>
              <Link href="/calendar" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Calendar
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Updates</h1>
              <p className="text-gray-600 mt-1">Latest progress updates and announcements</p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Updates Feed Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We&apos;re building a comprehensive updates system for sharing progress, announcements, and team news.
          </p>
          <div className="text-sm text-gray-500">
            Features in development:
            <ul className="mt-2 space-y-1">
              <li>• Rich text updates</li>
              <li>• Image attachments</li>
              <li>• Tagging system</li>
              <li>• Search and filtering</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
