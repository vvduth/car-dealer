import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface SwiperButtonsProps {
  prevClassName?: string;
  nextClassName?: string;
}
const SwiperButton = ({
  prevClassName = "swiper-button-prev",
  nextClassName = "swiper-button-next",
}: SwiperButtonsProps) => {
  return (
    <div>
      <Button
        variant="ghost"
        type="button"
        rel="prev"
        size="icon"
        className={cn(
          prevClassName,
          "swiper-button-prev absolute top-1/2 -translate-y-1/2 z-10 flex items-center rounded-full bg-white"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ChevronLeft className="h-10 w-10" color="black" />
      </Button>
      <Button
        variant="ghost"
        type="button"
        rel="next"
        size="icon"
        className={cn(
          nextClassName,
          "swiper-button-next absolute top-1/2 -translate-y-1/2 z-10 flex items-center rounded-full bg-white"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ChevronRight className="h-10 w-10" color="black" />
      </Button>
    </div>
  );
};

export default SwiperButton;
