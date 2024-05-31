import React, { useState } from 'react';
import planArcadeIcon from '../assets/images/icon-arcade.svg';
import planAdvancedIcon from '../assets/images/icon-advanced.svg';
import planProIcon from '../assets/images/icon-pro.svg';
import tickIcon from '../assets/images/icon-thank-you.svg';
import './Form.css';

function Form() {
  const [currentStep, setCurrentStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const steps = [
    { id: 1, title: 'YOUR INFO' },
    { id: 2, title: 'SELECT PLAN' },
    { id: 3, title: 'ADD-ONS' },
    { id: 4, title: 'SUMMARY' },
    { id: 5, title: 'DONE' }
  ];

  const [addons, setAddons] = useState({
    onlineService: false,
    largerStorage: false,
    customizableProfile: false
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false
  });
  //Phone number and email validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?\d{10,15}$/;

  const plans = {
    monthly: [
      { id: 'arcade', title: 'Arcade', price: '$9/mo', icon: planArcadeIcon },
      { id: 'advanced', title: 'Advanced', price: '$12/mo', icon: planAdvancedIcon },
      { id: 'pro', title: 'Pro', price: '$15/mo', icon: planProIcon }
    ],
    yearly: [
      { id: 'arcade', title: 'Arcade', price: '$90/yr (2 months free)', icon: planArcadeIcon },
      { id: 'advanced', title: 'Advanced', price: '$120/yr (2 months free)', icon: planAdvancedIcon },
      { id: 'pro', title: 'Pro', price: '$150/yr (2 months free)', icon: planProIcon }
    ]
  };

  const addonDetails = {
    monthly: [
      { id: 'onlineService', title: 'Online Service', description: 'Access to multiplayer games', price: '+$1/mo' },
      { id: 'largerStorage', title: 'Larger Storage', description: 'Extra 1TB of cloud save', price: '+$2/mo' },
      { id: 'customizableProfile', title: 'Customizable Profile', description: 'Custom theme on your profile', price: '+$2/mo' }
    ],
    yearly: [
      { id: 'onlineService', title: 'Online Service', description: 'Access to multiplayer games', price: '+$10/yr' },
      { id: 'largerStorage', title: 'Larger Storage', description: 'Extra 1TB of cloud save', price: '+$20/yr' },
      { id: 'customizableProfile', title: 'Customizable Profile', description: 'Custom theme on your profile', price: '+$20/yr' }
    ]
  };
  //To handle input values of Personal Info
  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = true;
    if (name === 'email') {
      isValid = emailRegex.test(value);
    } else if (name === 'phone') {
      isValid = phoneRegex.test(value);
    }
    setFormData({ ...formData, [name]: value, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [name]: !isValid, [e.target.name]: e.target.value === '' });
    }
  };
  //To handle the Next/Confirm button
  const handleNextStep = () => {
    const newErrors = {
      name: formData.name === '',
      email: !emailRegex.test(formData.email),
      phone: !phoneRegex.test(formData.phone)
    };
    setErrors(newErrors);
    const allFieldsFilled = !Object.values(newErrors).includes(true);
    if (allFieldsFilled && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  //To handle Go Back button
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  //To handle the slider
  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };
  //To handle the checkbox of add-ons
  const handleCheckboxChange = (addon) => {
    setAddons({ ...addons, [addon]: !addons[addon] });
  };
  //To enable/disable the buttons
  const isNextDisabled = () => {
    if (currentStep === 2 && !selectedPlan) {
      return true;
    }
    return false;
  };

  return (
    <div className="sm:bg-white">
      <div className="flex xl:my-auto xl:items-center xl:justify-center xl:h-screen sm:min-h-20 bg-magnolia">
        <div className="flex xl:flex-row xl:w-3/5 xl:h-3/4 sm:h-[60%] sm:top-0 sm:fixed sm:bottom-[80px] xl:mt-24 sm:w-full xl:p-4 rounded-xl xl:bg-white sm:flex-col sm:bg-magnolia items-center">
          <div className="xl:w-[300px] xl:h-full xl:bg-white bg-no-repeat bg-cover xl:rounded-xl sm:w-full sm:min-h-56 sm:mr-[0px] sm:relative sm:z-2 xl:bg-xl-image sm:bg-sm-image">
            <ul className="flex xl:flex-col list-none xl:p-4 mt-4 sm:w-full sm:justify-center">
              {steps.filter(step => step.id !== 5).map(step => (
                <li key={step.id} className="flex items-center xl:min-w-[144px] mb-4 p-2 sm:flex-row">
                  <div className={`xl:min-w-8 h-8 sm:w-12 sm:h-12 sm:space-between flex items-center justify-center rounded-full text-sm font-UbuntuBold font-bold ${currentStep === step.id || (step.id === 4 && currentStep === 5) ? 'bg-light-blue text-marine-blue' : 'bg-none-100 border-solid border-[1px] border-white text-white'}`}>
                    {step.id}
                  </div>
                  <span className="ml-3 text-sm text-white tracking-widest font-UbuntuMedium sm:hidden xl:block">
                    <span className="block text-xs tracking-widest text-light-gray font-UbuntuRegular">STEP {step.id}</span>
                    {step.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:relative xl:h-full xl:ml-6 xl:w-[70%] sm:absolute xl:top-0 top-[130px] z-2 xl:py-8 xl:px-14 sm:w-[360px] sm:h-[550px] sm:p-[30px] sm:rounded-xl sm:bg-white" style={{ cursor: 'pointer' }}>
            {currentStep === 1 && (
              <div className="xl:min-h-[446px] sm:max-h-[415px]">
                <h1 className="text-3xl mt-4 mb-2 text-marine-blue font-UbuntuBold">Personal info</h1>
                <p className="text-md mb-6 text-cool-gray font-UbuntuMedium">Please provide your name, email address, and phone number.</p>
                <div className="my-4">
                  <label className="text-marine-blue font-UbuntuBold">Name</label>
                  <input className={`w-full p-4 border text-marine-blue font-UbuntuMedium rounded-lg ${errors.name ? 'border-strawberry-red' : 'border-gray-300'}`} type="text" name="name" placeholder="e.g. Stephen King" value={formData.name} onChange={handleChange} />
                  {errors.name && <p className="text-red-500 text-right font-UbuntuMedium">This field is required</p>}
                </div>
                <div className="my-4">
                  <label className="text-marine-blue font-UbuntuBold">Email Address</label>
                  <input className={`w-full p-4 border text-marine-blue font-UbuntuMedium rounded-lg ${errors.name ? 'border-strawberry-red' : 'border-gray-300'}`} type="email" name="email" placeholder="e.g. stephenking@lorem.com" value={formData.email} onChange={handleChange} />
                  {errors.email && <p className="text-red-500 text-right font-UbuntuMedium">This field is required</p>}
                </div>
                <div className="my-4">
                  <label className="text-marine-blue font-UbuntuBold">Phone Number</label>
                  <input className={`w-full p-4 border text-marine-blue font-UbuntuMedium rounded-lg ${errors.name ? 'border-strawberry-red' : 'border-gray-300'}`} type="text" name="phone" placeholder="e.g. +1 234 567 890" value={formData.phone} onChange={handleChange} />
                  {errors.phone && <p className="text-red-500 text-right font-UbuntuMedium">This field is required</p>}
                </div>

              </div>
            )}

            {currentStep === 2 && (
              <div className="xl:min-h-[446px] sm:max-h-[415px]">
                <h1 className="text-3xl mt-4 mb-2 text-marine-blue font-UbuntuBold">Select your plan</h1>
                <p className="text-md mb-6 text-cool-gray font-UbuntuMedium">You have the option of monthly or yearly billing.</p>
                <div className="flex mt-14 sm:mt-10 xl:gap-x-4 sm:mb-2 sm:flex-col xl:flex-row xl:w-full">
                  {plans[billingCycle].map(plan => (
                    <div key={plan.id} className={`sm:flex xl:py-10 xl:w-[272px] xl:block sm:inline sm:h-[92px] xl:h-[200px] sm:w-full sm:mb-2 sm:text-left border-solid border-[1px] ${selectedPlan === plan.id ? 'border-marine-blue' : 'border-light-gray'} rounded-lg bg-white text-align-left`} onClick={() => setSelectedPlan(plan.id)}>
                      <img src={plan.icon} alt={`${plan.title} icon`} className="xl:h-12 sm:h-10 sm:mt-6 sm:ml-6 xl:relative xl:float-left xl:-mt-4 xl:mb-2 sm:inline" />
                      <div className="sm:ml-6  sm:mb-12 xl:ml-4 xl:mt-24 xl:text-left sm:text-left">
                        <h2 className="text-lg text-marine-blue mt-6 ml-2 font-UbuntuBold">{plan.title}</h2>
                        <p className="text-cool-gray ml-2 -mb-8 font-UbuntuMedium">{plan.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex xl:items-center xl:w-full xl:h-16 py-2 sm:-mt-2 rounded-xl xl:justify-center sm:justify-center xl:mt-8 bg-alabaster">
                  <span className={`mr-2 font-UbuntuBold ${billingCycle === 'monthly' ? 'text-marine-blue' : 'text-cool-gray'}`}>Monthly</span>
                  <label className="switch">
                    <input type="checkbox" checked={billingCycle === 'yearly'} onChange={toggleBillingCycle} />
                    <span className={`slider round ${billingCycle === 'monthly' ? 'bg-marine-blue' : 'bg-cool-gray'}`}></span>
                  </label>
                  <span className={`ml-2 font-bold ${billingCycle === 'yearly' ? 'text-marine-blue' : 'text-cool-gray'}`}>Yearly</span>
                </div>

              </div>
            )}

            {currentStep === 3 && (
              <div className="xl:min-h-[446px] sm:max-h-[415px]">
                <h1 className="text-3xl mt-4 mb-2 text-marine-blue font-UbuntuBold">Pick add-ons</h1>
                <p className="text-md mb-6 text-cool-gray font-UbuntuMedium">Add-ons help enhance your gaming experience.</p>
                <div className="flex flex-col space-y-4">
                  {addonDetails[billingCycle].map(addon => (
                    <div key={addon.id} className={`flex items-center justify-between p-4 border ${addons[addon.id] ? 'border-marine-blue' : 'border-light-gray'} rounded-lg`}>
                      <label className="flex items-center">
                        <input type="checkbox" checked={addons[addon.id]} onChange={() => handleCheckboxChange(addon.id)} className="mr-4 h-[18px] w-[18px]" />
                        <span>
                          <span className="block text-marine-blue font-UbuntuBold">{addon.title}</span>
                          <span className="block text-cool-gray font-UbuntuMedium">{addon.description}</span>
                        </span>
                      </label>
                      <span className="text-purplish-blue font-UbuntuMedium">{addon.price}</span>
                    </div>
                  ))}
                </div>

              </div>
            )}

            {currentStep === 4 && (
              <div className="xl:min-h-[446px] sm:max-h-[415px]">
                <div className="text-3xl mt-4 mb-2 text-marine-blue font-UbuntuBold">Finishing Up</div>
                <p className="text-md mb-6 text-cool-gray font-UbuntuMedium">Double-check everything looks OK before confirming.</p>
                <div className="p-6 bg-alabaster rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <span className="text-md text-marine-blue font-UbuntuBold">{plans[billingCycle].find(plan => plan.id === selectedPlan).title} ({billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)})</span>
                      <span className="block text-sm text-cool-gray font-UbuntuRegular cursor-pointer underline hover:text-purplish-blue" onClick={() => setCurrentStep(2)}>Change</span>
                    </div>
                    <span className="text-md text-marine-blue font-UbuntuBold">{plans[billingCycle].find(plan => plan.id === selectedPlan).price}</span>
                  </div>
                  <hr />
                  <div className="mt-4">
                    {Object.entries(addons).filter(([key, value]) => value).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center mb-2">
                        <span className="text-md text-cool-gray font-UbuntuMedium">{addonDetails[billingCycle].find(addon => addon.id === key).title}</span>
                        <span className="text-md text-marine-blue font-UbuntuMedium">{addonDetails[billingCycle].find(addon => addon.id === key).price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <span className="text-md text-cool-gray font-UbuntuMedium ml-6">Total ({billingCycle})</span>
                  <span className="text-xl text-purplish-blue font-UbuntuBold mr-6">
                    +{`$${(
                      parseFloat(plans[billingCycle].find(plan => plan.id === selectedPlan).price.replace(/[^\d.]/g, '')) +
                      Object.entries(addons).filter(([key, value]) => value).reduce((acc, [key]) => acc + parseFloat(addonDetails[billingCycle].find(addon => addon.id === key).price.replace(/[^\d.]/g, '')), 0)
                    ).toFixed(2)}${billingCycle === 'monthly' ? '/mo' : '/yr'}`}
                  </span>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="flex flex-col items-center justify-center h-3/4 text-center">
                <div className="flex flex-col items-center justify-center w-full">
                  <img className="w-20 h-20 text-red-500 mb-6" src={tickIcon} alt="done"/>
                  <h1 className="text-3xl font-UbuntuBold text-marine-blue mt-4 mb-4">Thank You!</h1>
                  <p className="text-xl text-cool-gray font-UbuntuMedium">
                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel
                    free to email us at support@loremgaming.com.
                  </p>
                </div>
              </div>
            )}
            
            <div className="w-full">
              {currentStep === 4 ? <button className="float-right sm:ml-[27px] xl:mt-[6rem] sm:mt-[30px] xl:ml-0 px-8 py-4 font-UbuntuRegular bg-purplish-blue rounded-md text-white" onClick={handleNextStep} disabled={isNextDisabled()}>Confirm</button>
                : currentStep === 1 || currentStep === 2 || currentStep === 3 ? <button className="float-right sm:ml-[27px] sm:mt-[25px] xl:mt-[6rem] xl:ml-0 px-8 py-4 font-UbuntuRegular bg-marine-blue rounded-md text-white" onClick={handleNextStep} disabled={isNextDisabled()}>Next Step</button> : ""}
            </div>
            {currentStep > 1 && currentStep < 5 && (
              <div className="w-full">
                <button className="float-left sm:ml-[20px] xl:mt-[6rem] sm:mt-[23rem] xl:ml-0 font-bold text-cool-gray hover:text-marine-blue" onClick={handlePrevStep}>Go Back</button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>

  );
}

export default Form;

