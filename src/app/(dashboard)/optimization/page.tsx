"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Optimization Page Component
 * 
 * Displays page loading performance metrics and provides suggestions for optimization.
 * Uses the /api/optimize endpoint to fetch timing data.
 * 
 * @returns {React.ReactElement} Optimization page with performance metrics
 */
export default function Optimization() {
  // State management for optimization data and UI states
  const [optimization, setOptimization] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches optimization data from the API
   * Uses AbortController for cancelable requests to prevent memory leaks
   */
  const fetchOptimizationData = useCallback(async () => {
    // Create an abort controller to cancel the fetch request if the component unmounts
    const abortController = new AbortController();
    
    try {
      setLoading(true);
      setError(null);
      
      // Use relative URL to avoid hardcoding domain - better for deployment across environments
      const response = await fetch("/api/optimize", {
        signal: abortController.signal,
        // Add cache control headers to properly manage caching
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setOptimization(data);
    } catch (error) {
      // Only set error state if it's not an abort error (which is expected on cleanup)
      if (error.name !== 'AbortError') {
        console.error('Failed to fetch optimization data:', error);
        setError('Failed to load optimization data. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
    
    // Return cleanup function to abort fetch if component unmounts during request
    return () => abortController.abort();
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    const cleanup = fetchOptimizationData();
    return () => {
      // Call the cleanup function returned by fetchOptimizationData
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [fetchOptimizationData]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Performance Optimization</h1>
      
      {/* Loading state with skeleton UI */}
      {loading && (
        <div className="animate-pulse">
          <p className="pb-3">Please wait while the page loads...</p>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      )}
      
      {/* Error state with retry option */}
      {error && (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
          <button 
            onClick={fetchOptimizationData}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Results display when data is available */}
      {!loading && !error && optimization !== null && (
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="mb-2">
            The page took{" "}
            <span className="font-bold text-xl bg-[#E5FF00] px-2 py-1 rounded">
              {optimization}
            </span>{" "}
            seconds to load.
          </p>
          <p className="text-gray-700">
            Please optimize the code with GitHub Copilot to improve the response time.
          </p>
          {optimization > 1 && (
            <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-300">
              <p className="font-semibold">Optimization Tips:</p>
              <ul className="list-disc ml-5 mt-2">
                <li>Consider implementing data caching</li>
                <li>Use Next.js Server Components where appropriate</li>
                <li>Add proper error boundaries to prevent cascading failures</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
