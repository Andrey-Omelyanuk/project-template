import Deposits from "./deposits";
import { shallow } from "enzyme";
import React from "react";
it("should render Post",()=>{
    const component=shallow(<Deposits/>)
    const wrapper=component.find("div");
    expect(wrapper.length).toBe(1)
});