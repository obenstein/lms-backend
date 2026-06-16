module.exports = {
  apps: [
    {
      name: "lms-backend",
      script: "app.js",
      cwd: "/home/ec2-user/lms-backend",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
