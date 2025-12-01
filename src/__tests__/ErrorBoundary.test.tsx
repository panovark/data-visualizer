import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ErrorBoundary from "@/components/ErrorBoundary";

const ProblemChild = ({ shouldThrow }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error("Boom");
  }
  return <div>All good</div>;
};

const Fallback = ({ reset }: { reset: () => void }) => (
  <div role="alert">
    <p>Something went wrong</p>
    <button type="button" onClick={reset}>
      Try again
    </button>
  </div>
);

const fallbackRenderer = ({ reset }: { reset: () => void }) => (
  <Fallback reset={reset} />
);

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("renders fallback when a child throws", () => {
    render(
      <ErrorBoundary fallback={fallbackRenderer}>
        <ProblemChild shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.getByText("Something went wrong")).toBeTruthy();
  });

  it("recovers after reset when the error source is removed", () => {
    const { rerender } = render(
      <ErrorBoundary fallback={fallbackRenderer}>
        <ProblemChild shouldThrow />
      </ErrorBoundary>,
    );

    expect(screen.queryByText("All good")).toBeNull();

    rerender(
      <ErrorBoundary fallback={fallbackRenderer}>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>,
    );

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));

    expect(screen.getByText("All good")).toBeTruthy();
  });
});
