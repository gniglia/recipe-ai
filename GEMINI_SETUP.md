# 🤖 Google Gemini AI Setup Guide

## Why Gemini?

- ✅ **Completely FREE** (no credit card required)
- ✅ **Generous limits**: 15 requests/minute, 1,500 requests/day
- ✅ **Excellent for recipe generation**
- ✅ **No billing surprises**

## Step 1: Get Your Free API Key

1. **Visit Google AI Studio**: https://aistudio.google.com/app/apikey
2. **Sign in** with your Google account
3. **Click "Create API Key"**
4. **Copy your API key** (starts with `AIza...`)

## Step 2: Add to Your Environment

1. **Open** `.env.local` in your project root
2. **Add** the Gemini API key:
   ```bash
   # Google Gemini AI Configuration (FREE!)
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. **Paste your real API key** (replace `your_actual_api_key_here`)

## Step 3: Restart Your Dev Server

```bash
# Stop your current server (Ctrl+C)
# Then restart:
pnpm dev
```

## ✨ What You Get

- **Real AI-generated recipes** (not fallbacks!)
- **No quota issues** (1,500 requests/day is plenty)
- **Better recipe quality** (Gemini is excellent at structured content)
- **No billing worries** (completely free tier)

## Example API Key Format

```
GEMINI_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Need Help?

- **API Key Page**: https://aistudio.google.com/app/apikey
- **Gemini Docs**: https://ai.google.dev/docs
- **Free Tier Limits**: 15 RPM, 1,500 RPD (more than enough for development!)

## Ready to Test?

Once you add your API key and restart the server:

1. Type ingredients like "chicken, broccoli, rice"
2. Click "Generate Recipe with AI"
3. Get a real AI-generated recipe! 🍳✨
