import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'groceryapp.com',
  appName: 'GroceryApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
