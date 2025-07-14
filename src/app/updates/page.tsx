import Link from 'next/link'

export default function UpdatesPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Team Updates</h1>
            <p className="text-gray-600 mt-2">Latest progress updates and announcements</p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
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
    </main>
  )
}
