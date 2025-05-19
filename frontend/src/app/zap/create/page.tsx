"use client";
import { Appbar } from "@/components/Appbar";
import { LinkButton } from "@/components/buttons/LinkButton";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { ZapCell } from "@/components/ZapCell";
import { useState } from "react";

export default function ZapCreate() {
  const [selectedTrigger, setSelectedTrigger] = useState("");

  type Action = {
    availableActionId: string;
    availableActionName: string;
  };

  const [selectedActions, setSelectedActions] = useState<Action[]>([]);
  return (
    <div>
      <Appbar />
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            name={selectedTrigger ? selectedTrigger : "Trigger"}
            index={1}
          />
        </div>

        <div className=" pt-2 pb-2 w-full">
          {selectedActions.map((action, index) => 
            <div className="flex justify-center pt-2">
            <ZapCell
              name={action.availableActionName ? action.availableActionName : "Action"}
              index={2 + index}
            />
            </div>
          )}
        </div>
        <div className="flex justify-center">
          <div>
            <PrimaryButton
              onClick={() => {
                setSelectedActions((prev) => [
                  ...prev,
                  { availableActionId: "", availableActionName: "" },
                ]);
              }}
            >
              <div className="text-2xl max-w-full">+</div>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
