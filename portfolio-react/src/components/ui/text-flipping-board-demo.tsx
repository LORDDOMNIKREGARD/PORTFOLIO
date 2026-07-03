"use client";

import { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "@/components/ui/text-flipping-board";

const MESSAGES: string[] = [
  "STAY CURIOUS \nSTAY COMMITTED \n- STEVE JOBS",
  "What did I ship this week?",
  "Designing thoughtful experiences with intent.",
  "Building with clarity, precision, and care.",
  "Creating digital work that feels refined and alive.",
];

export default function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(() => setMsgIdx((i) => (i + 1) % MESSAGES.length), []);

  useEffect(() => {
    const id = window.setInterval(next, 6000);
    return () => window.clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-4">
      <TextFlippingBoard text={MESSAGES[msgIdx]} />
    </div>
  );
}
