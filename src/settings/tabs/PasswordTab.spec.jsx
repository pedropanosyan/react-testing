// Task 4: test the PasswordTab component here, aiming for 100% coverage.
// Acceptance criteria:
// 1) Add form validation that makes sense, as a minimum:

// - `New password` can't be equal to `Current password`.
// - `New password` must match the `Repeat new password`.

// To build the form and the validation schema, you can follow a similar approach as in the AccountTab component.

// 2) When the form has no errors and is submitted, show a toast with:

// - Title: `Success`.
// - Text: `Password changed`.

// 3) Add tests aiming to cover all the functionality.
import React from 'react'
import {PasswordTab} from "./PasswordTab.jsx";
import { render, screen, fireEvent } from '@/test'
import {describe, expect, test, vi} from 'vitest'
import {waitFor} from "@testing-library/react";

describe('PasswordTab', () => {

    test('submit form with valid data', async () => {
        render(<PasswordTab />);

        fireEvent.change(screen.getByPlaceholderText('Current'), { target: { value: 'currentPassword' } });
        fireEvent.change(screen.getByPlaceholderText('New'), { target: { value: 'newPassword' } });
        fireEvent.change(screen.getByPlaceholderText('Repeat new'), { target: { value: 'newPassword' } });

        fireEvent.click(screen.getByText('Submit'));
        await waitFor(() => {
            expect(screen.getByText('Password changed')).toBeInTheDocument();
        });
    });

    test('does not pass validation if new passwords do not match', async () => {
        render(<PasswordTab />);

        fireEvent.change(screen.getByPlaceholderText('Current'), { target: { value: 'currentPassword' } });
        fireEvent.change(screen.getByPlaceholderText('New'), { target: { value: 'newPassword' } });
        fireEvent.change(screen.getByPlaceholderText('Repeat new'), { target: { value: 'differentPassword' } });

        fireEvent.click(screen.getByText('Submit'));

        await expect(screen.queryByText('Password changed')).toBeNull();
    });

    test('does not pass validation if current password matches new password', async () => {
        render(<PasswordTab />);

        fireEvent.change(screen.getByPlaceholderText('Current'), { target: { value: 'currentPassword' } });
        fireEvent.change(screen.getByPlaceholderText('New'), { target: { value: 'currentPassword' } });
        fireEvent.change(screen.getByPlaceholderText('Repeat new'), { target: { value: 'currentPassword' } });

        fireEvent.click(screen.getByText('Submit'));

        expect(screen.queryByText('Password changed')).toBeNull();
    });
})