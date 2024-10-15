# Devblog AI - API (Beta)

This is the API component of the Devblog AI project, a Node.js REST API designed to store data from the UI and integrate with OpenAI to generate the expected output.

## Technologies Used

- [Hiroki](https://ivanhuay.github.io/hiroki/) - API framework
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling
- [Express](https://expressjs.com/) - Web application framework
- [OpenAI API](https://openai.com/blog/openai-api) - For AI-powered content generation

## Features

- Store and manage data from the Devblog AI UI
- Integrate with OpenAI for blog post and social media content generation
- RESTful API endpoints for CRUD operations

## Prerequisites

- Node.js (v14 or later recommended)
- MongoDB instance
- OpenAI API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ivanhuay/devblog-ai.git
   cd devblog-ai-api/devblog-ai-api/
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.template` file to `.env`
   - Replace the variables in `.env` with your actual values

## Usage

To start the server:

```
npm run dev
```

The API will be available at `http://localhost:YOUR_PORT` (replace YOUR_PORT with the port specified in your .env file).

## API Documentation

(Add brief documentation about your main API endpoints here)

## Next Steps

- [ ] Add comprehensive test suite
- [ ] Implement logging system for tracking API usage
- [ ] Standardize error output for better debugging
- [ ] Enhance security measures
- [ ] Optimize database queries for better performance
- [ ] Add anthropic API integration option using env variables.

## Contributing

We welcome contributions to the Devblog AI API! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE).

## Support

For support, please open an issue in the GitHub repository or contact the maintainers directly.