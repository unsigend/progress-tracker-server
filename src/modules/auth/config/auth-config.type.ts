/**
 * Auth configuration interface
 */
export interface CONFIG_AUTH {
  // jwt secret
  JWT_SECRET: string;
  // jwt expiration time
  JWT_EXPIRATION_TIME: string;

  // google client id
  GOOGLE_CLIENT_ID: string;
  // google client secret
  GOOGLE_CLIENT_SECRET: string;
  // google redirect url
  GOOGLE_FRONTEND_REDIRECT_URL: string;
}
