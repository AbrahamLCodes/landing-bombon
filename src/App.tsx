import { useState } from "react";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import StepFour from "./components/StepFour";
import StepFive from "./components/StepFive";
import StepSix from "./components/StepSix";

export default function App() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const restart = () => setStep(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-400 via-pink-400 to-yellow-200 text-white font-sans transition-all duration-500">
      {step === 1 && <StepOne onNext={nextStep} />}
      {step === 2 && <StepTwo onNext={nextStep} onBack={prevStep} />}
      {step === 3 && <StepThree onNext={nextStep} onBack={prevStep} />}
      {step === 4 && <StepFour onBack={prevStep} onNext={nextStep} />}
      {step === 5 && <StepFive onBack={prevStep} onNext={nextStep} />}
      {step === 6 && <StepSix onBack={prevStep} onRestart={restart} />}
    </div>
  );
}