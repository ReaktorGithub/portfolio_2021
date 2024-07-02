import {configure, mount} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import axios from "axios";
import RepoForm from "../pages/github_repo/components/RepoForm/RepoForm";

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('Тест Github', () => {

    let user = 'userName';
    let response = {data: user};

    it('Тест RepoForm - асинхронные запросы', () => {
        axios.get.mockReturnValue(response);
        const comp = mount(<RepoForm/>);

        // TODO: доделать
    })
})