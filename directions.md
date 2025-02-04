Below is an in‐depth, atomic‐level plan to build your Windows 95–inspired portfolio using CDN-loaded React, Bootstrap for fluid mobile layouts, and Next.js for rendering. This plan covers project setup, UI/component breakdown, styling, routing, local development, testing, and continuous deployment via GitHub Actions for GitHub Pages.

---

## 1. Project Setup

### 1.1. Initialize a Next.js Project

- **Create a new Next.js app using `create-next-app`:**
  - Open your terminal and run:
    ```sh
    npx create-next-app windows-95-portfolio
    ```
- **Folder Structure:**
  - Organize your project folders as follows:
    ```
    windows-95-portfolio/
      ├── .github/
      │    └── workflows/
      │         └── deploy.yml         # GitHub Actions workflow file
      ├── components/                # Reusable components like Desktop, Icon, Window, etc.
      ├── pages/                     # Next.js pages (index.js, portfolio pages, etc.)
      ├── public/                    # Static assets: images (desktop background, icons, etc.)
      ├── styles/                    # Global CSS and Windows 95–specific CSS files
      ├── next.config.js             # Next.js config (for static export)
      └── package.json
    ```
- **Version Control:**
  - Initialize Git, create a new repository in VSCode, and push to GitHub.

### 1.2. Configure Next.js for Static Export

- **GitHub Pages requires static files.**  
  In your `next.config.js`, add:
  ```js
  // next.config.js
  module.exports = {
    // If using a base path (e.g., for username.github.io/repo)
    assetPrefix: process.env.NODE_ENV === 'production' ? '/windows-95-portfolio/' : '',
    // Export as static HTML files
    exportTrailingSlash: true,
  }
  ```
- **Update `package.json`:**  
  Add an export script:
  ```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "export": "next build && next export",
    "start": "next start"
  }
  ```

---

## 2. Integrate CDN Versions and Global Resources

Even though Next.js bundles React internally, you can include Bootstrap (and any extra theme resources) via CDN in the `<head>`.

### 2.1. Customize the Document

- Create or modify `/pages/_document.js` to include external CDN tags:
  
```jsx:pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Bootstrap CDN */}
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
            integrity="sha384-MaiMa/c6yfDlj82AOnXU+0mzMeB5B8+bV5L5jqowTbGh2BtRZ8RGs8GAcJbXJf+4"
            crossOrigin="anonymous"
          />
          {/* Optional: Windows 95 theme CSS or your custom CSS */}
          <link rel="stylesheet" href="/styles/windows95.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Optional: Bootstrap JS + dependencies via CDN */}
          <script
            src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXd6DgEok+f81+72GQoRz5MpVazAZePL93Y92GuBOn6S3VObTfn5FqlQ7gCm6C5"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-LtrjvnR4/Jqs0j6MkXYi4nDbGY54Q2EJgquB1pTrsYx6Dd9n5cuQ8J1srSp2QjWn"
            crossOrigin="anonymous"
          ></script>
        </body>
      </Html>
    );
  }
}
```
*This file ensures external style and script resources (Bootstrap, custom Windows 95 CSS) are loaded on every page.*

---

## 3. Build the Windows 95 Desktop UI

The homepage will mimic a Windows 95 desktop. The screen consists of a background image and clickable “file icons” (simulating `.exe` or `.html` files) that link to different portfolio parts.

### 3.1. Global Styling

- In `/styles/globals.css`, include base styles (and import Bootstrap overrides if needed).
- Create `/styles/windows95.css` where you define the Windows 95 look:
  - Use pixel fonts, beveled borders, and a color palette reminiscent of Windows 95.
  - Example CSS snippet:
    ```css
    /* /styles/windows95.css */
    body {
      background-color: #008080; /* or use a background image */
      font-family: 'MS Sans Serif', sans-serif;
    }
    .desktop-icon {
      width: 64px;
      text-align: center;
      margin: 10px;
      cursor: pointer;
    }
    .desktop-icon img {
      border: 2px outset #fff;
    }
    .window-header {
      background: #000080;
      color: #fff;
      padding: 5px 10px;
      font-size: 14px;
    }
    ```
