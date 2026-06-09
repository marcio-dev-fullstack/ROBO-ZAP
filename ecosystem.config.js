module.exports = {
  apps: [
    {
      name: "robo-zap-bot",
      script: "bot.js",
      cwd: __dirname,
      interpreter: "node",
      watch: false
    },
    {
      name: "robo-zap-api",
      script: "uvicorn",
      cwd: __dirname,
      interpreter: "python",
      interpreterArgs: "-m",
      args: "main:app --host 127.0.0.1 --port 8000 --reload",
      watch: false
    }
  ]
};
