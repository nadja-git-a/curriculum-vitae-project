import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { LogInForm } from "./LogInForm";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const mutateMock = vi.fn();
vi.mock("features/authFeatures/loginFeature/api/loginQuery", () => ({
  useLogin: () => ({
    mutate: mutateMock,
    isPending: false,
    error: null,
  }),
}));

describe("LogInForm", () => {
  it("calls login on submit", async () => {
    const user = userEvent.setup();
    render(<LogInForm />);

    await user.type(screen.getByLabelText("common:actions.email"), "test@mail.com");
    await user.type(screen.getByLabelText("common:actions.password"), "123456");

    await user.click(screen.getByRole("button", { name: "common:actions.login" }));

    expect(mutateMock).toHaveBeenCalledTimes(1);
  });
});
