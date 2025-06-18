# Learn with Compassion LMS

A comprehensive Learning Management System designed for training and development in supportive living environments. This platform provides accessible, interactive courses for staff training with a focus on person-centered care and professional development.

## 🌟 Key Features

- **Interactive Course Content**: Engaging modules with videos, quizzes, and interactive scenarios
- **Responsive Design**: Fully responsive layout that works on all devices
- **Admin Dashboard**: Manage users, courses, and track progress
- **Certificate Generation**: Automatically generate certificates upon course completion
- **SCORM Support**: Integration with SCORM-compliant e-learning content
- **Role-Based Access**: Different access levels for admins, instructors, and learners
- **Progress Tracking**: Monitor individual and team progress through courses

## 🛠️ Technology Stack

- **Frontend**: 
  - React 18 with TypeScript
  - Vite for fast development and building
  - Tailwind CSS for styling
  - shadcn/ui components
  - React Router for navigation

- **Backend**:
  - Supabase for authentication and database
  - Node.js for server-side functionality

- **Deployment**:
  - Vercel for frontend hosting
  - Supabase for backend services

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Git
- Supabase account (for backend services)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/learn-with-compassion-lms.git
   cd learn-with-compassion-lms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📚 Course Development

To add a new course:

1. Create a new TypeScript file in `src/data/courses/`
2. Follow the existing course structure with modules, content, and quizzes
3. Import and add the course to `src/data/courseData.ts`

Example course structure:
```typescript
export const myNewCourse: Course = {
  id: 'unique-course-id',
  title: 'Course Title',
  description: 'Course description',
  category: 'Category Name',
  instructor: 'Instructor Name',
  thumbnail: '/path/to/thumbnail.png',
  duration: '1h 30min',
  modules: [
    {
      id: 'module-1',
      title: 'Module Title',
      description: 'Module description',
      content: 'Markdown content here...',
      questions: [
        {
          id: 'q1',
          question: 'Sample question?',
          options: ['Option 1', 'Option 2'],
          correctAnswer: 0,
          explanation: 'Explanation for the answer'
        }
      ]
    }
  ]
};
```

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Vercel Deployment

1. Push your code to a GitHub repository
2. Import the repository to Vercel
3. Set up environment variables in Vercel
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Supabase](https://supabase.com/) for the amazing backend services
- [Vite](https://vitejs.dev/) for the lightning-fast build tooling
