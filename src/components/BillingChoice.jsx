import { useDispatch, useSelector } from "react-redux"
import { toggleBilling } from "../context/FormSlice";


function BillingChoice() {
  const monthlyBilling = useSelector((state)=>state.form.monthly);
  const dispatch = useDispatch()
  return (
    <div className="billingChoice">
    <span className={monthlyBilling?"activeBilling":""}>Monthly</span>
    <div className="toggleBtn" style={{justifyContent:monthlyBilling?"flex-start":"flex-end"}} onClick={()=>dispatch(toggleBilling())}><div className="switch"></div></div>
    <span className={monthlyBilling?"":"activeBilling"}>Yearly</span>
  </div>
  )
}

export default BillingChoice