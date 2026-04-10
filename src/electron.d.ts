export {};

declare global {
  interface Window {
    punisherDesktop?: {
      isDesktop: boolean;
      platform: string;
      electronVersion: string;
    };
  }
}
