# Design: `/generate-blog-image` Skill

**Date:** 2026-03-05
**Status:** Approved
**Author:** Christoph Weissteiner + Claude

## Overview

A standalone Claude Code skill that generates brand-consistent images for blog articles using Google Imagen 2 API, automatically converts them to WebP format, and saves them to the correct location following the project's existing patterns.

## Problem Statement

Creating blog articles requires cover images and infographics that match the website's visual brand. Currently, this requires manual image creation or sourcing, which is time-consuming and may result in inconsistent styling.

## Solution

A Claude Code skill (`/generate-blog-image`) that:
1. Accepts a description of the desired image
2. Auto-injects brand style guidelines into the prompt
3. Calls Google Imagen 2 API to generate the image
4. Converts the result to optimized WebP format
5. Saves to the correct project location

## User Workflow

```
User invokes: /generate-blog-image

Skill prompts:
1. Image type? (cover / infographic)
2. Blog post slug? (e.g., "5-prozesse-automatisieren")
3. Aspect ratio? (16:9 / 3:2 / 1:1 / 4:3 / 9:16 / custom)
4. Describe what the image should show

Claude:
- Enhances prompt with brand style guidelines
- Calls Imagen 2 API
- Converts PNG → WebP (quality 85)
- Saves to /public/blog/[slug]/[filename].webp
- Reports success with file path
```

## Brand Style Guidelines (Auto-Injected)

The skill automatically appends these guidelines to all prompts:

```
Professional business illustration style.
Color palette: deep navy blue (#003970), warm orange accents (#D86B00),
warm white background (#FAF9F7).
Clean, modern, minimalist aesthetic.
Suitable for a German business automation consultancy.
No text in the image.
High quality, suitable for web publication.
```

## Image Specifications

### Aspect Ratio Presets

| Preset | Dimensions | Use Case |
|--------|------------|----------|
| 16:9 (landscape) | 1408×792px | Cover images, wide banners |
| 3:2 (standard) | 1200×800px | Infographics, feature images |
| 1:1 (square) | 1024×1024px | Social media, thumbnails |
| 4:3 (classic) | 1200×900px | Traditional infographics |
| 9:16 (portrait) | 792×1408px | Mobile-first, stories |
| Custom | User-defined | Specific requirements |

### Output Format

- **Format:** WebP
- **Quality:** 85% (optimal balance of quality and file size)
- **Expected file size:** 50-100KB for covers

### File Naming Convention

- Cover images: `cover.webp`
- Infographics: `infographic-01.webp`, `infographic-02.webp`, etc.
- Other: descriptive kebab-case name

### Output Location

```
/public/blog/[slug]/[filename].webp
```

Matches existing pattern in project:
- `/public/blog/5-prozesse-die-jedes-kmu-automatisieren-sollte/cover.webp`
- `/public/blog/was-kostet-prozessautomatisierung-mittelstand/cover.webp`

## Technical Implementation

### Approach: Pure Skill with Bash Commands

The skill will use:
- `curl` to call Google Imagen 2 API
- `cwebp` CLI tool for PNG → WebP conversion
- Bash commands for file operations

No code changes to the project required.

### Prerequisites

1. **Google Cloud API Key**
   - Environment variable: `GOOGLE_CLOUD_API_KEY`
   - Required permissions: Imagen API access

2. **WebP Tools**
   - Install: `brew install webp`
   - Provides `cwebp` CLI for conversion

### API Call Flow

```bash
# 1. Generate image via Imagen 2 API
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict" \
  -H "Authorization: Bearer $GOOGLE_CLOUD_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "instances": [{"prompt": "...enhanced prompt..."}],
    "parameters": {
      "sampleCount": 1,
      "aspectRatio": "16:9"
    }
  }'

# 2. Extract base64 image from response
# 3. Decode to PNG: base64 -d > /tmp/generated.png
# 4. Convert to WebP: cwebp -q 85 /tmp/generated.png -o output.webp
# 5. Move to target location
```

### Error Handling

- API rate limits: Inform user, suggest retry
- Invalid slug: Prompt for valid slug
- Missing directory: Create automatically
- Conversion failure: Keep PNG, report error

## Skill File Structure

```
~/.claude/commands/generate-blog-image.md
```

The skill file will contain:
- Trigger description for Claude Code
- Step-by-step workflow instructions
- Brand style guidelines
- Bash command templates
- Error handling guidance

## Example Session

```
User: /generate-blog-image

Claude: What type of image do you need?
- Cover image
- Infographic

User: Cover image

Claude: What's the blog post slug?

User: automatisierung-selbst-bauen-vs-agentur

Claude: What aspect ratio?
- 16:9 (landscape) - recommended for covers
- 3:2 (standard)
- 1:1 (square)
- 4:3 (classic)
- 9:16 (portrait)
- Custom

User: 16:9

Claude: Describe what the image should show:

User: A business owner at a crossroads, one path leading to a
DIY workshop with tools, another to a modern office building
representing agencies, metaphor for the build vs buy decision

Claude: Generating image with brand styling...
✓ Image generated via Imagen 2 API
✓ Converted to WebP (78KB)
✓ Saved to /public/blog/automatisierung-selbst-bauen-vs-agentur/cover.webp

The cover image is ready. You can reference it in your post frontmatter:
coverImage: "/blog/automatisierung-selbst-bauen-vs-agentur/cover.webp"
```

## Future Enhancements (Out of Scope)

- Batch generation for multiple images
- Style variations (generate 3 options to choose from)
- Integration with blog creation skill
- Image editing/refinement commands

## Verification

After implementation, verify:
1. Skill is invocable via `/generate-blog-image`
2. Brand style is correctly injected into prompts
3. WebP conversion produces correct file size and quality
4. Files are saved to correct location
5. Generated images match website aesthetic
