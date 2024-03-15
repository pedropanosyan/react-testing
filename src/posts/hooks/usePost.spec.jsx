// Task 1: test the usePost hook here.
// Acceptance criteria:
// 1) Include a test that intercepts the post by id request and assert the returned data has the correct structure.
// 2) Include a test that covers passing extra arguments to usePost
// (e.g. when passing enabled = true, assert that the useQuery hook is called
// with an object that contains enabled: true).

import { createReactQueryWrapper, renderHook, server, waitFor } from '@/test'
import {http, HttpResponse} from "msw";
import {usePost} from "@/posts/hooks/usePost.js";
import { describe, expect, test } from 'vitest'
import { successResponse as mockedPosts } from '../__mocks__'

const postMock = mockedPosts[0];


describe('usePost', () => {
    test('should retrieve post by id', async () => {
        server.use(
            http.get(`https://jsonplaceholder.typicode.com/posts/1`, () => {
                return HttpResponse.json(postMock);
            })
        );

        const { result } = renderHook(() => usePost(1), { wrapper: createReactQueryWrapper() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(postMock);
    });

    test('should pass extra arguments to usePost', async () => {
        server.use(
            http.get(`https://jsonplaceholder.typicode.com/posts/1`, () => {
                return HttpResponse.json(postMock);
            })
        );

        const { result } = renderHook(() => usePost(1, { enabled: true }), { wrapper: createReactQueryWrapper() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toEqual(postMock);
    });
})