# 🧙‍♂️ Resume Genie - AI-Powered Resume Generator

**Resume Genie** is an innovative full-stack web application designed to help users create professional resumes with ease using the power of AI. With seamless customization, real-time preview, and secure authentication, Resume Genie simplifies the process of building resumes that stand out. Users can generate resumes, customize them to fit their specific needs, save their work, and even share their resumes via a unique link for potential employers to view.

## 🚀 Overview
Resume Genie leverages AI to automatically create optimized resumes for users, while providing full control over customization. The application integrates user authentication for secure access and ensures a responsive design across all device types. It provides an intuitive interface where users can easily fill out their resume sections such as education, experience, skills, and personal information, all while viewing a live preview of the final document.

## <a name="features">✨ Features</a>

- **AI-Powered Resume Generation**: Resume Genie is powered by **Gemini API**, an AI engine that generates professional resumes based on user inputs, ensuring that resumes are well-structured, ATS-friendly, and tailored to industry standards.
  
- **User Authentication**: Secure and seamless login and registration system powered by **Clerk**, providing account management with robust security. Users can create accounts, securely log in, and access their personalized resumes anytime.
  
- **Real-Time Preview**: As users fill in details in the form sections, a live preview updates in real-time, offering instant feedback on how the resume looks, helping users create resumes with minimal effort.

- **Easy Customization**: Users can personalize every section of their resumes, including work experience, education, skills, projects, certifications, and more. This ensures that users have full control over the content and layout of their resumes.

- **Save and Share**: Users can save their generated resumes to the database, making it easy to retrieve or edit them later. Additionally, Resume Genie generates a shareable link for each resume, allowing users to send their resume directly to employers or share it on professional networks like LinkedIn.

- **Responsiveness**: The application is fully responsive, ensuring an optimal user experience across all devices, whether on desktop, tablet, or mobile.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Frontend**: The application is built using **Next.js 14**, providing a fast and highly optimized user interface. Next.js ensures both static site generation (SSG) and server-side rendering (SSR) for superior performance and SEO optimization.
  
- **Authentication**: Integrated with **Clerk** for user authentication, providing secure login, registration, and user management. Clerk handles multi-factor authentication (MFA) and password management seamlessly.

- **AI Integration**: **Gemini API** is the core engine responsible for resume generation. It uses natural language processing (NLP) to understand the user's input and build a professional resume accordingly, ensuring industry-standard formatting and structure.

- **Styling**: **TailwindCSS** is used for responsive, utility-first styling, making it easy to maintain a clean, minimal, and mobile-first user interface.

- **Backend**: The backend is powered by **Node.js**, handling user data, resume generation requests, and integrating with AI and database services efficiently.

- **Database**: **MongoDB** serves as the database, storing user profiles, resumes, and other necessary data. Its document-based schema fits perfectly for managing diverse user data.

## 🖥️ User Flow
1. **Registration/Login**: Users first register or log in via Clerk’s secure authentication system.
2. **Resume Input**: After authentication, users enter details like work experience, education, and skills.
3. **AI Resume Generation**: Once the information is submitted, Gemini API generates a professional resume.
4. **Customization**: Users can edit or customize the resume sections to better suit their needs.
5. **Real-Time Preview**: As users modify their details, a real-time preview of the resume is displayed.
6. **Save/Share**: The finished resume can be saved to the user's account and shared via a public link.

## 🛠️ Future Enhancements

- **Template Customization**: Users can choose from multiple resume templates with different designs and formatting.
- **LinkedIn Integration**: A feature to import professional experience and education directly from LinkedIn profiles.
- **Export as PDF**: Users will be able to download their resumes in PDF format with a single click.
- **Cover Letter Generation**: AI-powered cover letter generation based on the resume and job description.


## <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/WonderSTK/Resume-Geniw.git
cd Resume-Genie
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

MONGODB_URL=

GEMINI_API_KEY=

BASE_URL=localhost:3000
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up for the corresponding websites on [Clerk](https://clerk.com/), [MongoDB](https://mongodb.com/) and [Google AI Studio](https://aistudio.google.com/app/apikey). 

### Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

- Fork the repository.
- Create your feature branch (`git checkout -b feature/AmazingFeature`).
- Commit your changes (`git commit -m 'Add some AmazingFeature'`).
- Push to the branch (`git push origin feature/AmazingFeature`).
- Open a pull request.

## 📬 Contact

Wanna reach out to me? DM me at 👇

Email: mehulparmar9694@gmail.com