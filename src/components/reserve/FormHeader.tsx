'use client';
import { MultiStepFormEnum } from "@/config/types";
import { routes } from "@/config/routes";
import { Prisma } from "@prisma/client";
import { ArrowRight, CircleCheck, CreditCard, Lock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import Confetti from "confetti-js";
import { useEffect } from "react";

type FormHeaderProps = Prisma.ClassifiedGetPayload<{ include: { make: true } }>;

const FormHeader = (props: FormHeaderProps) => {

  useEffect(() => {
    const confettiElement = document.getElementById('confetti-canvas');
    if (!confettiElement) {
      const canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1000';
      document.body.appendChild(canvas);
    }
  }, []);

  const handleConfettiAndScroll = () => {
    // Confetti effect
    const confetti = new Confetti({
      target: 'confetti-canvas',
      max: 150,
      size: 1.5,
      animate: true,
      props: ['circle', 'square', 'triangle', 'line'],
      colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]],
      clock: 25,
      rotate: true,
      width: window.innerWidth,
      height: window.innerHeight,
      start_from_edge: false,
      respawn: true,
    });
    confetti.render();
    setTimeout(() => {
      confetti.clear();
    }, 4000);

    // Scroll to form
    document.getElementById('reservation-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
      <div className="mx-auto bg-gray-900/70 rounded-lg shadow-lg text-gray-300 border border-gray-700">
        {/* Top Welcome Section */}
        <div className="bg-gray-800/50 p-4 rounded-t-lg text-center">
          <h1 className="text-2xl font-bold text-white">You are one step closer to owning this vehicle.</h1>
          <p className="text-gray-400">Follow the steps below to complete your reservation.</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="flex gap-x-6 justify-between mb-6">
            {/* Left Column */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start">
                <CircleCheck className="text-green-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-400">A simple, secure two-step reservation process.</p>
              </div>
              <div className="flex items-start">
                <CircleCheck className="text-green-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-400">Select your preferred handover date and provide your contact details.</p>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex gap-x-4 items-center">
              {props.make?.image && (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={props.make.image}
                    alt={props.make.name}
                    fill
                    className="aspect-1/1 object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-white line-clamp-1">{props.title}</h2>
                <div className="text-sm text-gray-400 line-clamp-2">
                  {props.description ? parse(props.description) : ""}
                </div>
              </div>
            </div>
          </div>

          {/* Steps Visualizer */}
          <div className="flex justify-around items-center bg-gray-800/50 p-4 rounded-lg mb-6">
            <div className="text-center">
              <p className="font-semibold text-white">1. Select Date</p>
              <p className="text-gray-400 text-sm">Choose a handover time</p>
            </div>
            <ArrowRight className="w-6 h-6 text-gray-500" />
            <div className="text-center">
              <p className="font-semibold text-white">2. Your Details</p>
              <p className="text-gray-400 text-sm">Finalize your reservation</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex justify-around items-center text-center text-gray-400">
            <div className="flex items-center flex-col justify-center space-y-2">
              <Lock className="w-6 h-6" />
              <p className="text-sm">Secure Process</p>
            </div>
            <div className="flex items-center flex-col justify-center space-y-2">
              <Star className="w-6 h-6" />
              <p className="text-sm">5-Star Service</p>
            </div>
            <div className="flex items-center flex-col justify-center space-y-2">
              <CreditCard className="w-6 h-6" />
              <p className="text-sm">Flexible Options</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 border-t border-gray-800">
          <Button onClick={handleConfettiAndScroll} className="font-bold flex gap-x-3 w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
            Proceed to Reservation <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
  );
};

export default FormHeader;