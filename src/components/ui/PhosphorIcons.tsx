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
  CaretDown,
  ArrowsDownUp,
  ArrowsClockwise,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  ArrowSquareIn,
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
  TrendUp,
  Bridge,
  GameController,
  UsersThree,
  Wrench,
  ChartLineUp,
  LinkSimple,
  Check,
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

// Wrapper components with fill weight baked in
function fill(Icon: React.ComponentType<IconProps>) {
  const FillIcon = (props: Omit<IconProps, "weight">) => (
    <Icon weight="fill" {...props} />
  );
  FillIcon.displayName = `${Icon.displayName || "Icon"}Fill`;
  return FillIcon;
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
export const CaretDownBold = bold(CaretDown);
export const ArrowsDownUpBold = bold(ArrowsDownUp);
export const ArrowsClockwiseBold = bold(ArrowsClockwise);
export const ArrowUpBold = bold(ArrowUp);
export const ArrowDownBold = bold(ArrowDown);
export const CheckCircleBold = bold(CheckCircle);
export const ArrowSquareInBold = bold(ArrowSquareIn);
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
export const TrendUpBold = bold(TrendUp);
export const BridgeBold = bold(Bridge);
export const GameControllerBold = bold(GameController);
export const UsersThreeBold = bold(UsersThree);
export const WrenchBold = bold(Wrench);
export const ChartLineUpBold = bold(ChartLineUp);
export const LinkSimpleBold = bold(LinkSimple);
export const CheckBold = bold(Check);

// Filled variants used by the FeatureCarousel labels
export const PaperPlaneTiltFill = fill(PaperPlaneTilt);
export const SwapFill = fill(Swap);
export const CompassFill = fill(Compass);
export const ClockCounterClockwiseFill = fill(ClockCounterClockwise);
export const DiamondFill = fill(Diamond);
export const DownloadSimpleFill = fill(DownloadSimple);
export const WalletFill = fill(Wallet);
export const TrendUpFill = fill(TrendUp);
