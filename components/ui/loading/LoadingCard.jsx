"use client"

function LoadingCard({className}) {
  return (
    <div className={`product-card relative flex flex-col justify-center items-center ${className} dark:shadow-accent-foreground mt-9 w-full rounded-3xl  shadow-flexable-shadow px-2 py-3 min-h-[300px] loading-card-animate overflow-hidden bg-background`}>
        <span className="absolute  w-[40px] h-[150%] loading-card-span-animate"></span>
    </div>
  )
}

export default LoadingCard