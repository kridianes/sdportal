import { NextRequest, NextResponse } from 'next/server'

// Define the structure for search results
interface SearchResult {
  id: string
  title: string
  content: string
  type: 'project' | 'team' | 'service' | 'resource' | 'event' | 'feedback' | 'page'
  url: string
  section?: string
  relevance: number
}

// Site content database for searching
const SITE_CONTENT = {
  // Team members
  team: [
    {
      id: 'sarah-johnson',
      title: 'Sarah Johnson - Technical Lead',
      content: 'Technical Lead with 10+ years in full-stack development. Expertise in React, Node.js, AWS, TypeScript, System Design. Passionate about building scalable solutions.',
      type: 'team' as const,
      url: '/about#team',
      section: 'Team Members'
    },
    {
      id: 'mike-chen',
      title: 'Mike Chen - UX/UI Designer',
      content: 'Creative designer focused on user-centered design and accessibility. Specializes in Figma, User Research, Prototyping, Accessibility, Design Systems.',
      type: 'team' as const,
      url: '/about#team',
      section: 'Team Members'
    },
    {
      id: 'david-brown',
      title: 'David Brown - Backend Engineer',
      content: 'Database and API specialist with strong background in microservices architecture. Expert in Python, PostgreSQL, Docker, Kubernetes, API Design.',
      type: 'team' as const,
      url: '/about#team',
      section: 'Team Members'
    },
    {
      id: 'lisa-wang',
      title: 'Lisa Wang - Product Manager',
      content: 'Strategic product leader with experience in agile methodologies and stakeholder management. Skills in Product Strategy, Agile, Analytics, Roadmapping.',
      type: 'team' as const,
      url: '/about#team',
      section: 'Team Members'
    },
    {
      id: 'tom-wilson',
      title: 'Tom Wilson - DevOps Engineer',
      content: 'Infrastructure and automation expert focused on CI/CD, monitoring, and security. Expertise in AWS, Terraform, Jenkins, Monitoring, Security.',
      type: 'team' as const,
      url: '/about#team',
      section: 'Team Members'
    },
    {
      id: 'emma-davis',
      title: 'Emma Davis - QA Engineer',
      content: 'Quality assurance specialist with expertise in automated testing and quality processes. Skills in Test Automation, Selenium, Jest, Quality Processes.',
      type: 'team' as const,
      url: '/about#team',
      section: 'Team Members'
    }
  ],

  // Services
  services: [
    {
      id: 'web-development',
      title: 'Web Application Development',
      content: 'Full-stack web applications using modern frameworks and technologies. React, Next.js, Node.js, TypeScript for scalable web solutions.',
      type: 'service' as const,
      url: '/about#services',
      section: 'Services'
    },
    {
      id: 'api-development',
      title: 'API Development & Integration',
      content: 'RESTful APIs and third-party service integrations for seamless connectivity. REST APIs, GraphQL, Microservices, OAuth integration.',
      type: 'service' as const,
      url: '/about#services',
      section: 'Services'
    },
    {
      id: 'cloud-infrastructure',
      title: 'Cloud Infrastructure',
      content: 'Scalable cloud solutions with automated deployment and monitoring. AWS, Docker, Kubernetes, Terraform for robust infrastructure.',
      type: 'service' as const,
      url: '/about#services',
      section: 'Services'
    },
    {
      id: 'database-design',
      title: 'Database Design & Optimization',
      content: 'Efficient database architecture and performance optimization. PostgreSQL, MongoDB, Redis, Database Optimization for high performance.',
      type: 'service' as const,
      url: '/about#services',
      section: 'Services'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      content: 'User-centered design with focus on accessibility and usability. Figma, Design Systems, Prototyping, User Research for great experiences.',
      type: 'service' as const,
      url: '/about#services',
      section: 'Services'
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance',
      content: 'Comprehensive testing strategies and automated quality processes. Test Automation, Performance Testing, Security Testing, CI/CD.',
      type: 'service' as const,
      url: '/about#services',
      section: 'Services'
    }
  ],

  // Projects
  projects: [
    {
      id: 'portal-development',
      title: 'Portal Development',
      content: 'Stakeholder communication platform with project updates, team information, and feedback systems. Active project with modern React architecture.',
      type: 'project' as const,
      url: '/updates#portal-development',
      section: 'Current Projects'
    },
    {
      id: 'customer-onboarding',
      title: 'Customer Onboarding System',
      content: 'Automated workflow system for customer onboarding. Completed project with 156 customers successfully onboarded, 94% satisfaction rate.',
      type: 'project' as const,
      url: '/updates#customer-onboarding',
      section: 'Completed Projects'
    },
    {
      id: 'api-integration',
      title: 'API Integration Platform',
      content: 'Third-party service integration hub for seamless connectivity. Active development with microservices architecture and OAuth support.',
      type: 'project' as const,
      url: '/updates#api-integration',
      section: 'Current Projects'
    }
  ],

  // Resources
  resources: [
    {
      id: 'project-presentations',
      title: 'Project Presentations',
      content: 'Comprehensive project presentations including roadmaps, technical specifications, and stakeholder updates. Quarterly reviews and demos.',
      type: 'resource' as const,
      url: '/resources#presentations',
      section: 'Resources'
    },
    {
      id: 'technical-documentation',
      title: 'Technical Documentation',
      content: 'API documentation, system architecture guides, deployment procedures, and technical specifications for all projects.',
      type: 'resource' as const,
      url: '/resources#documentation',
      section: 'Resources'
    },
    {
      id: 'knowledge-base',
      title: 'Knowledge Base Articles',
      content: 'Best practices, troubleshooting guides, development standards, and team knowledge sharing articles.',
      type: 'resource' as const,
      url: '/resources#knowledge-base',
      section: 'Resources'
    }
  ],

  // Calendar events
  events: [
    {
      id: 'sprint-planning',
      title: 'Sprint Planning',
      content: 'Bi-weekly sprint planning sessions for project roadmap and task prioritization. Team collaboration and goal setting.',
      type: 'event' as const,
      url: '/calendar#sprint-planning',
      section: 'Team Events'
    },
    {
      id: 'stakeholder-demo',
      title: 'Stakeholder Demo',
      content: 'Monthly stakeholder demonstrations showcasing project progress and new features. Client presentations and feedback sessions.',
      type: 'event' as const,
      url: '/calendar#demos',
      section: 'Team Events'
    },
    {
      id: 'code-review',
      title: 'Code Review Sessions',
      content: 'Weekly code review meetings for quality assurance and knowledge sharing. Technical discussions and best practices.',
      type: 'event' as const,
      url: '/calendar#code-review',
      section: 'Team Events'
    }
  ],

  // Pages
  pages: [
    {
      id: 'home',
      title: 'Home - Team Portal',
      content: 'Welcome to our team portal. Access project updates, roadmap, resources, calendar, team information, and feedback systems.',
      type: 'page' as const,
      url: '/',
      section: 'Navigation'
    },
    {
      id: 'roadmap',
      title: 'Project Roadmap',
      content: 'Project timeline and priorities. View upcoming milestones, development phases, and strategic planning for all active projects.',
      type: 'page' as const,
      url: '/roadmap',
      section: 'Navigation'
    },
    {
      id: 'updates',
      title: 'Project Updates',
      content: 'Latest progress and announcements. Follow projects, receive notifications, and stay updated on development progress.',
      type: 'page' as const,
      url: '/updates',
      section: 'Navigation'
    },
    {
      id: 'resources',
      title: 'Resources & Documentation',
      content: 'Documents and knowledge base. Access project presentations, technical documentation, and team knowledge sharing.',
      type: 'page' as const,
      url: '/resources',
      section: 'Navigation'
    },
    {
      id: 'calendar',
      title: 'Team Calendar',
      content: 'Team activities and events. View meetings, demos, code reviews, milestones, and important team activities.',
      type: 'page' as const,
      url: '/calendar',
      section: 'Navigation'
    },
    {
      id: 'about',
      title: 'About Our Team',
      content: 'Meet our team and learn about our services. Team member profiles, service offerings, development process, and company values.',
      type: 'page' as const,
      url: '/about',
      section: 'Navigation'
    },
    {
      id: 'feedback',
      title: 'Feedback & Support',
      content: 'Share feedback and get support. Submit bug reports, feature requests, general feedback, and contact our support team.',
      type: 'page' as const,
      url: '/feedback',
      section: 'Navigation'
    }
  ]
}

