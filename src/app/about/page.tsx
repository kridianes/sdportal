import Link from 'next/link'
import UniversalSearch from '@/components/UniversalSearch'

export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Technical Lead",
      bio: "10+ years in full-stack development with expertise in React, Node.js, and cloud architecture. Passionate about building scalable solutions.",
      skills: ["React", "Node.js", "AWS", "TypeScript", "System Design"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "UX/UI Designer",
      bio: "Creative designer focused on user-centered design and accessibility. Specializes in creating intuitive interfaces for complex systems.",
      skills: ["Figma", "User Research", "Prototyping", "Accessibility", "Design Systems"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 3,
      name: "David Brown",
      role: "Backend Engineer",
      bio: "Database and API specialist with strong background in microservices architecture and performance optimization.",
      skills: ["Python", "PostgreSQL", "Docker", "Kubernetes", "API Design"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 4,
      name: "Lisa Wang",
      role: "Product Manager",
      bio: "Strategic product leader with experience in agile methodologies and stakeholder management. Drives product vision and roadmap.",
      skills: ["Product Strategy", "Agile", "Stakeholder Management", "Analytics", "Roadmapping"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 5,
      name: "Tom Wilson",
      role: "DevOps Engineer",
      bio: "Infrastructure and automation expert focused on CI/CD, monitoring, and security best practices.",
      skills: ["AWS", "Terraform", "Jenkins", "Monitoring", "Security"],
      image: "/api/placeholder/150/150"
    },
    {
      id: 6,
      name: "Emma Davis",
      role: "QA Engineer",
      bio: "Quality assurance specialist with expertise in automated testing and quality processes across the development lifecycle.",
      skills: ["Test Automation", "Selenium", "Jest", "Quality Processes", "Bug Tracking"],
      image: "/api/placeholder/150/150"
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "We start by understanding your needs, stakeholders, and business objectives through comprehensive discovery sessions.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      step: 2,
      title: "Design & Architecture",
      description: "Our team creates detailed designs and technical architecture that align with your requirements and scalability needs.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      step: 3,
      title: "Development & Testing",
      description: "We build your solution using agile methodologies with continuous testing and quality assurance throughout the process.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      step: 4,
      title: "Deployment & Support",
      description: "We deploy your solution with comprehensive monitoring and provide ongoing support to ensure optimal performance.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    }
  ]

  const services = [
    {
      title: "Web Application Development",
      description: "Full-stack web applications using modern frameworks and technologies",
      technologies: ["React", "Next.js", "Node.js", "TypeScript"]
    },
    {
      title: "API Development & Integration",
      description: "RESTful APIs and third-party service integrations for seamless connectivity",
      technologies: ["REST APIs", "GraphQL", "Microservices", "OAuth"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable cloud solutions with automated deployment and monitoring",
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform"]
    },
    {
      title: "Database Design & Optimization",
      description: "Efficient database architecture and performance optimization",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "Database Optimization"]
    },
    {
      title: "UI/UX Design",
      description: "User-centered design with focus on accessibility and usability",
      technologies: ["Figma", "Design Systems", "Prototyping", "User Research"]
    },
    {
      title: "Quality Assurance",
      description: "Comprehensive testing strategies and automated quality processes",
      technologies: ["Test Automation", "Performance Testing", "Security Testing", "CI/CD"]
    }
  ]

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
            <div className="flex items-center space-x-8">
              <nav className="flex space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/roadmap" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Roadmap
                </Link>
                <Link href="/updates" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Updates
                </Link>
                <Link href="/resources" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Resources
                </Link>
                <Link href="/calendar" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Calendar
                </Link>
                <Link href="/about" className="text-blue-600 px-3 py-2 text-sm font-medium">
                  About
                </Link>
                <Link href="/feedback" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Feedback
                </Link>
              </nav>
              <UniversalSearch />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">About Our Team</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re a passionate team of developers, designers, and product experts dedicated to building innovative solutions that drive business success.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              To deliver exceptional software solutions that empower organizations to achieve their goals through innovative technology, 
              collaborative partnerships, and unwavering commitment to quality.
            </p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    {step.icon}
                  </div>
                  <div className="text-sm font-medium text-blue-600 mb-2">Step {step.step}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600">We never compromise on quality and always strive for excellence in everything we deliver.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Collaboration</h3>
              <p className="text-gray-600">We believe in the power of teamwork and maintain open communication with all stakeholders.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">We embrace new technologies and creative solutions to solve complex challenges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
