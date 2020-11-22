import 'react-native';
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import {fireEvent, render, waitFor} from 'react-native-testing-library';
import {expect, it} from '@jest/globals';
import InputModal from '../components/InputModal';
import SelectImage from '../components/SelectImage';

it('input modal only accepts valid input', async () => {

    const {getByText, getByTestId, debug} = render(<InputModal />)

    await waitFor(()=> getByText(/Choose an Image for Your Spot/i))

    // expect the form to be open
    fireEvent.press(getByText(/Add Your Spot/i))

    expect(()=> getByText(/Give your spot a title/i))
    expect(()=> getByText(/Give your spot a description/i))
  });

  //Title is a required field
  //Description is a required field
  //Alert   no image

  //Pick an Image from Camera Roll
  //Add Pin
  //Name of the Spot
  //How would you describe this Spot?
  //ADD THE SPOT
