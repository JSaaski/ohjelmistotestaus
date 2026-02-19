import { describe, expect, it, vi } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

// Test suite for positive service scenarios (success cases)
describe('dogService positive test', () => {
  // Test case: Verify that the service correctly transforms and returns the API response
  it('should return correct image URL and status', async () => {
    // Create a mock response object matching the dog API response format
    const mockResponse = {
        message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg', // The message field contains the image URL
        status: 'success', // The API status field
    }
    
    // Mock the global fetch function to return a successful response with the mock data
    global.fetch = vi.fn(() =>
        Promise.resolve({
            ok: true, // Indicates successful HTTP response (2xx status)
            json: () => Promise.resolve(mockResponse), // Mock the json() method
        } as Response)
    );
    
    // Call the service function
    const result = await getRandomDogImage();
    
    // Assert that the service correctly extracts the image URL from the message field
    expect(result.imageUrl).toBe(mockResponse.message);
    
    // Assert that the service correctly returns the status
    expect(result.status).toBe(mockResponse.status);
    
    // Assert that the fetch function was called exactly once
    expect(global.fetch).toHaveBeenCalledOnce();
  });
});

// Test suite for negative service scenarios (error cases)
describe('dogService negative test', () => {
  // Test case: Verify that the service throws an error when the API returns a failure status
  it('should throw an error when API returns ok: false', async () => {
    // Mock the global fetch function to return a failed response with status 500
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false, // Indicates failed HTTP response (non-2xx status)
        status: 500, // Server error status code
      } as Response)
    );
    
    // Assert that the service throws an error with the expected message
    await expect(getRandomDogImage()).rejects.toThrow('Dog API returned status 500');
    
    // Assert that the fetch function was called exactly once
    expect(global.fetch).toHaveBeenCalledOnce();
  });
});