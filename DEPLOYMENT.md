# Deployment Guide - Cloudflare Pages

This guide will help you deploy your TTS & Translate website to Cloudflare Pages with serverless functions.

## Prerequisites

- A Cloudflare account (free tier works)
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Git installed on your computer

## Project Structure

```
peiyong.ai/
├── functions/           # Cloudflare Functions
│   ├── translate.js    # Translation endpoint
│   └── tts.js          # Text-to-speech endpoint
├── index.html          # Main HTML file
├── style.css           # Styles
├── script.js           # Client-side JavaScript
├── wrangler.toml       # Cloudflare configuration
├── .gitignore          # Git ignore file
└── .dev.vars.example   # Environment variables template
```

## Deployment Steps

### Option 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Initialize Git Repository** (if not already done)
   ```bash
   cd /Users/yangpeiyong/Documents/peiyong.ai
   git init
   git add .
   git commit -m "Initial commit: TTS & Translate app with OpenAI"
   ```

2. **Create GitHub Repository**
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (public or private)
   - Follow instructions to push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Cloudflare Pages**
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Go to **Pages** in the sidebar
   - Click **Create a project**
   - Click **Connect to Git**
   - Select your repository
   - Configure build settings:
     - **Framework preset**: None
     - **Build command**: (leave empty)
     - **Build output directory**: `/`
   - Click **Save and Deploy**

4. **Add Environment Variable**
   - In your Cloudflare Pages project, go to **Settings** > **Environment variables**
   - Click **Add variable**
   - Add:
     - **Variable name**: `OPENAI_API_KEY`
     - **Value**: Your OpenAI API key (starts with `sk-`)
     - **Environment**: Production (and Preview if needed)
   - Click **Save**

5. **Redeploy**
   - Go to **Deployments** tab
   - Click **Retry deployment** on the latest deployment
   - Your site will be live at: `https://YOUR_PROJECT.pages.dev`

### Option 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Create .dev.vars for local development**
   ```bash
   cp .dev.vars.example .dev.vars
   ```
   Edit `.dev.vars` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

4. **Test Locally**
   ```bash
   wrangler pages dev .
   ```
   Visit `http://localhost:8788` to test

5. **Deploy to Cloudflare**
   ```bash
   wrangler pages deploy .
   ```

6. **Set Production Environment Variable**
   ```bash
   wrangler pages secret put OPENAI_API_KEY
   ```
   Enter your OpenAI API key when prompted

## Local Development

1. **Create `.dev.vars` file**
   ```bash
   cp .dev.vars.example .dev.vars
   ```

2. **Add your OpenAI API key to `.dev.vars`**
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Install Wrangler (if not already installed)**
   ```bash
   npm install -g wrangler
   ```

4. **Run local development server**
   ```bash
   wrangler pages dev .
   ```

5. **Open browser**
   - Navigate to `http://localhost:8788`

## API Endpoints

The application uses two Cloudflare Functions:

### `/translate` (POST)
Translates text using OpenAI's GPT-4o-mini model.

**Request:**
```json
{
  "text": "Hello world",
  "sourceLang": "en",
  "targetLang": "es"
}
```

**Response:**
```json
{
  "translatedText": "Hola mundo"
}
```

### `/tts` (POST)
Generates speech audio using OpenAI's TTS model.

**Request:**
```json
{
  "text": "Hello world",
  "voice": "alloy",
  "speed": 1.0
}
```

**Response:**
- Audio file (MP3 format)

## Supported Languages

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt)
- Russian (ru)
- Japanese (ja)
- Korean (ko)
- Chinese Simplified (zh-CN)
- Arabic (ar)
- Hindi (hi)

## Available Voices

OpenAI TTS provides 6 high-quality voices:

1. **Alloy** - Neutral voice
2. **Echo** - Male voice
3. **Fable** - British male voice
4. **Onyx** - Deep male voice
5. **Nova** - Female voice
6. **Shimmer** - Soft female voice

## Cost Considerations

### OpenAI API Pricing (as of 2024)

- **GPT-4o-mini** (Translation): ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **TTS-1** (Text-to-Speech): $15.00 per 1M characters

### Example Costs:
- **1000 translations** (avg 50 words): ~$0.10
- **1000 TTS requests** (avg 50 characters): ~$0.75

### Cloudflare Pages:
- **Free tier**:
  - 500 builds/month
  - Unlimited requests
  - Unlimited bandwidth
  - 100,000 Function requests/day

## Troubleshooting

### Functions not working
- Make sure `OPENAI_API_KEY` is set in Cloudflare Pages settings
- Check the Functions logs in Cloudflare Dashboard

### Translation fails
- Verify your OpenAI API key is valid
- Check OpenAI API status: https://status.openai.com/
- Ensure you have credits in your OpenAI account

### TTS not playing
- Check browser console for errors
- Verify the audio response is received
- Try a different browser

### Local development issues
- Make sure `.dev.vars` file exists with your API key
- Run `wrangler pages dev .` from the project root
- Check that you're using the latest version of Wrangler

## Security Notes

- Never commit `.dev.vars` to Git (it's in `.gitignore`)
- Keep your OpenAI API key secret
- Set usage limits in your OpenAI account to prevent unexpected charges
- Consider implementing rate limiting for production use

## Custom Domain

To use a custom domain:

1. Go to your Cloudflare Pages project
2. Click **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to add your domain

## Updates

To update your deployed site:

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Cloudflare Pages will automatically rebuild and deploy

## Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions Documentation](https://developers.cloudflare.com/pages/platform/functions/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

## Support

- Cloudflare Community: https://community.cloudflare.com/
- OpenAI Community: https://community.openai.com/

## License

This project is free to use and modify.
