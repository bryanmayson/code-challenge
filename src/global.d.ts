import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

// extend Vi.Assertions to allow for jest and @testing-library/jest-dom matchers usage
declare global {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface JestAssertion<T = any>
      extends jest.Matchers<void, T>,
      TestingLibraryMatchers<T, void> {}
  }
}