- In `_app.js`, include the global styles:
  
```jsx:pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

### 3.2. Create Desktop Components

#### 3.2.1. Desktop Layout Component

- Create a component `/components/Desktop.js` that renders the desktop background and icon grid:
  
```jsx:components/Desktop.js
import React from 'react';
import DesktopIcon from './DesktopIcon';

export default function Desktop() {
  // Define your icons—each representing a portfolio section.
  const icons = [
    { id: 'about', label: 'About Me.exe', type: 'exe', icon: '/images/about-icon.png' },
    { id: 'projects', label: 'Projects.html', type: 'html', icon: '/images/projects-icon.png' },
    { id: 'contact', label: 'Contact.exe', type: 'exe', icon: '/images/contact-icon.png' },
    // Add more icons as needed.
  ];

  return (
    <div className="desktop-container" style={{ position: 'relative', height: '100vh', padding: '20px' }}>
      {icons.map((icon) => (
        <DesktopIcon key={icon.id} iconData={icon} />
      ))}
    </div>
  );
}
```

#### 3.2.2. Desktop Icon Component

- Create `/components/DesktopIcon.js` to render each clickable file icon:
  
```jsx:components/DesktopIcon.js
import React from 'react';
import Link from 'next/link';

export default function DesktopIcon({ iconData }) {
  const { id, label, icon } = iconData;

  return (
    <div className="desktop-icon">
      <Link href={`/${id}`}>
        <a>
          <img src={icon} alt={label} />
          <div>{label}</div>
        </a>
      </Link>
    </div>
  );
}
```

#### 3.2.3. Home Page (Desktop)

- In your `/pages/index.js`, render the Desktop component:

```jsx:pages/index.js
import React from 'react';
import Desktop from '../components/Desktop';

export default function Home() {
  return (
    <div>
      <Desktop />
    </div>
  );
}
```

---

## 4. Create Portfolio “Programs” & Simulated Windows

Each “file” on your desktop triggers a different UI. You might have a standard “window” chrome (for an application) or an “Internet Explorer”–like browser window.

### 4.1. Create a Reusable Window Component

- This component will simulate a program window with a title bar, close/minimize buttons, etc.

```jsx:components/Window.js
import React from 'react';

export default function Window({ title, children }) {
  return (
    <div className="program-window" style={{ border: '2px outset #fff', width: '80%', margin: '20px auto' }}>
      <div className="window-header">
        {title}
        {/* Add icons for minimize/maximize/close with onClick handlers */}
      </div>
      <div className="window-content" style={{ padding: '15px' }}>
        {children}
      </div>
    </div>
  );
}
```

### 4.2. Create a Simulated Internet Explorer Component (Optional)

- If you want a fake IE browser frame for `.html` files, create `/components/IEBrowser.js`:

```jsx:components/IEBrowser.js
import React from 'react';

export default function IEBrowser({ url, children }) {
  return (
    <div className="ie-browser" style={{ border: '2px outset #c0c0c0', width: '90%', margin: '20px auto' }}>
      <div className="browser-header" style={{ background: '#000080', color: '#fff', padding: '5px 10px' }}>
        Internet Explorer - {url}
      </div>
      <div className="browser-content" style={{ padding: '15px' }}>
        {children}
      </div>
    </div>
  );
}
```

### 4.3. Create Individual Portfolio Pages

- **Example:** Create an About page that appears as if it were a program window.
  
```jsx:pages/about.js
import React from 'react';
import Window from '../components/Window';

