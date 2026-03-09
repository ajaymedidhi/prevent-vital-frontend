
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

// Layouts - Legacy & New
import Layout from "./app/layout";
import SuperAdminLayout from './layouts/SuperAdminLayout';
import CorporateLayout from './layouts/CorporateLayout';
import ShopLayout from './layouts/ShopLayout';
// import ProductList from './pages/shop/ProductList';
// import Cart from './pages/shop/Cart';
// import Checkout from './pages/shop/Checkout';
import CatalogPage from "./features/shop/pages/CatalogPage";
import ProductDetailPage from "./features/shop/pages/ProductDetailPage";
import CartPage from "./features/shop/pages/CartPage";
import CheckoutPage from "./features/shop/pages/CheckoutPage";
import OrderSuccessPage from "./features/shop/pages/OrderSuccessPage";

import CreatorLayout from './layouts/CreatorLayout';
import CreatorDashboard from './pages/creator/Dashboard';
import ProgramBuilder from './pages/creator/ProgramBuilder';
import CorporateDashboard from './pages/corporate/Dashboard';
import EmployeeManagement from './pages/corporate/EmployeeManagement';
import CorporateAnalytics from './pages/corporate/Analytics';
import CorporateBilling from './pages/corporate/Billing';
import CorporateCampaigns from './pages/corporate/Campaigns';
import CorporateProgrammes from './pages/corporate/Programmes';
import CorporateSecurity from './pages/corporate/Security';
import CorporateSettings from './pages/corporate/Settings';
import CorporateSuperAdmin from './pages/corporate/SuperAdmin';
import CorporateSupport from './pages/corporate/Support';

// Program Module Pages
import ProgramListingPage from "./features/programs/pages/ProgramListingPage";
import ProgramDetailPage from "./features/programs/pages/ProgramDetailPage";


// Legacy Pages
import Homepage from "./app/homepage/page";
import DiseasePreventionProgramsPage from "./app/disease-prevention-programs/page";
import AiHealthAssessmentPage from "./app/ai-health-assessment/page";
import MedicalProfessionalPortalPage from "./app/medical-professional-portal/page";
import PartnershipPortalPage from "./app/partnership-portal/page";
import TherapeuticProgramsPage from "./app/therapeutic-programs/page";
import NotFound from "./app/not-found";
import AboutUs from "./pages/AboutUs";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import WellnessPhilosophy from "./pages/WellnessPhilosophy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

// New Auth & Admin Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import GlobalConfig from './pages/super-admin/GlobalConfig';
import UserManagement from './pages/super-admin/UserManagement';
import Approvals from './pages/super-admin/Approvals';
import TenantsPage from './pages/super-admin/Tenants';
import MedicalPrograms from './pages/super-admin/MedicalPrograms';
import AuditLogs from './pages/super-admin/AuditLogs';
import Programmes from './pages/super-admin/Programmes';
import Campaigns from './pages/super-admin/Campaigns';
import Analytics from './pages/super-admin/Analytics';
import Billing from './pages/super-admin/Billing';
import Security from './pages/super-admin/Security';
import Support from './pages/super-admin/Support';

// Stubs for other roles
// New Admin Pages
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminOrders from './pages/admin/Orders';
import AdminAlerts from './pages/admin/Alerts';
import RiskCalculator from './pages/admin/RiskCalculator';
import AdminReports from './pages/admin/Reports';
import AdminSettings from './pages/admin/Settings';
import AdminSupport from './pages/admin/Support';
import { Outlet } from "react-router-dom";

import CustomerDashboard from './pages/customer/CustomerDashboard';
import Assessment from './pages/customer/Assessment';

// Customer Pages
import CustomerLayout from './layouts/CustomerLayout';
import CustomerOrders from './pages/customer/Orders';
import CustomerBilling from './pages/customer/Billing';

const queryClient = new QueryClient();

