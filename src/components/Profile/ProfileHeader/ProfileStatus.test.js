import React from "react";
import {create, act} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";
import {mount, shallow} from "enzyme";

describe("ProfileStatus component", () => {
    test("Status should include < p > with status string", () => {
        let component;
        act(() => {
            component = create(<ProfileStatus status="TestStatus"/>);
        });

        const instance = component.root;
        let p = instance.findByType("p");
        expect(p.props.children).toBe("TestStatus");
    });
    test('When Click on < p >, it should be changed to < input >', () => {
        let component;
        act(() => {
            component = create(<ProfileStatus status="TestStatus"/>);
        });

        const instance = component.root;
        let p = instance.findByType("p");
        act(() => {p.props.onClick();});
        p = instance.findByType("input");
        expect(p).not.toBeNull();
        expect(p.props.value).toBe("TestStatus");
    });

    test('Should change < p > to < input > by clicking on < p >, and change back < input > to < p > by clicking' +
        ' Cancel Button', () => {
        const wrapper = shallow(<ProfileStatus status={"TestStatus"}/>);
        expect(wrapper.find('p').text()).toEqual('TestStatus');
        wrapper.find('p').simulate('click');
        expect(wrapper.find('input').props().value).toEqual('TestStatus');
        wrapper.find('button.red').simulate('click');
        expect(wrapper.find('p').text()).toEqual('TestStatus');

    });

    test('Should change status and call mocked update func', () => {
        const mockSaveStatus = jest.fn(str => str);
        const wrapper = mount(<ProfileStatus status={"TestStatus"} updateStatus={mockSaveStatus}/>);

        expect(wrapper.find('p').text()).toEqual('TestStatus');
        wrapper.find('p').simulate('click');
        expect(wrapper.find('input').props().value).toEqual('TestStatus');
        const input = wrapper.find('input');
        input.simulate('change', { currentTarget: { value: 'NewStatus' } });
        //здесь должно было поменяться value у инпута на NewStatus, но не меняется
        expect(wrapper.find('input').props().value).toEqual('NewStatus');
        wrapper.find('button.blue').simulate('click');
        expect(wrapper.find('p').text()).toEqual('TestStatus');
        expect(mockSaveStatus.mock.calls.length).toBe(1);

    });
});