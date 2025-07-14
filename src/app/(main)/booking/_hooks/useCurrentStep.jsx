'use client'
import { useState } from "react";

export const useCurrentStep = () => {
    const [currentStep, setCurrentStep] = useState(1);
    return { currentStep, setCurrentStep }
}