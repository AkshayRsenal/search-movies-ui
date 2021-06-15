import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SearchTable from "../components-custom/SearchTable";
import ListAllMedia from "../components-custom/ListAllMedia";
import Home from "../components-custom/ComponentHome"
import PermMediaIcon from '@material-ui/icons/PermMedia';
const routesMap =
    [
        {
            iconComponent: <HomeIcon/>,
            tabName: "Home",
            route: "/",
            componentName: Home
        },
        {
            iconComponent: <SearchIcon/>,
            tabName: "Search",
            route: "/search",
            componentName: SearchTable
        },
        {
            iconComponent: <PermMediaIcon/>,
            tabName: "All Media",
            route: "/all-media",
            componentName: ListAllMedia
        },
        // {
        //     iconComponent: <SearchIcon/>,
        //     tabName: "Search Another",
        //     route: "/search/another",
        //     componentName: SearchTable
        // },
    ]

export default routesMap;