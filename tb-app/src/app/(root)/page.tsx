"use client"
import Home from "@/components/home/Home";
import { useSize } from "@/lib/utils/hooks";

export default function Page() {
  const {h} = useSize()
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <Home />
      {h>650&&<div className="bg-white  w-full text-center py-4 text-lg">
          &copy;IlyassKrem-dev
      </div>}
    </div>
  );
}