// Search function
function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const searchTerm = query.toLowerCase().trim()
  const results: SearchResult[] = []

  // Search through all content categories
  Object.entries(SITE_CONTENT).forEach(([category, items]) => {
    items.forEach((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm)
      const contentMatch = item.content.toLowerCase().includes(searchTerm)
      
      if (titleMatch || contentMatch) {
        // Calculate relevance score
        let relevance = 0
        
        // Title matches are more relevant
        if (titleMatch) {
          relevance += 10
          // Exact title match gets highest score
          if (item.title.toLowerCase() === searchTerm) {
            relevance += 20
          }
          // Title starts with search term gets bonus
          if (item.title.toLowerCase().startsWith(searchTerm)) {
            relevance += 15
          }
        }
        
        // Content matches
        if (contentMatch) {
          relevance += 5
          // Count occurrences for better relevance
          const occurrences = (item.content.toLowerCase().match(new RegExp(searchTerm, 'g')) || []).length
          relevance += occurrences * 2
        }
        
        // Boost certain content types
        if (item.type === 'page') relevance += 3
        if (item.type === 'project') relevance += 2
        if (item.type === 'team') relevance += 2
        
        results.push({
          id: item.id,
          title: item.title,
          content: item.content,
          type: item.type,
          url: item.url,
          section: item.section,
          relevance
        })
      }
    })
  })

  // Sort by relevance (highest first) and limit results
  return results
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 20) // Limit to top 20 results
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const results = searchContent(query)

    return NextResponse.json({
      query,
      results,
      total: results.length
    })

  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      )
    }

    const results = searchContent(query)

    return NextResponse.json({
      query,
      results,
      total: results.length
    })

  } catch (error) {
    console.error('Search API Error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
