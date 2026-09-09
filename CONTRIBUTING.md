# Contributing to LeadSetu

Thank you for your interest in contributing to LeadSetu! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How to Contribute

### Reporting Bugs

1. Use the GitHub Issues tracker
2. Check if the bug has already been reported
3. If not, create a new issue with:
   - Clear title describing the bug
   - Detailed description and steps to reproduce
   - Expected vs. actual behavior
   - Screenshots if applicable
   - Your environment (OS, browser, Node version)

### Suggesting Enhancements

1. Use the GitHub Issues tracker
2. Use a clear and descriptive title
3. Provide a detailed description of the suggested enhancement
4. List some examples of how the enhancement would be used
5. Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request with:
   - Clear title and description
   - Reference to related issues
   - Screenshots for UI changes
   - Tests for new functionality

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Create environment variables file: `cp .env.example .env.local`
4. Set up Supabase database schema (see SETUP.md)
5. Start development server: `npm run dev`

## Coding Standards

### JavaScript/React
- Use ES6+ features
- Use functional components and hooks
- Follow React best practices
- Add PropTypes or TypeScript types
- Use meaningful variable names
- Comment complex logic

### CSS
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Avoid inline styles
- Use consistent spacing and colors

### Commits
- Write clear commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issues when relevant
- Keep commits focused and atomic

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Test responsive design on mobile devices
- Test cross-browser compatibility

## Documentation

- Update README.md if adding new features
- Update SETUP.md for setup-related changes
- Add comments to complex functions
- Keep documentation up-to-date with code changes

## Project Structure

```
LeadSetu/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── services/      # API and external service integrations
│   ├── App.jsx        # Main app component
│   └── index.css      # Global styles
├── supabase/          # Database schema and migrations
├── public/            # Static assets
└── [config files]     # Build and configuration files
```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(dashboard): add call tracking modal

Implement CallTrackerModal component with date/time picker
for scheduling follow-ups. Add backend integration with
call_logs table.

Closes #123
```

Types: feat, fix, docs, style, refactor, test, chore

## Pull Request Process

1. Update the README.md with any new features
2. Update SETUP.md if setup instructions changed
3. Test all changes locally
4. Ensure code passes linting
5. Add screenshots for UI changes
6. Ensure PR description clearly describes the changes
7. Request review from maintainers

## Questions?

Feel free to:
- Open an issue with your question
- Join our Discord community
- Email: support@leadsetu.com

Thank you for contributing to LeadSetu! 🚀
