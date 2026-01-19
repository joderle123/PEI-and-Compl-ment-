# CLAUDE.md - AI Assistant Guide for Eldib-Generator

## Project Overview

**Eldib-Generator** is a code/content generator project. This document serves as a comprehensive guide for AI assistants working on this codebase.

### Project Status
- **Current State**: Initial setup phase
- **Repository**: joderle123/Eldib-Generator
- **Primary Branch**: `main` (or `master`)
- **Development Branch Pattern**: `claude/claude-md-{session-id}`

---

## Repository Structure

```
Eldib-Generator/
├── src/                    # Source code
│   ├── core/              # Core generator logic
│   ├── templates/         # Template files
│   ├── utils/             # Utility functions
│   └── index.js           # Entry point
├── tests/                 # Test files
│   ├── unit/             # Unit tests
│   └── integration/      # Integration tests
├── docs/                  # Documentation
├── examples/             # Usage examples
├── .github/              # GitHub workflows and configs
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── CLAUDE.md             # This file - AI assistant guide
└── .gitignore           # Git ignore rules
```

**Note**: The above structure is a suggested layout. Update this section as the actual project structure evolves.

---

## Development Workflows

### Setup and Installation

```bash
# Clone the repository
git clone <repository-url>
cd Eldib-Generator

# Install dependencies (once package.json exists)
npm install
# or
yarn install
```

### Running the Project

```bash
# Run in development mode
npm run dev

# Build the project
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

**Note**: Update these commands once `package.json` scripts are defined.

### Git Workflow

#### Branch Naming Conventions
- **Feature branches**: `feature/{description}`
- **Bug fixes**: `fix/{description}`
- **Claude AI branches**: `claude/claude-md-{session-id}` (auto-generated)
- **Hotfix branches**: `hotfix/{description}`

#### Commit Message Format
Follow conventional commits:
```
type(scope): subject

body (optional)

footer (optional)
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions or modifications
- `chore`: Build process or auxiliary tool changes

**Examples**:
```
feat(generator): add template rendering engine
fix(parser): handle edge case in input validation
docs(readme): update installation instructions
```

#### Pull Request Workflow
1. Create a feature branch from `main`
2. Make changes and commit with descriptive messages
3. Push to remote: `git push -u origin <branch-name>`
4. Create PR with clear title and description
5. Request review if working in a team
6. Merge after approval and tests pass

---

## Code Conventions

