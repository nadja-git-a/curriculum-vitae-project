import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SignUpForm } from "./SignUpForm";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mutateMock = vi.fn();
vi.mock("features/signUpFeatures/api/query", () => ({
  useSignup: () => ({
    mutate: mutateMock,
    isPending: false,
    error: null,
  }),
}));

describe("SignUpForm", () => {
  it("calls signup on submit", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.type(screen.getByLabelText("common:actions.email"), "test@mail.com");
    await user.type(screen.getByLabelText("common:actions.password"), "123456");
    await user.type(screen.getByLabelText("common:actions.repeatPassword"), "123456");

    await user.click(screen.getByRole("button", { name: "createAccount" }));

    expect(mutateMock).toHaveBeenCalledTimes(1);
  });
});
