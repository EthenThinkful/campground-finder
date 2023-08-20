import React, { useEffect, useState } from "react";
import { parseString } from "xml2js";
import axios from "axios";
import Cors from 'cors';

const Testing: React.FC = () => {
  interface ApiResponse {
    // Define the structure of the response data here
  }

  async function fetchApiData(): Promise<ApiResponse> {
    try {
      const response = await axios.get(
        "https://api.amp.active.com/camping/campgrounds?pstate=CO&api_key=scg63dkm2pf5smp8umfke2gj"
      );
      console.log(response.data);
      return response.data as ApiResponse;
    } catch (error) {
      throw error;
    }
  }

  fetchApiData();

//   function convertXmlToJson(xml: string): Promise<unknown> {
//     return new Promise((resolve, reject) => {
//       parseString(xml, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }

//   interface ApiData {
//     // Define the structure of the API response data here
//   }

//   const [apiData, setApiData] = useState<ApiData | null>(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await fetchApiData();
//         setApiData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const result = await convertXmlToJson(apiData);
//         console.log(result);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     }

//     fetchData();
//   }, []);

  return (
    <div className="App">
      <h1>XML to JSON Conversion</h1>
    </div>
  );
};

export default Testing;
