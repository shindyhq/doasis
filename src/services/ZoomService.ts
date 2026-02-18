export class ZoomService {
  /**
   * Creates a Zoom meeting for a specific client and time.
   * Currently mocked to return a static URL.
   */
  static async createMeeting(topic: string, startTime: string, durationMinutes: number = 60) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const meetingId = Math.floor(Math.random() * 10000000000);
    const joinUrl = `https://zoom.us/j/${meetingId}?pwd=sanctuary-mock`;

    console.log(`[Mock Zoom] Created meeting: ${topic} at ${startTime}`);

    return {
      id: meetingId.toString(),
      join_url: joinUrl,
      start_time: startTime,
      topic,
    };
  }

  /**
   * Generates a Server-to-Server OAuth token (Mocked).
   */
  static async getAccessToken() {
    return 'mock_access_token_' + Date.now();
  }
}
