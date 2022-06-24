const { Router } = require('express');
const { exchangeCodeForToken, getGithubProfile } = require('../services/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.GITHUB_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res) => {
    const { code } = req.query;
    const githubToken = await exchangeCodeForToken(code);
    const githubProfile = await getGithubProfile(githubToken);
    console.log(githubProfile);

    res.json({ code });
  });

