import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('~/lib/prisma.server', () => {
  const data = {
    authors: [{ id: 1, name: 'A' }],
    books: [{ id: 1, title: 'T', year: 2020, price: 10, authorId: 1, author: { id:1, name:'A'} }]
  };
  return {
    prisma: {
      author: {
        findMany: vi.fn(async () => data.authors),
        create: vi.fn(async ({ data: { name } }: any) => {
          const id = data.authors.length + 1;
          const author = { id, name };
          data.authors.push(author);
          return author;
        })
      },
      book: {
        findMany: vi.fn(async () => data.books),
        create: vi.fn(async ({ data: bookData }: any) => {
          const id = data.books.length + 1;
          const book = { id, ...bookData };
          data.books.push(book);
          return book;
        })
      }
    }
  };
});

import { prisma } from '~/lib/prisma.server';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('authors loader', () => {
  it('returns authors', async () => {
    const { loader } = await import('~/routes/authors.index');
    const res = await loader();
    expect(prisma.author.findMany).toHaveBeenCalled();
    const { authors } = await res.json();
    expect(authors[0].name).toBe('A');
  });
});

describe('authors page', () => {
  it('renders list', async () => {
    const react = require('@remix-run/react');
    vi.spyOn(react, 'useLoaderData').mockReturnValue({ authors: [{ id: 1, name: 'Test' }] } as any);
    const mod = await import('~/routes/authors.index');
    const Page = mod.default;
    const router = require('react-router-dom').createMemoryRouter([
      { path: '/', element: <Page /> }
    ]);
    const Provider = require('react-router-dom').RouterProvider;
    render(<Provider router={router} />);
    expect(screen.getByText('Authors')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});

describe('create author action', () => {
  it('creates a new author', async () => {
    const mod = await import('~/routes/authors.new');
    const action = mod.action;
    const req = new Request('http://test', {
      method: 'POST',
      body: new URLSearchParams({ name: 'New' }).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    const res = await action({ request: req } as any);
    expect(prisma.author.create).toHaveBeenCalledWith({ data: { name: 'New' } });
    expect(res.headers.get('Location')).toBe('/authors');
  });
});


describe('books loader', () => {
  it('returns books', async () => {
    const { loader } = await import('~/routes/books.index');
    const res = await loader({} as any);
    expect(prisma.book.findMany).toHaveBeenCalled();
    const { books } = await res.json();
    expect(books[0].title).toBe('T');
  });
});

describe('books page', () => {
  it('renders list', async () => {
    const react = require('@remix-run/react');
    vi.spyOn(react, 'useLoaderData').mockReturnValue({ books: [{ id: 1, title: 'R', year: 2021, price: 5, author: { name: 'A' } }] } as any);
    const mod = await import('~/routes/books.index');
    const Page = mod.default;
    const router = require('react-router-dom').createMemoryRouter([
      { path: '/', element: <Page /> }
    ]);
    const Provider = require('react-router-dom').RouterProvider;
    render(<Provider router={router} />);
    expect(screen.getByText('Books')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
  });
});

describe('create book action', () => {
  it('creates a book', async () => {
    const mod = await import('~/routes/books.new');
    const action = mod.action;
    const req = new Request('http://test', {
      method: 'POST',
      body: new URLSearchParams({ title: 'Book', year: '2024', price: '9.99', authorId: '1' }).toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    await action({ request: req } as any);
    expect(prisma.book.create).toHaveBeenCalled();
  });
});
