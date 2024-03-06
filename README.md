# WIP

## Task #1: test the usePost hook

**Acceptance criteria**

1) Include a test that intercepts the post by id request and assert the returned data has the correct structure.

2) Include a test that covers passing extra arguments to usePost (e.g. when passing `enabled = true`, assert that the useQuery hook is called with an object that contains `enabled: true`).

## Task #2: test the Post component

**Acceptance criteria**

1) Include at least one snapshot.

2) The copy to clipboard functionality must be fully tested.

## Task #3: add test cases to cover client-side validation errors on the AccountTab component

**Acceptance criteria**

A single test case for both inputs is fine since the validators are the same.
Take into account that validation errors will appear after you submit.

## Task #4: add form validation to PasswordTab component and test it

**Acceptance criteria**

1) Add form validation that makes sense, as a minimum:

- `New password` can't be equal to `Current password`.
- `New password` must match the `Repeat new password`.

You can follow a similar approach as in the AccountTab component.

2) When the form has no errors and is submitted, add a toast with:

- Title: `Success`.
- Text: `Password changed`.

3) Add tests aiming to cover all the functionality.