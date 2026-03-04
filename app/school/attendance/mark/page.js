"use client";

import { Suspense } from "react";
import MarkAttendancePage from "./MarkAttendanceClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Loading...</div>}>
      <MarkAttendancePage />
    </Suspense>
  );
}