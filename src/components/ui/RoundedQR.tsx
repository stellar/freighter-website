"use client";

import { QRCodeSVG } from "qrcode.react";

interface RoundedQRProps {
  value: string;
  size: number;
}

export function RoundedQR({ value, size }: RoundedQRProps) {
  return (
    <div className="qr-rounded" style={{ width: size, height: size }}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="white"
        fgColor="#171717"
        level="M"
      />
    </div>
  );
}
