import { describe, it, expect, vi } from "vitest";
import * as dogController from "../controllers/dogController";
import * as dogService from "../services/dogService";
import { Response } from "express";

// Test suite for positive route scenarios (success cases)
describe("dogRoutes positive test", () => {
  // Test case: Verify that the GET /api/dogs/random endpoint successfully returns a dog image
  it("GET /api/dogs/random should return a dog image", async () => {
    // Create a mock request object
    const mockReq = {} as any;
    
    // Create a mock response object that the service would return
    const mockDogServiceResponse = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success",
    };

    // Mock the dogService to return the mock response when called
    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockDogServiceResponse);

    // Create a mock response object with stubbed json method
    const mockRes: Partial<Response> = {
      json: vi.fn(), // Mock json method to send response data
    };

    // Call the controller function with mocked request and response
    await dogController.getDogImage(mockReq, mockRes as Response);

    // Assert that the response contains the correct success data structure with the dog image
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogServiceResponse,
    });

  });
});
