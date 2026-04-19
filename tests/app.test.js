import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

// Mock the child components to isolate App rendering
vi.mock('../src/components/Navbar', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>
}));
vi.mock('../src/components/Hero', () => ({
  Hero: () => <div data-testid="hero">Hero</div>
}));
vi.mock('../src/components/About', () => ({
  About: () => <div data-testid="about">About</div>
}));
vi.mock('../src/components/Projects', () => ({
  Projects: () => <div data-testid="projects">Projects</div>
}));
vi.mock('../src/components/Contact', () => ({
  Contact: () => <div data-testid="contact">Contact</div>
}));
vi.mock('../src/components/Footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>
}));

describe('App Component', () => {
  it('renders all main sections', () => {
    render(<App />);
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('about')).toBeInTheDocument();
    expect(screen.getByTestId('projects')).toBeInTheDocument();
    expect(screen.getByTestId('contact')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('has correct background color theme', () => {
    render(<App />);
    const appElement = screen.getByTestId('navbar').parentElement;
    expect(appElement).toHaveClass('bg-[#faf8f5]');
  });

  it('maintains proper section order', () => {
    render(<App />);
    const elements = [
      screen.getByTestId('hero'),
      screen.getByTestId('about'),
      screen.getByTestId('projects'),
      screen.getByTestId('contact')
    ];
    
    for (let i = 0; i < elements.length - 1; i++) {
      expect(elements[i].nextElementSibling).toBe(elements[i + 1]);
    }
  });
});

// Test individual components
describe('Hero Component', () => {
  it('displays name and role correctly', () => {
    render(<Hero />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Full-Stack Developer & UI Craftsman')).toBeInTheDocument();
  });

  it('has pulse animation on CTA button', () => {
    render(<Hero />);
    const button = screen.getByRole('button', { name: /let’s work together/i });
    expect(button).toHaveClass('pulse');
  });
});

describe('Projects Component', () => {
  it('renders exactly 3 project cards', () => {
    render(<Projects />);
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(3);
  });

  it('displays correct project information', () => {
    render(<Projects />);
    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
    expect(screen.getByText('BudgetWise')).toBeInTheDocument();
    expect(screen.getByText('FitTrack')).toBeInTheDocument();
    
    expect(screen.getByAltText(/screenshot of taskflow/i)).toBeInTheDocument();
  });
});

describe('Contact Component', () => {
  it('renders form fields with correct labels', () => {
    render(<Contact />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('shows validation errors for empty submission', async () => {
    render(<Contact />);
    const submitButton = screen.getByRole('button', { name: /send message/i });
    
    fireEvent.click(submitButton);
    
    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/please enter a valid email/i)).toBeInTheDocument();
    expect(await screen.findByText(/message must be at least 10 characters/i)).toBeInTheDocument();
  });
});