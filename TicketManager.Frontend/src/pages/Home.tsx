import {useEffect} from "react";
import { HeroContentLeft } from "../components/Hero/HeroContentLeft";
import Movies from "../components/Movies/Movies";


const Dashboard = () => {

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = () => {

    }

    return <> 
        <HeroContentLeft />
        <Movies />
    </>
}

export default Dashboard;