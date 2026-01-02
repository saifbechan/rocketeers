import Contact from '@/components/Contact';
import { render, screen, waitFor } from '@testing-library/react';

describe('Contact', () => {
  test('renders the contact information correctly', async () => {
    render(<Contact />);

    // Check if the contact section is present using aria-label
    const contactSection = screen.getByLabelText('Contact information');
    expect(contactSection).toBeDefined();

    // Check if the logo image is present
    const logo = screen.getByAltText('Rocketeer');
    expect(logo).toBeDefined();

    // The icons are loaded dynamically, so we wait for them to appear
    // This also helps with the "act" warning
    await waitFor(() => {
      expect(screen.getByText(/github:/i)).toBeDefined();
      expect(screen.getByText(/linkedin:/i)).toBeDefined();
    });
  });
});
