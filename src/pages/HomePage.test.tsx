import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Navbar } from '../components/Navbar';
import HomePage from '../pages/HomePage';
import { APP_URL } from '../constants';

function renderNavbar() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Navbar />
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  it('renders the SecureX brand', () => {
    renderNavbar();
    expect(screen.getByText('Secure')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('links to the main application via Launch SecureX CTA', () => {
    renderNavbar();
    const launch = screen.getAllByRole('link', { name: /launch securex/i });
    expect(launch.length).toBeGreaterThan(0);
    expect(launch[0]).toHaveAttribute('href', APP_URL);
  });

  it('shows primary navigation links', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'How It Works' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Features' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Security' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
  });
});

describe('HomePage', () => {
  beforeEach(() => {
    vi.stubGlobal('scrollTo', vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the hero with a Launch SecureX CTA to the app', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /blockchain-powered digital credential trust network/i }),
    ).toBeInTheDocument();
    const launch = screen.getAllByRole('link', { name: /launch securex/i });
    expect(launch.length).toBeGreaterThan(0);
    expect(launch[0]).toHaveAttribute('href', APP_URL);
  });

  it('does not expose authenticated application routes', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const links = screen.getAllByRole('link');
    let hasDashboardRoute = false;
    links.forEach((link) => {
      const href = link.getAttribute('href') ?? '';
      if (/\/dashboard|\/auth\/login|\/holder|\/institution|\/employer|\/admin/.test(href)) {
        hasDashboardRoute = true;
      }
    });
    expect(hasDashboardRoute).toBe(false);
  });
});