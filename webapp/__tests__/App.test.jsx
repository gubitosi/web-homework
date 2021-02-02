import React from "react"
import renderer from 'react-test-renderer';
import AppRouter from "../src/routes"
import { Home } from '../src/home'
import { Transactions } from '../src/transactions'

it('renders correctly', () => {
  const tree = renderer
    .create(<AppRouter />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Home />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
