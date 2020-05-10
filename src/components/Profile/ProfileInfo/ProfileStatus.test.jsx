import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("Button component", () => {
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status="I am doing my best" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("I am doing my best!!!");
  });
});

describe("Button component", () => {
  test("afte creation span with status should be displayed", () => {
    const component = create(<ProfileStatus status="I am doing my best" />);
    const root = component.root;
    let input = root.findByType('input')
    expect(input.length).toBe(1);
  });
});