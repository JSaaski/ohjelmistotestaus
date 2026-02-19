import { describe, it, expect, vi } from "vitest";
import * as dogController from "../controllers/dogController";
import * as dogService from "../services/dogService";
import { Response } from "express";

// Test suite for negative API scenarios (error cases)
describe("dogApi negative test", () => {
  // Test case: Verify that the API returns a 500 error when the service fails
  it("GET /api/dogs/random should return 500 on service error", async () => {
    // Create a mock request object
    const mockReq = {} as any;
    
    // Mock the dogService to simulate a network error when fetching a dog image
    vi.spyOn(dogService, "getRandomDogImage").mockRejectedValue(
      new Error("Failed to fetch dog image:Network error")
    );

    // Create a mock response object with stubbed methods
    const mockRes: Partial<Response> = {
      status: vi.fn().mockReturnThis(), // Mock status method that returns itself for chaining
      json: vi.fn(), // Mock json method to send response data
    };

    // Call the controller function with mocked request and response
    await dogController.getDogImage(mockReq, mockRes as Response);
    
    // Assert that the response status was set to 500 (Internal Server Error)
    expect(mockRes.status).toHaveBeenCalledWith(500);
    
    // Assert that the response contains the error details in the expected format
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: "Failed to fetch dog image:Network error",
    });
  });
});
