// Task 2: test the Post component.
// Acceptance criteria
// 1) Include at least one snapshot.
// 2) The copy to clipboard functionality must be fully tested.
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, expect, test } from 'vitest'
import { render } from '@/test'
import { Posts } from './Posts'
import { usePost } from './hooks'
import { successResponse as mockedPosts } from './__mocks__'
import {Post} from "@/posts/Post.jsx";

const mockedPost = mockedPosts[0];

vi.mock('./hooks/usePost', () => ({
    usePost: vi.fn()
}));

describe('Post', () => {
    test('should match snapshot', () => {
        usePost.mockReturnValue({
            status: 'success',
            data: mockedPost
        });

        const { container } = render(<Post />, { wrapper: MemoryRouter });
        expect(container.firstChild).toMatchSnapshot();
    });

    test('should copy to clipboard', () => {
        usePost.mockReturnValue({
            status: 'success',
            data: mockedPost
        });

        const { container } = render(<Post />, { wrapper: MemoryRouter });
        const shareIcon = container.querySelector('#share-icon');
        //TODO: test the copy to clipboard functionality
    });
})