import { useState, useEffect } from 'react'
import axios from 'axios'

function isBetweenNoonAnd11PM() {
    const now = new Date()
    const hour = now.getHours() // 0–23 local time
    return hour >= 12 && hour < 23
}

export default function Football() {
    const [games, setGames] = useState([])
    const [i, setI] = useState(0)

    useEffect(() => {
        function changeGame() {
            setI((prevIndex) => (prevIndex === games.length - 1 ? 0 : prevIndex + 1))
        }

        const intervalId = setInterval(changeGame, 5000) // every 5 seconds
        return () => clearInterval(intervalId)
    }, [games.length])

    useEffect(() => {
        async function getGames() {
            if (isBetweenNoonAnd11PM) {
                try {
                    const res = await axios.get('http://localhost:8888/api/football/games', {
                        // params: {
                        //   dev: true
                        // }
                    })
                    setGames(res.data.games)
                } catch (error) {
                    console.log('ERROR getting games', error)
                }
            }
        }
        getGames()
        const intervalId = setInterval(getGames, 6.7 * 60 * 1000)
        return () => clearInterval(intervalId)
    }, [])
    if (games.length === 0) {
        return (
            <div
                id="background"
                className="z-20 bg-primary w-[40%] h-[60%] p-10 rounded-2xl flex flex-col text-inverse items-center justify-center"
            >
                <p className="text-3xl font-music text-center">No games</p>
            </div>
        )
    }

    return (
        <div
            id="background"
            className="z-20 bg-primary w-[80%] h-[70%] p-10 rounded-2xl flex flex-col text-inverse"
        >
            <div className="flex flex-col w-full h-full">
                <div id="main" className="flex justify-evenly items-center h-full">
                    <div
                        id="home team"
                        className="flex w-[40%] h-96 flex-col px-20 text-center justify-center items-center font-music text-xl "
                    >
                        <div className="w-32 h-32  flex items-center justify-center">
                            <img
                                className="object-contain max-w-full max-h-full"
                                src={games[i].teams.home.logo}
                            />
                        </div>

                        <p className="pt-5 mb-3">{games[i].teams.home.name}</p>
                        <p className="text-3xl">{games[i].scores.home.total}</p>
                    </div>
                    <div className="flex flex-col text-center font-music">
                        {games[i].game.status.timer && (
                            <p className="text-3xl font-music">{games[i].game.status.timer}</p>
                        )}
                        <p className="pt-5">{games[i].game.status.short}</p>
                    </div>
                    <div
                        id="away team"
                        className="flex w-[40%] h-96 flex-col px-20 justify-center text-center items-center font-music text-xl"
                    >
                        <div className="w-32 h-32  flex items-center justify-center">
                            <img
                                className="object-contain max-w-full max-h-full"
                                src={games[i].teams.away.logo}
                            />
                        </div>
                        <p className="pt-5 mb-3">{games[i].teams.away.name}</p>
                        <p className="text-3xl">{games[i].scores.away.total}</p>
                    </div>
                    <div className="absolute bottom-[22%] w-[70%] flex justify-evenly" id="dots">
                        {games.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full ${i === index ? 'bg-inverse' : 'bg-gray-500'}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
