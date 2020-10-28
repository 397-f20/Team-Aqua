import 'react-native'
import React from 'react'
import {fireEvent, render, waitFor} from 'react-native-testing-library'
import {expect, it} from '@jest/globals'
import PinList from '../components/PinList'
import ModalPopUp from '../components/ModalPopUp'
import renderer from 'react-test-renderer'
import dummy_pins from "../dummy_pins.json"
import { PermissionsAndroid } from 'react-native'

//the modal component is automatically mocked by RN and apparently contains a bug which make the modal (and it's children) always visible in the test tree
//this is a hack which fix this issue
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const Modal = jest.requireActual('react-native/Libraries/Modal/Modal');
// @ts-ignore
  return props=> <Modal {...props}/>
})

describe("Passes Pins to PinList to check results", () => {

    it('Takes a pin that exists', () => {
        // dummy pin to check against marker choice
        const pin = [{
          "description" : "Awesome place!!",
          "id" : "1t35326",
          "latitude" : "42.0559",
          "longitude" : "-87.6702",
          "title" : "Northwestern Lakefill",
          "uri" : "https://i.pinimg.com/originals/3b/17/41/3b17413b18a807023c02a9b674bb5756.jpg"
        }]

        const {getByText, getByTestId, debug} = render(<PinList pins={pin} />)
        expect(()=> getByText(/Northwestern Lakefill/i)).toBeTruthy();
		expect(() => getByText(/Find Directions/i)).toBeTruthy();
    });

    it('Takes no pins', () => {
		const pin = []
		const {getByText, getByTestId, debug} = render(<PinList pins={pin} />)
		expect(()=> getByText(/No results/i)).toBeTruthy();
    });


});