---
name: generate-blog-image
description: Generate brand-consistent blog images using Google Imagen 2 API. Creates cover images and infographics in optimized WebP format for the wa-website blog.
---

# Generate Blog Image

Generate brand-consistent images for blog articles using Google Imagen 2 API, automatically converting to optimized WebP format.

## Prerequisites

Before using this skill, ensure:
1. `GOOGLE_CLOUD_API_KEY` environment variable is set with Imagen API access
2. `cwebp` is installed (`brew install webp`)

## Workflow

Follow these steps in order:

### Step 1: Gather Requirements

Ask the user these questions using AskUserQuestion:

1. **Image type**: "What type of image do you need?"
   - Cover image (main article hero)
   - Infographic (in-article visual)

2. **Blog slug**: "What is the blog post slug?" (e.g., `automatisierung-selbst-bauen-vs-agentur`)

3. **Aspect ratio**: "What aspect ratio do you need?"
   - 16:9 (landscape) - 1408×792px - recommended for covers
   - 3:2 (standard) - 1200×800px - good for infographics
   - 1:1 (square) - 1024×1024px - social media
   - 4:3 (classic) - 1200×900px - traditional infographics
   - 9:16 (portrait) - 792×1408px - mobile/stories
   - Custom - ask for specific dimensions

4. **Description**: "Describe what the image should show" (open text)

### Step 2: Enhance the Prompt

Take the user's description and enhance it by appending the brand style guidelines:

```
[User's description]

Style requirements:
- Professional business illustration style
- Color palette: deep navy blue (#003970), warm orange accents (#D86B00), warm white background (#FAF9F7)
- Clean, modern, minimalist aesthetic
- Suitable for a German business automation consultancy
- No text or words in the image
- High quality, suitable for web publication
- Photorealistic or high-quality digital illustration
```

### Step 3: Generate the Image

Use Bash to call the Google Imagen API:

```bash
# Set dimensions based on aspect ratio
# 16:9: 1408x792, 3:2: 1200x800, 1:1: 1024x1024, 4:3: 1200x900, 9:16: 792x1408

curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:generateImages" \
  -H "x-goog-api-key: $GOOGLE_CLOUD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "ENHANCED_PROMPT_HERE",
    "config": {
      "numberOfImages": 1,
      "aspectRatio": "ASPECT_RATIO_HERE"
    }
  }' | jq -r '.generatedImages[0].image.imageBytes' | base64 -d > /tmp/generated-image.png
```

**Aspect ratio values for API:**
- 16:9 → `"16:9"`
- 3:2 → `"3:2"`
- 1:1 → `"1:1"`
- 4:3 → `"4:3"`
- 9:16 → `"9:16"`

### Step 4: Convert to WebP

```bash
cwebp -q 85 /tmp/generated-image.png -o /tmp/generated-image.webp
```

### Step 5: Move to Target Location

Determine the filename:
- Cover images: `cover.webp`
- Infographics: Check existing files and use `infographic-01.webp`, `infographic-02.webp`, etc.

```bash
# Create directory if needed
mkdir -p "/Users/cweissteiner/WA Apps/wa-website/public/blog/SLUG_HERE"

# Move the file
mv /tmp/generated-image.webp "/Users/cweissteiner/WA Apps/wa-website/public/blog/SLUG_HERE/FILENAME.webp"
```

### Step 6: Report Success

Tell the user:
- ✅ Image generated successfully
- File size and location
- How to reference in frontmatter:
  ```yaml
  coverImage: "/blog/SLUG_HERE/cover.webp"
  ogImage:
    url: "/blog/SLUG_HERE/cover.webp"
  ```

## Error Handling

- **API key not set**: Instruct user to set `GOOGLE_CLOUD_API_KEY`
- **API error**: Show the error message from the API response
- **cwebp not found**: Instruct user to run `brew install webp`
- **Invalid slug**: Ask for a valid kebab-case slug

## Example Session

```
User: /generate-blog-image

Claude: What type of image do you need?
- Cover image
- Infographic

User: Cover image

Claude: What is the blog post slug?

User: ki-fuer-kmu-einstieg

Claude: What aspect ratio?
- 16:9 (landscape) - recommended for covers
- 3:2 (standard)
- 1:1 (square)
- 4:3 (classic)
- 9:16 (portrait)
- Custom

User: 16:9

Claude: Describe what the image should show:

User: A small business owner looking at a laptop showing workflow automation,
warm and approachable feeling, office setting

Claude: Generating image...
[Runs API call]
[Converts to WebP]

✅ Image generated successfully!
- File: /public/blog/ki-fuer-kmu-einstieg/cover.webp
- Size: 72 KB
- Dimensions: 1408×792px

Add to your post frontmatter:
coverImage: "/blog/ki-fuer-kmu-einstieg/cover.webp"
```
