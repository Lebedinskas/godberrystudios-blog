# Hero builders

HTML+inline-SVG composites used to render hero images for vendor-comparison blog posts. **NOT shipped publicly** — these live in `/tools/`, outside Hugo's `/static/` tree.

## Why this exists

Comparison posts (`X vs Y`, `X vs Y vs Z`) need hero images that show the **actual brand logos** of the products being compared. Imagen / generative image tools cannot render real brand marks accurately and produce abstract filler that hurts CTR. See `feedback_hero_image_brand_marks.md` in memory for the full rule.

## How to use

1. Copy an existing builder in this folder as a starting point.
2. Swap the inline SVG brand marks for the vendors you're comparing. Approximate the official logo shapes — official colors, recognizable silhouette. Nominative fair use covers comparison/review usage.
3. Adjust labels, eyebrow text, and per-side stat strings.
4. Render to PNG with the helper script in `fb-mcp-server/scripts/render-hero.mjs`:

   ```bash
   cd fb-mcp-server
   node scripts/render-hero.mjs \
     "../godberrystudios-blog/tools/hero-builders/<builder>.html" \
     "../godberrystudios-blog/static/images/posts/<post-slug>.png" \
     1920 1080
   ```

5. The PNG goes into `static/images/posts/<post-slug>.png` so Hugo picks it up via the post frontmatter `image:` field.

## Layout convention

- 1920 × 1080 (16:9) — matches Hugo `og:image` and on-page hero sizing
- Dark navy background (#0a0e27 family) with site palette accents (#2563eb blue, #f59e0b gold)
- Two large brand marks, one per side
- Center "VS" with eyebrow + sub eyebrow describing the comparison axis
- Per-side label below each logo with model name + key stat (price, context, etc.)
- Small "Godberry·Studios" wordmark bottom-left
- No body text inside the image (titles render via the post page itself)
