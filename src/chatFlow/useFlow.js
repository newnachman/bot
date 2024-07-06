import { useCallback, useEffect, useState } from 'react';
import * as flowHelpers from './chatFlow';
import { useFetch } from './useFetch';

export const useGenerateBotResponses = () => {
    const [botResponse, setBotResponse] = useState();
    const { fetchedResponse, fetchData } = useFetch();
    
    const parseInput = useCallback(
        (text) => {
         
            if (flowHelpers.ActiveMode === 'end') {
                return;
            }

            if (text === 'bye bye') {
                flowHelpers.updateActiveMode('end');
                let textArray = flowHelpers.Flow.end;
                setBotResponse( {textArray, type: 'end'} );
                return;
            }

            if (text === 'exit') {
                flowHelpers.updateActiveMode('chat');
                let textArray = flowHelpers.Flow.exit;
                setBotResponse( {textArray, type: 'bot'} );
                return;
            }

            if (flowHelpers.ActiveMode === 'weather') {
                fetchData('GET_CITIES_OPTIONS', flowHelpers.getCitiesAutocompleteUrl(text))
                return;
            }

            if (flowHelpers.ActiveMode === 'choseCity') {
                const chosenCity = flowHelpers.citiesOptions[+text];
                flowHelpers.updateChosenCity(chosenCity);
                fetchData('GET_WEATHER_BY_LOCATION', flowHelpers.getCurrentWeatherUrl(chosenCity.Key))
                return;
            }

            if (text.includes('day')) {
                let textArray = flowHelpers.Flow.day.concat(flowHelpers.weekday[new Date().getDay()]) ;
                setBotResponse( {textArray, type: 'bot'} );
                return;
            }
            
            if (text.includes('weather')) {
                flowHelpers.updateActiveMode('weather');
                let textArray = flowHelpers.Flow.weather;
                setBotResponse( {textArray, type: 'bot'} );
                return;
            }

            if (flowHelpers.ActiveMode === 'chat') {
                let textArray = flowHelpers.Flow.chat;
                setBotResponse( {textArray, type: 'bot'} );
                return;
            }
        },
        [fetchData],
    )

    const parseFetchedResponse = useCallback(
        (response) => {
            if (!response) {
                return;
            }

           if (response.error) {
                let textArray = flowHelpers.Flow.error;
                setBotResponse( {textArray, type: 'bot'} );
                return;
            }
            
            if (response.loading) {
                let textArray = flowHelpers.Flow.loading;
                setBotResponse( {textArray, type: 'loading'} );
                return;
            }
            
            if (response.data) {
                if (flowHelpers.ActiveMode === 'weather') {

                    if(!response.data.length) {
                        // No city found:
                        let textArray = flowHelpers.Flow.noCity;
                        setBotResponse( {textArray, type: 'bot'} );
                        return;
                    }
                    flowHelpers.updateActiveMode('choseCity');
                    flowHelpers.updateCitiesOptions(response.data)
                    let textArray = flowHelpers.Flow.choseCity.concat(flowHelpers.createCitiesResponseArray(response.data));
                    setBotResponse( {textArray, type: 'bot'} );
                    return;
                }
                
                if (flowHelpers.ActiveMode === 'choseCity') {
                    flowHelpers.updateActiveMode('chat');
                    let textArray = flowHelpers.createWeatherResponseArray(response.data[0]);
                    setBotResponse( {textArray, type: 'bot'} );
                    return;
                }
            }
        },
        [],
    )

    useEffect(() => {
        if (fetchedResponse) {
            parseFetchedResponse(fetchedResponse);
        }
    }, [fetchedResponse, parseFetchedResponse])
    
  return {botResponse, parseInput}
  
 }
