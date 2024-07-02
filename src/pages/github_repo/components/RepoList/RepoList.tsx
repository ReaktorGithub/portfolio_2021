import {useState} from "react";
import moment from "moment";
import 'moment/locale/ru';
import {IRepo} from "../../types";

const initialRepo = {
    name: '',
    created_at: '',
    owner: {
        login: '',
    },
    size: 0,
}

function RepoList(props: any) {

    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [currentRepo, setCurrentRepo] = useState<IRepo>(initialRepo);

    const popupDownload = (data: IRepo) => {
        console.log(data);

        let modifiedData = {...data};
        // модификация даты
        // первоначальное значение: "2020-12-27T19:45:01Z"
        let newTime = moment(data.created_at).locale('ru').format('DD MMMM YYYY HH:mm:ss');
        let createdAgo = '(' + moment(data.created_at).locale('ru').fromNow() + ')';
        modifiedData.created_at = newTime;
        modifiedData.created_ago = createdAgo;
        setCurrentRepo(modifiedData);
        setPopupOpen(true);
    }

    const popupDownloadClose = () => {
        setPopupOpen(false);
    }

    return props.render(
        {
            popupOpen: popupOpen,
            currentRepo: currentRepo,
            popupDownload: popupDownload,
            popupDownloadClose: popupDownloadClose,
        }
    )
}

export default RepoList;