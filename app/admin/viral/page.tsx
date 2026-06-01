'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, ExternalLink, Lock } from 'lucide-react';

interface ViralProduct {
  id: string;
  name: string;
  url: string;
  description: string;
  product_type: string;
  category: string;
  tags: string[];
  created_at: string;
}

export default function AdminViralPage() {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ViralProduct[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Viral Knowledge Base</h1>
        <p className="mt-2 text-muted">Add viral products to analyze why they succeeded.</p>

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

        {/* Product list */}
        <div className="mt-8 space-y-3">
          {products.map((p) => (
            <div key={p.id} className="shell-panel p-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-foreground truncate">{p.name}</h3>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
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
              <button onClick={() => handleDelete(p.id)} className="shrink-0 text-muted hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-center text-muted py-8">No viral products yet. Add one above.</p>
          )}
        </div>
      </div>
    </div>
  );
}
