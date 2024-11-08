import React, { useState } from 'react';
import { MainNav } from './components/MainNav';
import { HomePage } from './components/HomePage';
import { ProductList } from './components/ProductList';
import { AddProductModal } from './components/AddProductModal';
import { ProductDetails } from './components/ProductDetails';
import { NotificationCenter } from './components/NotificationCenter';
import { Settings } from './components/Settings';
import { HelpSupport } from './components/HelpSupport';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CalendarView } from './components/CalendarView';
import { ThemeToggle } from './components/ThemeToggle';
import { AuthPage } from './components/auth/AuthPage';
import { useSettings } from './hooks/useSettings';
import { useTheme } from './hooks/useTheme';
import { useNotifications } from './hooks/useNotifications';
import { useOnboarding } from './hooks/useOnboarding';
import { useAuth } from './hooks/useAuth';
import { SAMPLE_PRODUCTS } from './data/sampleProducts';
import { Product } from './types/product';

function App() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [currentPage, setCurrentPage] = useState<'home' | 'products' | 'analytics' | 'calendar'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { settings, updateSettings } = useSettings();
  const [isDark, setIsDark] = useState(false);
  const { showTour, setShowTour, steps } = useOnboarding();
  const { user, isAuthenticated, signIn, signUp, signOut } = useAuth();

  useTheme(settings);
  useNotifications(settings, products);

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      ...productData,
      id: products.length + 1,
      status: 'active' as const,
      daysRemaining: 365,
      progressPercentage: 0,
      documents: []
    };
    setProducts([...products, newProduct]);
    setIsAddModalOpen(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setSelectedProduct(updatedProduct);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    setSelectedProduct(null);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage products={products} onNavigate={setCurrentPage} />;
      case 'products':
        return (
          <ProductList
            products={products}
            onAddClick={() => setIsAddModalOpen(true)}
            onProductClick={setSelectedProduct}
          />
        );
      case 'analytics':
        return <AnalyticsDashboard products={products} />;
      case 'calendar':
        return <CalendarView products={products} />;
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <AuthPage onSignIn={signIn} onSignUp={signUp} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <MainNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onNotificationClick={() => setIsNotificationOpen(true)}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onHelpClick={() => setIsHelpOpen(true)}
        onSignOut={signOut}
        user={user}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
      </main>

      {isAddModalOpen && (
        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddProduct}
        />
      )}

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onDelete={handleDeleteProduct}
          onUpdateProduct={handleUpdateProduct}
        />
      )}

      {isNotificationOpen && (
        <NotificationCenter
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          products={products}
        />
      )}

      {isSettingsOpen && (
        <Settings
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSave={updateSettings}
        />
      )}

      {isHelpOpen && (
        <HelpSupport
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
        />
      )}

      <div className="fixed bottom-4 right-4">
        <ThemeToggle
          isDark={isDark}
          onToggle={() => setIsDark(!isDark)}
        />
      </div>
    </div>
  );
}

export default App;