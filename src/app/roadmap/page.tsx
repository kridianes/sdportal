import Link from 'next/link'

export default function RoadmapPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="text-blue-600 hover:text-blue-800 mb-2 inline-block">
              ← Back to Home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Project Roadmap</h1>
            <p className="text-gray-600 mt-2">Track our progress and upcoming milestones</p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Roadmap Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            We&apos;re building an interactive roadmap view to show project timelines, priorities, and status updates.
          </p>
          <div className="text-sm text-gray-500">
            Features in development:
            <ul className="mt-2 space-y-1">
              <li>• Timeline visualization</li>
              <li>• Status filtering</li>
              <li>• Priority indicators</li>
              <li>• Progress tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
