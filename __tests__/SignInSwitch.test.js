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

it('can switch from sign in to sign up modal', async () => {
  const {getByText, getByTestId, debug} = render(<UserInput />)

  fireEvent.press(getByTestId('signInButton'))
  await waitFor(()=> getByText(/Or, Create an Account/i))

  fireEvent.press(getByText(/Or, Create an Account/i))
  await waitFor(()=> getByText(/Or, Log In/i)) //modal is now visible
});
