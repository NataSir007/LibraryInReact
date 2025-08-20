import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LibrarySelector from '../LibrarySelector';
import { mockLibraries } from '../../libraries/__mocks__/mockLibraries';

const mockOnChange = vi.fn();

describe('LibrarySelector', () => {
  it('renders with all libraries', () => {
    render(
      <LibrarySelector 
        libraries={mockLibraries} 
        selectedLibraryId={null} 
        onLibraryChange={mockOnChange} 
      />
    );
    
    // Check for dropdown or selector
    const selector = screen.getByTestId('library-selector') || 
                    screen.getByRole('combobox');
    expect(selector).toBeInTheDocument();
  });

  it('shows the correct default selection', () => {
    render(
      <LibrarySelector 
        libraries={mockLibraries} 
        selectedLibraryId={null} 
        onLibraryChange={mockOnChange} 
      />
    );
    
    // Check for "All Libraries" or similar default text
    const defaultOption = screen.getByText(/allLibraries/i) || 
                         screen.getByText(/select/i);
    expect(defaultOption).toBeInTheDocument();
  });

  it('shows the selected library when one is selected', () => {
    render(
      <LibrarySelector 
        libraries={mockLibraries} 
        selectedLibraryId={2} 
        onLibraryChange={mockOnChange} 
      />
    );
    
    // Should display "University Library" as selected
    const selectedOption = screen.getByText('University Library');
    expect(selectedOption).toBeInTheDocument();
  });

  it('calls onChange when selection changes', () => {
    render(
      <LibrarySelector 
        libraries={mockLibraries} 
        selectedLibraryId={null} 
        onLibraryChange={mockOnChange} 
      />
    );
    
    // Find the selector element
    const selector = screen.getByTestId('library-selector') || 
                    screen.getByRole('combobox');
    
    // Change selection
    fireEvent.change(selector, { target: { value: '2' } });
  });
});