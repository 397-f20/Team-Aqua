import 'react-native'
import React from 'react'
import {fireEvent, render, waitFor} from 'react-native-testing-library'
import {expect, it} from '@jest/globals'
import UserInput from '../components/UserInput'
import SelectImage from '../components/SelectImage'


jest.mock('react-native/Libraries/Modal/Modal', () => {
    const Modal = jest.requireActual('react-native/Libraries/Modal/Modal');
    return props=> <Modal {...props}/>
  })

it('input modal only accepts valid input', async () => {

    const {getByText, getByTestId, debug} = render(<UserInput />)
    
    fireEvent.press(getByText(/Add a Spot/i))
    await waitFor(()=> getByText(/Add Pin/i)) //modal is now visible
 
     expect(()=> getByText(/Add Pin/i)).toThrow(/no instances found/i) //modal is initially closed
 
     fireEvent.press(getByTestId('close'))
    expect(()=> getByText(/Add Pin/i)).toThrow(/no instances found/i) //modal is closed again
  });