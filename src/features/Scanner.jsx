import { useEffect } from "react";
import Quagga from "quagga";
import FetchData from "./FetchData";

const Scanner = (props) => {

  const {stopHandler, myQuaggaRef, setScannerBook} = props;

  useEffect(() => {
    start();
    return () => {
      Quagga.stop();
    };
  }, []);


  const start = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: myQuaggaRef.current,
        },
        decoder: {
          readers: ["ean_reader"],
        },
      },
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        //console.log("Initialization finished!!");
        myQuaggaRef.current.style.display = "block";
        Quagga.start();
      }
    );

    Quagga.onProcessed((result) => {
      if (result === null) return;
      if (typeof result !== "object") return;
      if (result.boxes === undefined) return;
    });

    Quagga.onDetected(async(result) => {
      console.log("app" + result.codeResult.code);
      if (result.codeResult.code.startsWith("9784")) {
        const data = await FetchData(Number(result.codeResult.code));
        setScannerBook(data);
        console.log(data);
        stopHandler();
      }
    });
  };



  return (
    <div id="container" ref={myQuaggaRef}>

    </div>
  );
};

export default Scanner;
