# Contributing to Cryptomaniac

First off, thank you for considering contributing to Cryptomaniac! It's people like you that make it such a great tool.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

---

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, browser, Node version)

**Bug Report Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 96]
- Node: [e.g., 16.13.0]
```

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests**
- **Provide clear use cases**
- **Explain why it benefits users**
- **Include mockups** (if UI-related)

### Pull Requests

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Test thoroughly
4. Update documentation
5. Submit a pull request

---

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Setup Steps

1. **Fork and clone**
```bash
   git clone https://github.com/YOUR_USERNAME/cryptomaniac.git
   cd cryptomaniac
```

2. **Install dependencies**
```bash
   npm install
```

3. **Create environment file**
```bash
   cp .env.example .env
```

4. **Start dev server**
```bash
   npm run dev
```

---

## 💻 Coding Standards

### JavaScript/React

- Use **ES6+ syntax**
- Prefer **functional components** with hooks
- Use **meaningful variable names**
- Add **comments for complex logic**
- Follow **ESLint configuration**

**Example:**
```javascript
// ✅ Good
const fetchCoinData = async (coinId) => {
  try {
    const response = await api.get(`/coins/${coinId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching coin:', error);
    throw error;
  }
};

// ❌ Avoid
const fcd = async (id) => {
  const r = await api.get(`/coins/${id}`);
  return r.data;
};
```

### CSS/Styling

- Use **Tailwind utility classes** first
- Custom CSS for unique styling
- Follow **BEM naming** for custom classes
- Use **CSS variables** for theme colors

### File Organization

- One component per file
- Group related files in folders
- Use index files for clean imports
```
components/
└── CoinCard/
    ├── index.js          # Re-exports
    ├── CoinCard.jsx      # Component
    ├── CoinCard.css      # Styles
    └── CoinCard.test.js  # Tests
```

---

## 📝 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting)
- **refactor:** Code refactoring
- **test:** Adding/updating tests
- **chore:** Maintenance tasks

### Examples
```bash
feat(search): add debounced search functionality

Implemented 300ms debounce on search input to reduce API calls
and improve performance.

Closes #123
```
```bash
fix(chart): correct price axis scaling

Fixed issue where price axis didn't scale properly for coins
with very high values.

Fixes #456
```

---

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings or errors
- [ ] Tests added/updated (if applicable)
- [ ] Tested on multiple browsers

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested your changes

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-reviewed
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
```

### Review Process

1. **Automated checks** must pass
2. **At least one maintainer** reviews
3. **Address feedback** promptly
4. **Squash commits** before merge

---

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Writing Tests
```javascript
// Example test
describe('CoinCard', () => {
  it('renders coin name correctly', () => {
    const coin = { name: 'Bitcoin', symbol: 'BTC' };
    render(<CoinCard coin={coin} />);
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
  });
});
```

---

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [CoinGecko API Docs](https://www.coingecko.com/api/documentation)

---

## ❓ Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out to maintainers
- Check existing discussions

---

Thank you for contributing! 🎉