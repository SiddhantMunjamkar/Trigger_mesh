"use client";
import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { CheckFeatures } from "@/components/CheckFeatures";
import { Input } from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [name ,setName] = useState("");
  const [email ,setEmail] = useState("");
  const [password ,setPassword] = useState("");
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
      <div className="flex pt-8 max-w-4xl">
        <div className="flex-1 pt-20 px-4" >
          <div className="font-semibold text-3xl  pb-4">
            Join millions worldwide who automate their work using Zapier.
          </div>
          <div className="pb-6 pt-4">
          <CheckFeatures label={"Easy setup, no coding required"} /></div>
          <div className="pb-6">
          <CheckFeatures label={"Free forever for core features"} /></div>
          <div >
          <CheckFeatures label={"14-day trial of premium features & apps"} />
          </div>
        </div>
        <div className="flex-1 pt-6 pb-6 mt-12 px-4 border-b border-gray-200 shadow-sm rounded-2xl">
          <Input label={"Name"} placeholder={"Your name"} onChange={(e) => setName(e.target.value)} type={"text"} />
          <Input label={"Email"} placeholder={"Your Email"} onChange={(e) => setEmail(e.target.value)} type={"text"} />
          <Input label={"Password"} placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} type={"password"} />
          <div className="pt-4">
          <PrimaryButton onClick={()=>{axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
            username: email,
            password,
            name
          })
          router.push("/login");
          }} size={"big"}>Get Started free</PrimaryButton></div>
        </div>
      </div>
      </div>
    </div>
  );
}



