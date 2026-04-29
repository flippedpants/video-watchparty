import { use,useEffect, useRef } from "react";

declare global {
  interface Window{
    YT: any,
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function App() {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src =  "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("player", {
        height: "600",
        width: "900",
        videoId: "GuXbNaOTd3Q",

        playerVars: {
          'playsinline': 1
        },
        events: {
        onReady: (event: any) => {
          console.log("Player ready");
          },
        onStateChange: (event: any) => {
          console.log("State:", event.data);
          },
        }
      });
    };
  }, [])

  const play =() => {
    playerRef.current?.playVideo();
  }

  const pause = () => {
    playerRef.current?.pauseVideo();
  }

  return(
    <div>
    <div id="player"></div> 
    <br />

    <button onClick={play}>Play</button>
    <button onClick={pause}>Pause</button>
    </div>
  );

}