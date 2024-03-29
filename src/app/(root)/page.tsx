import CategoryBar from "@/components/shared/CategoryBar";
import Container from "@/components/template/home/Container";
import Hero from "@/components/template/home/Hero";
import HomeBanner from "@/components/template/home/HomeBanner";
import HomeCategory from "@/components/template/home/HomeCategory";
import HomePopular from "@/components/template/home/HomePopular";
import React from "react";

const Page = () => {
  return (
    <main className="flex flex-col gap-20 py-10">
      <Hero />
      <HomeCategory />
      <HomeBanner
        image={
          "https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/temporary/20240318/1710737787_RDjRMS.jpg"
        }
      />
      <HomePopular />
      <HomeBanner
        image={
          "https://loket-production-sg.s3.ap-southeast-1.amazonaws.com/images/temporary/20240325/1711345515_Jytd1X.jpg"
        }
      />
      <Container className="container">
        <CategoryBar />
      </Container>
      <HomeCategory title="Let's Healing First!" category="trip" />
    </main>
  );
};

export default Page;
