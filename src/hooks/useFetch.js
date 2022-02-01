import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortCont = new AbortController();

  useEffect(() => {
    // set isLoading state to true and reset the Error and Data to prevent them appear when we are in loading mode
    setIsLoading(true);
    setError(null);
    setData([]);

    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("The data you are looking for is not exist");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setError(null);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch Aborted!");
          } else {
            setError(err.message);
            setIsLoading(false);
            setData([]);
          }
        });
    }, 2000);

    // Cleanup function
    return () => {
      console.log("Component destroyed");
      abortCont.abort();
    };
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};

export default useFetch;
