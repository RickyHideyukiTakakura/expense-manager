import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { NavLink } from "./nav-link";

describe("Nav Link", () => {
  it("should highlight the nav link when is the current page link", () => {
    const wrapper = render(
      <>
        <NavLink to="/">Início</NavLink>
        <NavLink to="/expenses">Despesas</NavLink>
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={["/expenses"]}>
              {children}
            </MemoryRouter>
          );
        },
      },
    );

    expect(wrapper.getByText("Início").dataset.current).toEqual("false");
    expect(wrapper.getByText("Despesas").dataset.current).toEqual("true");
  });
});
