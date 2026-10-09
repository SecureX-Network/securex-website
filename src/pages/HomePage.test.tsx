import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Navbar } from '../components/Navbar';
import HomePage from '../pages/HomePage';
import { APP_URL, NAV_LINKS, VERIFY_APP_URL } from '../constants';

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

  it('links to credential verification in the main application', () => {
    renderNavbar();
    const verify = screen.getAllByRole('link', { name: /verify a credential/i });
    expect(verify.length).toBeGreaterThan(0);
    expect(verify[0]).toHaveAttribute('href', VERIFY_APP_URL);
  });

  it('shows the primary navigation sections', () => {
    renderNavbar();
    for (const link of NAV_LINKS) {
      expect(screen.getByRole('link', { name: link.label })).toBeInTheDocument();
    }
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

  it('never publishes placeholder network statistics', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.queryByText('10,000+')).not.toBeInTheDocument();
    expect(screen.queryByText('50+')).not.toBeInTheDocument();
    expect(screen.queryByText('100,000+')).not.toBeInTheDocument();
  });

  it('routes the How It Works CTA to the new information architecture', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    const howItWorks = screen.getAllByRole('link', { name: /how it works/i });
    expect(howItWorks.length).toBeGreaterThan(0);
    expect(howItWorks[0]).toHaveAttribute('href', '/platform/how-it-works');
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
      const appPath = href.startsWith(APP_URL) ? href.slice(APP_URL.length) : href;
      if (
        /^\/(auth(\/|$)|dashboard(\/|$)|holder(\/|$)|institution(\/|$)|employer(\/|$)|admin(\/|$))/.test(
          appPath,
        )
      ) {
        hasDashboardRoute = true;
      }
    });
    expect(hasDashboardRoute).toBe(false);
  });
});
