import React, { useEffect, useState } from "react";
import { parseString } from "xml2js";
import axios from "axios";

const Testing: React.FC = () => {
  const [apiData, setApiData] = useState<string>('');
  const [convertedApiData, setConvertedApiData] = useState<Array<any>>([]);

  async function fetchApiData(): Promise<String> {
    try {
      const response = await axios.get(
        "https://api.amp.active.com/camping/campgrounds?pstate=CO&api_key=scg63dkm2pf5smp8umfke2gj"
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    async function fetchDataApi() {
      try {
        const data = await fetchApiData();
        setApiData(data);
        // console.log(data);
        // console.log(apiData) doesn't give a response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataApi();
  }, []);

  async function convertXmlToJson(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          // console.log('http://www.reserveamerica.com' + result.resultset.result[0].$.faciltyPhoto); // grabs a specific value from a campground
          // console.log(result);
          setConvertedApiData(result.resultset.result);
          resolve(result);
        }
      });
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (apiData) {
          const result = await convertXmlToJson(apiData);
          // console.log(convertedApiData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [apiData]); // Only call this effect when apiData changes

  return (
    <div className="App">
      <h1>Campsite Photos</h1>
      <div className="image-container">
        {convertedApiData?.map((campground, index) => (
          <div key={index} className="campground-images">
            {campground.$.faciltyPhoto && (
              <img
                src={'http://www.reserveamerica.com' + campground.$.faciltyPhoto}
                alt={`Campground ${index + 1}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testing;