# TTS & Translate Website

A modern web application that combines text translation and text-to-speech capabilities using OpenAI API, deployed on Cloudflare Pages.

## Features

### Translation (powered by OpenAI GPT-4o-mini)
- High-quality AI translation between 12 languages
- Context-aware translations
- Supports: English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese (Simplified), Arabic, and Hindi
- Fast and accurate results

### Text-to-Speech (powered by OpenAI TTS)
- Premium quality natural-sounding voices
- 6 different voice options (Alloy, Echo, Fable, Onyx, Nova, Shimmer)
- Adjustable voice settings:
  - Speed (0.25x - 4.0x)
  - Volume (0 - 1.0)
- Supports multiple languages automatically
- High-quality MP3 audio output

### User Interface
- Clean, modern design with gradient background
- Responsive layout (works on mobile, tablet, and desktop)
- Easy-to-use controls
- Visual feedback for all actions
- Copy translated text to clipboard
- Real-time audio playback

## Architecture

- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: Cloudflare Pages Functions (serverless)
- **APIs**: OpenAI GPT-4o-mini (translation) + OpenAI TTS-1 (speech)
- **Hosting**: Cloudflare Pages (free tier)

## Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd peiyong.ai
   ```

2. **Create environment file**
   ```bash
   cp .dev.vars.example .dev.vars
   ```

3. **Add your OpenAI API key to `.dev.vars`**
   ```
   OPENAI_API_KEY=sk-your-api-key-here
   ```

4. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

5. **Run development server**
   ```bash
   wrangler pages dev .
   ```

6. **Open browser**
   Navigate to `http://localhost:8788`

### Deploy to Cloudflare Pages

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick steps:**
1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Add `OPENAI_API_KEY` environment variable
4. Deploy!

Your site will be live at: `https://your-project.pages.dev`

## How to Use

1. **Enter text**: Type or paste text into the left text area

2. **Select languages**:
   - Choose source language from the "From" dropdown
   - Choose target language from the "To" dropdown

3. **Translate**: Click the "Translate" button (or press Ctrl+Enter)

4. **Listen**:
   - Click "Speak Original" to hear the source text
   - Click "Speak Translation" to hear the translated text

5. **Adjust voice**:
   - Select a voice from the dropdown
   - Use the sliders to adjust speed and volume

6. **Copy**: Click the "Copy" button to copy translated text to clipboard

## API Endpoints

### `POST /translate`
Translates text between languages.

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

### `POST /tts`
Generates speech audio from text.

**Request:**
```json
{
  "text": "Hello world",
  "voice": "alloy",
  "speed": 1.0
}
```

**Response:** Audio file (MP3)

## Project Structure

```
peiyong.ai/
├── functions/              # Cloudflare Functions (serverless API)
│   ├── translate.js       # Translation endpoint (OpenAI GPT-4o-mini)
│   └── tts.js             # Text-to-speech endpoint (OpenAI TTS)
├── index.html             # Main HTML structure
├── style.css              # Styles and responsive design
├── script.js              # Client-side JavaScript
├── wrangler.toml          # Cloudflare configuration
├── .gitignore             # Git ignore rules
├── .dev.vars.example      # Environment variables template
├── README.md              # This file
└── DEPLOYMENT.md          # Deployment guide
```

## Requirements

- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Cloudflare account (free tier works)
- Modern web browser

## Supported Languages

| Code | Language |
|------|----------|
| en | English |
| es | Spanish |
| fr | French |
| de | German |
| it | Italian |
| pt | Portuguese |
| ru | Russian |
| ja | Japanese |
| ko | Korean |
| zh-CN | Chinese (Simplified) |
| ar | Arabic |
| hi | Hindi |

## Available Voices

| Voice | Description |
|-------|-------------|
| Alloy | Neutral voice |
| Echo | Male voice |
| Fable | British male voice |
| Onyx | Deep male voice |
| Nova | Female voice |
| Shimmer | Soft female voice |

## Cost Estimation

### OpenAI API Costs (approximate):
- **Translation**: ~$0.0001 per translation (50 words)
- **TTS**: ~$0.0008 per speech (50 characters)
- **Monthly estimate** (1000 uses): ~$0.90

### Cloudflare Pages:
- **Free tier**: Unlimited requests, unlimited bandwidth
- **Function requests**: 100,000/day (free)

## Browser Compatibility

| Browser | Translation | TTS | Notes |
|---------|-------------|-----|-------|
| Chrome | ✓ | ✓ | Recommended |
| Edge | ✓ | ✓ | Recommended |
| Safari | ✓ | ✓ | Works well |
| Firefox | ✓ | ✓ | Fully supported |

## Security

- Environment variables are stored securely in Cloudflare
- API key never exposed to client
- CORS enabled for secure cross-origin requests
- All requests over HTTPS

## Limitations

- OpenAI API rate limits apply
- Requires internet connection
- Maximum text length: ~4000 characters (OpenAI limit)
- Audio files are generated on-demand (not cached)

## Future Enhancements

Possible improvements:
- [ ] Translation history
- [ ] Save favorite translations
- [ ] Export translations to file
- [ ] More languages
- [ ] Pronunciation guide
- [ ] Dark mode
- [ ] Voice cloning
- [ ] Batch translation
- [ ] API rate limiting
- [ ] User authentication

## Troubleshooting

See [DEPLOYMENT.md](DEPLOYMENT.md#troubleshooting) for common issues and solutions.

## Contributing

Feel free to fork, modify, and submit pull requests!

## Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Deployment Guide](DEPLOYMENT.md)

## License

Free to use and modify.

## Author

Built with Claude Code and deployed on Cloudflare Pages.
