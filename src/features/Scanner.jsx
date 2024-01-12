import { useState, useRef } from 'react';
import Quagga from 'quagga';

const Scanner = (props) => {
    const [data, setData] = useState("0000000000000");
    const myQuaggaRef = useRef(null);

    const start = () => {
        Quagga.init({
          inputStream: {
              name : "Live",
              type : "LiveStream",
              target: myQuaggaRef.current,
            },
          decoder: {
            readers: ["ean_reader"]
          }
        },err=>{
            if(err){
            console.log(err);
            return;
            }
            console.log("Initialization finished!!");
            Quagga.start();
            myQuaggaRef.current.style.display = "block";
        })
    
        Quagga.onProcessed((result) => {
            if(result === null) return;
            if(typeof(result) !== "object") return;
            if(result.boxes === undefined) return;
        })
    
        Quagga.onDetected((result) => {
            console.log("app" + String(result.codeResult.code));
            if(String(result.codeResult.code).startsWith("9784")){
                setData(result.codeResult.code);
            }
        })
    }
      
    const stop = () => {
        console.log("stop");
        Quagga.stop();
        myQuaggaRef.current.style.display = "none";
    }

    return <div>
        <div>Quagga Test</div>
        <div>
            <button onClick={start}>Start</button>
            <button onClick={stop}>Stop</button>
        </div>
        <div id="container" ref={myQuaggaRef}></div>
        <div>{data}</div>
    </div>;
}

export default Scanner;