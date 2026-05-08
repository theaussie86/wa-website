# Keep local-seo-page.tsx as a single component

The `local-seo-page.tsx` component renders all SEO landing page sections (hero, intro, service highlights, use cases, testimonials, regional info, CTAs) inline in one file. Decomposing into sub-components was considered but rejected: the primary justification — reducing editing friction — does not apply because all edits go through a coding agent, which has no navigation cost on a 245-line file. Reuse of individual sections on non-SEO pages is not a current requirement. Revisit if section reuse becomes concrete.
