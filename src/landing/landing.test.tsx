import { act, render } from "@testing-library/react";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { App } from "@/app";
import { TID_LANDING_PAGE } from "@/_tests/testIds";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { API_REQUEST_INVITE } from "@/_api/endpoint";

const {
  PAGE,
  TITLE,
  DESC,
  INVITE_BUTTON,
  INVITE_FORM,
  INVITE_SUCCESS,
  INVITE_SERVER_ERR,
} = TID_LANDING_PAGE;

export const restHandlers = [
  http.post(API_REQUEST_INVITE, () => {
    return HttpResponse.text("ok", { status: 200 });
  }),
];

const server = setupServer(...restHandlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("landing/index.tsx", () => {
  beforeEach(async () => {
    render(<App />);
    await screen.findByTestId(PAGE);
  });

  it("components loaded with expected text", async () => {
    expect(screen.getByTestId(PAGE)).toBeDefined();

    const LandingPageTitle = screen.getByTestId(TITLE);
    expect(LandingPageTitle.textContent).toBe(
      "A better way to enjoy every day."
    );

    const LandingPageDesc = screen.getByTestId(DESC);
    expect(LandingPageDesc.textContent).toBe(
      "Be the first to know when we launch."
    );

    const InviteButton = screen.getByTestId(INVITE_BUTTON);
    expect(InviteButton.textContent).toBe("Request an Invite");
  });

  describe("invite button toggles dialog", () => {
    beforeEach(() => {
      const InviteButton = screen.getByTestId(INVITE_BUTTON);
      act(() => {
        fireEvent.click(InviteButton);
      });
    });

    it("render form with expected placeholder", () => {
      // Check Form
      const InviteForm = screen.getByTestId(INVITE_FORM);
      expect(InviteForm).toBeDefined();

      // Define Form Elements
      const NameInput = InviteForm.querySelector('input[name="name"]');
      const EmailInput = InviteForm.querySelector('input[name="email"]');
      const ConfirmEmailInput = InviteForm.querySelector(
        'input[name="confirm_email"]'
      );
      const SubmitButton = InviteForm.querySelector('button[type="submit"]');
      if (!NameInput || !EmailInput || !ConfirmEmailInput || !SubmitButton) {
        throw new Error("form inputs not complete");
      }

      expect(NameInput.getAttribute('placeholder') === 'Full name')
      expect(EmailInput.getAttribute('placeholder') === 'Email')
      expect(EmailInput.getAttribute('placeholder') === 'Confirm email')
    });

    it("form validation error", async () => {
      // Check Form
      const InviteForm = screen.getByTestId(INVITE_FORM);
      expect(InviteForm).toBeDefined();

      // Define Form Elements
      const NameInput = InviteForm.querySelector('input[name="name"]');
      const EmailInput = InviteForm.querySelector('input[name="email"]');
      const ConfirmEmailInput = InviteForm.querySelector(
        'input[name="confirm_email"]'
      );
      const SubmitButton = InviteForm.querySelector('button[type="submit"]');
      if (!NameInput || !EmailInput || !ConfirmEmailInput || !SubmitButton) {
        throw new Error("form inputs not complete");
      }

      let ErrorMessageElement;

      // 1. All Empty Validation
      act(() => {
        fireEvent.click(SubmitButton);
      });
      ErrorMessageElement = await screen.findByText(
        "Full name must be at least 3 characters."
      );
      expect(ErrorMessageElement).toBeDefined();

      ErrorMessageElement = await screen.findAllByText(
        "You must give an email address."
      );
      expect(ErrorMessageElement.length).toEqual(2);

      // 2. Invalid Emails
      act(() => {
        fireEvent.input(NameInput, { target: { value: "Ted Lasso" } });
        fireEvent.input(EmailInput, { target: { value: "Ted Lasso" } });
        fireEvent.input(ConfirmEmailInput, {
          target: { value: "Ted Lasso" },
        });
        fireEvent.click(SubmitButton);
      });

      ErrorMessageElement = await screen.findAllByText(
        "This is not a valid email."
      );
      expect(ErrorMessageElement.length).toEqual(2);

      // 3. Mismatch
      act(() => {
        fireEvent.input(NameInput, { target: { value: "Ted Lasso" } });
        fireEvent.input(EmailInput, {
          target: { value: "tedlasso@gmail.com" },
        });
        fireEvent.input(ConfirmEmailInput, {
          target: { value: "bryan@gmail.com" },
        });
        fireEvent.click(SubmitButton);
      });

      ErrorMessageElement = await screen.findByText("Email does not match.");
      expect(ErrorMessageElement).toBeDefined();
    });

    it("form submission success", async () => {
      // Check Form
      const InviteForm = screen.getByTestId(INVITE_FORM);
      expect(InviteForm).toBeDefined();

      // Define Form Elements
      const NameInput = InviteForm.querySelector('input[name="name"]');
      const EmailInput = InviteForm.querySelector('input[name="email"]');
      const ConfirmEmailInput = InviteForm.querySelector(
        'input[name="confirm_email"]'
      );
      const SubmitButton = InviteForm.querySelector('button[type="submit"]');
      if (!NameInput || !EmailInput || !ConfirmEmailInput || !SubmitButton) {
        throw new Error("form inputs not complete");
      }

      // Add Form & Submit
      act(() => {
        fireEvent.input(NameInput, { target: { value: "Ted Lasso" } });
        fireEvent.input(EmailInput, {
          target: { value: "tedlasso@gmail.com" },
        });
        fireEvent.input(ConfirmEmailInput, {
          target: { value: "tedlasso@gmail.com" },
        });
        fireEvent.submit(SubmitButton);
      });

      // Loading State After Submit
      expect(await screen.findByText("Sending, please wait...")).toBeDefined();

      // Display Success Dialog
      const SuccessDialogElement = await screen.findByTestId(INVITE_SUCCESS);
      expect(SuccessDialogElement).toBeDefined();
      const OkButton = SuccessDialogElement.querySelector(
        'button[type="button"]'
      );

      if (!OkButton) {
        throw new Error("OK Button not found");
      }

      // Trigger Close Modal
      act(() => {
        fireEvent.submit(OkButton);
      });
      waitFor(() => {
        expect(screen.getByTestId(INVITE_SUCCESS)).toBeUndefined();
      });
    });

    it("form submission error", async () => {
      // Check Form
      const InviteForm = screen.getByTestId(INVITE_FORM);
      expect(InviteForm).toBeDefined();

      // Define Form Elements
      const NameInput = InviteForm.querySelector('input[name="name"]');
      const EmailInput = InviteForm.querySelector('input[name="email"]');
      const ConfirmEmailInput = InviteForm.querySelector(
        'input[name="confirm_email"]'
      );
      const SubmitButton = InviteForm.querySelector('button[type="submit"]');
      if (!NameInput || !EmailInput || !ConfirmEmailInput || !SubmitButton) {
        throw new Error("form inputs not complete");
      }

      // Override API Response to Status 400
      server.use(
        http.post(API_REQUEST_INVITE, () => {
          return HttpResponse.json(
            { errorMessage: "sever error" },
            { status: 400 }
          );
        })
      );

      // Add Form & Submit
      act(() => {
        fireEvent.input(NameInput, { target: { value: "Ted Lasso" } });
        fireEvent.input(EmailInput, {
          target: { value: "tedlasso@gmail.com" },
        });
        fireEvent.input(ConfirmEmailInput, {
          target: { value: "tedlasso@gmail.com" },
        });
        fireEvent.submit(SubmitButton);
      });

      // Loading State After Submit
      expect(await screen.findByText("Sending, please wait...")).toBeDefined();

      // Display Server Error Message
      const ServerErrorElement = await screen.findByTestId(INVITE_SERVER_ERR);
      expect(ServerErrorElement).toBeDefined();
      expect(ServerErrorElement.textContent === "server error");
    });
  });
});
