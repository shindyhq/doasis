export interface CloudFile {
  id: string;
  name: string;
  mimeType: string;
  icon?: string;
  source: 'google-drive' | 'dropbox' | 'proton' | 'upload';
  url: string;
}

export class StorageService {
  /**
   * Mocks fetching files from a connected cloud provider.
   */
  static async listFiles(provider: 'google-drive' | 'dropbox'): Promise<CloudFile[]> {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (provider === 'google-drive') {
      return [
        { id: 'gd-1', name: 'The_Becoming_Workbook.pdf', mimeType: 'application/pdf', source: 'google-drive', url: '#' },
        { id: 'gd-2', name: 'Session_Notes_Template.gdoc', mimeType: 'application/vnd.google-apps.document', source: 'google-drive', url: '#' },
        { id: 'gd-3', name: 'Meditation_Guide_v2.pdf', mimeType: 'application/pdf', source: 'google-drive', url: '#' },
      ];
    }

    if (provider === 'dropbox') {
      return [
        { id: 'db-1', name: 'Audio_Session_01.mp3', mimeType: 'audio/mpeg', source: 'dropbox', url: '#' },
        { id: 'db-2', name: 'Client_Assets.zip', mimeType: 'application/zip', source: 'dropbox', url: '#' },
      ];
    }

    return [];
  }

  /**
   * Simulates generating a "Smart Link" for a standard URL (like Proton Drive).
   */
  static generateSmartLink(url: string): CloudFile | null {
    if (url.includes('proton.me')) {
      return {
        id: 'proton-' + Date.now(),
        name: 'Encrypted Proton Drive File',
        mimeType: 'application/octet-stream',
        source: 'proton',
        url: url,
      };
    }
    return null;
  }
}
