import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./Input";

describe("компонент Button", () => {
  it("Должен корректно отрендериться с стандартными пропсами", () => {
    render(<Input placeholder="test" />);

    const inputElement = screen.getByPlaceholderText("test");

    expect(inputElement).toBeInTheDocument();
  });

  it("Дожен примениться класс Input к тегу input", () => {
    render(<Input placeholder="test" />);

    expect(screen.getByPlaceholderText("test")).toHaveClass("Input");
  });

  it("Должен примениться className из пропсов к тегу input", () => {
    render(<Input className="testClassName" placeholder="test" />);

    expect(screen.getByPlaceholderText("test")).toHaveClass("testClassName");
  });

  it("Должен примениться variant из пропсов к тегу input", () => {
    render(<Input variant="variant" placeholder="test" />);

    expect(screen.getByPlaceholderText("test")).toHaveClass("Input variant");
  });

  //   it("Должен корректно отрендерить children", () => {
  //     render(<Button>test</Button>);

  //     expect(screen.getByText("test")).toBeInTheDocument();
  //   });

  //   it("Должен корректно отрабатывать onClick", () => {
  //     const onClick = jest.fn();
  //     render(<Button onClick={onClick}>Click me</Button>);

  //     fireEvent.click(screen.getByText("Click me"));
  //     expect(onClick).toHaveBeenCalledTimes(1);
  //   });
});
