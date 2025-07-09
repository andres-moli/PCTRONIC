import * as WebBrowser from 'expo-web-browser';

export const OpenUrlInApp = async (url: string) => {
  if (!url) {
    console.warn('No se proporcionó una URL válida');
    return;
  }

  try {
    console.log(url)
    const result = await WebBrowser.openBrowserAsync(url);
  } catch (error) {
    console.error('Error al abrir la URL:', error);
  }
};
