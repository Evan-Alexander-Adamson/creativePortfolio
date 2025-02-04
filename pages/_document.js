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
          {/* Windows 95 custom CSS */}
          <link rel="stylesheet" href="/styles/windows95.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Bootstrap JS and dependencies */}
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