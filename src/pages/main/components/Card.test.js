import { render, screen, fireEvent } from '@testing-library/react';
import Card from "./Card";
import {BrowserRouter} from "react-router-dom";

describe('render card', () => {

  beforeEach(() => {
    render(<BrowserRouter><Card /></BrowserRouter>);
  });

  it('renders demo', () => {
    const linkElement = screen.getByText(/Демонстрирует/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders button', () => {
    const linkElement = screen.getByRole('button');
    expect(linkElement).toBeInTheDocument();
  });

})

