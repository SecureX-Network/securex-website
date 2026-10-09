import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../constants';
import { metaFor } from '../seo';

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  /** Optional social image path; falls back to the site default. */
  image?: string;
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-route document metadata. The site is a single-page app, so titles,
 * descriptions, the canonical URL and social tags are applied after each route
 * change rather than baked into static HTML.
 */
export function Seo({ title, description, path, image }: SeoProps) {
  useEffect(() => {
    const canonicalPath = path === '' ? '/' : path;
    const canonical = `${SITE_URL}${canonicalPath === '/' ? '/' : canonicalPath}`;
    const socialImage = image ?? `${SITE_URL}/favicon.svg`;

    document.title = title;
    setMeta('name', 'description', description);
    setLink('canonical', canonical);

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'SecureX');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', socialImage);

    setMeta('name', 'twitter:card', 'summary');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', socialImage);
  }, [title, description, path, image]);

  return null;
}

/**
 * Applies metadata for the current location from the central route map.
 * Every route gets a title, description, canonical URL and social tags
 * without each page having to wire them up individually.
 */
export function RouteSeo() {
  const location = useLocation();
  const meta = metaFor(location.pathname);
  const title = meta.title.includes('SecureX') ? meta.title : `${meta.title} · SecureX`;
  return <Seo title={title} description={meta.description} path={location.pathname} />;
}
