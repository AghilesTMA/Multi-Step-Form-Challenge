import { useSelector } from "react-redux";

function PlanCards({plan,setPlan}) {
  const Plans = [{type:"Arcade",price:9,photo:"./src/assets/images/icon-arcade.png"},{type:"Advanced",price:12,photo:"./src/assets/images/icon-Advanced.png"},{type:"Pro",price:15,photo:"./src/assets/images/icon-pro.png"}];
  const monthlybilling = useSelector((state)=>state.form.monthly)
  return (
    <ul className="planCardsWrapper">
      {Plans.map((card)=>{
        return(
          <li key={card.type} className={card.type==plan.type?"activeCard":""} onClick={()=>setPlan({type:card.type,price:card.price})}>
            <div className="imgwrapper"><img src={card.photo} alt="typeLogo" /></div>
            <div className="typeText">
              <h3>{card.type}</h3>
              <p>{monthlybilling?`$${card.price}/mo`:`$${card.price*10}/yr`}</p>
              {(!monthlybilling&&<p className="yearlyRemark">2 months free</p>)||null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default PlanCards