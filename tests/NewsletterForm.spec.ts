import userEvent from "@testing-library/user-event";
import { cleanup, render, within } from "@testing-library/vue";
import { afterEach, describe, expect, it } from "vitest";
import NewsletterForm from "../src/components/NewsletterForm.vue";

describe("newsletter form", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show form on first load", async () => {
    const comp = render(NewsletterForm);
    const heading = comp.queryByRole("heading", { name: /stay updated/i });
    const list = comp.queryByRole("list");
    const items = comp.queryAllByRole("listitem");
    const form = comp.getByRole("form");

    expect(heading).toBeVisible();
    expect(list).toBeVisible();
    expect(items.length).toBe(3);
    expect(form).toBeVisible();
  });

  it("should not expose illustration to accessibility tree", async () => {
    const comp = render(NewsletterForm);
    const img = comp.queryByRole("img");
    expect(img).not.toBeInTheDocument();
  });

  it("should not have error message on load", async () => {
    const comp = render(NewsletterForm);
    const emailInput = comp.queryByRole("textbox");

    expect(emailInput).toHaveAccessibleName("Email address");
    expect(emailInput).toBeRequired();
    expect(emailInput).not.toHaveAccessibleErrorMessage();
  });

  it("should show error when typing bad input", async () => {
    const comp = render(NewsletterForm);
    const emailInput = comp.getByRole("textbox");
    const submitButton = comp.getByRole("button", { name: /subscribe/i });

    await userEvent.type(emailInput, "bademail$");
    expect(emailInput).toHaveAccessibleErrorMessage("Valid email required");
    expect(submitButton).toBeDisabled();
  });

  it("should not show error with good input", async () => {
    const comp = render(NewsletterForm);
    const emailInput = comp.getByRole("textbox");
    const submitButton = comp.getByRole("button", { name: /subscribe/i });

    await userEvent.type(emailInput, "goodemail@company.com");
    expect(emailInput).not.toHaveAccessibleErrorMessage();
    expect(submitButton).toBeEnabled();
  });

  it("should show dialog when submitted", async () => {
    const comp = render(NewsletterForm);
    const emailInput = comp.getByRole("textbox");
    const submitButton = comp.getByRole("button", { name: /subscribe/i });

    await userEvent.type(emailInput, "goodemail@company.com");
    await userEvent.click(submitButton);

    expect(emailInput).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();

    // TESTING THE DIALOG

    const dialog = comp.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const theTick = within(dialog).queryByRole("img");
    const thankYouMessage = within(dialog).getByRole("heading", { name: /thanks/i });
    const submittedEmail = within(dialog).queryByText("goodemail@company.com");
    const dismiss = comp.getByRole("button", { name: /dismiss/i });

    expect(theTick).not.toBeInTheDocument();
    expect(thankYouMessage).toBeVisible();
    expect(submittedEmail).toBeVisible();
    expect(dismiss).toBeVisible();

    await userEvent.click(dismiss);
    expect(dialog).not.toBeInTheDocument();

    const emailInput2 = comp.getByRole("textbox", { name: /email/i });
    expect(emailInput2).toBeInTheDocument();
    expect(emailInput2).toHaveFocus();
  });
})
