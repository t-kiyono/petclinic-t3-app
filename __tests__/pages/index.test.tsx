import { render, screen } from "@testing-library/react";
import Home from "~/pages";

vi.mock("next/navigation", () => ({
  usePathname: () => ""
}));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("pages/index.test.tsx", () => {
  test("Rendering", () => {
    render(<Home />);
    const heading = screen.getByText("Welcome");
    expect("H2").toBe(heading.tagName);
  });
});
