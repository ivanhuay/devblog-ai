# Beta Devblog AI - UI (Beta)

Devblog AI is a beta proof of concept project designed to automatically generate dev blog posts from raw notes. This repository contains the user interface for the Devblog AI project.

## Features

- Convert raw notes into structured blog posts
- User-friendly interface for inputting notes and viewing generated content
- Customizable blog post templates
- Preview and edit generated blog posts before publishing
- Generate social media posts from blog content

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework for building the web application
- [v0.dev](https://v0.dev/) - Used for generating the initial UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ivanhuay/devblog-ai.git
   cd devblog-ai-api/devblog-ai-ui/
   cd devblog-ai-ui
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

1. Navigate to the main page
2. Click on "Create Note" to input your raw notes
3. Go to the Blog Post tab and click on "Generate"
4. Review and edit the generated blog post
5. When satisfied with the output, go to the Social Post tab and click on "Generate"
6. Edit the final result in the Social Post tab
7. The final edited version will be stored automatically

## Next Steps

Here are the planned improvements for the next phase of this beta project:

- [ ] Add test suite for key components and workflows
- [ ] Implement delete functionality for notes
- [ ] Optimize API requests to improve performance
- [ ] Refactor components and implement better state management
- [ ] Enhance error handling and user feedback

We welcome contributions to help implement these features!

## Contributing

We welcome contributions to Devblog AI!
## License

This project is licensed under the MIT License