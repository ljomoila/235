import React from 'react';
import SelectCountry from '../SelectCountry';
import { renderTest } from '../../testUtils';
import { fireEvent } from '@testing-library/react-native';

describe('SelectCountry', () => {
    it('renders picker, changes country and view when country changed and selected', () => {
        // given
        const appDispatch = jest.fn();
        // when
        const { getByTestId, getByText } = renderTest(<SelectCountry />, { appDispatch });

        // then
        const picker = getByTestId('select-country');
        expect(picker).toBeTruthy();

        // when: country selected
        fireEvent(picker, 'onValueChange', 'CAN');

        // and: select button pressed
        fireEvent(getByText('Select'), 'onPress');

        // then
        expect(appDispatch).toHaveBeenCalledWith(
            expect.objectContaining({ selectedCountry: 'CAN', activeView: 'scores' })
        );
    });
});
