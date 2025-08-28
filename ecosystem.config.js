module.exports = {
  apps: [
    {
      name: 'griff-finance-be',
      script: 'dist/main.js', // Path to the built main file
      instances: '1', // Number of instances (auto-detects based on CPU cores)
      exec_mode: 'fork', // Run in cluster mode
      watch: false, // Set to true if you want `pm2` to watch for file changes
      env: {
        NODE_ENV: 'dev', // Define environment variables
        NODE_TLS_REJECT_UNAUTHORIZED: 0,
      },
    },
  ],
}
