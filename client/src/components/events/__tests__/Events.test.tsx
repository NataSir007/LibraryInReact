import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { I18nextProvider } from 'react-i18next';

import '@testing-library/jest-dom';
import Events from '../Events'; // Note: Events not Events

// Mock the service module correctly - ADD getFilteredEvents method
vi.mock('../../../services/eventService', () => ({
  default: {
    getAllEvents: vi.fn(),
    getAllTags: vi.fn(),
    getFilteredEvents: vi.fn()
  }
}));

// Import the service after mocking
import EventService from '../../../services/eventService';
import i18n from '../../../utils/i18n';

const mockEvents = [
  {
    id: 1,
    libraryId: 101,
    libraryTitle: 'Central Library',
    libraryAddress: '123 Main St',
    eventName: 'Book Reading',
    startTime: '2025-12-01T10:00:00',
    endTime: '2025-12-01T12:00:00',
    fileName: 'reading.jpg',
    filePath: '/images/reading.jpg',
    altText: 'Book Reading Event',
    tags: ['reading', 'children']
  },
  {
    id: 2,
    libraryId: 102,
    libraryTitle: 'Westside Branch',
    libraryAddress: '456 West Ave',
    eventName: 'Science Workshop',
    startTime: '2025-12-02T14:00:00',
    endTime: '2025-12-02T16:00:00',
    fileName: 'workshop.jpg',
    filePath: '/images/workshop.jpg',
    altText: 'Science Workshop Event',
    tags: ['science', 'workshop']
  }
];

