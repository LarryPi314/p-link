import PlinkLogo from "./PlinkLogo";
import SupabaseLogo from "./SupabaseLogo";

export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      {/* <div className="flex gap-8 justify-center items-center"> */}
        {/* <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          <SupabaseLogo />
        </a> */}
        {/* <span className="border-l rotate-45 h-6" /> */}
        {/* <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a> */}
      {/* </div> */}
      {/* <h1 className="sr-only">Supabase and Next.js Starter Template</h1> */}
      
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Welcome to P-Link!
      </p>
      <PlinkLogo />
      <p className="text-1xl lg:text-1xl !leading-tight mx-auto max-w-xl text-center">
        P-Link is an AI-powered alumni outreach platform to allow students to find and contact thousands of Pomona alumni in related fields, interests, and experiences through natural language queries, and get relevant results instantly.
        Login to get started!
      </p>
      </div>
  );
}
