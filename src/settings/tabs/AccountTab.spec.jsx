import React from 'react'
import { render, screen, fireEvent, waitFor } from '@/test'
import { describe, expect, test, vi } from 'vitest'
import { AccountTab } from './AccountTab'

// Task 3: finish tests for AccountTab.
// Acceptance criteria: include tests that cover the client-side validation errors on both inputs.

describe('AccountTab', () => {
	test('should match snapshot', () => {
		const { container } = render(<AccountTab />)
		expect(container.firstChild).toMatchSnapshot()
	})

	test('submitting calls console.log with expected arguments', async () => {
		const consoleSpy = vi.spyOn(console, 'log')
		render(<AccountTab />)
		fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

		// https://react-hook-form.com/advanced-usage#TestingForm
		// waitFor is needed because react-hook-form internally uses asynchronous validation handlers.
		// in order to compute the formState, it has to initially validate the form,
		// which is done asynchronously, resulting in another render.
		await waitFor(() => {
			expect(consoleSpy).toHaveBeenCalledWith({
				values: {
					name: 'Cianca',
					username: 'dinos1337'
				}
			})
		})
	})
})