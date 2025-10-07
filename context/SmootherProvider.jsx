"use client"
import React, { useEffect, useRef } from 'react'
import { ScrollSmoother , ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
gsap.registerPlugin(ScrollSmoother , ScrollTrigger)
function SmootherProvider({children}) {
    const smootherRef = useRef(null)
    useEffect(() => {
        if(smootherRef.current) return;
        smootherRef.current = ScrollSmoother.create({
            smooth : .7,
            ignoreMobileResize : true,
            effects : true,
        })
        return () => {
            smootherRef.current?.kill();
            smootherRef.current = null;
        };
    })
  return (
    <div id='smooth-wrapper'>
        <div id='smooth-content'>
            {children}
        </div>
    </div>
  )
}

export default SmootherProvider