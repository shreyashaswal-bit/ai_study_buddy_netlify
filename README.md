# AI Study Buddy — Netlify version

This is a Netlify-ready version of AI Study Buddy. The frontend is in `public/` and the AI endpoint is a Netlify Function in `netlify/functions/ai.mjs`.

## Deploy (no terminal required)
1. Create a GitHub account if you don't already have one.
2. Create a new repository, e.g. `ai-study-buddy-netlify`.
3. Upload the contents of this folder to the repository (upload the files and folders inside this folder, not the ZIP itself).
4. In Netlify, choose **Add new project / Import an existing project**, connect GitHub, and select the repository.
5. Build settings should use publish directory `public`; functions directory is configured in `netlify.toml` as `netlify/functions`. No build command is needed.
6. In Netlify site settings, add an environment variable named `OPENAI_API_KEY` with your own API key. Keep it secret; never put it in `public/index.html` or a public repository.
7. Redeploy the site after setting the environment variable.

AI responses require a valid API key and may incur API usage costs. The task planner saves tasks only in the visitor's browser via localStorage.
