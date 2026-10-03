import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GraphPreview } from "./graph-preview";

let setVisible: (visible: boolean) => void;
const disconnect = vi.fn();

class FakeIntersectionObserver {
  constructor(callback: (entries: { isIntersecting: boolean }[]) => void) {
    setVisible = (visible) => callback([{ isIntersecting: visible }]);
  }
  observe = vi.fn();
  disconnect = disconnect;
}

function mockReducedMotion(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

function firstNode(container: HTMLElement) {
  return container.querySelector<HTMLElement>('[data-float-node="mara"]')!;
}

describe("useGraphFloat", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame"] });
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver);
    mockReducedMotion(false);
    disconnect.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("run_onScreen_movesNodesAndEdges", () => {
    const { container } = render(<GraphPreview />);

    act(() => setVisible(true));
    act(() => vi.advanceTimersByTime(300));

    expect(firstNode(container).style.transform).toMatch(/^translate3d/);
    const line = container.querySelector<SVGLineElement>('[data-float-line="seeks"]')!;
    expect(line.getAttribute("x1")).not.toBe("180");
  });

  it("run_offScreen_doesNothing", () => {
    const { container } = render(<GraphPreview />);

    act(() => setVisible(false));
    act(() => vi.advanceTimersByTime(300));

    expect(firstNode(container).style.transform).toBe("");
  });

  it("run_scrolledOffScreen_stopsAndResets", () => {
    const { container } = render(<GraphPreview />);
    act(() => setVisible(true));
    act(() => vi.advanceTimersByTime(300));

    act(() => setVisible(false));

    expect(firstNode(container).style.transform).toBe("");
  });

  it("run_reducedMotion_neverMoves", () => {
    mockReducedMotion(true);
    const { container } = render(<GraphPreview />);

    act(() => setVisible(true));
    act(() => vi.advanceTimersByTime(300));

    expect(firstNode(container).style.transform).toBe("");
  });

  it("unmount_disconnectsObserver", () => {
    const { unmount } = render(<GraphPreview />);

    unmount();

    expect(disconnect).toHaveBeenCalled();
  });
});
