# ChatGPT Integration Guide

This document explains how to set up and use the ChatGPT integration for the Team Portal chatbot.

## Overview

The Team Portal includes an AI-powered chatbot that uses OpenAI's ChatGPT API to provide intelligent responses about your team, services, projects, and portal features. The chatbot has comprehensive knowledge of your site content and can answer questions naturally.

## Setup Instructions

### 1. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your OpenAI account
3. Create a new API key
4. Copy the API key (it starts with `sk-`)

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### 3. Install Dependencies

The OpenAI SDK is already included in the project. If you need to install it manually:

```bash
npm install openai
```

### 4. Deploy and Test

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Open the portal and click the chat button in the bottom-right corner
3. Test the chatbot with questions like:
   - "Tell me about your team"
   - "What services do you offer?"
   - "How does your development process work?"
   - "What projects are you currently working on?"

## Features

### Intelligent Responses
- **Context-Aware**: The chatbot understands your team, services, and projects
- **Natural Language**: Powered by ChatGPT for human-like conversations
- **Conversation Memory**: Maintains context throughout the conversation
- **Fallback Support**: Graceful degradation if API is unavailable

### Site Knowledge
The chatbot has comprehensive knowledge about:
- **Team Members**: Names, roles, skills, and expertise
- **Services**: Web development, API integration, cloud infrastructure, etc.
- **Development Process**: 4-step methodology from discovery to deployment
- **Current Projects**: Active and completed projects with details
- **Portal Features**: How to use updates, resources, calendar, feedback
- **Contact Information**: Support channels and business hours

### Technical Features
- **Conversation History**: Sends recent messages for context
- **Error Handling**: Fallback responses if API fails
- **Rate Limiting**: Built-in protection against excessive usage
- **Secure**: API key stored securely in environment variables

## Customization

### Modify Site Context

Edit the `SITE_CONTEXT` in `src/app/api/chat/route.ts` to update the chatbot's knowledge:

```typescript
const SITE_CONTEXT = `
You are a helpful assistant for the Team Portal...
// Add your specific team information, services, etc.
`
```

### Adjust AI Parameters

Modify the OpenAI API call parameters in `src/app/api/chat/route.ts`:

```typescript
const completion = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo', // or 'gpt-4' for better responses
  max_tokens: 500,        // Adjust response length
  temperature: 0.7,       // Creativity level (0-1)
  presence_penalty: 0.1,  // Avoid repetition
  frequency_penalty: 0.1, // Encourage variety
})
```

### Styling

The chatbot UI can be customized in `src/components/ChatBot.tsx`. It uses Tailwind CSS classes for styling.

## Cost Considerations

- **GPT-3.5-turbo**: ~$0.002 per 1K tokens (very affordable)
- **GPT-4**: ~$0.03 per 1K tokens (higher quality, more expensive)
- **Typical conversation**: 100-500 tokens per exchange
- **Monthly cost**: Usually under $10 for moderate usage

## Security Best Practices

1. **Environment Variables**: Never commit API keys to version control
2. **Rate Limiting**: Consider implementing rate limiting for production
3. **Input Validation**: The API route validates input messages
4. **Error Handling**: Sensitive errors are not exposed to users
5. **HTTPS**: Always use HTTPS in production

## Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Check that `OPENAI_API_KEY` is set in `.env.local`
   - Restart your development server after adding the key

2. **"Failed to get response from ChatGPT"**
   - Verify your API key is valid and has credits
   - Check your OpenAI account usage limits

3. **Chatbot shows fallback responses**
   - This is normal behavior when the API is unavailable
   - Check the browser console for error details

### Testing API Connection

You can test the API directly:

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, tell me about your team"}'
```

## Production Deployment

### Environment Variables

Set the environment variable in your deployment platform:
- **Vercel**: Add to Environment Variables in project settings
- **Netlify**: Add to Site settings > Environment variables
- **Railway/Render**: Add to environment configuration

### Monitoring

Consider adding monitoring for:
- API response times
- Error rates
- Token usage
- User satisfaction

## Support

If you need help with the ChatGPT integration:

1. Check the [OpenAI Documentation](https://platform.openai.com/docs)
2. Review the error logs in your browser console
3. Test the API endpoint directly
4. Contact support at support@teamportal.com

## Future Enhancements

Potential improvements:
- **Function Calling**: Let ChatGPT trigger specific portal actions
- **Document Upload**: Train on your specific documentation
- **Analytics**: Track popular questions and improve responses
- **Multi-language**: Support for different languages
- **Voice Interface**: Add speech-to-text capabilities
