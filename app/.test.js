import { jest, test, expect } from 'jest';

fetchMock.enableMocks();

test('Percobaan gagal mengambil status webhook', async () => {
  fetchMock.mockResponse('', { status: 500 }); // Ini akan mengembalikan kode status 500

  try {
    const data = await fetchWebhookStatusWithRetry();
  } catch (error) {
    expect(error.message).toEqual('Percobaan retry telah mencapai batas.');
  }
});
