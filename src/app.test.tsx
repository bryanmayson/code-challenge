import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./app";

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
});
