import 'react-native'
import React from 'react'
import {fireEvent, render, waitFor} from 'react-native-testing-library'
import {expect, it} from '@jest/globals'
import UserInput from '../components/UserInput'

//the modal component is automatically mocked by RN and apparently contains a bug which make the modal (and it's children) always visible in the test tree
//this is a hack which fix this issue
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const Modal = jest.requireActual('react-native/Libraries/Modal/Modal');
// @ts-ignore
  return props=> <Modal {...props}/>
})

it('renders input modal correctly', async () => {
  const {getByText, getByTestId, debug} = render(<UserInput />)

  expect(()=> getByText(/Choose an Image for Your Spot/i)).toThrow(/no instances found/i) //modal is initially closed

  fireEvent.press(getByText(/Add a Spot/i))
  await waitFor(()=> getByText(/Choose an Image for Your Spot/i)) //modal is now visible

  fireEvent.press(getByTestId('close'))
  expect(()=> getByText(/Choose an Image for Your Spot/i)).toThrow(/no instances found/i) //modal is closed again
});
