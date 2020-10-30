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
    
    // open Add a Spot modal
    fireEvent.press(getByText(/Add a Spot/i))
    await waitFor(()=> getByText(/Choose an Image for Your Spot/i)) 
 
    // expect the form to be open
    expect(()=> getByText(/Pick an Image from Camera Roll/i)) 

    // expect the form to be open
    fireEvent.press(getByText(/ADD YOUR SPOT/i))

    expect(()=> getByText(/Image is required/i)) 
    expect(()=> getByText(/Title is a required field/i)) 
    expect(()=> getByText(/Description is a required field/i)) 

     fireEvent.press(getByTestId('close'))
    expect(()=> getByText(/Add Pin/i)).toThrow(/no instances found/i) //modal is closed again
  });

  //Title is a required field
  //Description is a required field
  //Alert   no image

  //Pick an Image from Camera Roll
  //Add Pin
  //Name of the Spot
  //How would you describe this Spot?
  //ADD THE SPOT
