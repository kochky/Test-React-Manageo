import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

test('Header is rendered in App', () => {
  render(<App />);
  expect(screen.getByText('REACT INTERVIEW')).toBeInTheDocument();
});

test('Hero is rendered in App', () => {
  render(<App />);
  expect(screen.getByText('Créé avec :')).toBeInTheDocument();
});

test('Footer is rendered in App', () => {
  render(<App />);
  expect(screen.getByText('Créé par Koch Christopher')).toBeInTheDocument();
});

test('PeopleList is rendered in App', () => {
  render(<App />);
  expect(screen.getByText('Liste de personnes')).toBeInTheDocument();
});