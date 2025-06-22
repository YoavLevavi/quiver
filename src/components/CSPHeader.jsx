// Add a Content Security Policy (CSP) header
import { Helmet } from "react-helmet";

function CSPHeader() {
  return (
    <Helmet>
      <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self';"
      />
    </Helmet>
  );
}

export default CSPHeader;
