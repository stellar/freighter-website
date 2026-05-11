"use client";

import {
  type MotionValue,
  motion,
  type SpringOptions,
  type UseInViewOptions,
  useInView,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

interface SlidingNumberRollerProps {
  prevValue: number;
  value: number;
  place: number;
  transition: SpringOptions;
}

function SlidingNumberRoller({ prevValue, value, place, transition }: SlidingNumberRollerProps) {
  const startNumber = Math.floor(prevValue / place) % 10;
  const targetNumber = Math.floor(value / place) % 10;
  const animatedValue = useSpring(startNumber, transition);

  React.useEffect(() => {
    animatedValue.set(targetNumber);
  }, [targetNumber, animatedValue]);

  const [measureRef, { height }] = useMeasure();

  return (
    <span
      className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums"
      data-slot="sliding-number-roller"
      ref={measureRef}
    >
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <SlidingNumberDisplay
          height={height}
          key={i}
          motionValue={animatedValue}
          number={i}
          transition={transition}
        />
      ))}
    </span>
  );
}

interface SlidingNumberDisplayProps {
  motionValue: MotionValue<number>;
  number: number;
  height: number;
  transition: SpringOptions;
}

function SlidingNumberDisplay({
  motionValue,
  number,
  height,
  transition,
}: SlidingNumberDisplayProps) {
  const y = useTransform(motionValue, (latest) => {
    if (!height) {
      return 0;
    }
    const currentNumber = latest % 10;
    const offset = (10 + number - currentNumber) % 10;
    let translateY = offset * height;
    if (offset > 5) {
      translateY -= 10 * height;
    }
    return translateY;
  });

  if (!height) {
    return <span className="invisible absolute">{number}</span>;
  }

  return (
    <motion.span
      className="absolute inset-0 flex items-center justify-center"
      data-slot="sliding-number-display"
      style={{ y }}
      transition={{ ...transition, type: "spring" }}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = React.ComponentProps<"span"> & {
  number: number | string;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
  padStart?: boolean;
  decimalSeparator?: string;
  decimalPlaces?: number;
  transition?: SpringOptions;
};

function SlidingNumber({
  ref,
  number,
  className,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  padStart = false,
  decimalSeparator = ".",
  decimalPlaces = 0,
  transition = {
    stiffness: 200,
    damping: 20,
    mass: 0.4,
  },
  ...props
}: SlidingNumberProps) {
  const localRef = React.useRef<HTMLSpanElement>(null);
  React.useImperativeHandle(ref as React.Ref<HTMLSpanElement>, () => localRef.current!);

  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  const prevNumberRef = React.useRef<number>(0);

  const effectiveNumber = React.useMemo(
    () => (isInView ? Math.abs(Number(number)) : 0),
    [number, isInView],
  );

  const formatNumber = React.useCallback(
    (num: number) => (decimalPlaces != null ? num.toFixed(decimalPlaces) : num.toString()),
    [decimalPlaces],
  );

  const numberStr = formatNumber(effectiveNumber);
  const [newIntStrRaw, newDecStrRaw = ""] = numberStr.split(".");
  const newIntStr = padStart && newIntStrRaw?.length === 1 ? `0${newIntStrRaw}` : newIntStrRaw;

  const prevFormatted = formatNumber(prevNumberRef.current);
  const [prevIntStrRaw = "", prevDecStrRaw = ""] = prevFormatted.split(".");
  const prevIntStr = padStart && prevIntStrRaw.length === 1 ? `0${prevIntStrRaw}` : prevIntStrRaw;

  const adjustedPrevInt = React.useMemo(() => {
    return prevIntStr.length > (newIntStr?.length ?? 0)
      ? prevIntStr.slice(-(newIntStr?.length ?? 0))
      : prevIntStr.padStart(newIntStr?.length ?? 0, "0");
  }, [prevIntStr, newIntStr]);

  const adjustedPrevDec = React.useMemo(() => {
    if (!newDecStrRaw) {
      return "";
    }
    return prevDecStrRaw.length > newDecStrRaw.length
      ? prevDecStrRaw.slice(0, newDecStrRaw.length)
      : prevDecStrRaw.padEnd(newDecStrRaw.length, "0");
  }, [prevDecStrRaw, newDecStrRaw]);

  React.useEffect(() => {
    if (isInView) {
      prevNumberRef.current = effectiveNumber;
    }
  }, [effectiveNumber, isInView]);

  const intDigitCount = newIntStr?.length ?? 0;
  const intPlaces = React.useMemo(
    () => Array.from({ length: intDigitCount }, (_, i) => 10 ** (intDigitCount - i - 1)),
    [intDigitCount],
  );
  const decPlaces = React.useMemo(
    () =>
      newDecStrRaw
        ? Array.from({ length: newDecStrRaw.length }, (_, i) => 10 ** (newDecStrRaw.length - i - 1))
        : [],
    [newDecStrRaw],
  );

  const newDecValue = newDecStrRaw ? Number.parseInt(newDecStrRaw, 10) : 0;
  const prevDecValue = adjustedPrevDec ? Number.parseInt(adjustedPrevDec, 10) : 0;

  return (
    <span
      className={cn("flex items-center", className)}
      data-slot="sliding-number"
      ref={localRef}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {isInView && Number(number) < 0 && <span className="mr-1">-</span>}

      {intPlaces.map((place) => (
        <SlidingNumberRoller
          key={`int-${place}`}
          place={place}
          prevValue={Number.parseInt(adjustedPrevInt, 10)}
          transition={transition}
          value={Number.parseInt(newIntStr ?? "0", 10)}
        />
      ))}

      {newDecStrRaw && (
        <>
          <span>{decimalSeparator}</span>
          {decPlaces.map((place) => (
            <SlidingNumberRoller
              key={`dec-${place}`}
              place={place}
              prevValue={prevDecValue}
              transition={transition}
              value={newDecValue}
            />
          ))}
        </>
      )}
    </span>
  );
}

export { SlidingNumber, type SlidingNumberProps };
export default SlidingNumber;
