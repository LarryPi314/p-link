import React from 'react';
import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import SideBar from "@/components/ui/SideBar";
import TopBar from '@/components/ui/topbar';
import SearchArea from '@/components/ui/SearchArea';
import SearchWrapper from '@/components/ui/SearchWrapper';


import SmallProfile from '@/components/ui/smallprofiles';

const Page: React.FC = () => {

const canInitSupabaseClient = () => {
      // This function is just for the interactive tutorial.
      // Feel free to remove it once you have Supabase connected.
      try {
          createClient();
          return true;
      } catch (e) {
          return false;
      }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  const handleSearchTextUpdate = (text: string) => {
      console.log('Search text updated:', text);
  };
 
 return (
      <div className="h-dvh flex w-full flex-col items-center bg-white">

          <div className="h-full animate-in flex w-full gap-0 opacity-0" >
            <SearchWrapper />
          </div>

      </div>
  );
}
export default Page;