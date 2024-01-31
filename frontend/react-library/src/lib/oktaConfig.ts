export const oktaConfig = {
    clientId: '0oaetj21r1akHq2Lz5d7',
    issuer: 'https://dev-81584214.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}
