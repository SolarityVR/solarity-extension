// tiny wrapper with default env vars
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3001,
  WEBSITE_SOLANA_WALLET_ADDRESS: "6BnAzdBGmUdgcRaTaFGBvMAiAgC2cELiU5q12hBYb8YN",
  SOLARITY_TOKEN_ADDRESS: "S8v4cS7dnKzV6LYvzFPuuiWQMM4KSz7URuGYWMGXyTG",
  SOLANA_RPC_ENDPOINT: "https://solana-api.projectserum.com",
  FRONTEND_URL: "https://solarity-stage.vercel.app",
  BACKEND_URL: "https://solarity-backend.herokuapp.com",
  LOCAL_BACKEND_URL: "http://localhost:3004",
  LOCAL_FRONTEND_URL: "http://localhost:3000",
  LOCAL_MINTING_URL: "http://localhost:3001",
  MINTING_URL: "",
  CLOUD_NAME: "dmzpebj2g",
  API_KEY: "977841792252298",
  API_SECRET: "eP9ISPA9RvnV7COrSF9a-xy8f1w",
  PRESET_NAME: "drilvtxg",
};
