import React from "react";
import {create, act} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("Status should include < p > with status string", () => {
        let component;
        act(() => {
            component = create(<ProfileStatus status="OLOLO"/>);
        });

        const instance = component.root;
        let p = instance.findByType("p");
        expect(p.props.children).toBe("OLOLO");
    });
    test('When Click on < p >, it should be changed to < input >', () => {
        let component;
        act(() => {
            component = create(<ProfileStatus status="OLOLO"/>);
        });

        const instance = component.root;
        let p = instance.findByType("p");
        act(() => {p.props.onClick();});
        p = instance.findByType("input");
        expect(p).not.toBeNull();
        expect(p.props.value).toBe("OLOLO");
    });
});