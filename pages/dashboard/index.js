import { useRouter } from "next/router"
import {
    Box,
    } from '@mui/material';
// import Layout from 
// import Layout from '../../components/layout' 
// import DotLoader from "react-spinners/DotLoader";
import AdminDashboard from "../../components/admin/AdminDashboard";
export default function Dashboard() {
   
    return(
        // <div>
        //     {(isLoading) ? (
        //     <Box sx={{display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     width: '100%',
        //     height: '100vh',}}>
        //     {/* <DotLoader
        //         color={'#7dd3fc'}
        //         loading={isLoading}
        //         cssOverride={override}
        //         size={100}
        //         aria-label="Loading Spinner"
        //         data-testid="loader"
        //         /> */}
        //     </Box>) :
        //         (<Layout>
        //             {element}
        //         </Layout>)
        //     }
            // <Layout>
                <AdminDashboard/>
            // </Layout> 
        // </div>
    )
}