import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import routesMap from '../imports/routesMap';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';



function BreadcrumbTrail() {
    let currentPathElements;
    const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

    return (

        <Breadcrumbs aria-label="breadcrumb">
            {currentPathElements = useLocation().pathname.split("/").filter((isAnElement) => isAnElement)}
            <LinkRouter color="inherit" to={"/"} > Home </LinkRouter>
            {
                currentPathElements.map((value, index) => {
                    let lastElement = index === (currentPathElements.length - 1)
                    let pointToUrl = "/" + (currentPathElements.slice(0, index + 1).join("/"))
                    let routeData = routesMap.filter(objectRoute => { return objectRoute.route === pointToUrl });
                    return (
                        // <LinkRouter color="inherit" to={ routeData[0].route } >
                        //   {routeData[0].tabName}
                        // </LinkRouter>
                        // lastElement ? (
                        //   <Typography>
                        //     {routeData[0].tabName}
                        //   </Typography>
                        // ) : (
                        <LinkRouter color="inherit" to={routeData[0].route} >
                            {routeData[0].tabName}
                        </LinkRouter>
                        // )
                    );
                })
            }
        </Breadcrumbs>
    )

}

export default BreadcrumbTrail;