### General Principles
- **DRY (Don't Repeat Yourself)**: Extract common logic into reusable functions
- **KISS (Keep It Simple)**: Prefer simple, readable solutions over clever code
- **YAGNI (You Aren't Gonna Need It)**: Don't add functionality until it's needed
- **Single Responsibility**: Each function/class should have one clear purpose

### Code Style

#### JavaScript/TypeScript
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and constructors
- Use **UPPER_SNAKE_CASE** for constants
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for callbacks
- Add JSDoc comments for public APIs

```javascript
// Good example
const MAX_RETRIES = 3;

/**
 * Generates output from template
 * @param {string} templatePath - Path to template file
 * @param {object} data - Data to populate template
 * @returns {string} Generated output
 */
const generateFromTemplate = (templatePath, data) => {
  // Implementation
};

class TemplateEngine {
  constructor(config) {
    this.config = config;
  }
}
```

#### File Naming
- Use **kebab-case** for file names: `template-engine.js`
- Use **.test.js** or **.spec.js** for test files
- Use **.config.js** for configuration files

### Error Handling
- Use try-catch blocks for async operations
- Provide meaningful error messages
- Log errors appropriately (don't swallow errors)
- Create custom error classes for domain-specific errors

```javascript
// Good example
try {
  const result = await generateOutput(input);
  return result;
} catch (error) {
  logger.error(`Failed to generate output: ${error.message}`);
  throw new GeneratorError(`Generation failed: ${error.message}`, error);
}
```

### Testing
- Write tests for all new features
- Aim for high code coverage (>80%)
- Use descriptive test names: `should return error when input is invalid`
- Follow AAA pattern: Arrange, Act, Assert

```javascript
describe('TemplateEngine', () => {
  it('should render template with provided data', () => {
    // Arrange
    const engine = new TemplateEngine();
    const template = 'Hello {{name}}';
    const data = { name: 'World' };

    // Act
    const result = engine.render(template, data);

    // Assert
    expect(result).toBe('Hello World');
  });
});
```

---

## AI Assistant Guidelines

### When Making Changes

1. **Always read before modifying**: Never propose changes to code you haven't read
2. **Understand context**: Review related files to understand dependencies
3. **Maintain consistency**: Follow existing patterns and conventions
4. **Test your changes**: Verify changes work before committing
5. **Document when needed**: Add comments for complex logic

### Security Considerations

Be vigilant about:
- **Command injection**: Validate and sanitize all external input
- **Path traversal**: Validate file paths, use path.join() safely
- **Dependency vulnerabilities**: Use trusted packages, keep dependencies updated
- **Sensitive data**: Never commit secrets, API keys, or credentials
- **Input validation**: Always validate user input

### Code Review Checklist

Before submitting code, verify:
- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] No console.log() or debugging code left in
- [ ] Error handling is appropriate
- [ ] Documentation is updated if needed
- [ ] No security vulnerabilities introduced
- [ ] Dependencies are necessary and justified
- [ ] Code is readable and maintainable

### Common Tasks

#### Adding a New Feature
1. Create feature branch: `git checkout -b feature/my-feature`
2. Read related code to understand context
3. Implement feature following conventions
4. Add tests for new functionality
5. Update documentation
6. Commit with conventional commit message
7. Push and create PR

#### Fixing a Bug
1. Reproduce the bug
2. Write a failing test that captures the bug
3. Fix the bug
4. Verify test now passes
5. Check for similar issues elsewhere
6. Commit with fix message

#### Refactoring
1. Ensure tests exist for code being refactored
2. Make small, incremental changes
3. Run tests after each change
4. Verify functionality unchanged
5. Update documentation if interfaces change

---

## Project-Specific Information

### Core Concepts

**[To be filled in as project develops]**

This section should describe:
- What the generator does
- Key algorithms or approaches used
- Template syntax or DSL (if applicable)
- Plugin architecture (if applicable)

### Dependencies

**[To be filled in once package.json is created]**

Key dependencies and their purposes:
- **dependency-name**: Purpose and usage

### Configuration

**[To be filled in as configuration system is developed]**

How to configure the generator:
- Configuration file format
- Available options
- Environment variables

### API Reference

**[To be filled in as API stabilizes]**

Public API documentation:
- Entry points
- Method signatures
- Examples

---

## Common Pitfalls and Solutions

### Issue: [To be documented as issues arise]
**Problem**: Description of the issue
**Solution**: How to resolve it
**Prevention**: How to avoid it

---

## Resources

### Internal Documentation
- README.md - General project information
- docs/ - Detailed documentation (once created)

### External Resources
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Maintenance Notes

### Last Updated
- **Date**: 2025-12-11
- **Updated By**: Claude AI Assistant
- **Changes**: Initial CLAUDE.md creation

### Updating This Document
This document should be updated when:
- Project structure changes significantly
- New conventions are adopted
- New common pitfalls are discovered
- Major features are added or removed

**Keep this document concise and actionable. Move detailed technical documentation to docs/ folder.**

---

## Quick Reference

### Essential Commands
```bash
# Setup
npm install

# Development
npm run dev

# Testing
npm test

# Build
npm run build

# Lint
npm run lint
```

### File Locations
- Main entry: `src/index.js`
- Tests: `tests/`
- Config: Project root or `config/`
- Documentation: `docs/`

### Key Contacts
- Repository: https://github.com/joderle123/Eldib-Generator
- Issues: [GitHub Issues](https://github.com/joderle123/Eldib-Generator/issues)

---

**Remember**: This is a living document. Update it as the project evolves to keep it accurate and useful for all contributors, human and AI alike.
