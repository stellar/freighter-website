// Re-export Phosphor icons used across the site with Bold weight as default
// Import from here to keep icon usage consistent

import {
  PaperPlaneTilt,
  Swap,
  Compass,
  ClockCounterClockwise,
  Diamond,
  DownloadSimple,
  Wallet,
  CaretLeft,
  CaretRight,
  ArrowsDownUp,
  ShieldCheck,
  Lock,
  Fingerprint,
  CurrencyDollar,
  ImageSquare,
  Download,
  ArrowRight,
  Plus,
  AppleLogo,
  AndroidLogo,
  type IconProps,
} from "@phosphor-icons/react";

// Wrapper components with bold weight baked in
function bold(Icon: React.ComponentType<IconProps>) {
  const BoldIcon = (props: Omit<IconProps, "weight">) => (
    <Icon weight="bold" {...props} />
  );
  BoldIcon.displayName = `${Icon.displayName || "Icon"}Bold`;
  return BoldIcon;
}

export const PaperPlaneTiltBold = bold(PaperPlaneTilt);
export const SwapBold = bold(Swap);
export const CompassBold = bold(Compass);
export const ClockCounterClockwiseBold = bold(ClockCounterClockwise);
export const DiamondBold = bold(Diamond);
export const DownloadSimpleBold = bold(DownloadSimple);
export const WalletBold = bold(Wallet);
export const CaretLeftBold = bold(CaretLeft);
export const CaretRightBold = bold(CaretRight);
export const ArrowsDownUpBold = bold(ArrowsDownUp);
export const ShieldCheckBold = bold(ShieldCheck);
export const LockBold = bold(Lock);
export const FingerprintBold = bold(Fingerprint);
export const CurrencyDollarBold = bold(CurrencyDollar);
export const ImageSquareBold = bold(ImageSquare);
export const DownloadBold = bold(Download);
export const ArrowRightBold = bold(ArrowRight);
export const PlusBold = bold(Plus);
export const AppleLogoBold = bold(AppleLogo);
export const AndroidLogoBold = bold(AndroidLogo);