const App = () => (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner position="top-center" />

                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>

                        {/* PUBLIC/SHOP ROUTE GROUP (Using ShopLayout or Main Layout?) 
                For now, keeping legacy routes under existing Layout, and wrapping standard Shop pages under ShopLayout if distinct.
                Given "ShopLayout" was requested for the public shop, let's overlap.
            */}

                        <Route path="/shop" element={<ShopLayout />}>
                            <Route index element={<CatalogPage />} />
                        </Route>
                        <Route element={<Layout />}>
                            <Route path="/products" element={<CatalogPage />} />
                            <Route path="/products/:slug" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/order-confirmation/:orderId" element={<OrderSuccessPage />} />
                            <Route path="/" element={<Homepage />} />
                            <Route path="/homepage" element={<Homepage />} />
                            {/* Program Routes moved to Customer Dashboard */}
                            {/* Legacy Routes - Redirect or keep for SEO temporarily? */}
                            <Route path="/disease-prevention-programs" element={<DiseasePreventionProgramsPage />} />
                            <Route path="/ai-health-assessment" element={<AiHealthAssessmentPage />} />
                            <Route path="/medical-professional-portal" element={<MedicalProfessionalPortalPage />} />
                            <Route path="/partnership-portal" element={<PartnershipPortalPage />} />
                            <Route path="/therapeutic-programs-center" element={<TherapeuticProgramsPage />} />

                            {/* Legacy Routes */}
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/wellness-philosophy" element={<WellnessPhilosophy />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                        </Route>

                        {/* AUTH */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* SUPER ADMIN ROUTE GROUP */}
                        <Route path="/super-admin" element={
                            <ProtectedRoute allowedRoles={['super_admin']}>
                                <SuperAdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<SuperAdminDashboard />} />
                            <Route path="config" element={<GlobalConfig />} />
                            <Route path="tenants" element={<TenantsPage />} />
                            <Route path="start-program" element={<MedicalPrograms />} />
                            <Route path="users" element={<UserManagement />} />
                            <Route path="approvals" element={<Approvals />} />
                            <Route path="audit-logs" element={<AuditLogs />} />
                            <Route path="programmes" element={<Programmes />} />
                            <Route path="campaigns" element={<Campaigns />} />
                            <Route path="analytics" element={<Analytics />} />
                            <Route path="billing" element={<Billing />} />
                            <Route path="security" element={<Security />} />
                            <Route path="support" element={<Support />} />
                            <Route path="settings" element={<GlobalConfig />} />
                            <Route path="platform" element={<SuperAdminDashboard />} />
                        </Route>

                        {/* ADMIN ROUTE GROUP */}
                        <Route path="/admin" element={
                            <ProtectedRoute allowedRoles={['admin', 'super_admin']}>
                                <AdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="orders" element={<AdminOrders />} />
                            <Route path="alerts" element={<AdminAlerts />} />
                            <Route path="risk-calculator" element={<RiskCalculator />} />
                            <Route path="reports" element={<AdminReports />} />
                            <Route path="settings" element={<AdminSettings />} />
                            <Route path="support" element={<AdminSupport />} />
                        </Route>

                        {/* CREATOR ROUTE GROUP */}
                        <Route path="/creator" element={
                            <ProtectedRoute allowedRoles={['content_creator', 'super_admin']}>
                                <CreatorLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<CreatorDashboard />} />
                            <Route path="programs/new" element={<ProgramBuilder />} />
                            <Route path="programs" element={<div className="p-8 text-center text-gray-500 font-medium">Content Manager (Coming Soon)</div>} />
                            <Route path="live" element={<div className="p-8 text-center text-pink-600 font-medium tracking-wide">Live Sessions Scheduler (Coming Soon)</div>} />
                            <Route path="earnings" element={<div className="p-8 text-center text-gray-500 font-medium">Earnings Analytics (Coming Soon)</div>} />
                            <Route path="community" element={<div className="p-8 text-center text-gray-500 font-medium">My Community (Coming Soon)</div>} />
                            <Route path="settings" element={<div className="p-8 text-center text-gray-500 font-medium">Studio Settings (Coming Soon)</div>} />
                        </Route>

                        {/* CORPORATE ROUTE GROUP */}
                        <Route path="/corporate/:tenantId" element={
                            <ProtectedRoute allowedRoles={['corporate_admin']}>
                                <CorporateLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<CorporateDashboard />} />
                            <Route path="employees" element={<EmployeeManagement />} />
                            <Route path="analytics" element={<CorporateAnalytics />} />
                            <Route path="billing" element={<CorporateBilling />} />
                            <Route path="campaigns" element={<CorporateCampaigns />} />
                            <Route path="programmes" element={<CorporateProgrammes />} />
                            <Route path="security" element={<CorporateSecurity />} />
                            <Route path="settings" element={<CorporateSettings />} />
                            <Route path="super-admin" element={<CorporateSuperAdmin />} />
                            <Route path="support" element={<CorporateSupport />} />
                        </Route>

                        {/* CUSTOMER ROUTE GROUP */}
                        <Route path="/account" element={
                            <ProtectedRoute allowedRoles={['customer']}>
                                <CustomerLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<CustomerDashboard />} />
                            <Route path="programs" element={<ProgramListingPage />} />
                            <Route path="programs/:id" element={<ProgramDetailPage />} />
                            <Route path="history" element={<CustomerOrders />} />
                            <Route path="billing" element={<CustomerBilling />} />
                            <Route path="assessment" element={<Assessment />} />
                            {/* <Route path="corporate" element={<CustomerCorporate />} /> */}
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;
