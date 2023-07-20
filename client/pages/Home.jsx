import React, { useReducer, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Home.scss';

import {
  homePageActions as actions,
  homePageStateInit as overlayStateInit,
  homePageReducer as overlayStateReducer,
} from '../reducers/homePageReducers.jsx';

import {
  StateContext as OverlayFormContext,
  DispatchContext as OverlayDispatchContext,
} from '../contexts/contexts.jsx';

import MainHeader from '../components/HomeComponents/MainHeader.jsx';
import ApisContainer from '../components/HomeComponents/ApisContainer.jsx';

const Home = () => {
  const [overlayState, overlayDispatch] = useReducer(
    overlayStateReducer,
    overlayStateInit,
  );

  const navigate = useNavigate();
  const params = useParams();

  function comments(e) {
    const senderTechId = e.target.id;
    const senderName = e.target.name;
    navigate(`/comments/${senderTechId}`); // received as route.params
  }

  // initializing the page
  useEffect(() => {
    overlayDispatch({ type: actions.LOAD });
  }, []);

  // loading state changed: making a fetch IF NOT IDLE
  useEffect(() => {
    const { loading, apiImageUrl, apiDescription, apiName, apiUrl, apiData } =
      overlayState;
    switch (loading) {
      case 'load':
        {
          const fetchData = async () => {
            try {
              const response = await fetch('/api/tech', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const data = await response.json();
              const newData = JSON.parse(JSON.stringify(data));
              overlayDispatch({ type: actions.NEW_DATA, payload: newData });
            } catch (err) {
              console.log('Error occurred loading data from backend');
            }
          };
          fetchData();
        }
        break;

      case 'submit':
        {
          const fetchData = async () => {
            try {
              const response = await fetch('/api/tech', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: apiName,
                  link: apiUrl,
                  image: apiImageUrl,
                  typeApi: false,
                  typeFramework: false,
                  typeLibrary: false,
                  description: apiDescription,
                }),
              });
              console.log('success');
              if (response.status === 200) {
                const data = apiData.slice();
                data.push({
                  name: apiName,
                  link: apiUrl,
                  image: apiImageUrl,
                  typeApi: false,
                  typeFramework: false,
                  typeLibrary: false,
                  description: apiDescription,
                });
                overlayDispatch({ type: actions.NEW_DATA, payload: data });
              }
              overlayDispatch({ type: actions.EXIT });
            } catch (err) {
              console.log('Error occurred submitting data to backend');
              overlayDispatch({ type: actions.FETCH_ERR, payload: err });
            }
          };
          fetchData();
        }
        break;

      default:
        break;
    }
  }, [overlayState.loading]);

  return (
    <OverlayDispatchContext.Provider value={overlayDispatch}>
      <OverlayFormContext.Provider value={overlayState}>
        <MainHeader />
        <ApisContainer comments={comments} />
      </OverlayFormContext.Provider>
    </OverlayDispatchContext.Provider>
  );
};

export default Home;
