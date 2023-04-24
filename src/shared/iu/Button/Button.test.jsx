import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("компонент Button", () => {
  it("Должен корректно отрендерится", () => {
    render(<Button>test</Button>);
  });

  it("Должен примениться класс Button к корневому тегу div", () => {
    render(<Button>test</Button>);

    expect(screen.getByText("test")).toHaveClass("Button");
  });

  it("Должен примениться className из пропсов к корневому тегу div", () => {
    render(<Button className="testClassName">test</Button>);

    expect(screen.getByText("test")).toHaveClass("testClassName");
  });

  it("Должен примениться variant из пропсов", () => {
    render(<Button variant="primary">test</Button>);

    expect(screen.getByText("test")).toHaveClass("Button primary");
  });

  it("Должен корректно отрендерить children", () => {
    render(<Button>test</Button>);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("Должен корректно отрабатывать onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
