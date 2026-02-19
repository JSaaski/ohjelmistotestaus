import { describe, expect, it, vi } from 'vitest';
import * as dogService from '../services/dogService';
import { getDogImage } from '../controllers/dogController';

// Test suite for positive controller scenarios (success cases)
describe('dogController positive test', () => {
  // Test case: Verify that the controller successfully returns a dog image
  it('should return a dog image successfully', async () => {
    // Create a mock response object that the service would return
    const mockResponse = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success',
    }
    
    // Mock the dogService to return the mock response when called
    const getRandomDogImageSpy = vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockResponse);

    // Create mock request and response objects
    const _req = {} as any; // Empty request object
    const _res = {
      json: vi.fn(), // Mock json method to send response data
      status: vi.fn(() => _res), // Mock status method that returns itself for chaining
    } as any;
    
    // Call the controller function with mocked request and response
    await getDogImage(_req, _res);

    // Assert that the service was called exactly once
    expect(getRandomDogImageSpy).toHaveBeenCalledOnce();
    
    // Assert that the response json method was called exactly once
    expect(_res.json).toHaveBeenCalledOnce();
    
    // Assert that the response contains the correct success data structure
    expect(_res.json).toHaveBeenCalledWith({
      success: true,
      data: mockResponse,
    });
  })
});