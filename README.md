<<<<<<< HEAD
# GitHub Candidate Search

A React application that helps recruiters find and manage potential GitHub candidates.

## Features

- 🔍 Search GitHub users with advanced filters
- 💾 Save interesting candidates for later review
- 📊 View detailed candidate information including:
  - Profile details
  - Repository count
  - Follower statistics
  - Company information
  - Location data
- 🔄 Rate limit handling with reset time display
- 💾 Local storage persistence
- 📱 Responsive design

## Live Demo

[View Live Application](https://candidate-search.onrender.com)

## Screenshots

![Search Interface](Assets/Screenshot-Candidate-Details.png)
![Candidate Details](Assets/Screenshot-Candidate-Details.png)
![Saved Candidates](Assets/Screenshot-Saved-Candidate.png)

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- GitHub API
- React Router
- Axios
- Local Storage

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Mchance176/candidate-search.git
cd candidate-search
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
VITE_GITHUB_TOKEN=
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Environment Variables

- `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token

## Deployment

This project is deployed on Render. To deploy your own version:

1. Fork this repository
2. Create a new Static Site on Render
3. Connect your GitHub repository
4. Add your environment variables
5. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Matthew Chance - [GitHub](https://github.com/Mchance176)

Project Link: [https://github.com/Mchance176/candidate-search](https://github.com/Mchance176/candidate-search)
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

* [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md), which uses [Babel](https://babeljs.io/) for Fast Refresh
* [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc), which uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you're developing a production application, we recommend updating the configuration to enable type-aware lint rules:

* Configure the top-level `parserOptions` property as follows:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: ,
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

* Replace `plugin:@typescript-eslint/recommended` with `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`.
* Optionally, add `plugin:@typescript-eslint/stylistic-type-checked`.
* Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` and `plugin:react/jsx-runtime` to the `extends` list.

---
© 2024 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
>>>>>>> 146c6ba (added files to correct bug-search candidate)
