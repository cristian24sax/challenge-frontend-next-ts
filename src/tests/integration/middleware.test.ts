import { middleware } from '@/middleware';
import { NextResponse } from 'next/server';

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn(),
    next: jest.fn(),
  },
}));

describe('Middleware', () => {
  const mockRequest = (pathname: string, cookieValue?: string) => {
    const cookies = {
      get: jest.fn((name) => {
        if (name === 'accountId') {
          return cookieValue ? { value: cookieValue } : undefined;
        }
      }),
    };

    return {
      cookies,
      nextUrl: { pathname },
      url: 'http://localhost' + pathname,
    } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirige a /session/home si el ID de cuenta existe y la ruta es pública', () => {
    const req = mockRequest('/', '12345');
    middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL('/session/home', req.url)
    );
  });

  it('redirige a / si el ID de cuenta no existe y la ruta es privada', () => {
    const req = mockRequest('/session/home');
    middleware(req);
    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/', req.url));
  });

  it('permite el acceso a la ruta pública si el ID de cuenta no existe', () => {
    const req = mockRequest('/');
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it('permite el acceso a la ruta privada si existe accountId', () => {
    const req = mockRequest('/session/home', '12345');
    middleware(req);
    expect(NextResponse.next).toHaveBeenCalled();
  });
});
