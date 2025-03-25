import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateBMI, getBMICategory, getBMIMarkerPosition } from "@/lib/api";
import { GENDER_OPTIONS } from "@/lib/constants";

interface BMICalculatorProps {
  initialData?: {
    weight: number;
    height: number;
    age: number;
    gender: string;
  };
  onCalculate?: (bmi: number, data: {
    weight: number;
    height: number;
    age: number;
    gender: string;
  }) => void;
  className?: string;
}

export default function BMICalculator({ 
  initialData, 
  onCalculate,
  className = "" 
}: BMICalculatorProps) {
  const [weight, setWeight] = useState<number | undefined>(initialData?.weight);
  const [height, setHeight] = useState<number | undefined>(initialData?.height);
  const [age, setAge] = useState<number | undefined>(initialData?.age);
  const [gender, setGender] = useState<string>(initialData?.gender || "prefer-not-to-say");
  
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<{
    category: string;
    color: string;
    description: string;
  } | null>(null);
  const [markerPosition, setMarkerPosition] = useState<number>(0);
  
  // Calculate initial BMI if initialData is provided
  useEffect(() => {
    if (initialData?.weight && initialData?.height) {
      handleCalculate();
    }
  }, []);
  
  const handleCalculate = () => {
    if (!weight || !height) return;
    
    const bmiValue = calculateBMI(weight, height);
    setBmi(parseFloat(bmiValue.toFixed(1)));
    
    const category = getBMICategory(bmiValue);
    setBmiCategory(category);
    
    const position = getBMIMarkerPosition(bmiValue);
    setMarkerPosition(position);
    
    if (onCalculate) {
      onCalculate(bmiValue, {
        weight,
        height,
        age: age || 0,
        gender,
      });
    }
  };
  
  return (
    <div className={`max-w-4xl mx-auto bg-slate-50 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-100 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-heading font-bold text-xl mb-4">Enter Your Details</h3>
          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium text-slate-700 mb-1">
                Weight (kg)
              </Label>
              <Input
                type="number"
                id="weight"
                value={weight || ""}
                onChange={(e) => setWeight(parseFloat(e.target.value) || undefined)}
                placeholder="70"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all"
              />
            </div>
            
            <div>
              <Label htmlFor="height" className="text-sm font-medium text-slate-700 mb-1">
                Height (cm)
              </Label>
              <Input
                type="number"
                id="height"
                value={height || ""}
                onChange={(e) => setHeight(parseFloat(e.target.value) || undefined)}
                placeholder="175"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all"
              />
            </div>
            
            <div>
              <Label htmlFor="age" className="text-sm font-medium text-slate-700 mb-1">
                Age
              </Label>
              <Input
                type="number"
                id="age"
                value={age || ""}
                onChange={(e) => setAge(parseInt(e.target.value) || undefined)}
                placeholder="35"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 outline-none transition-all"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-1">
                Gender
              </Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
                {GENDER_OPTIONS.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <Button 
            onClick={handleCalculate} 
            className="w-full bg-secondary-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-secondary-600 transition-colors"
            disabled={!weight || !height}
          >
            Calculate BMI
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white border-slate-100 shadow-sm h-full">
            <CardContent className="p-6">
              <h3 className="font-heading font-bold text-xl mb-4">Your BMI Result</h3>
              <div className="text-center py-4">
                <motion.div
                  className="relative inline-block h-36 w-36 rounded-full border-8 border-slate-100 mb-4"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20,
                    delay: 0.3
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-bold text-secondary-500">
                      {bmi !== null ? bmi : "--"}
                    </span>
                  </div>
                </motion.div>
                
                {bmiCategory && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <h4 className={`font-medium text-lg mb-1`} style={{ color: bmiCategory.color }}>
                      {bmiCategory.category}
                    </h4>
                    <p className="text-sm text-slate-600 mb-6">
                      Your BMI is {bmi !== null ? (bmi < 18.5 ? "below" : bmi < 25 ? "within" : "above") : ""} the healthy range.
                    </p>
                  </motion.div>
                )}
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
                <div className="relative h-5 w-full bg-gradient-to-r from-yellow-400 via-green-500 via-yellow-400 to-red-500 rounded-lg mb-1 overflow-hidden">
                  {bmi !== null && (
                    <motion.div 
                      className="absolute top-0 w-3 h-8 bg-white border-2 border-slate-700 rounded-sm transform -translate-x-1/2 -translate-y-1"
                      initial={{ left: 0 }}
                      animate={{ left: `${markerPosition}%` }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 100, 
                        damping: 15,
                        delay: 0.7
                      }}
                    />
                  )}
                </div>
                <div className="flex justify-between text-xs">
                  <span>16</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>
              
              {bmiCategory && (
                <motion.div
                  className="mt-6 p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: `${bmiCategory.color}10`, 
                    borderColor: `${bmiCategory.color}30` 
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <h4 className="font-medium mb-2 flex items-center gap-1" style={{ color: bmiCategory.color }}>
                    <i className="ri-check-line"></i> Recommendation
                  </h4>
                  <p className="text-sm text-slate-700">
                    {bmiCategory.description}
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
