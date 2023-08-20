import React, { useEffect, useState } from "react";
import { parseString } from "xml2js";
import axios from "axios";

interface Campground {
  $: {
    faciltyPhoto: string;
  };
}

const Testing: React.FC = () => {
  const [apiData, setApiData] = useState<string>('');
  const [convertedApiData, setConvertedApiData] = useState<Campground[]>([]);

  async function fetchApiData(): Promise<string> {
    try {
      const response = await axios.get(
        "https://api.amp.active.com/camping/campgrounds?pstate=CO&api_key=scg63dkm2pf5smp8umfke2gj"
      );
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataApi();
  }, []);

  async function convertXmlToJson(xml: string): Promise<void> {
    return new Promise((resolve, reject) => {
      parseString(xml, (err, result) => {
        if (err) {
          reject(err);
        } else {
          const campgroundData: Campground[] = result.resultset.result;
          setConvertedApiData(campgroundData);
          resolve();
        }
      });
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        if (apiData) {
          await convertXmlToJson(apiData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [apiData]);

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