export default function About() {
  return (
    <Window title="About Me.exe">
      <p>Hello! I am [Your Name]. Welcome to my Windows 95–styled portfolio.</p>
      {/* Insert more content here */}
    </Window>
  );
}
```

- **Other pages:**  
  Similarly, create `/pages/projects.js`, `/pages/contact.js`, etc.  
  For a page that should mimic an HTML file opened in IE, wrap your content in the `IEBrowser` component.

---

## 5. Mobile Responsiveness with Bootstrap

- **Utilize Bootstrap’s grid and container classes:**
  - Wrap your content inside a `<div className="container-fluid">` where needed.
  - Use Bootstrap’s responsive classes in your components to ensure fluid layouts on mobile devices (for example, using row/column classes in the Desktop component if you choose a grid layout).

Example using Bootstrap:
```jsx
// Inside any component (example: in Desktop.js)
<div className="container-fluid">
  <div className="row">
    {icons.map((icon) => (
      <div key={icon.id} className="col-4 col-md-2">
        <DesktopIcon iconData={icon} />
      </div>
    ))}
  </div>
</div>
```

---

## 6. Local Development & Testing

- **VSCode:** Do your development inside Visual Studio Code.
- **Dev Server:** Run:
  ```sh
  npm run dev
  ```
  Test your application on different screen sizes (use Chrome DevTools emulation) and on your actual mobile device.
- **Jest (Optional):**
  - Although your “Windows 95” theme is a playful presentation, you can write unit tests using Jest (and React Testing Library) for your components.
  - Create test files for components (e.g., `/__tests__/DesktopIcon.test.js`) and configure Jest accordingly.

---

## 7. GitHub Actions for Continuous Deployment to GitHub Pages

### 7.1. Setup the Workflow File

- **Create the workflow file:**  
  Create `.github/workflows/deploy.yml` with content similar to:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main  # or your default branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'  # or LTS version

      - name: Install Dependencies
        run: npm install

      - name: Build and Export Next.js App
        run: npm run export

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages   # The branch the action should deploy to.
          folder: out        # Next.js exports to `out` by default.
```

### 7.2. Configure GitHub Pages

- In your GitHub repository settings, set GitHub Pages to serve from the `gh-pages` branch.

---

## 8. Final Touches & Documentation

### 8.1. Polish the UI

- Double-check the Windows 95 design elements:
  - Ensure icons, windows, and browser frames follow the retro theme.
  - Test the drag/drop (if you plan to simulate desktop icon movement) and window controls.
- Verify navigation and responsiveness on both desktop and mobile devices.

### 8.2. Update README

- Write a detailed `README.md` that includes:
  - Project overview and concept (Windows 95 desktop portfolio).
  - Setup & installation instructions.
  - How to run locally.
  - Deployment instructions and GitHub Actions configuration.
  - Technologies and resources used (React via CDN, Next.js, Bootstrap, etc.).

---

## Summary

1. **Project Setup:** Initialize a Next.js project with proper folder structure and configure for static export.
2. **External Resources:** Integrate Bootstrap and any additional libraries via CDN in a custom `_document.js`.
3. **UI Components:** Build a Desktop component that renders Windows 95–styled icons; create reusable components (DesktopIcon, Window, IEBrowser) to simulate file and program behaviors.
4. **Routing & Pages:** Use Next.js’s routing (with Link) to navigate between portfolio “applications.”
5. **Responsive Design:** Use Bootstrap’s fluid containers and grid system for mobile responsiveness.
6. **Local Development & Testing:** Develop in VSCode, run the Next.js dev server, and (optionally) write Jest tests.
7. **CI/CD:** Configure a GitHub Actions workflow to build and deploy the static export to GitHub Pages.
8. **Documentation:** Finalize with a comprehensive README and double-check UI consistency.

By following this step-by-step, atomic plan, you’ll build a fully functioning, retro-themed portfolio that runs on modern tech but channels the nostalgia of a classic Windows 95 desktop—all while making it accessible on mobile devices and automatically deployed via GitHub Actions. Enjoy coding your playful portfolio!
