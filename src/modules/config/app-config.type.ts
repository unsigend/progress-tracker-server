/**
 * App configuration interface
 */
export interface CONFIG_APP {
  // domain for the application
  DOMAIN: string;
  // port
  PORT: number;
  // environment
  NODE_ENV: string;
  // api version
  API_VERSION: string;

  // frontend url
  FRONTEND_URL: string;
}
