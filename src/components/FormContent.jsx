import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../context/FormSlice";
import InputField from "./InputField";
import { useMemo, useState } from "react";
import BillingChoice from "./BillingChoice";
import PlanCards from "./PlanCards";
import AddOnslist from "./AddOnslist";

function FormContent() {
  //stap:
  const step = useSelector((state) => {
    return state.form.step;
  });

  //monthly Billing:
  const monthlyBilling = useSelector((state) => state.form.monthly);

  //plan:
  const [selectedPlan, setSelectedPlan] = useState({ type: "", price: 0 });

  //add-ons:
  const [addOns, setAddOns] = useState([
    {
      type: "Online Service",
      price: 1,
      desc: "Access to multiplayer games",
      selected: false,
    },
    {
      type: "Larger Storage",
      price: 2,
      desc: "Extra 1TB of cloud save",
      selected: false,
    },
    {
      type: "Customizable profile",
      price: 2,
      desc: "Custom theme on your profile",
      selected: false,
    },
  ]);

  //total:
  const [total, setTotal] = useState(0);

  //dispatch:
  const dispatch = useDispatch();

  //input:
  const [input, setInput] = useState({
    name: { value: "", missing: false, valid: true },
    email: { value: "", missing: false, valid: true },
    number: { value: "", missing: false, valid: true },
  });
  const handleChange = (type) => {
    return (e) =>
      setInput((prevState) => {
        return {
          ...prevState,
          [type]: { ...prevState[type], value: e.target.value },
        };
      });
  };

  //Counting total:
  useMemo(() => {
    if (monthlyBilling) {
      let addOnsPrice = 0;
      addOns.forEach((addOn) => {
        if (addOn.selected) {
          addOnsPrice += addOn.price;
        }
      });
      setTotal(selectedPlan.price + addOnsPrice);
    } else {
      let addOnsPrice = 0;
      addOns.forEach((addOn) => {
        if (addOn.selected) {
          addOnsPrice += addOn.price * 10;
        }
      });
      setTotal(selectedPlan.price * 10 + addOnsPrice);
    }
  }, [selectedPlan, addOns, monthlyBilling]);

  return (
    <div className="contentWrapper">
      {step == 1 ? (
        <div className="personalInformation">
          <div className="stepDescrition">
            <h2>Personal Info</h2>
            <p>Please provide your name, email address, and phone number</p>
          </div>

          <div className="inputFields">
            <InputField
              id="name"
              placeHolder="e.g.Stephen King"
              label="Name"
              value={input.name.value}
              type="text"
              handleChange={handleChange("name")}
              missing={input.name.missing}
              validInp={input.name.valid}
            />
            <InputField
              id="email"
              placeHolder="e.g.StephenKing@lorem.com"
              label="Email Address"
              value={input.email.value}
              type="email"
              handleChange={handleChange("email")}
              missing={input.email.missing}
              validInp={input.email.valid}
            />
            <InputField
              id="phone"
              placeHolder="e.g.+1 234 567 890"
              label="Phone Number"
              value={input.number.value}
              type="text"
              handleChange={handleChange("number")}
              missing={input.number.missing}
              validInp={input.number.valid}
            />
          </div>
          <div
            className="stepChanger"
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            <button
              type="button"
              className="nextBtn Btn"
              onClick={() => {
                const { name, email, number } = input;
                const emailPattern =
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                const numberPattern = /^\d+$/;
                const namePattern = /\w+/;

                name.value == ""
                  ? setInput((prev) => {
                      return { ...prev, name: { ...prev.name, missing: true } };
                    })
                  : setInput((prev) => {
                      return {
                        ...prev,
                        name: { ...prev.name, missing: false },
                      };
                    });
                email.value == ""
                  ? setInput((prev) => {
                      return {
                        ...prev,
                        email: { ...prev.email, missing: true },
                      };
                    })
                  : setInput((prev) => {
                      return {
                        ...prev,
                        email: { ...prev.email, missing: false },
                      };
                    });
                number.value == ""
                  ? setInput((prev) => {
                      return {
                        ...prev,
                        number: { ...prev.number, missing: true },
                      };
                    })
                  : setInput((prev) => {
                      return {
                        ...prev,
                        number: { ...prev.number, missing: false },
                      };
                    });

                if (
                  namePattern.test(name.value) &&
                  emailPattern.test(email.value) &&
                  numberPattern.test(number.value)
                ) {
                  dispatch(nextStep());
                  return;
                } else {
                  namePattern.test(name.value)
                    ? setInput((prev) => {
                        return { ...prev, name: { ...prev.name, valid: true } };
                      })
                    : setInput((prev) => {
                        return {
                          ...prev,
                          name: { ...prev.name, valid: false },
                        };
                      });
                  emailPattern.test(email.value)
                    ? setInput((prev) => {
                        return {
                          ...prev,
                          email: { ...prev.email, valid: true },
                        };
                      })
                    : setInput((prev) => {
                        return {
                          ...prev,
                          email: { ...prev.email, valid: false },
                        };
                      });
                  numberPattern.test(number.value)
                    ? setInput((prev) => {
                        return {
                          ...prev,
                          number: { ...prev.number, valid: true },
                        };
                      })
                    : setInput((prev) => {
                        return {
                          ...prev,
                          number: { ...prev.number, valid: false },
                        };
                      });
                  return;
                }
              }}
            >
              Next Step
            </button>
          </div>
        </div>
      ) : null}
      {step == 2 ? (
        <div className="planSelect">
          <div className="stepDescrition">
            <h2>Select your plan</h2>
            <p>You have the option of monthly or yearly billing.</p>
          </div>
          <PlanCards plan={selectedPlan} setPlan={setSelectedPlan} />
          <BillingChoice />
          <div className="stepChanger">
            <button
              type="button"
              className="backBtn"
              onClick={() => dispatch(prevStep())}
            >
              Go Back
            </button>
            <button
              type="button"
              className="nextBtn Btn"
              onClick={() => {
                if (selectedPlan.type == "") return;
                dispatch(nextStep());
              }}
            >
              Next Step
            </button>
          </div>
        </div>
      ) : null}
      {step == 3 ? (
        <div className="addOnsSelect">
          <div className="stepDescrition">
            <h2>Pick add-ons</h2>
            <p>Add-ons help enhance your gaming experience</p>
          </div>
          <AddOnslist addOns={addOns} setAddOns={setAddOns} />
          <div className="stepChanger">
            <button
              type="button"
              className="backBtn"
              onClick={() => dispatch(prevStep())}
            >
              Go Back
            </button>
            <button
              type="button"
              className="nextBtn Btn"
              onClick={() => {
                dispatch(nextStep());
              }}
            >
              Next Step
            </button>
          </div>
        </div>
      ) : null}
      {step == 4 ? (
        <div className="finishingUp">
          <div className="stepDescrition">
            <h2>Finishing up</h2>
            <p>Double-check everything looks OK before confirming.</p>
          </div>
          <div className="selectedOptionsWrapper">
            <div className="planContent">
              <div className="planContentText">
                <h4>
                  {selectedPlan.type}
                  {`(${monthlyBilling ? "monthly" : "yearly"})`}
                </h4>
                <span
                  onClick={() => {
                    dispatch(prevStep());
                    dispatch(prevStep());
                  }}
                >
                  Change
                </span>
              </div>
              <h4>{`$${
                monthlyBilling ? selectedPlan.price : selectedPlan.price * 10
              }/${monthlyBilling ? "mo" : "yr"}`}</h4>
            </div>
            {addOns.map((addOn) => {
              if (addOn.selected) {
                return (
                  <div className="addOnSelected" key={addOn.type}>
                    <span className="addOnTitle">{addOn.type}</span>
                    <span className="addOnPrice">{`+$${
                      monthlyBilling ? addOn.price : addOn.price * 10
                    }/${monthlyBilling ? "mo" : "yr"}`}</span>
                  </div>
                );
              }
            })}
          </div>
          <div className="totalPrice">
            <span className="priceText">{`Total (per ${
              monthlyBilling ? "month" : "year"
            })`}</span>
            <h3 className="Price">{`+${total}/${
              monthlyBilling ? "mo" : "yr"
            }`}</h3>
          </div>
          <div className="stepChanger">
            <button
              type="button"
              className="backBtn"
              onClick={() => dispatch(prevStep())}
            >
              Go Back
            </button>
            <button
              type="button"
              className="confirmBtn Btn"
              onClick={() => {
                dispatch(nextStep());
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : null}
      {step == 5 ? (
        <div className="thankYou">
          <div className="thankYouImg">
            <img src="./src/assets/images/icon-thank-you.png" alt="" />
          </div>
          <div className="stepDescrition">
            <h2>Thank you!</h2>
            <p>
              Thanks for confirming your subscription! We hope you have fun
              using our platform. If you ever need support, please feel free to
              email us at m_tamendjari@estin.com(developer)<br/>developed by <a href="https://github.com/AghilesTMA" target="_blank" rel="noreferrer">Aghiles Mohamed Tamendjari</a>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FormContent;
