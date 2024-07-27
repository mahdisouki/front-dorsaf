import React , {createContext , useState , useEffect} from 'react'
import  axios from 'axios'
import Cookies from "js-cookie"

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
  //states:
    // const token = Cookies.get('token');
    const [allUsers , setAllUsers] = useState();
    const [allClients , setAllClients] = useState();
    const [clientCount , setClientCount] = useState();
    const [product ,setProduct] = useState();
    const [offers , setOffers] = useState();
    const [sort , setSort] = useState("createdAt");
    const [page , setPage] = useState(1);
    const [resp , setResp] = useState();
    const[ClientHasVisa , setClientHasVisa] = useState();
    const [ClientPaye , setClientPaye] = useState();
    const token = Cookies.get("token");
    useEffect(() => {
        const getMyOffers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/product" , { headers : {Authorization: `Bearer ${token}`}});
            console.log("Products:", res.data);
            setProduct(res.data);
        } catch (error) {
            console.log(error);
          }
        };

        const getClients =async () => {
            try {
                const res = await axios.get(" http://45.132.240.106/admin/client/clients")
            console.log("all clients:" , res.data.clients)
            setAllClients(res.data.clients)
            setClientCount(res.data.result)
            } catch (error) {
                console.log(error)
            }
            
        }
        const getUsers =async () => {
            try {
                const res = await axios.get(" http://45.132.240.106/admin/user/users")
            console.log("all Responsables:" , res.data.response)
            setAllUsers(res.data.response)
            } catch (error) {
                console.log(error)
            }
            
        }
        const getOffers =async () => {
            try {
                const res = await axios.get(" http://45.132.240.106/admin/api/offer" )
            console.log("all Offers:" , res.data.Offers)
            setOffers(res.data.Offers);
            
            } catch(error) {
                console.log(error)
            }
            
        }
        const getClientsPerVisa = async ()=>{
            try {
                const res = await axios.get(" http://45.132.240.106/admin/client/clientPerVisa");
                console.log("client per visa:", res.data);
                setClientHasVisa(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        const getClientPayment = async ()=>{
            try {
                const res = await axios.get(" http://45.132.240.106/admin/client/clientPayments");
                console.log("client payées:", res.data);
                setClientPaye(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        // getClientPayment();
        // getClientsPerVisa();
        // getClients();
        // getUsers();
        // getOffers();
        getMyOffers();
        // if(token){
        //     const getUser = async() =>{
        //         try{
        //             const res = await axios.get(" http://45.132.240.106/admin/user/infor" , { headers : {Authorization: `Bearer ${token}`}}  );
        //             console.log("getuserinfo:",res.data);
        //             setResp(res.data)
        //         }catch(error){
        //             console.log(error)
        //         }
        //     }
        //     getUser();
        // }
      }, [token]);
      


    const state ={
    
    Products : product,
    allUsers: allUsers,
    allClients: allClients,
    clientCount: clientCount,
    allOffers: offers,
    respInfo : resp,
    clientwithvisa: ClientHasVisa,
    clientPayments : ClientPaye,

    
    



}

    return(
    <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
)
}