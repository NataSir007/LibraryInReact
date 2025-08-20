import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LibraryDetails from '../LibraryDetails';

import { mockLibraries } from '../__mocks__/mockLibraries';

describe('LibraryDetails', () => {
  const mockLibrary = mockLibraries[1]; // Use the second mock library for testing

  it('renders the library details', async () => {
    render(<LibraryDetails library={mockLibrary} />);
    
    // Wait for any async operations to complete
    await waitFor(() => {
      expect(screen.getByText('University Library')).toBeInTheDocument();
    });    

  });

  it('renders the library address', async () => {
    render(<LibraryDetails library={mockLibrary} />);
    
    await waitFor(() => {
      expect(screen.getByText('456 Campus Ave')).toBeInTheDocument();
    });
  });

  it('displays contact e-mail', async () => {
    render(<LibraryDetails library={mockLibrary} />);
    
    await waitFor(() => {
      expect(screen.getByText('alice.johnson@university-library.edu')).toBeInTheDocument();
    });
  });

  it('renders links to social media', async () => {
    render(<LibraryDetails library={mockLibrary} />);  
    
    // Check for Facebook link
    await waitFor(() => {
      expect(screen.getByRole('link', {
        name: /facebook/i,
      })).toBeInTheDocument();
    });
  });
});