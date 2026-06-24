module.exports = {
  apps: [
    {
      name: "robo-zap-bot",
      script: "bot.js",
      interpreter: "node",
      watch: false,
      max_memory_restart: "300M",
    },
    {
      name: "robo-zap-api",
      script: "uvicorn",
      interpreter: "python",
      interpreterArgs: "-m",
      args: `main:app --host 0.0.0.0 --port ${process.env.PORT || 8000}`,
      watch: false,
      max_memory_restart: "200M",
    },
  ],
};
