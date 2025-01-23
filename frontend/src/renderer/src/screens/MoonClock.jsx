export default function MoonClock() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#141414]">
      <div
        className="absolute top-[20%] left-0 w-full h-[150%] bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.redd.it/rg21bnd1bzla1.jpg')" }}
      ></div>

      <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-[#141414] to-transparent"></div>
    </div>
  )
}
