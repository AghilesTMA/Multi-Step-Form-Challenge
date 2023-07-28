import { useSelector } from "react-redux"

function AddOnslist({addOns,setAddOns}) {
  const monthlyBilling = useSelector((state)=>state.form.monthly);
  return (
    <ul className="addOnsWrapper">
      {addOns.map((addOn)=>{
        return(
          <li key={addOn.type} className={addOn.selected?"addOnSelected":""}>
            <div className="addOnContent">
              <input className="checkBox" type="checkbox" name={addOn.type} id={addOn.type} checked={addOn.selected} onChange={()=>{
                setAddOns(prevstate=>{return prevstate.map((prevAddOn)=>{
                  if(prevAddOn.type==addOn.type){
                    return {...prevAddOn,selected:!prevAddOn.selected}
                  }else{
                    return {...prevAddOn}
                  }
                })})
              }} />
              <div className="addOntext">
                <h3>{addOn.type}</h3>
                <p>{addOn.desc}</p>
              </div>
            </div>
            {monthlyBilling?<p className="addOnPrice">{`+$${addOn.price}/mo`}</p>:<p className="addOnPrice">{`+$${addOn.price*10}/yr`}</p>}
          </li>
        )
      })}
    </ul>
  )
}

export default AddOnslist