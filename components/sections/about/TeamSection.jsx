"use client"
import TeamMemberCard from '@/components/ui/cards/TeamMemberCard';
import { CustomSwiperModule } from '@/components/ui/CustomSwiperModule';
import Section from '@/components/ui/section/Section';
import React from 'react'
import { SwiperSlide } from 'swiper/react';
import "../../../styles/swiperSection.css";

function TeamSection() {
    const teamMembers = [
        {
          name: "Sarah Ahmed",
          phone: "+20 100 456 7890",
          email: "sarah.ahmed@example.com",
          info: "UI/UX designer with a passion for creating user-friendly and visually appealing interfaces.",
          age: 28,
          image_url: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg"
        },
        {
          name: "Mohamed Youssef",
          phone: "+20 101 234 5678",
          email: "mohamed.youssef@example.com",
          info: "Full-stack developer specializing in React, Node.js, and scalable web architectures.",
          age: 32,
          image_url: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
        },
        {
          name: "Layla Hassan",
          phone: "+20 102 987 6543",
          email: "layla.hassan@example.com",
          info: "Marketing strategist focused on social media campaigns and brand growth.",
          age: 26,
          image_url: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
        },

      ];      
      const breakpoints = {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }
  return (
    <Section
    className={"swiper-section "}
    title={"TEAM MEMBERS"}
    subText={"You can talk to our team now."}
    >
        {
            teamMembers?.length <= 3
            ?
            <div className='relative flex flex-wrap justify-center items-center gap-y-11 md:gap-y-0 md:gap-x-11'>
                {

                    teamMembers.map((item , index) => (
                        <TeamMemberCard key={index} item={item} />
                    ))
                }
            </div>
            :
            <CustomSwiperModule
                slidesPerView={4}
                breakpoints={breakpoints}
                spaceBetween={20}
                pagination = {false}
                loop = {false}
                initialSlide={Math.floor((teamMembers.length - 1) / 2)}
                children={teamMembers?.map((item , index) => (
                    <SwiperSlide className='!flex justify-center items-center my-7'>
                        <TeamMemberCard key={index} item={item} />
                    </SwiperSlide>
                ))}
            />
        }
    </Section>
  )
}

export default TeamSection