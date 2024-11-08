import { useEffect } from 'react';
import { UserSettings } from '../components/Settings';
import { Product } from '../types/product';

export function useNotifications(settings: UserSettings, products: Product[]) {
  useEffect(() => {
    if (!settings.notifications.browser) return;

    const checkPermission = async () => {
      if (Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }
    };

    checkPermission();

    const expiringProducts = products.filter(
      product => product.daysRemaining <= settings.notifications.expiryThreshold
    );

    expiringProducts.forEach(product => {
      if (Notification.permission === 'granted') {
        new Notification('Warranty Expiring Soon', {
          body: `${product.name} warranty expires in ${product.daysRemaining} days`,
          icon: '/warranty-icon.png'
        });
      }
    });
  }, [settings.notifications.browser, settings.notifications.expiryThreshold, products]);
}