import React from "react";
import Banner from "./Banner/Banner";
import HowItWorks from "./HowItWorks/HowItWorks";
import FeedBacks from "./Feedbacks/FeedBacks";
import OurMission from "./OurMission/OurMission";
import OurFeatures from "./OurFeatures/OurFeatures";
import ResolvedIssues from "./ResolvedIssues/ResolvedIssues";
import RecentIssues from "./RecentIssues/RecentIssues";
import CTA from "./CTA/CTA";
import FAQ from "./FAQ/FAQ";
import Impacts from "./Impacts/Impacts";

const Home = () => {
  return (
    <div className="min-h-screen w-11/12 mx-auto space-y-20">
      <Banner></Banner>
      <OurFeatures></OurFeatures>
      <HowItWorks></HowItWorks>
      <RecentIssues></RecentIssues>
      <ResolvedIssues></ResolvedIssues>
      <Impacts></Impacts>
      <FeedBacks></FeedBacks>
      <FAQ></FAQ>
      <CTA></CTA>
      <OurMission></OurMission>
    </div>
  );
};

export default Home;
