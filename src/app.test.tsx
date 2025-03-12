import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./app";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundaryDisplay } from "./_components/ErrorBoundaryDisplay";
import { useEffect } from "react";
import { TID_SITE } from "./_tests/testIds";

describe("app.tsx", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("initial page loader present", () => {
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("show header & footer", async () => {
    expect(await screen.findByTestId("site-page")).toBeDefined();
    expect(screen.getByTestId("site-header")).toBeDefined();
    expect(screen.getByTestId("site-footer")).toBeDefined();
  });

  it("functional error boundary", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementationOnce(() => {});
    const ErrorComponent = () => {
      useEffect(() => {
        throw new Error('uncaught error')
      },[])
      return null
    };
    render(
      <ErrorBoundary fallback={<ErrorBoundaryDisplay />}>
        <ErrorComponent />
      </ErrorBoundary>
    );
    consoleErrorSpy.mockRestore();

    expect(await screen.findByTestId(TID_SITE.ERROR_BOUNDARY)).toBeInTheDocument();
  });
});
