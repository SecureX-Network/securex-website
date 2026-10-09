import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { WebsiteLayout } from './WebsiteLayout';
import { LEGACY_REDIRECTS } from './constants';
import { SectionNav } from './components/SectionNav';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const PlatformPage = lazy(() => import('./pages/PlatformPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage'));
const CredentialLifecyclePage = lazy(() => import('./pages/CredentialLifecyclePage'));
const VerificationPage = lazy(() => import('./pages/VerificationPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));

const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const InstitutionsPage = lazy(() => import('./pages/InstitutionsPage'));
const HoldersPage = lazy(() => import('./pages/HoldersPage'));
const EmployersPage = lazy(() => import('./pages/EmployersPage'));
const AdministratorsPage = lazy(() => import('./pages/AdministratorsPage'));

const TrustPage = lazy(() => import('./pages/TrustPage'));
const BlockchainPage = lazy(() => import('./pages/BlockchainPage'));
const CredentialIntegrityPage = lazy(() => import('./pages/CredentialIntegrityPage'));
const RevocationPage = lazy(() => import('./pages/RevocationPage'));
const AuditabilityPage = lazy(() => import('./pages/AuditabilityPage'));

const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const GettingStartedPage = lazy(() => import('./pages/GettingStartedPage'));
const VerificationGuidePage = lazy(() => import('./pages/VerificationGuidePage'));
const ApiPage = lazy(() => import('./pages/ApiPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));
const GlossaryPage = lazy(() => import('./pages/GlossaryPage'));

const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SihPage = lazy(() => import('./pages/SihPage'));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));

const LivePage = lazy(() => import('./pages/LivePage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));

/** Renders the in-section pill navigation above the section's pages. */
function SectionLayout({ section }: { section: string }) {
  return (
    <>
      <SectionNav section={section} />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
    </>
  );
}

function RouteFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-securex-600" />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route index element={<HomePage />} />

        {/* Legacy scaffold paths now redirect to their new home */}
        {Object.entries(LEGACY_REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from} element={<Navigate to={to} replace />} />
        ))}

        <Route path="/platform" element={<SectionLayout section="/platform" />}>
          <Route index element={<PlatformPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="architecture" element={<ArchitecturePage />} />
          <Route path="credential-lifecycle" element={<CredentialLifecyclePage />} />
          <Route path="verification" element={<VerificationPage />} />
          <Route path="security" element={<SecurityPage />} />
        </Route>

        <Route path="/solutions" element={<SectionLayout section="/solutions" />}>
          <Route index element={<SolutionsPage />} />
          <Route path="institutions" element={<InstitutionsPage />} />
          <Route path="holders" element={<HoldersPage />} />
          <Route path="employers" element={<EmployersPage />} />
          <Route path="administrators" element={<AdministratorsPage />} />
        </Route>

        <Route path="/trust" element={<SectionLayout section="/trust" />}>
          <Route index element={<TrustPage />} />
          <Route path="blockchain" element={<BlockchainPage />} />
          <Route path="credential-integrity" element={<CredentialIntegrityPage />} />
          <Route path="revocation" element={<RevocationPage />} />
          <Route path="auditability" element={<AuditabilityPage />} />
        </Route>

        <Route path="/resources" element={<SectionLayout section="/resources" />}>
          <Route index element={<ResourcesPage />} />
          <Route path="documentation" element={<DocumentationPage />} />
          <Route path="getting-started" element={<GettingStartedPage />} />
          <Route path="verification-guide" element={<VerificationGuidePage />} />
          <Route path="api" element={<ApiPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="glossary" element={<GlossaryPage />} />
        </Route>

        <Route path="/project" element={<SectionLayout section="/project" />}>
          <Route index element={<ProjectPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="sih-2026" element={<SihPage />} />
          <Route path="technology" element={<TechnologyPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
        </Route>

        <Route path="/live" element={<SectionLayout section="/live" />}>
          <Route index element={<LivePage />} />
          <Route path="status" element={<StatusPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
