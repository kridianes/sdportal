import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client only when needed
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured')
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

// Site content for context
const SITE_CONTEXT = `
You are a helpful assistant for the Team Portal, a stakeholder communication platform. Here's information about our team and services:

TEAM MEMBERS:
- Sarah Johnson (Technical Lead): 10+ years in full-stack development, React, Node.js, AWS, TypeScript, System Design
- Mike Chen (UX/UI Designer): User-centered design, accessibility, Figma, User Research, Prototyping
- David Brown (Backend Engineer): Database and API specialist, Python, PostgreSQL, Docker, Kubernetes
- Lisa Wang (Product Manager): Strategic product leader, Agile, Stakeholder Management, Analytics
- Tom Wilson (DevOps Engineer): Infrastructure automation, AWS, Terraform, Jenkins, Monitoring
- Emma Davis (QA Engineer): Quality assurance, Test Automation, Selenium, Jest

SERVICES WE OFFER:
1. Web Application Development - Full-stack web apps using React, Next.js, Node.js, TypeScript
2. API Development & Integration - RESTful APIs, GraphQL, Microservices, OAuth
3. Cloud Infrastructure - Scalable cloud solutions with AWS, Docker, Kubernetes, Terraform
4. Database Design & Optimization - PostgreSQL, MongoDB, Redis, performance optimization
5. UI/UX Design - User-centered design, Figma, Design Systems, Prototyping, User Research
6. Quality Assurance - Test Automation, Performance Testing, Security Testing, CI/CD

OUR PROCESS:
1. Discovery & Planning - Understanding needs, stakeholders, and business objectives
2. Design & Architecture - Detailed designs and technical architecture
3. Development & Testing - Agile methodologies with continuous testing
4. Deployment & Support - Comprehensive monitoring and ongoing support

CURRENT PROJECTS:
- Portal Development (Active): Stakeholder communication platform
- Customer Onboarding System (Completed): Automated workflow, 156 customers onboarded
- API Integration Platform (Active): Third-party service integration hub

PORTAL FEATURES:
- Project Updates: Follow projects, get notifications, view progress
- Resources: Project presentations, documentation, knowledge base
- Calendar: Team activities, meetings, demos, milestones
- About Us: Team information, services, process, values
- Feedback: Submit feedback, bug reports, feature requests, support questions

CONTACT INFO:
- Email: support@teamportal.com
- Phone: +1 (555) 123-4567
- Hours: Mon-Fri, 9AM-5PM EST

MISSION: To deliver exceptional software solutions that empower organizations to achieve their goals through innovative technology, collaborative partnerships, and unwavering commitment to quality.

VALUES: Quality First, Collaboration, Innovation

Please provide helpful, accurate responses about our team, services, projects, and portal features. Be professional but friendly.
`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get OpenAI client (this will throw if API key is not configured)
    const openai = getOpenAIClient()

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: SITE_CONTEXT
      },
      // Include conversation history
      ...conversationHistory.map((msg: any) => ({
        role: msg.isUser ? 'user' as const : 'assistant' as const,
        content: msg.text
      })),
      // Add current user message
      {
        role: 'user' as const,
        content: message
      }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    const response = completion.choices[0]?.message?.content

    if (!response) {
      return NextResponse.json(
        { error: 'No response generated' },
        { status: 500 }
      )
    }

    return NextResponse.json({ response })

  } catch (error) {
    console.error('ChatGPT API Error:', error)
    
    // Return a fallback response if API fails
    return NextResponse.json({
      response: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again later or contact our support team at support@teamportal.com for immediate assistance."
    }, { status: 200 })
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