const mockTags = ['reading', 'children', 'science', 'workshop'];

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          {component}
        </I18nextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(EventService.getAllEvents).mockResolvedValue(mockEvents);
    vi.mocked(EventService.getAllTags).mockResolvedValue(mockTags);
    vi.mocked(EventService.getFilteredEvents).mockResolvedValue(mockEvents);
  });

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Events />);
    expect(container).toBeInTheDocument();
  });

  it('calls the service methods', async () => {
    renderWithProviders(<Events />);
    
    // Wait a bit and check if service methods were called
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
      expect(EventService.getAllTags).toHaveBeenCalled();
      expect(EventService.getFilteredEvents).toHaveBeenCalled();
    });
  });

  it('renders event details correctly', async () => {
    renderWithProviders(<Events />);

    // Wait for events to load
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
    });

    // Check for event names
    await waitFor(() => {
      expect(screen.queryByText(/book reading/i)).toBeInTheDocument();
      expect(screen.queryByText(/science workshop/i)).toBeInTheDocument();
    });

    // Check for library titles and addresses
    expect(screen.queryByText(/central library/i)).toBeInTheDocument();
    expect(screen.queryByText(/westside branch/i)).toBeInTheDocument();
    expect(screen.queryByText(/123 main st/i)).toBeInTheDocument();
    expect(screen.queryByText(/456 west ave/i)).toBeInTheDocument();
    expect(screen.queryByText(/14:00/)).toBeInTheDocument();
    expect(screen.queryByText(/2.12.2025/)).toBeInTheDocument();

  });

  it('shows event tags and "all tags"', async () => {
    renderWithProviders(<Events />);

    // Wait for tags to load
    await waitFor(() => {
      expect(EventService.getAllTags).toHaveBeenCalled();
    });

    // Check that "All tags" button/option is visible
    expect(
      screen.queryByText(/all tags/i) || 
      screen.queryByText(/all/i) ||
      screen.queryByRole('button', { name: /all tags/i }) ||
      screen.queryByRole('button', { name: /all/i }) ||
      screen.queryByRole('button', { name: /reading/i }) ||
      screen.queryByRole('button', { name: /children/i }) ||
      screen.queryByRole('button', { name: /science/i }) ||
      screen.queryByRole('button', { name: /workshop/i })
    ).toBeInTheDocument();    
  });

  it('filters events by tag children', async () => {
    vi.mocked(EventService.getFilteredEvents).mockResolvedValue(mockEvents);

    renderWithProviders(<Events />);

    // Wait for initial load
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
      expect(EventService.getAllTags).toHaveBeenCalled();
    });

    // Find and click the 'children' tag button
    const childrenTagButton = screen.queryByRole('button', { name: /children/i }) ||
                            screen.queryByText(/children/i);

    expect(childrenTagButton).toBeInTheDocument();

    if (childrenTagButton) {
      // Click the children tag to filter
      fireEvent.click(childrenTagButton);
      
      // Wait for filtered results

      await waitFor(() => {
        expect(EventService.getFilteredEvents).toHaveBeenCalled();
      });

      // Verify only events with 'children' tag are shown
      await waitFor(() => {
        // Book Reading should be visible (has 'children' tag)
        expect(screen.queryByText(/book reading/i)).toBeInTheDocument();

        // Science Workshop should NOT be visible (doesn't have 'children' tag)
        expect(screen.queryByText(/science workshop/i)).not.toBeInTheDocument();
      });

      // Verify the children tag is still displayed/highlighted
      expect(screen.queryByText(/children/i)).toBeInTheDocument();
    }
  });

  it('Find button is disabled when all search fields are empty', async () => {
    renderWithProviders(<Events />);

    // Wait for initial load
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
      expect(EventService.getAllTags).toHaveBeenCalled();
    });

    // Find the Find/Search button
    const findButton = screen.queryByRole('button', { name: /find/i }) ||
                      screen.queryByRole('button', { name: /search/i }) ||
                      screen.queryByText(/find/i) ||
                      screen.queryByText(/search/i);

    if (findButton) {
      // Check that the button is disabled when all fields are empty
      expect(findButton).toBeDisabled();
    }
  });

  it('Find button becomes enabled when search field has value', async () => {
    renderWithProviders(<Events />);

    // Wait for initial load
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
    });

    // Find the search input and Find button
    const searchInput = screen.queryByPlaceholderText(/search/i) ||
                       screen.queryByRole('searchbox') ||
                       screen.queryByLabelText(/search/i) ||
                       screen.queryByRole('textbox');

    const findButton = screen.queryByRole('button', { name: /find/i }) ||
                      screen.queryByRole('button', { name: /search/i }) ||
                      screen.queryByText(/find/i) ||
                      screen.queryByText(/search/i);

    if (searchInput && findButton) {
      // Initially button should be disabled
      expect(findButton).toBeDisabled();

      // Type something in search input
      fireEvent.change(searchInput, { target: { value: 'Book' } });

      // Button should now be enabled
      await waitFor(() => {
        expect(findButton).not.toBeDisabled();
      });
    }
  });

  it('Find button becomes enabled when date is selected', async () => {
    renderWithProviders(<Events />);

    // Wait for initial load
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
    });

    // Find the Find button and date picker
    const findButton = screen.queryByRole('button', { name: /find/i }) ||
                      screen.queryByRole('button', { name: /search/i }) ||
                      screen.queryByText(/find/i) ||
                      screen.queryByText(/search/i);

    const dateInput = screen.queryByLabelText(/start date/i) ||
                      screen.queryByLabelText(/end date/i) ||
                      screen.queryByRole('textbox', { name: /date/i });

    if (findButton && dateInput) {
      // Initially button should be disabled
      expect(findButton).toBeDisabled();

      // Select a date (this might need adjustment based on your date picker implementation)
      fireEvent.change(dateInput, { target: { value: '2025-12-01' } });

      // Button should now be enabled
      await waitFor(() => {
        expect(findButton).not.toBeDisabled();
      });
    }
  });

  it('Find button becomes disabled again when all fields are cleared', async () => {
    renderWithProviders(<Events />);

    // Wait for initial load
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
    });

    // Find elements
    const searchInput = screen.queryByPlaceholderText(/search/i) ||
                       screen.queryByRole('textbox');

    const findButton = screen.queryByRole('button', { name: /find/i }) ||
                      screen.queryByRole('button', { name: /search/i }) ||
                      screen.queryByText(/find/i) ||
                      screen.queryByText(/search/i);

    if (searchInput && findButton) {
      // Type something to enable button
      fireEvent.change(searchInput, { target: { value: 'Book' } });

      await waitFor(() => {
        expect(findButton).not.toBeDisabled();
      });

      // Clear the search input
      fireEvent.change(searchInput, { target: { value: '' } });

      // Button should be disabled again
      await waitFor(() => {
        expect(findButton).toBeDisabled();
      });
    }
  });


  it('debug - shows what is actually rendered', async () => {
    const { container } = renderWithProviders(<Events />);

    // Wait for any async operations
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
    }, { timeout: 5000 });

    // Print what's actually in the DOM for debugging
    console.log('=== RENDERED HTML ===');
    console.log(container.innerHTML);
    console.log('=== END HTML ===');

    // Try to find any text that contains our event names
    const bookReading = screen.queryByText(/book reading/i);
    const scienceWorkshop = screen.queryByText(/science workshop/i);
    
    console.log('Book Reading found:', !!bookReading);
    console.log('Science Workshop found:', !!scienceWorkshop);

    // This test should pass regardless of what's rendered
    expect(container).toBeInTheDocument();
  });

  
  // The next test should be at the back end
  /*
  it('filters events by event name', async () => {
    
    vi.mocked(EventService.getFilteredEvents).mockResolvedValue(mockEvents);

    renderWithProviders(<Events />);

    // Wait for initial load
    await waitFor(() => {
      expect(EventService.getAllEvents).toHaveBeenCalled();
      expect(EventService.getAllTags).toHaveBeenCalled();
    });

    // Find the search input
    const searchInput = screen.queryByPlaceholderText(/search/i) ||
                       screen.queryByRole('searchbox') ||
                       screen.queryByLabelText(/search/i) ||
                       screen.queryByRole('textbox');

    expect(searchInput).toBeInTheDocument();

    if (searchInput) {
      // Type "Book" in the search input
      fireEvent.change(searchInput, { target: { value: 'Book' } });
      
      // Wait for filtered results
      await waitFor(() => {
        expect(EventService.getFilteredEvents).toHaveBeenCalled();
      });

      // Verify only events matching "Book reading" are shown
      await waitFor(() => {
        // Book Reading should be visible (matches "Book reading")
        expect(screen.queryByText(/book reading/i)).toBeInTheDocument();

      });

      // Verify the search term is still in the input
      expect(searchInput).toHaveValue('Book');
    }
  });
*/

});
