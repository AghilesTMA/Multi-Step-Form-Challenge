import { useSelector } from "react-redux";

function Steps() {
  const stepsText = ["YOUR INFO","SELECT PLAN","ADD-ONS","SUMMARY"];
  const step = useSelector((state)=>state.form.step);
  return (
    <ul className="steps">
      {stepsText.map((element,index)=>{
        return (
          <li className={step>=index+1?"activeStep":""} key={index}>
            <h2 className="number">{index + 1}</h2>
            <span className="desktopHidden">STEP {index+1}</span>
            <h3 className="desktopHidden">{element}</h3>
          </li>
        )
      })}
    </ul>

  )
}

export default Steps