'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface ComboboxProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  allowEmpty?: boolean;
  emptyLabel?: string;
  className?: string;
  ariaLabel?: string;
}

export function Combobox({
  value,
  onChange,
  options,
  placeholder = 'Select…',
  allowEmpty = false,
  emptyLabel = '— None —',
  className,
  ariaLabel,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = allowEmpty ? ['', ...options] : options;
    if (!q) return all.slice(0, 200);
    return all
      .filter((o) => (o === '' ? emptyLabel.toLowerCase().includes(q) : o.toLowerCase().includes(q)))
      .slice(0, 200);
  }, [options, query, allowEmpty, emptyLabel]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  function openMenu() {
    setQuery('');
    setHighlight(0);
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function commit(v: string) {
    onChange(v);
    closeMenu();
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : openMenu())}
        className="w-full text-left rounded-lg border border-[var(--border)] bg-[var(--panel-2)] px-3 py-2 text-sm hover:border-[var(--accent)] transition-colors"
      >
        <span className={value ? '' : 'text-[var(--muted)]'}>
          {value || placeholder}
        </span>
        <span className="float-right text-[var(--muted)]">▾</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--panel)] shadow-xl">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlight((h) => Math.min(h + 1, filtered.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlight((h) => Math.max(h - 1, 0));
              } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filtered[highlight] !== undefined) commit(filtered[highlight]);
              } else if (e.key === 'Escape') {
                closeMenu();
              }
            }}
            placeholder="Search…"
            className="w-full !border-x-0 !border-t-0 !border-b !border-[var(--border)] !rounded-t-lg !rounded-b-none"
          />
          <ul ref={listRef} role="listbox" className="max-h-60 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-[var(--muted)]">No matches</li>
            ) : (
              filtered.map((opt, i) => (
                <li
                  key={opt || '__empty__'}
                  role="option"
                  aria-selected={i === highlight}
                  className={cn(
                    'px-3 py-1.5 text-sm cursor-pointer',
                    i === highlight
                      ? 'bg-[var(--accent)] text-white'
                      : 'hover:bg-[var(--panel-2)]'
                  )}
                  onMouseEnter={() => setHighlight(i)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    commit(opt);
                  }}
                >
                  {opt === '' ? emptyLabel : opt}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
