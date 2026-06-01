'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, ExternalLink, Lock, ChevronDown, RefreshCw, Brain } from 'lucide-react';

interface ViralProduct {
  id: string;
  name: string;
  url: string;
  description: string;
  product_type: string;
  category: string;
  tags: string[];
  analysis_json: Record<string, any>;
  created_at: string;
}

interface ViralKnowledge {
  id: string;
  product_type: string;
  knowledge_json: Record<string, string[]>;
  source_count: number;
  updated_at: string;
}

export default function AdminViralPage() {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ViralProduct[]>([]);
  const [knowledge, setKnowledge] = useState<ViralKnowledge[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [expandedKnowledge, setExpandedKnowledge] = useState<Set<string>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem('admin_secret');
    if (saved) {
      setSecret(saved);
      setAuthenticated(true);
      fetchProducts(saved);
    }
  }, []);

  const headers = (s: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${s}`,
  });

  const fetchProducts = async (s: string) => {
    const res = await fetch('/api/admin/viral-products', { headers: headers(s) });
    if (res.ok) {
      const data = await res.json();
      setProducts(data.products || []);
      setKnowledge(data.knowledge || []);
    }
  };

  const handleLogin = () => {
    if (!secret.trim()) return;
    localStorage.setItem('admin_secret', secret);
    setAuthenticated(true);
    fetchProducts(secret);
  };

  const handleAdd = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/admin/viral-products', {
        method: 'POST',
        headers: headers(secret),
        body: JSON.stringify({ url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add');

      setSuccess(`Added: ${data.product.name}`);
      setUrl('');
      fetchProducts(secret);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;

    await fetch('/api/admin/viral-products', {
      method: 'DELETE',
      headers: headers(secret),
      body: JSON.stringify({ id }),
    });
    fetchProducts(secret);
  };

  const handleReanalyze = async (productUrl: string, id: string) => {
    if (!confirm(`Re-analyze ${productUrl}?`)) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await fetch('/api/admin/viral-products', {
        method: 'DELETE',
        headers: headers(secret),
        body: JSON.stringify({ id }),
      });

      const res = await fetch('/api/admin/viral-products', {
        method: 'POST',
        headers: headers(secret),
        body: JSON.stringify({ url: productUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to re-analyze');

      setSuccess(`Re-analyzed: ${data.product.name}`);
      fetchProducts(secret);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleKnowledgeExpand = (id: string) => {
    setExpandedKnowledge((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="shell-panel p-8 max-w-sm w-full text-center">
          <Lock className="h-8 w-8 mx-auto text-muted" />
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Admin Access</h1>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin secret"
            className="field-surface mt-4 w-full px-4 py-3 text-foreground"
          />
          <button onClick={handleLogin} className="btn-primary mt-4 w-full py-3 font-bold">
            Login
          </button>
        </div>
      </div>
    );
  }

  const KNOWLEDGE_KEYS = ['growth_patterns', 'design_principles', 'monetization_insights', 'distribution_strategies', 'common_mistakes', 'what_works', 'what_doesnt_work'];

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Viral Knowledge Base</h1>
        <p className="mt-2 text-muted">Add viral products. Each analysis internalizes into the knowledge base.</p>

        {/* Add form */}
        <div className="mt-8 shell-panel p-5">
          <div className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="https://gamma.app"
              className="field-surface flex-1 px-4 py-3 text-foreground"
              disabled={loading}
            />
            <button
              onClick={handleAdd}
              disabled={loading || !url.trim()}
              className="btn-primary px-6 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </div>

        {/* Accumulated Knowledge */}
        {knowledge.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
              <Brain className="h-5 w-5 text-accent" />
              Internalized Knowledge
            </h2>
            <p className="text-xs text-muted mt-1">Generalized principles from analyzed products. This is what gets injected into reports.</p>

            <div className="mt-4 space-y-3">
              {knowledge.map((k) => {
                const isExpanded = expandedKnowledge.has(k.id);
                return (
                  <div key={k.id} className="shell-panel overflow-hidden">
                    <div
                      className="p-4 flex items-center justify-between gap-4 cursor-pointer"
                      onClick={() => toggleKnowledgeExpand(k.id)}
                    >
                      <div>
                        <span className="font-display font-bold text-foreground">{k.product_type}</span>
                        <span className="ml-2 text-xs text-muted">{k.source_count} products analyzed</span>
                        <span className="ml-2 text-[10px] text-muted">Updated {new Date(k.updated_at).toLocaleDateString()}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                    {isExpanded && (
                      <div className="border-t border-foreground/10 p-4 space-y-3 text-sm">
                        {KNOWLEDGE_KEYS.map((key) => {
                          const items = k.knowledge_json?.[key];
                          if (!items || items.length === 0) return null;
                          return (
                            <div key={key}>
                              <p className="text-xs font-bold uppercase text-muted">{key.replace(/_/g, ' ')}</p>
                              <ul className="mt-1 space-y-1">
                                {items.map((item: string, i: number) => (
                                  <li key={i} className="text-foreground/80 flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Product list */}
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-foreground">Analyzed Products ({products.length})</h2>
          <div className="mt-4 space-y-3">
            {products.map((p) => {
              const isExpanded = expanded.has(p.id);
              const a = p.analysis_json || {};

              return (
                <div key={p.id} className="shell-panel overflow-hidden">
                  <div className="p-4 flex items-start justify-between gap-4 cursor-pointer" onClick={() => toggleExpand(p.id)}>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-foreground">{p.name}</h3>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="h-3.5 w-3.5 text-muted hover:text-foreground" />
                        </a>
                      </div>
                      <p className="text-xs text-muted mt-0.5">{p.description}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {p.product_type && (
                          <span className="rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold text-muted">
                            {p.product_type}
                          </span>
                        )}
                        {p.category && (
                          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                            {p.category}
                          </span>
                        )}
                        {p.tags?.slice(0, 5).map((tag) => (
                          <span key={tag} className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleReanalyze(p.url, p.id); }}
                        className="text-muted hover:text-accent transition-colors"
                        title="Re-analyze"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                        className="text-muted hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <ChevronDown className={`h-4 w-4 text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-foreground/10 p-4 space-y-3 text-sm">
                      {a.why_it_went_viral && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted">Why it went viral</p>
                          <p className="mt-1 text-foreground/80">{a.why_it_went_viral}</p>
                        </div>
                      )}
                      {a.growth_channels?.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted">Growth channels</p>
                          <p className="mt-1 text-foreground/80">{a.growth_channels.join(', ')}</p>
                        </div>
                      )}
                      {a.design_patterns?.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted">Design patterns</p>
                          <p className="mt-1 text-foreground/80">{a.design_patterns.join(', ')}</p>
                        </div>
                      )}
                      {a.monetization_model && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted">Monetization</p>
                          <p className="mt-1 text-foreground/80">{a.monetization_model}</p>
                        </div>
                      )}
                      {a.lessons_for_indie_founders?.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted">Lessons for indie founders</p>
                          <ul className="mt-1 space-y-1">
                            {a.lessons_for_indie_founders.map((l: string, i: number) => (
                              <li key={i} className="text-foreground/80 flex items-start gap-2">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                                {l}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {a.distribution_hacks?.length > 0 && (
                        <div>
                          <p className="text-xs font-bold uppercase text-muted">Distribution hacks</p>
                          <p className="mt-1 text-foreground/80">{a.distribution_hacks.join(', ')}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {products.length === 0 && (
              <p className="text-center text-muted py-8">No viral products yet. Add one above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
