"use client";
import LoginBox from "../_components/loginbox";

export default function Home() {
  return (
    <main className="flex-justify-center flex-1">
      <div className="flex items-center ml-[400px]">
        <LoginBox />
        <img
          src="/logosbg.png"
          alt="Logo escola do cerrado"
          className="h-full w-full object-contain"
        />
      </div>
    </main>
  );
}
