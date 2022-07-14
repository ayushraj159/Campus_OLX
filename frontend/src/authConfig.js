export const msalConfig = {
    auth: {
      clientId: "79d786e8-44a0-4077-b164-1d284006f703",
      clientSecret: 'a37bdbe3-66be-4e26-a1a7-62dacfb0ef33',
      authority: "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/",
      oAuth2: "https://login.microsoftonline.com/850aa78d-94e1-4bc6-9cf3-8c11b530701c/oauth2/v2.0/token",
  };