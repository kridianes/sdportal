import Link from 'next/link'

export default function UpdatesPage() {
  // Sample project data with enhanced information
  const projects = [
    {
      id: 1,
      name: "Portal Development",
      status: "active",
      description: "Stakeholder communication platform",
      businessCase: "Improve stakeholder communication efficiency by 60% and reduce meeting overhead",
      stakeholders: ["John Smith (Product Owner)", "Sarah Johnson (Tech Lead)", "Mike Chen (Designer)"],
      followers: 24,
      isFollowing: true,
      updates: [
        {
          id: 1,
          title: "Sprint 3 Completed - New Features Released",
          content: "Successfully delivered Resources and Calendar sections. User feedback has been overwhelmingly positive.",
          author: "Sarah Johnson",
          date: "2024-07-14",
          type: "milestone"
        },
        {
          id: 2,
          title: "UI/UX Improvements Based on Stakeholder Feedback",
          content: "Implemented responsive design improvements and enhanced navigation based on user testing sessions.",
          author: "Mike Chen",
          date: "2024-07-12",
          type: "update"
        }
      ]
    },
    {
      id: 2,
      name: "Customer Onboarding System",
      status: "completed",
      description: "Automated customer onboarding workflow",
      businessCase: "Reduce onboarding time from 2 weeks to 3 days, improving customer satisfaction",
      stakeholders: ["Lisa Wang (Customer Success)", "David Brown (Engineering)", "Anna Martinez (Operations)"],
      followers: 18,
      isFollowing: false,
      customerStats: {
        onboardedCustomers: 156,
        upcomingRenewals: 23,
        satisfactionScore: 4.7,
        avgOnboardingTime: "2.8 days"
      },
      updates: [
        {
          id: 3,
          title: "Project Successfully Completed",
          content: "All deliverables completed on time. System is now live and processing customer onboarding automatically.",
          author: "David Brown",
          date: "2024-07-10",
          type: "completion"
        }
      ]
    },
    {
      id: 3,
      name: "API Integration Platform",
      status: "active",
      description: "Third-party service integration hub",
      businessCase: "Centralize all external integrations to reduce maintenance overhead by 40%",
      stakeholders: ["Tom Wilson (Architecture)", "Emma Davis (DevOps)", "Chris Lee (QA)"],
      followers: 31,
      isFollowing: true,
      updates: [
        {
          id: 4,
          title: "Security Audit Completed",
          content: "Third-party security audit completed with no critical issues found. Minor recommendations being implemented.",
          author: "Tom Wilson",
          date: "2024-07-13",
          type: "update"
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'on-hold': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getUpdateTypeIcon = (type: string) => {
    switch (type) {
      case 'milestone':
        return (
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
      case 'completion':
        return (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

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
              <Link href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="/feedback" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                Feedback
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Project Updates</h1>
                <p className="text-gray-600 mt-1">Follow projects and stay updated on progress</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                Manage Subscriptions
              </button>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Project Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-semibold text-gray-900 mr-3">{project.name}</h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    
                    {/* Project Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Business Case</h4>
                        <p className="text-sm text-gray-600">{project.businessCase}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Key Stakeholders</h4>
                        <ul className="text-sm text-gray-600">
                          {project.stakeholders.map((stakeholder, index) => (
                            <li key={index}>• {stakeholder}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Customer Stats for Completed Projects */}
                    {project.status === 'completed' && project.customerStats && (
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Impact</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{project.customerStats.onboardedCustomers}</div>
                            <div className="text-xs text-gray-600">Onboarded Customers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{project.customerStats.upcomingRenewals}</div>
                            <div className="text-xs text-gray-600">Upcoming Renewals</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{project.customerStats.satisfactionScore}/5</div>
                            <div className="text-xs text-gray-600">Satisfaction Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{project.customerStats.avgOnboardingTime}</div>
                            <div className="text-xs text-gray-600">Avg Onboarding</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Follow Button */}
                  <div className="ml-6 flex flex-col items-end">
                    <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mb-2 ${
                      project.isFollowing 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {project.isFollowing ? (
                        <>
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Following
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Follow
                        </>
                      )}
                    </button>
                    <span className="text-xs text-gray-500">{project.followers} followers</span>
                  </div>
                </div>
              </div>

              {/* Recent Updates */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Updates</h3>
                <div className="space-y-4">
                  {project.updates.map((update) => (
                    <div key={update.id} className="border-l-4 border-blue-200 pl-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3 mt-1">
                          {getUpdateTypeIcon(update.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{update.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{update.content}</p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span>{update.author}</span>
                            <span className="mx-2">•</span>
                            <span>{update.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All Updates →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Notification Settings */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
              <label className="ml-2 text-sm text-gray-700">Email notifications for followed projects</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
              <label className="ml-2 text-sm text-gray-700">Weekly digest of all updates</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
              <label className="ml-2 text-sm text-gray-700">Milestone completion alerts</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
